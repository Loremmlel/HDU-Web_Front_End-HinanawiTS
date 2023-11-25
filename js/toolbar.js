var toolbar_status = 0
document.addEventListener("DOMContentLoaded",function(){
    var toolbar = document.querySelector('.custom-toolbar');
    var toolbar_item_toggle_active = document.querySelector('.toolbar-item-toggle.active'); //-
    var item_toggle = document.querySelector('.toolbar-item-toggle:not(.active)'); // +
    var back_to_top = document.querySelector('.toolbar-item');
    toolbar_item_toggle_active.addEventListener("click",function(){
        toolbar_status = (toolbar_status + 1) % 2;
        change_status(toolbar,toolbar_status);
    })
    item_toggle.addEventListener("click",function(){ //右下角工具框的响应
        toolbar_status = (toolbar_status + 1) % 2;
        change_status(toolbar,toolbar_status);
    })
    back_to_top.addEventListener("click",function(){
        scroll_to_top();
    })
})

function change_status(toolbar,status){
    var items = document.querySelectorAll('.toolbar-item:not(.toolbar-item-toggle)');
    var item_toggle = document.querySelector('.toolbar-item-toggle:not(.active)');
    var item_toggle_active = document.querySelector('.toolbar-item-toggle.active');
    if(status == 0){
        toolbar.classList.add('extend');
        for(var i =0;i<items.length;i++){
            items[i].style = 'transform: translateY(-50px)';
        }
        item_toggle.style = 'display:none';
        item_toggle_active.style = 'display:block';
    }else if(status == 1){
        toolbar.classList.remove('extend');
        for(var i =0;i<items.length;i++){
            items[i].style = 'transform: translateY(90px)';
        }
        item_toggle.style = 'display:block';
        item_toggle_active.style = 'display:none';
    }
}
function scroll_to_top(){
  // 获取当前页面在Y轴上的滚动位置
  var currentPosition = window.scrollY;
  // 如果页面有滚动，则进行平滑滚动到顶部
  if (currentPosition > 0) {
    // 计算距离顶部的偏移量，最大为-100
    var scrollStep = Math.max(-currentPosition, -100);
    // 使用requestAnimationFrame创建平滑滚动效果
    window.requestAnimationFrame(function(){
      // 滚动到当前页面位置减去偏移量
      window.scrollTo(0, currentPosition + scrollStep);
      // 继续滚动到顶部，多次移动-100以实现平滑的动画效果。
      scroll_to_top();
    });
  }
}