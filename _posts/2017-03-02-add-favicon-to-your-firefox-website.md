---
layout: post
title:  设置favicon
category: 杂谈
description: 在设置favicon时,firefox中不起作用
---

<h1 class="red">祝广大女同志们38节日快乐!</h1>

------------------------------------------------

今天,我心血来潮,想为本博客设置favicon,稍加美观一下。于是,

1. 在网站的根目录下增加favicon.ico. 有不少网站可以在线制作favicon的,
    很简单,百度一下你就知道。
    
2. 很多时候只要把这个图片放到根目录下,小图标就会显示出来了,但是我的没有
    显示出来,于是
   
3. 我在`<head></head>`之间增加了

```
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
```
 
 But,依然不起作用。于是再百度,网上说有三种方案,除了前边这种还有
   

```
<link rel="shortcut" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```
   
   但是,<span class="orange">没有一种可以的。</span>
   
   
4. 最终,还是用google找到了问题的答案。在ico后边加上?。

```
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?">
```
    
小小问号,

大大八嘎,

前前后后,

一个小时。







