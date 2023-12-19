<?php
$account = $_POST['account'];
$password = $_POST['password'];
$admin = 'hinanawiTS';
$ad_password = 'Loremmlel.192212';
if($account == $admin && $password == $ad_password)
{
    header('Location: http://www.hinanawits.com/html/backstage.html');
    exit;
}
else
{
    echo '<script>alert("账户或密码错误");
    setTimeout(function(){window.open("../html/administrator_login.html","_self")},500)</script>';
}
?>