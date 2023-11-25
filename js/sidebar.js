//负责侧边导航栏的生成
var property = window.location.pathname.match(/\/([^/]+)$/)[1]; //是main还是module还是list
document.addEventListener("DOMContentLoaded", function() {
    var path;
    if(property=="main"){
        path = "../json/navigator_intel.json";
    }else if(property=="module" || property == "list"){
        path = "../../json/navigator_intel.json";
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var intel = JSON.parse(xhr.responseText);
            post_navigator(intel);//模板化生成右侧导航栏
        }
    }
    xhr.open("GET",path,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
});
function post_navigator(intel){
    var prefix_url;
    var prefix_img;
    switch(property){
        case "main":
            prefix_url = "list/";
            prefix_img = "../"
            break;
        case "module":
            prefix_url = "../list/";
            prefix_img = "../../";
            break;
        case "list":
            prefix_url = "";
            prefix_img = "../../";
            break;
    } //url前缀，使跳转和资源引用正确
    var navigator = document.querySelector(".navigator");
    Object.keys(intel).forEach(key =>{//双重foreach遍历对象。
        var i=0;
        //创建html结构
        var eng = key.split("_")[0];
        var chs = key.split("_")[1];
        var one_bar = document.createElement("div");
        one_bar.className = `menu-${eng}`;
        var one_bar_main = document.createElement("div");
        one_bar_main.className = `${eng}-main`;
        one_bar_main.innerHTML = `
        <svg class="icon-${eng}-big" viewBox="0 0 1024 1024" width="30%" height="50%">
            <image xlink:href="${prefix_img}img/svg/${eng}_big.svg"></image>
        </svg>
        <h3 style="margin: 0;">${chs}</h3>`
        one_bar.appendChild(one_bar_main);
        one_bar.appendChild(document.createElement("hr"));
        var one_bar_list = document.createElement("ul");
        one_bar_list.className = `${eng}`;
        intel[key].forEach(item =>{
            var li = document.createElement("li");
            li.className = "moveable-text";
            if(i == 0){
                li.innerHTML = `
                <svg  class="icon-${eng}-small" viewBox="0 0 1024 1024" width="30%" height="50%">
                    <use xlink:href="#icon-${eng}-small"></use>
                    <symbol id="icon-${eng}-small">
                        <image xlink:href="${prefix_img}img/svg/${eng}_small.svg"></image>
                    </symbol>
                </svg>
                <span class="smaller"><a class="hidden-link" href="${prefix_url}list?property=${eng}&name=${item.eng}">${item.chs}</a></span>
                `
            }else{
                li.innerHTML = `
                <svg  class="icon-${eng}-small" viewBox="0 0 1024 1024" width="30%" height="50%">
                    <use xlink:href="#icon-${eng}-small"></use>
                </svg>
                <span class="smaller"><a class="hidden-link" href="${prefix_url}list?property=${eng}&name=${item.eng}">${item.chs}</a></span>
                `
            }
            one_bar_list.appendChild(li);
            i++;
        })
        one_bar.appendChild(one_bar_list);
        navigator.appendChild(one_bar);
    })
}