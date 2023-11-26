var choice = "article"; //要进行crud的是文章、评论还是文章信息？
var data; //承接json数据
document.addEventListener("DOMContentLoaded",function(){
    post_to_be_crud(choice); //总之无论如何先显示文章的管理
    var switch_choice = document.querySelectorAll("[id^='choice-']")
    for(var i=0;i<switch_choice.length;i++){
        switch_choice[i].addEventListener("click",function(){
            choice = this.id.split("-")[1]; //根据点击更改choice
            post_to_be_crud(choice); 
        })
    }
})
function post_to_be_crud(choice){
    var main_container = document.querySelector("#main-container");
    main_container.innerHTML = "";
    switch(choice){
        case "article":
            read_from_json("../json/articles/articles.json");
            var articles = data.articles;
            for(var i=articles.length-1;i>=0;i--){
                var raw = document.createElement("div");
                raw.className = "raw";
                raw.innerHTML = `
                <span class="smaller description">${articles[i].title} by ${articles[i].author} ${articles[i].year}-${articles[i].time}</span>
                <span class="smaller bold-text crud"><span id="delete-${articles[i].id}">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="modify-${articles[i].id}">修改</span></span>
                <br>
                `
                main_container.appendChild(raw);
            }
            break;
        case "comment":
            read_from_json("../json/comments/comments.json");
            var comments = data.comments;
            for(var i=comments.length-1;i>=0;i--){
                var raw = document.createElement("div");
                raw.className = "raw";
                raw.innerHTML = `
                <span class="smaller description">${comments[i].user_name}-${(comments[i].content).substr(0,20)+"..."}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;${comments[i].time}</span>
                <span class="smaller bold-text crud"><span id="delete-${comments[i].id}">删除</span></span>
                <br>
                `
                main_container.appendChild(raw);
            }
            break;
        case "annotation":
            read_from_json("../json/navigator_intel.json");
            var annotation = data;
            Object.keys(annotation).forEach(key=>{
                var description = document.createElement("h4");
                description.innerHTML = key+":";
                main_container.appendChild(description);
                annotation[key].forEach(item=>{
                    var raw = document.createElement("div");
                    raw.className = "raw";
                    raw.innerHTML =`
                    <span class="smaller description">${item}</span>
                    <span class="smaller bold-text crud"><span id="delete-${item}">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="modify-${item}">修改</span></span>
                    `
                    main_container.appendChild(raw);
                })
            })
            break;
    }
}

function read_from_json(path){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            data = JSON.parse(xhr.responseText); //如果不用这个if包裹起来，会出现Unexpected end of JSON input。大概是没读完吧。
        }
    };
    xhr.open("GET",path,false);//什么年代了还在用传统JS😭
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
}