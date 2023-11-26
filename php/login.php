<?php
$account = $_POST['username'];
$password = $_POST['password'];
$url = $_SERVER['HTTP_REFERER'];
if($account == 'HinanawiYuzu' && $password == 'Loremmlel.192212'){
    setcookie('login_state','1',0,'/',''); //设置一个cookie表示登录状态。在浏览器关闭以前都生效。
    header('Location: ../html/backstage');
}else{
    header('Location:'.$url);
}
?>