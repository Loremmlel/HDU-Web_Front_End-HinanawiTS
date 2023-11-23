document.addEventListener('DOMContentLoaded', function() {
    var search = window.location.search;
    var matched = search.match(/\?property=(.*)&name=(.*)/);//matched[1]表示是tag还是year，[2]表示具体的
    console.log(matched);
    var head = document.querySelector("head");
    var title = document.createElement("title");
    if(matched[1]=="tag"){
        title.innerHTML += "标签";
        switch(matched[2]){
            case "starsector":
                title.innerHTML += "-远行星号";
                break;
            case "lovemaster":
                title.innerHTML += "-年彬文章";
                break;
            case "image_video":
                title.innerHTML += "-图图";
                break;
            case "casualessay":
                title.innerHTML += "-随笔";
        }
    }else if(matched[1]=="year"){
        title.innerHTML += "时间" + "-" + matched[2];
    }
    head.appendChild(title);
    upload_list_from_json("../../json/articles/articles.json",matched);
});
function upload_list_from_json(path,property){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var articles = JSON.parse(xhr.responseText);
            var this_articles = match_property(articles.articles,property);
            post_list(this_articles);
        }
    }
    xhr.open("GET",path,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
}
function match_property(articles,property){
    var matched_articles = [];
    if(property[1]=="tag"){
        for(var i=articles.length-1;i>=0;i--){ //最新的显示在最上面
            if(articles[i].tag_eng == property[2]){
                matched_articles.push(articles[i]);
            }
        }
    }else if(property[1]=="year"){
        for(var i=articles.length-1;i>=0;i--){ //最新的显示在最上面
            if(articles[i].year == property[2]){
                matched_articles.push(articles[i]);
            }
        }
    }
    return matched_articles;
}
function post_list(articles){
    var list_main = document.getElementsByClassName("list-main")[0];
    for(let i=0;i<articles.length;i++){
        var list_raw = document.createElement("div");
        list_raw.className = "list-raw";
        list_raw.innerHTML =`
        <span class="smaller bold-text moveable-text"><a class="non-underline" href="../detail/module?post_id=${articles[i].id}">${articles[i].title}</a></span><br>
        <span class="smaller fade-text">by ${articles[i].author} ${articles[i].year}-${articles[i].time}</span>
        `
        list_main.appendChild(list_raw);
    }
}
