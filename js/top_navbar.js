const style_switch_paths = [ //保存太阳和猫头鹰两种svg样式
        {
            path_d: [
                "M501.48 493.55m-233.03 0a233.03 233.03 0 1 0 466.06 0 233.03 233.03 0 1 0-466.06 0Z",
                "M501.52 185.35H478.9c-8.28 0-15-6.72-15-15V87.59c0-8.28 6.72-15 15-15h22.62c8.28 0 15 6.72 15 15v82.76c0 8.28-6.72 15-15 15zM281.37 262.76l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.86-5.86-15.36 0-21.21l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.35 0 21.21zM185.76 478.48v22.62c0 8.28-6.72 15-15 15H88c-8.28 0-15-6.72-15-15v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15zM270.69 698.63l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.36 5.86-21.21 0l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.85-5.86 15.35-5.86 21.21 0zM486.41 794.24h22.62c8.28 0 15 6.72 15 15V892c0 8.28-6.72 15-15 15h-22.62c-8.28 0-15-6.72-15-15v-82.76c0-8.28 6.72-15 15-15zM706.56 709.31l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.36 0 21.21l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.85-5.86-15.35 0-21.21zM802.17 493.59v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15v22.62c0 8.28-6.72 15-15 15h-82.76c-8.28 0-15-6.72-15-15zM717.24 273.44l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.86-5.86 15.36-5.86 21.21 0l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.35 5.86-21.21 0z"
            ],
            path_fill: [
                "#F9C626",
                "#F9C626"
            ]
        },
        {
            path_d: [
                "M752.6144 536.064c0-130.0608-72.1408-192.4736-72.1792-192.4864H343.5648c-0.0512 0.0256-72.1792 62.4384-72.1792 192.4864 0 171.4432 144.3712 187.2256 144.3712 240.6144 0 60.16-72.1792 62.4128-72.1792 120.3072 0 0 60.16-24.064 96.2432-24.064 23.3088 0 25.5616 24.064 72.1792 24.064s48.8704-24.064 72.1792-24.064c36.096 0 96.2432 24.064 96.2432 24.064 0-57.8944-72.1792-60.16-72.1792-120.3072 0-53.3888 144.3712-69.184 144.3712-240.6144z",
                "M848.8576 680.4352H175.1424c-26.5728 0-48.128 21.5168-48.128 48.128 0 26.5728 21.5424 48.128 48.128 48.128h673.728c26.5728 0 48.128-21.5424 48.128-48.128-0.0128-26.6112-21.5552-48.128-48.1408-48.128z",
                "M463.872 656.3712c-13.2992 0-24.064 10.7648-24.064 24.064 0-13.2992-10.7904-24.064-24.064-24.064-13.2992 0-24.064 10.7648-24.064 24.064v48.128c0 13.2736 10.7648 24.064 24.064 24.064 13.2736 0 24.064-10.7904 24.064-24.064 0 13.2736 10.7648 24.064 24.064 24.064s24.064-10.7904 24.064-24.064v-48.128c0-13.2992-10.7648-24.064-24.064-24.064z m144.3712 0c-13.2992 0-24.064 10.7648-24.064 24.064 0-13.2992-10.7904-24.064-24.064-24.064-13.2992 0-24.064 10.7648-24.064 24.064v48.128c0 13.2736 10.7648 24.064 24.064 24.064 13.2736 0 24.064-10.7904 24.064-24.064 0 13.2736 10.7648 24.064 24.064 24.064s24.064-10.7904 24.064-24.064v-48.128c0-13.2992-10.7648-24.064-24.064-24.064z",
                "M694.1568 227.5456c5.4016-31.6288 10.3296-69.12 10.3296-100.5312-27.0848 0-61.824 44.4672-81.28 72.9472-4.9152-0.512-9.9072-0.768-14.9632-0.768-36.9792 0-70.7072 13.9008-96.2432 36.7744-25.5488-22.8608-59.264-36.7744-96.2432-36.7744-5.056 0-10.048 0.256-14.9632 0.768-19.4688-28.48-54.1952-72.9472-81.2928-72.9472 0 31.3984 4.928 68.8896 10.3296 100.5184-35.4688 26.304-58.4576 68.4672-58.4576 116.032 0 79.7312 64.64 144.3712 144.3712 144.3712 36.9792 0 70.7072-13.9136 96.2432-36.7744 25.5488 22.8608 59.264 36.7744 96.2432 36.7744 79.7312 0 144.3712-64.64 144.3712-144.3712 0.0128-47.552-22.976-89.728-58.4448-116.0192z",
                "M608.2432 247.3216c-53.1456 0-96.2432 43.0976-96.2432 96.2432 0-53.1584-43.0976-96.2432-96.2432-96.2432s-96.2432 43.0976-96.2432 96.2432c0 53.1456 43.0976 96.2432 96.2432 96.2432 23.2448 0 44.5696-8.2432 61.1968-21.9648L512 487.936l35.0464-70.0928c16.64 13.7216 37.952 21.9648 61.1968 21.9648 53.1456 0 96.2432-43.0976 96.2432-96.2432 0-53.1456-43.0848-96.2432-96.2432-96.2432z",
                "M415.7568 295.4496c-26.5728 0-48.128 21.5424-48.128 48.128s21.5424 48.128 48.128 48.128c26.5728 0 48.128-21.5424 48.128-48.128s-21.5552-48.128-48.128-48.128z m192.4864 0c-26.5728 0-48.128 21.5424-48.128 48.128s21.5424 48.128 48.128 48.128c26.5728 0 48.128-21.5424 48.128-48.128s-21.5552-48.128-48.128-48.128z"
            ],
            path_fill: [
                "#735538",
                "#4D4D4D",
                "#BF8D5E",
                "#A67A51",
                "#E6E6E6",
                "#4D4D4D"
            ]
        }
]
const css_mode= //夜间模式样式
    ".navbar{\
        background-color:dimgray;\
        color:white\
    }\
    .list{\
        background-color:dimgray;\
        color:white\
    }\
    .navigator{\
        background-color:dimgray;\
        color:white\
    }\
    .post{\
        background-color:dimgray;\
        color:white\
    }\
    ";
var current_path_index = 0; //svg图像索引
var current_style_index = 0; //白天、夜间模式索引
var url = window.location.hostname;
document.addEventListener("DOMContentLoaded", function () { // 页面加载完毕
    read_svg_from_cookie();
    read_css_from_cookie();
    var button_style_switch = document.getElementById("button-style-switch");
    var button_github = document.getElementById("button-github");
    var button_mainpage = document.getElementById("button-mainpage");
    var button_new_article = document.getElementById("button-new-article");
    var button_backstage = document.getElementById("button-backstage");
    if(button_style_switch){
        button_style_switch.addEventListener("click", function () {
            //替换svg图像
            current_path_index = (current_path_index + 1) % style_switch_paths.length;
            current_style_index = (current_style_index + 1) % 2;
            console.log(current_style_index);
            var svg = button_style_switch.getElementsByTagName("svg")[0]; //第一个svg元素
            switch_svg(style_switch_paths,current_path_index,svg);
            //替换css样式
            switch_css(current_style_index);
            var svgState = { //将svg图像状态保存到cookie中
                currentPathIndex: current_path_index,
            };
            var cssState = { //把css状态保存到cookie中
                currentStyleIndex: current_style_index
            }
            if(url == "www.hinanawits.com"){
                document.cookie = "svgState=" + JSON.stringify(svgState) + ";domain=.hinanawits.com;path=/";
                document.cookie = "cssState=" + JSON.stringify(cssState) + ";domain=.hinanawits.com;path=/";
            }
            else if(url == "loremmlel.github.io"){
                document.cookie = "svgState=" + JSON.stringify(svgState) + ";domain=loremmlel.github.io;path=/";
                document.cookie = "cssState=" + JSON.stringify(cssState) + ";domain=loremmlel.github.io;path=/";
            }
        });
    }
    if(button_github){
        button_github.addEventListener("click", function () {
            window.open("https://github.com/Loremmlel","_blank");
        });
    }else{
        console.error("button-github not found");
    }
    if(button_mainpage){
        button_mainpage.addEventListener("click", function () {
            if(url == "www.hinanawits.com"){
                window.open("http://www.hinanawits.com/html/main","_self");
            }
            else if(url == "loremmlel.github.io"){
                window.open("https://loremmlel.github.io/HDU-Web_Front_End-HinanawiTS/html/main","_self");
            }
        })
    }else{
        console.error("button-mainpage not found");
    }
});
function switch_svg(svg_path,svg_index,svg_element){ //切换svg图像
    svg_element.innerHTML = "";
    var new_path = svg_path[svg_index];
    for(let i=0;i<new_path.path_d.length;i++)
    {
        let path = document.createElementNS("http://www.w3.org/2000/svg","path"); //如果不加NS和网址的话，svg图像会无法加载……
        path.setAttribute("d", new_path.path_d[i]);
        path.setAttribute("fill", new_path.path_fill[i]);
        svg_element.appendChild(path);
    }
}

function switch_css(css_index){
    console.log("switch_css");
    console.log(css_index);
    console.log(typeof(css_index));
    if(css_index==0){
        console.log("remove");
        var style = document.head.querySelector("style");
        if(style){
            style.remove();
        }
        return;
    }
    else{
        console.log("change");
        var style_element = document.createElement("style");
        style_element.appendChild(document.createTextNode(css_mode))
        document.head.appendChild(style_element);
    }
}
function read_svg_from_cookie(){ //让刷新后不改变原有svg图像
    //(?:^|.*;\s*)这个子部分匹配字符串的开始或者一个分号后面可能跟着任意数量的空白符
    //svgState\s*\=\s*这部分匹配 "svgState" 后面跟着零到多个空白符，然后是 "="，再后面可能跟着零到多个空白符。
    //([^;]*)这部分使用括号捕获了一个组，匹配了零到多个非分号的字符。这个捕获的内容将表示 svgState 的值。
    //.*$这部分匹配了 svgState 后面可能跟着任意数量的字符，直到字符串的结尾。
    //|^.*$：或者匹配任意字符的开头和结尾。
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)svgState\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
        var svgState = JSON.parse(cookieValue);
        current_path_index  = svgState.currentPathIndex;
        var svg = document.getElementById("button-style-switch").getElementsByTagName("svg")[0];
        switch_svg(style_switch_paths,current_path_index,svg);
    }
}

function read_css_from_cookie(){
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)cssState\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(cookieValue);
    if(cookieValue){
        var cssState = JSON.parse(cookieValue);
        current_style_index = cssState.currentStyleIndex;
        switch_css(current_style_index);
        console.log("read_css_from_cookie");
    }
}