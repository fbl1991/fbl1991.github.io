---
layout: post
title:  增加移动端主题
category: 开源程序
description: 为webcreator增加移动端显示
---

由于延续了yii2良好的前后端分离设计，在当前webcreator的基础上新增主题还是比较容易的。
目前移动端的开发越来越重要，所以，今天我们拿增加一个专门为移动端而制作的主题举例。

1、初始化，增加主题文件夹mobile、以及将view指向mobile。

-在themes文件夹中增加mobile文件夹，将来的所有主题文件均放在这个文件夹下。
-在`config\main.php`中设置主题，在components中增加下列代码。

```
    'view' => [
            'theme'=>[
                'pathMap'=>[
                    '@app/views' => [
                        '@app/web/themes/mobile',
                        '@app/web/themes/default',
                        ],
                ],
                'baseUrl'=>'@web/web/themes/default',

            ],
        ],
```

这样就ok了。yii2在渲染的时候，首先会在mobile里边寻找，如果找不到就转向default文件中。
这样带来的好处是，我们在新增主题的时候，可以随时增加随时查看，并且不会破坏原有系统的完整性。









