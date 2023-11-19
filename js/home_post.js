//实现主页的文章截取，以及拉到底部自动补充的功能。还有跳转到其他页面调用php的功能。
var post_id = 0;
var post_pinned_flag = 0;
document.addEventListener("DOMContentLoaded",function(){ //主页面加载后，添加8个缩减过的post
    console.log(document.referrer);
    upload_from_json("../json/articles/articles.json",8);

})
//判断整个文档滚动至底部
window.onscroll = ()=>{
    // 窗口高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 页面高度
    var documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条位置
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if ((windowHeight + scrollTop + 2) >= documentHeight) {
        upload_from_json("../json/articles/articles.json",8);
    }
  }
function upload_from_json(path,num){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var articles = JSON.parse(xhr.responseText);  //articles是一个对象，内有一个也叫articles的数组
            if(post_pinned_flag == 0){
                post_pinned(articles); //置顶文章
                post_pinned_flag = 1;
            }
            var splited_articles = split_articles(articles,num);
            post_cutted(splited_articles);
        }
    }
    xhr.open("GET",path,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
}
function split_articles(articles,num){
    var splited_articles = [];
    var count = 0;
    for(var i=articles.articles.length-1;i-post_id>=0 && i>=(articles.articles.length)-num;i--){//最新的文章在最上面，所以从后往前遍历
        if(articles.articles[i-post_id].pinned == false)
            splited_articles.push(articles.articles[i-post_id]);
        count++;
    }
    post_id += count;
    return splited_articles;
}
function post_cutted(articles){
    var content_left = document.getElementsByClassName("content-left")[0];
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
                            <span class="smaller fade-text"><a class="non-underline" href="list/list?property=tag&name=${articles[i].tag_eng}">${articles[i].tag_chs}&nbsp;</a></span>
                            <span class="smaller fade-text"><a class="non-underline" href="detail/module?post_id=${articles[i].id}">#&nbsp;</a></span>
                            <span class="smaller fade-text">by ${articles[i].author}&nbsp;<a class="non-underline" href="list/list?property=year&name=${articles[i].year}">${articles[i].year}</a>-${articles[i].time}</span>
                        </div>
                    </div>
                </div>
        `;
        let blank = document.createElement("div");//文章下方的空白
        blank.className = "post-blank"; 
        content_left.appendChild(new_post);
        content_left.appendChild(blank); 
    }
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
                            <span class="smaller fade-text"><a class="non-underline" href="list/list?property=tag&name=${pinned_article.tag_eng}">${pinned_article.tag_chs}&nbsp;</a></span>
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