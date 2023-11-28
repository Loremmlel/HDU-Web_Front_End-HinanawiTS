<?php
$new_article = $_POST;
$images = $_FILES;
$targetDir = '../img/new/'; //图片保存路径
foreach($images as $key => $value){ //检查文件类型。
    if(strpos($value['type'],'image/') != 0){
        http_response_code(403);
        exit;
    }
}
$json_data = file_get_contents('../json/articles/articles.json');
$articles = json_decode($json_data,true);
foreach($new_article as $key => $value){ //服务端校验
    if(trim($value) == '' && $key!= 'img_url' && $key!= 'pinned'){
        http_response_code(403);
        exit;
    }
}
if($new_article['answer'] != 'Def233'){
    http_response_code(403);
    exit;
}
$id = end($articles['articles'])['id']+1;
$article = array(
    'id' => strval($id),
    'title' => $new_article['title'],
    'content' => $new_article['content'],
    'author' => $new_article['author'],
    'tag' => $new_article['tag'],
    'year' => $new_article['year'],
    'time' => $new_article['time'],
);
if($new_article['pinned'] == 'false'){
    $article['pinned'] = false;
}else{
    $article['pinned'] = true;
}
$i = 0;
foreach($images as $key => $value){ //把图片保存到本地并重命名
    $file_name = $id.'-'.$value['name'];
    $tmp_path = $value['tmp_name'];
    $target_path = $targetDir.$file_name;
    if(move_uploaded_file($tmp_path,$target_path)){
        $article['img'.$i] = $target_path;
    }else{
        http_response_code(400);
        exit;
    }
    $i++;
}
$articles['articles'][] = $article;
$new_json = json_encode($articles,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
file_put_contents('../json/articles/articles.json',$new_json);
$navigator_intel = json_decode(file_get_contents('../json/navigator_intel.json'),true);
$tag_flag = 0;
$author_flag = 0;
foreach($navigator_intel as $key => $value){ //检查有没有新增作者、标签。
    for($i = 0;$i<count($value);$i++){
        if($value[$i] == $new_article['tag'] && $key == 'tag_标签'){
            $tag_flag = 1;
        }
        if($value[$i] == $new_article['author'] && $key == 'author_作者'){
            $author_flag = 1;
        }
    }
}
if($tag_flag == 0){
    $navigator_intel['tag_标签'][] = $new_article['tag'];
}
if($author_flag == 0){
    $navigator_intel['author_作者'][] = $new_article['author'];
}
file_put_contents("../json/navigator_intel.json",json_encode($navigator_intel,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
http_response_code(200);
?>