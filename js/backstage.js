var choice = "article"; //要进行crud的是文章、评论还是文章信息？
//默认是文章。
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
    remove_eventListener(main_container);
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
                raw.querySelector('[id^="delete-"]').addEventListener("click",function(id){
                    return function(){
                        delete_article(id);
                    }
                }(articles[i].id)); 
                //我算是长见识了，原来不能直接用已定义的函数作为回调函数
                //通过创建一个立即执行的匿名函数，在闭包中将 articles[i].id 作为参数传递给回调函数。这样，每个回调函数都会保留对其相应 id 值的引用。
                raw.querySelector('[id^="modify-"]').addEventListener("click",function(id){
                    return function(){
                        modify_article(id)
                    }
                }(articles[i].id));
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
                raw.querySelector('[id^="delete-"]').addEventListener("click",function(id){
                    return function(){
                        delete_comment(id);
                    }
                }(comments[i].id)); 
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
                    raw.querySelector('[id^="delete-"]').addEventListener("click",function(item){
                        return function(){
                            delete_annotation(item);
                        }
                    }(item));
                    raw.querySelector('[id^="modify-"]').addEventListener("click",function(item){
                        return function(){
                            modify_annotation(item)
                        }
                    }(item));
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

function remove_eventListener(element){ //递归用cloneNode移除子元素的所有事件监听器
    element = element.cloneNode(true); //如果用replaceWith，那么element似乎还会指向原来的结点的引用，而不是新的克隆的。
    element.childNodes.forEach(child=>{
        if(child.nodeType === Node.ELEMENT_NODE){ //只对元素结点进行操作，不包括文本结点、注释结点等。
            remove_eventListener(child);
        }
    });
}

function delete_article(id){
    var d_a_xhr = new XMLHttpRequest();
    d_a_xhr.onreadystatechange = function(){
        if(d_a_xhr.readyState == 4 && d_a_xhr.status == 200){
            alert("删除成功");
            location.reload();
        }
        if(d_a_xhr.readyState == 4 && d_a_xhr.status == 403){
            alert("挺聪明的嘛，居然直接定位到backstage。\n你说得对，但是403 Forbidden");
            window.location.href = "../index.html";
        }else if(d_a_xhr.readyState == 4 &&d_a_xhr.status == 404){
            alert("404 Not Found");
            location.reload();
        }
    }
    d_a_xhr.open("POST","../php/backstage.php",true);
    d_a_xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    d_a_xhr.send(`action=delete_article&id=${id}`);
}

function modify_article(id){
    window.location.href = `new_article.html?id=${id}`;//用new_article.js来处理吧。
}

function delete_comment(id){
    var d_c_xhr = new XMLHttpRequest();
    d_c_xhr.onreadystatechange = function(){
        if(d_c_xhr.readyState == 4 && d_c_xhr.status == 200){
            alert("删除成功");
            location.reload();
        }
        if(d_c_xhr.readyState == 4 &&d_c_xhr.status == 405){
            alert("挺聪明的嘛，居然直接定位到backstage。\n你说得对，但是403 Forbidden");
            window.location.href = "../index.html";
        }else if(d_c_xhr.readyState == 4 &&d_c_xhr.status == 404){
            alert("404 Not Found");
            location.reload();
        }
    }
    d_c_xhr.open("POST","../php/backstage.php",true);
    d_c_xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    d_c_xhr.send(`action=delete_comment&id=${id}`);
}

function delete_annotation(item){
    var d_ao_xhr = new XMLHttpRequest();
    d_ao_xhr.onreadystatechange = function(){
        if(d_ao_xhr.readyState == 4 && d_ao_xhr.status == 200){
            alert("删除成功");
            location.reload();
        }
        if(d_ao_xhr.readyState == 4 &&d_ao_xhr.status == 405){
            alert("挺聪明的嘛，居然直接定位到backstage。\n你说得对，但是403 Forbidden");
            window.location.href = "../index.html";
        }else if(d_ao_xhr.readyState == 4 &&d_ao_xhr.status == 404){
            alert("404 Not Found");
            location.reload();
        }
    }
    d_ao_xhr.open("POST","../php/backstage.php",true);
    d_ao_xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    d_ao_xhr.send(`action=delete_annotation&item=${item}`);
}

function modify_annotation(item){
    var popup_window = document.getElementById("popup-window");
    popup_window.style.display = "flex";
    var confirm = document.querySelector("#confirm");
    var cancel = document.querySelector("#cancel");
    cancel.addEventListener("click",function(){
        popup_window.style.display = "none";
    });
    confirm.addEventListener("click",function(){
        var input = document.querySelector("#modify-form input").value;
        var m_ao_xhr = new XMLHttpRequest();
        m_ao_xhr.onreadystatechange = function(){
            if(m_ao_xhr.readyState == 4 && m_ao_xhr.status == 200){
                alert("修改成功");
                location.reload();
            }
            if(m_ao_xhr.readyState == 4 &&m_ao_xhr.status == 403){
                alert("403 Forbidden");
            }else if(m_ao_xhr.readyState == 4 &&m_ao_xhr.status == 404){
                alert("404 Not Found");
            }
        }
        m_ao_xhr.open("POST","../php/backstage.php",true);
        m_ao_xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        m_ao_xhr.send(`action=modify_annotation&item=${item}&content=${input}`);
    })
}