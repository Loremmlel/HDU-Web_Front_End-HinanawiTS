document.addEventListener("DOMContentLoaded",function(){
    SetDay();//选中月份，设定日期是31/30/29/28
    SetTag();//设定tag的值
    UseDate();//设定是否要用当前时间
    Submit(); //提交事件
})
function SetDay(){
    var year_selector = document.querySelector("#year");
    var month_selector = document.querySelector("#month");
    setday();//防止网页刷新或初次加载后日期下拉框为空
    month_selector.addEventListener("change",function(){
        setday();
    })
    year_selector.addEventListener("change",function(){
        setday();
    })
}
function setday(){ //设定日期辅助函数
    var year_selector = document.querySelector("#year");
    var month_selector = document.querySelector("#month");
    var day_selector = document.querySelector("#day");
    day_selector.innerHTML = "";
    for(var i=1;i<32;i++){
        if(month_selector.value == 2 && year_selector.value%4 !=0 && i==29) //非闰年2月没有29日
            break;
        if(month_selector.value == 2 && year_selector.value%4 ==0 && i==30) //闰年2月有29日，但没有30日
            break;
        if(["04","06","09","11"].includes(month_selector.value) && i==31)
            break;
        var day = document.createElement("option");
        day.value = i;
        day.innerHTML = i;
        day_selector.appendChild(day);
    }
}

function SetTag(){
    var tag_xhr = new XMLHttpRequest();
    tag_xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var tags = JSON.parse(this.responseText).tag_标签;
            var tag_selector = document.querySelector("#tag-select");
            for(var index in tags){
                var tag_option = document.createElement("option");
                tag_option.value = tags[index];
                tag_option.innerHTML = tags[index];
                tag_selector.appendChild(tag_option);
            }
            var tag_option_diy = document.createElement("option");
            tag_option_diy.value = "自定义";
            tag_option_diy.innerHTML = "自定义";
            tag_selector.appendChild(tag_option_diy);
            tag_selector.addEventListener("change",function(){ //如果是自定义，则新生成一个输入框
                if(this.value == "自定义"){
                    var article_tag = document.querySelector("#article-tag");
                    var diy_input = document.createElement("div");
                    diy_input.id = "article-tag-diy"
                    diy_input.innerHTML = `
                    <form id="diy">
                        <input type="text" autocomplete="on" placeholder="请输入标签名">
                    </form>
                    `
                    article_tag.appendChild(diy_input);
                }else{//如果不是，则删除输入框
                    var diy_input = document.querySelector("#article-tag-diy");
                    if(diy_input){
                        diy_input.remove();
                    }
                }
            })
        }
    }
    tag_xhr.open("GET","../json/navigator_intel.json",true);
    tag_xhr.setRequestHeader("Content-Type","application/json");
    tag_xhr.send();
}

function UseDate(){
    var date = document.querySelector("#date");
    date.addEventListener("change",function(){
        if(this.checked){
            document.querySelector("#year").disabled = true;
            document.querySelector("#month").disabled = true;
            document.querySelector("#day").disabled = true;
        }else{
            document.querySelector("#year").disabled = false;
            document.querySelector("#month").disabled = false;
            document.querySelector("#day").disabled = false;
        }
    })
}

function Submit(){
    var button = document.querySelector("#submit")
    button.addEventListener("click",function(){
        var formData = 
        {
            "title":document.querySelector("#title").querySelector("input").value,
            "content":document.querySelector("#text").querySelector("textarea").value,
            "author":document.querySelector("#author").querySelector("input").value,
            "tag":"",
            "year":"",
            "time":"",
            "img_url":"",
            "pinned":false,
            "answer":document.querySelector("#question").querySelector("input").value
        };
        (()=>{ //设定tag
            if(document.querySelector("#tag").querySelector("select").value == "自定义"){
                formData.tag = document.querySelector("#diy").querySelector("input").value;
            }else{
                formData.tag = document.querySelector("#tag").querySelector("select").value;
            }
        })();//立即执行匿名函数
        (()=>{ //设定日期
            if(document.querySelector("#date").checked){
                var myDate = new Date();
                formData.year = myDate.getFullYear();
                formData.time = myDate.getMonth() + 1 + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
            }else
            {
                formData.year = document.querySelector("#year").value;
                formData.time = document.querySelector("#month").value + "-" + document.querySelector("#day").value + " " + "00:00:00";
            }
        })();
        var flag = 0;
        Object.keys(formData).forEach(keys=>{ //客户端校验
            if(formData[keys] == "" && keys!="img_url" && keys!="pinned" && flag === 0){
                console.log(keys);
                flag = 1;
                alert("请填写完整信息");
                formData = {};
            }
        })
        if(Object.keys(formData).length == 0){ //这才能判断对象是否为空。而不是object=={}
            return; //在上面的foreach里return只会跳出foreach
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST","../php/new_article.php",true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    alert("文章发布成功");
                    console.log(this.responseText);
                }else{
                    alert("文章发布失败");
                }
            }
        };
        xhr.send(JSON.stringify(formData));
    })
}