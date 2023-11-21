var audio_lang_flag = 0; //0是中文，1是母语
var character = 'kita';
document.addEventListener("DOMContentLoaded",function(){ //负责加载文章和评论
    var search = window.location.search;
    var article_id = search.match(/\?post_id=(\d+)/)[1]; //截取文章id
    upload_from_json("../../json/articles/articles.json","../../json/comments/comments.json",article_id);
})

function upload_from_json(article_path,comment_path,id){
    var article_xhr = new XMLHttpRequest();
    article_xhr.onreadystatechange = function(){
        if(article_xhr.readyState == 4 && article_xhr.status == 200){
            var articles = JSON.parse(article_xhr.responseText);  //articles是一个对象，内有一个也叫articles的数组
            var article = match(articles.articles,id); //匹配id相符合的记录
            post_article(article);
            if(article.tag_eng == 'lovemaster'){
                var button = document.querySelector('.button-check');
                button.addEventListener("click",function(){
                    audio_lang_flag = 1 - audio_lang_flag;
                    change_lang(audio_lang_flag,id,character);
                })
                var selector = document.querySelector('.audio-selector');
                selector.addEventListener("change",function(){
                    character = this.value;
                    change_lang(audio_lang_flag,id,character);
                })
            }
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
                            <a class="hidden-link" href="module?post_id=${article.id}">${article.title}</a>
                        </div>
                        <div class="post-text">
                            <div>
                                ${article.content.replace(/\n/g,"<br>")} 
                            </div>
                            <img class="image" src=${article.img_url}>
                        </div>
                        <div class="post-dot"></div>
                        </div>
                        <div class="post-dot"></div>
                        <div class="post-foot">
                            <span class="smaller fade-text"><a class="non-underline" href="../list/list?property=tag&name=${article.tag_eng}">${article.tag_chs}&nbsp;</a></span>
                            <span class="smaller fade-text"><a class="non-underline" href="module?post_id=${article.id}">#&nbsp;</a></span>
                            <span class="smaller fade-text">by ${article.author}&nbsp;<a class="non-underline" href="../list/list?property=year&name=${article.year}">${article.year}</a>-${article.time}</span>
                        </div>
                    </div>
                    <div class="post-hyperlink" style="display: flex;justify-content: space-between;width: 100%;">
                            <a class="non-underline" href="module?post_id=${article.id-1}">上一篇<<< </a>
                            <a class="non-underline" href="module?post_id=${parseInt(article.id)+1}"> >>>下一篇 </a>
                    </div>
                </div>
        `;
        var blank = document.createElement("div");//文章下方的空白
        blank.className = "post-blank"; 
        if(article.tag_eng == 'lovemaster'){ //年彬文章特供语音
            new_post.innerHTML =  `
            <div class="post-body">
                <div class="post-article">
                    <div class="post-title">
                        <a class="hidden-link" href="module?post_id=${article.id}">${article.title}</a>
                    </div>
                    <div class="post-text">
                        <div>
                            ${article.content.replace(/\n/g,"<br>")} 
                        </div>
                        <img class="image" src=${article.img_url}>
                    </div>
                    <div class="post-audio">
                        <img class="portrait" src="../../img/kita.gif" style="width:7%;height:7%;">
                        <audio src="../../audio/${article.id}_kita_chs.mp3" controls></audio>
                        <input class="button-check" type="checkbox" name="" id="custom">
                        <label class="check-box" for="custom">
                            <span class="check-handler"></span>
                        </label>
                        <select class="audio-selector" title="朗读角色" style="transition:all 0.5s ease;margin-left:5%; border:2px solid #ccc;border-radius:5px;box-shadow:0 0 4px rgba(0,0,0,0.3);">
                            <option value="kita">喜多</option>
                            <option value="hitori">波奇</option>
                            <option value="mahiro">绪山真寻</option>
                            <option value="nijika">虹夏</option>
                            <option value="megumin">惠惠</option>
                            <option value="voiceover">旁白</option>
                            <option value="dingzhen">丁真</option>
                            <option value="kobe">牢大</option>
                            <option value="mikado">孙笑川</option>
                        </select>
                    </div>
                    <div class="post-dot"></div>
                    </div>
                    <div class="post-dot"></div>
                    <div class="post-foot">
                        <span class="smaller fade-text"><a class="non-underline" href="../list/list?property=tag&name=${article.tag_eng}">${article.tag_chs}&nbsp;</a></span>
                        <span class="smaller fade-text"><a class="non-underline" href="module?post_id=${article.id}">#&nbsp;</a></span>
                        <span class="smaller fade-text">by ${article.author}&nbsp;<a class="non-underline" href="../list/list?property=year&name=${article.year}">${article.year}</a>-${article.time}</span>
                    </div>
                </div>
                <div class="post-hyperlink" style="display: flex;justify-content: space-between;width: 100%;">
                        <a class="non-underline" href="module?post_id=${article.id-1}">上一篇<<< </a>
                        <a class="non-underline" href="module?post_id=${parseInt(article.id)+1}"> >>>下一篇 </a>
                </div>
            </div>
            `;
        }
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

function change_lang(flag,id,character){ //改变语音的人物、语言
    var audio = document.querySelector("audio");
    var portrait = document.querySelector('.portrait');
    if(flag == 0){
        audio.src = `../../audio/${id}_${character}_chs.mp3`;
    }else if(flag == 1){
        audio.src = `../../audio/${id}_${character}_mot.mp3`;
    }
    if(character == 'kita'){
        portrait.src = '../../img/kita.gif';
        portrait.title = '得意之作';
    }else if(character == 'hitori'){
        portrait.src = '../../img/hitori.gif';
        portrait.title = '震撼.jpg';
    }else if(character =='mahiro'){
        portrait.src = '../../img/mahiro.png';
        portrait.title = '楼上没jj';
    }else if(character == 'nijika'){
        portrait.src = '../../img/nijika.gif';
        portrait.title = 'BYD这呆毛抠图真难受';
    }else if(character =='megumin'){
        portrait.src = '../../img/megumin.gif';
        portrait.title = '感谢萌娘百科，感谢F12';
    }else if(character == 'voiceover'){
        portrait.src = '../../img/voiceover.png';
        portrait.title = '战地1的';
        portrait.alt = '旁白要什么图片？';
    }else if(character == 'dingzhen'){
        portrait.src = '../../img/dingzhen.png';
        portrait.title = '原皮丁真，鉴定为纯纯的弱智';
    }else if(character == 'kobe'){
        portrait.src = '../../img/kobe.png';
        portrait.title = 'It\'s been a long day without you my friend.And I\'ll tell you all about when I see you again.';
    }else if(character =='mikado'){
        portrait.src = '../../img/mikado.png';
        portrait.title = '不搞gif了，抠图太累了';
    }
}