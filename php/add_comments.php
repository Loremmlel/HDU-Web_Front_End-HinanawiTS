<?php
$comment = $_POST;
$anonymity_flag = 0; //0不匿名，1匿名
$username_flag = 0; //0没有用户名，1有用户名
$content_flag = 0; //0无内容。1有内容
$url = $_SERVER['HTTP_REFERER'];
foreach($comment as $key => $value){ //检查是否勾选了匿名选项，是否输入了评论内容
    if($key == 'anonymity'){
        $anonymity_flag = 1;
        $username_flag = 1;
    }
    if($key == 'username'){
        if(trim($value)!=='' && $anonymity_flag == 0){
            $username_flag = 1;
        }
    }
    if($key == 'content'){
        if(trim($value)!==''){
            $content_flag = 1;
        }
    }
}
if($content_flag == 0 || $username_flag == 0){
    echo '评论或用户名不能为空！'; 
    echo('<script>setTimeout(function(){ window.location.href ='.'\''.$url.'\''.'; }, 3000)</script>');
    exit;
}
//接下来是把新评论添加到已有的json文件中
date_default_timezone_set('Asia/Shanghai');
$json_data = file_get_contents('../json/comments/comments.json');
$data = json_decode($json_data,true);
$id = count($data['comments']) + 1;
$article_id;
$user_name;
preg_match('/post_id=(\d+)/',$url,$article_id); //匹配文章id
$article_id = $article_id[1];
if($anonymity_flag == 1){
    $user_name = '匿名用户';
}else{
    $user_name = $comment['user_name'];
}
$content = $comment['content'];
$time = date('Y-m-d H:i:s');
$new_comment = array(
    'id' => $id,
    'article_id' => $article_id,
    'user_name' => $user_name,
    'content' => $content,
    'time' => $time
);
$data['comments'][] = $new_comment;
$new_json = json_encode($data,JSON_PRETTY_PRINT);
file_put_contents('../json/comments/comments.json',$new_json);
header('Location:'.$url);
?>