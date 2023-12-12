//实现主页的文章截取，以及拉到底部自动补充的功能。还有跳转到其他页面调用php的功能。
var post_pinned_flag = 0;
var page = window.location.search.match(/\?page=(\d+)/)[1]; //页数
var articles_num = 0;
document.addEventListener("DOMContentLoaded",function(){ //主页面加载后，添加8个缩减过的post
    console.log(document.referrer);
    upload_from_json("../json/articles/articles.json",10);
})
//判断整个文档滚动至底部
function upload_from_json(path,num){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var articles = JSON.parse(xhr.responseText);  //articles是一个对象，内有一个也叫articles的数组
            if(post_pinned_flag == 0 && page == 1){
                post_pinned(articles); //置顶文章
                post_pinned_flag = 1;
            }
            articles_num = articles.articles.length;
            var splited_articles = split_articles(articles,num);
            post_cutted(splited_articles,add_page_button);
        }
    }
    xhr.open("GET",path,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
    
}
function split_articles(articles,num){
    var splited_articles = [];
    for(var i=articles.articles.length-1;i-(page-1) * num>=0 && i>=(articles.articles.length)-num;i--){//最新的文章在最上面，所以从后往前遍历
        if(articles.articles[i-(page-1) * num].pinned == false)
            splited_articles.push(articles.articles[i-(page-1) * num]);
    }
    return splited_articles;
}
function post_cutted(articles,callback){
    for(var i=0;i<articles.length;i++){
        let new_post = document.createElement("div");
        new_post.className = "post";
        new_post.innerHTML = `
                <div class="post-body">
                    <div class="post-article">
                        <div class="post-title">
                            <a class="hidden-link moveable-text" href="detail/module?post_id=${articles[i].id}">${articles[i].title}</a>
                        </div>
                        <div class="post-text">
                            <div>
                                ${articles[i].content.substr(0,100).replace(/\n/g,"")} 
                                <a class="non-underline" href="detail/module?post_id=${articles[i].id}">...阅读全文</a>
                            </div>
                        </div>
                        <div class="post-dot"></div>
                        <div class="post-foot">
                            <span class="smaller fade-text"><a class="non-underline" href="list/list?property=tag&name=${articles[i].tag}">${articles[i].tag}&nbsp;</a></span>
                            <span class="smaller fade-text"><a class="non-underline" href="detail/module?post_id=${articles[i].id}">#&nbsp;</a></span>
                            <span class="smaller fade-text">by ${articles[i].author}&nbsp;<a class="non-underline" href="list/list?property=year&name=${articles[i].year}">${articles[i].year}</a>-${articles[i].time}</span>
                        </div>
                    </div>
                </div>
        `;
        post_cutted_timing(new_post,i);
    }
    setTimeout(callback,articles.length*300);
}
function post_cutted_timing(new_post,i){ //定时post，方便展现动画~
    setTimeout(()=>{
        var content_left = document.getElementsByClassName("content-left")[0];
        let blank = document.createElement("div");//文章下方的空白
        blank.className = "post-blank"; 
        content_left.appendChild(new_post);
        content_left.appendChild(blank); 
    },i*300);
}

function post_pinned(articles){
    var pinned_article = {}
    var flag = 0;
    for(var i = 0;i<articles.articles.length;i++){
        if(articles.articles[i].pinned){
            pinned_article = articles.articles[i];
            flag = 1;
            break;
        }
    }
    if(flag == 0)
        return;
    var content_left = document.getElementsByClassName("content-left")[0];
    var new_post = document.createElement("div");
    new_post.className = "post";
    new_post.innerHTML = `
                <div class="post-body">
                    <div class="post-article">
                        <div class="post-title">
                            <a class="hidden-link moveable-text" href="detail/module?post_id=${pinned_article.id}">${pinned_article.title}</a>
                        </div>
                        <div class="post-text">
                            <div>
                                ${pinned_article.content.substr(0,100).replace(/\n/g,"")} 
                                <a class="non-underline" href="detail/module?post_id=${pinned_article.id}">...阅读全文</a>
                            </div>
                        </div>
                        <div class="post-dot"></div>
                        <div class="post-foot">
                            <span class="smaller fade-text"><a class="non-underline" href="list/list?property=tag&name=${pinned_article.tag}">${pinned_article.tag}&nbsp;</a></span>
                            <span class="smaller fade-text"><a class="non-underline" href="detail/module?post_id=${pinned_article.id}">#&nbsp;</a></span>
                            <span class="smaller fade-text">by ${pinned_article.author}&nbsp;<a class="non-underline" href="list/list?property=year&name=${pinned_article.year}">${pinned_article.year}</a>-${pinned_article.time}</span>
                        </div>
                    </div>
                </div>
        `;
    var blank = document.createElement("div");//文章下方的空白
    blank.className = "post-blank"; 
    content_left.appendChild(new_post);
    content_left.appendChild(blank); 
}

function add_page_button(){ //添加页面按钮
    var page_num = Math.ceil(articles_num / 10); //总共有多少页，向上取整
    var content_left = document.querySelector(".content-left");
    var page_button_container = document.createElement("div");
    page_button_container.className = "page-button-container";
    //总共至多生成七个页面按钮。就按顺序而不是循环定义和添加了。
    //（水平太次）<🤣👉😭
    var leftmost = document.createElement("div");
    leftmost.className = "page-button";
    leftmost.onclick = ()=>{
        window.open("main?page=1","_self");
    };
    leftmost.innerHTML = `
    ❰❰
    <div class="buttontip">首页</div>
    `
    page_button_container.appendChild(leftmost);
    var previous = document.createElement("div");
    previous.className = "page-button";
    previous.onclick = ()=>{
        if(page == 1){
            window.open("main?page=1","_self");
        }
        else{
            window.open("main?page="+(page-1),"_self");
        }
    }
    previous.innerHTML = `
    ❰
    <div class="buttontip">上一页</div>
    `
    page_button_container.appendChild(previous);
    if(page!=1){
        var previouspage = document.createElement("div");
        previouspage.className = "page-button";
        previouspage.onclick = ()=>{
            window.open("main?page="+(parseInt(page)-1),"_self");
        };
        previouspage.innerHTML = `
        ${parseInt(page)-1}
        <div class="buttontip">第${parseInt(page)-1}页</div>
        `;
        page_button_container.appendChild(previouspage);
    }
    var current = document.createElement("div");
    current.className = "page-button";
    current.onclick = ()=>{
        window.open("main?page="+page,"_self");
    };
    current.innerHTML = `
    ${page}
    <div class="buttontip">第${page}页</div>
    `;
    page_button_container.appendChild(current);
    if(page!=page_num){
        var nextpage = document.createElement("div");
        nextpage.className = "page-button";
        nextpage.onclick = ()=>{
            window.open("main?page="+(parseInt(page)+1),"_self");
        };
        nextpage.innerHTML = `
        ${parseInt(page)+1}
        <div class="buttontip">第${parseInt(page)+1}页</div>
        `;
        page_button_container.appendChild(nextpage);
    }
    if(page < page_num - 1){
        var dot = document.createElement("div");
        dot.innerHTML = "...";
        page_button_container.appendChild(dot);
        var lastpage = document.createElement("div");
        lastpage.className = "page-button";
        lastpage.onclick = ()=>{
            window.open("main?page="+(page_num),"_self");
        };
        lastpage.innerHTML = `
        ${page_num}
        <div class="buttontip">第${page_num}页</div>
        `;
        page_button_container.appendChild(lastpage);
    }
    var next = document.createElement("div");
    next.className = "page-button";
    next.onclick = ()=>{
        if(page == page_num){
            window.open("main?page="+(page_num),"_self");
        }
        else{
            window.open("main?page="+(parseInt(page)+1),"_self");
        }
    }
    next.innerHTML = `
    ❱
    <div class="buttontip">下一页</div>
    `
    page_button_container.appendChild(next);
    var rightmost = document.createElement("div");
    rightmost.className = "page-button";
    rightmost.onclick = ()=>{
        window.open("main?page="+page_num,"_self");
    };
    rightmost.innerHTML = `
    ❱❱
    <div class="buttontip">末页</div>
    `
    page_button_container.appendChild(rightmost);
    content_left.appendChild(page_button_container);
}
