---
layout: post
title:  Yii2集成workerman(GateWayWorker)
category: Yii2
description: 为yii2增加实时通讯的能力。workerman与yii2联合使用。
---

# 为什么要在yii2中使用workerman
yii2是一个高性能的php mvc框架,非常适于开发网络应用。
但是yii2基于http协议。基于http协议,客户端只能从服务器拉取数据,而服务器无法主动向客户端接收数据。
如果要实现如聊天、实时提醒、手游等功能,则可以使用ajax轮询。
轮询分为长轮询和短轮询,区别在于发送的ajax请求是否立即返回结果。短轮询的缺点在于很多ajax请求是无用的。
长轮询的缺点在于占用服务器资源,服务器需要很强的承载能力。
websocket是HTML5的一种新的协议,它实现了客户端与服务器端的双向通讯,很好的解决了上述问题。
workerman是一个php socket服务器框架。
所以,如果能够在yii2中集成workerman,必将带来革命式的变化。
![]({{site.baseurl}}/assets/img/http_websocket.png)

# 为什么选择GatewayWorker

如果你的应用需要客户端与客户端进行通讯,请选用更为专注于长连接的GatewayWorker。
如否,则用workerman足矣。我是为了在开发出提醒功能的情况下,进一步开发聊天功能而选用GatewayWorker的。
长连接与短连接的区别在于,长连接会保持客户端与服务器端的连接很长时间不断开,连接数
过多会导致服务器占用过大。

# 解决方案

主要参照http://www.workerman.net/gatewaydoc/work-with-other-frameworks/README.html

主要流程如下图所示
![]({{site.baseurl}}/assets/img/integrate.jpg)
##a、建立服务器与客户端的连接,绑定client_id与uid

a1、建立该连接的目的在于将来服务器给指定用户推送消息时,就可以知道向哪个客户端推送了。
一个uid可以对应多个client_id.类似于微信,同一个账号(uid)有pc端(client_id1)也有手机端(client_id2)。
client_id为gateway分配,所以第一步在用户连接的时候由gateway下发client_id给客户端。
在Gateway的Events中修改

```
<?php
use \GatewayWorker\Lib\Gateway;
class Events
{
    // 当有客户端连接时，将client_id返回，让Yii判断当前uid并执行绑定
    public static function onConnect($client_id)
    {
        Gateway::sendToClient($client_id, json_encode(array(
            'type'      => 'init',
            'client_id' => $client_id
        )));
    }

    // GatewayWorker建议不做任何业务逻辑，onMessage留空即可
    public static function onMessage($client_id, $message)
    {

    }
}

```

a2、客户端接收到client_id后,向yii2发起ajax请求,绑定client_id与uid。在前端启动页面中,使用js

```
// 建立socket连接
ws = new WebSocket("ws://0.0.0.0:8282");
// 服务端主动推送消息时会触发这里的onmessage
ws.onmessage = function(e){
    // json数据转换成js对象
    var data = eval("("+e.data+")");
    var type = data.type || '';
    switch(type){
        // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
        case 'init':
            // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
            
            if(!$guest){
                 $.post('$bindUidUrl', {client_id: data.client_id}, function(data){}, 'json');
            }
           
            break;
        default :
            // 其它的消息提醒
            messageBox.addNum(1);
    }
};
```

a3、yii2调用Gateway绑定uid与clientid

```
    /**
     * 绑定uid
     */

    public function actionBindUid(){
        if(Yii::$app->request->isAjax){
            $clientId = Yii::$app->request->post('client_id');
            //指定register的地址。仅指定ip地址及端口号即可
            Gateway::$registerAddress = '127.0.0.0:1238'; 
            Gateway::bindUid($clientId, Yii::$app->user->id);
        }
    }
```

##b、从服务器端向客户端发送消息

a中已经建立了连接,现在可以在yii2中某些需要向客户发送消息的时候,调用Gateway向客户端推送消息了。

b1、我目前的需要为当有新的评论出现时,向被评论的人发送新消息提醒。于是在comment模型中

```
    public function afterSave($insert, $changedAttributes) {
        /**
         * 通知被评论者
         */
        Gateway::$registerAddress = '127.0.0.1:1238';
        这里的消息必须做json_encode
        Gateway::sendToUid($this->receiverId, json_encode('有新评论'));
    }
    
```

上述代码会调用onmessage把消息发送给receiverId名下的所有client.
客户端接受到新消息后,会执行前文a2中的 `messageBox.addNum(1)` 具体实现看个人。









