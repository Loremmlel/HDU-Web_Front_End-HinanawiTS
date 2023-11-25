<?php
$POST = file_get_contents('php://input');
$new_article = json_decode($POST,true);
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
$id = end($articles['articles'])['id']+1;
$article = array(
    'id' => strval($id),
    'title' => $new_article['title'],
    'content' => $new_article['content'],
    'author' => $new_article['author'],
    'tag' => $new_article['tag'],
    'year' => $new_article['year'],
    'time' => $new_article['time'],
    'img_url' => $new_article['img_url'],
    'pinned' => $new_article['pinned']
);
$articles['articles'][] = $article;
$new_json = json_encode($articles,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
file_put_contents('../json/articles/articles.json',$new_json);
http_response_code(200);
?>