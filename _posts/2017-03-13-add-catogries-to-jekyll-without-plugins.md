---
layout: post
title:  不使用plugins为jekyll增加目录
category: 杂谈
description: 为jekyll增加目录
---

会看到这篇博客的人一般不会为为什么添加目录以及为什么不用plugins添加而存疑,
所以在此不再赘述。

# 1.增加目录文件夹

```
    |-categories
      --c1.html
      --c2.html
      --c3.html
      --.....
      
      按照你的目录来挨个添加。注意文件名称要与你所设的目录对应
```

# 2.挨个编辑模板。按照你自个的喜好来即可,我的是这样的。

```
    {% raw %}
     ---
    layout: default
    title: c1
     ---
    
    <div>
    
        <h2>yii2</h2>
    
    
        <section class="archive_list"> 
            {% comment %}
                如果是汉语,则写作 site.categories.['汉字']
            {%endcomment%}
            {% for post in site.categories.c1 %}  
    
    
            <div class="post_title">
                <a href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title}}</a>
                <span class="date">{{ post.date | date: "%-d %b, %Y" }}</span>
            </div>
    
            {% endfor %}
    
    
        </section>
    
    
        <footer class="article-footer">
            {% include author.html %}
        </footer>
    </div>

    {% endraw %}
```

# 3.在你需要增加目录的地方添加下列代码

```
    {% raw %}
    {% for category in site.categories %}
        <li>
     <a href="{{ "/categories" | prepend: site.baseurl }}/{{category | first}}"
         class="gray">{{ category | first}}
        <span class="num">{{ category | last | size }}</span>
        </a>
        </li>
    {% endfor %}
    {% endraw %}
```

这样就ok了。







