document.addEventListener("DOMContentLoaded",function(){ //负责加载文章和评论
    var pathname = window.location.pathname;
    var article_id = pathname.match(/\/(\d+)$/)[1]; //截取文章id
    upload_from_json("../../json/articles/articles.json","../../json/comments/comments.json",article_id);
})

function upload_from_json(article_path,comment_path,id){
    var article_xhr = new XMLHttpRequest();
    article_xhr.onreadystatechange = function(){
        if(article_xhr.readyState == 4 && article_xhr.status == 200){
            var articles = JSON.parse(article_xhr.responseText);  //articles是一个对象，内有一个也叫articles的数组
            var article = match(articles.articles,id); //匹配id相符合的记录
            post_article(article);
        }
    }
    article_xhr.open("GET",article_path,true);
    article_xhr.setRequestHeader("Content-Type","application/json");
    article_xhr.send();

    var comment_xhr = new XMLHttpRequest();
    comment_xhr.onreadystatechange = function(){
        if(comment_xhr.readyState == 4 && comment_xhr.status == 200){
            var comments = JSON.parse(comment_xhr.responseText);
            var this_comments = select(comments.comments,id); //挑选符合文章id的评论
            console.log(this_comments);
            post_comments(this_comments);
        }
    }
    comment_xhr.open("GET",comment_path,true);
    comment_xhr.setRequestHeader("Content-Type","application/json");
    comment_xhr.send();
}
function match(articles,id){ //匹配id相符的文章
    for(let i =0;i<articles.length;i++){
        if(articles[i].id == id){
            return articles[i];
        }
    }
}
function post_article(article){ //将文章信息写入页面
    var content_left = document.getElementsByClassName("content-left")[0];
    var new_post = document.createElement("div");
    new_post.className = "post";
    new_post.innerHTML = `
                <div class="post-body">
                    <div class="post-article">
                        <div class="post-title">
                            <a class="hidden-link" href="${article.id}">${article.title}</a>
                        </div>
                        <div class="post-text">
                            <div>
                                ${article.content.replace(/\n/g,"<br>")} 
                            </div>
                            <img class="image" src=${article.img_url}>
                        </div>
                        <div class="post-dot"></div>
                        <div class="post-foot">
                            <span class="smaller fade-text"><a class="non-underline" href="../list/tag/tag_${article.tag_eng}">${article.tag_chs}&nbsp;</a></span>
                            <span class="smaller fade-text"><a class="non-underline" href="${article.id}">#&nbsp;</a></span>
                            <span class="smaller fade-text">by ${article.author}&nbsp;<a class="non-underline" href="../list/year/${article.year}">${article.year}</a>-${article.time}</span>
                        </div>
                    </div>
                </div>
        `;
        var blank = document.createElement("div");//文章下方的空白
        blank.className = "post-blank"; 
        content_left.appendChild(new_post);
        content_left.appendChild(blank);
        var head = document.getElementsByTagName("head")[0]; 
        var title = document.createElement("title");
        title.innerHTML = article.title;
        head.appendChild(title);
}

function select(comments,id){ //挑选符合文章id的评论
    var this_comments = [];
    for(let i = 0;i<comments.length;i++){
        if(comments[i].article_id == id){
            this_comments.push(comments[i]);
        }
    }
    return this_comments;
}
function post_comments(comments){
    var comment_list = document.getElementsByClassName("comment-list")[0];
    for(let i=comments.length-1;i>=0;i--) //最新的评论放在最上面
    {
        var comment_content = comments[i].content.replace(/\n/g,"<br>");
        var new_comment = document.createElement("div");
        new_comment.className = "one-comment";
        new_comment.innerHTML = `
        <div class="comment-intel">
            <span class="small fade-text">${comments[i].user_name}(${comments[i].time})</span>
        </div>
        <div class="comment-content">
            <span class="smaller">${comment_content}</span>
        </div>
        `
        comment_list.appendChild(new_comment);
    }
}