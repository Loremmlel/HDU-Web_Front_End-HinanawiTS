<?php
$login_state = $_COOKIE['login_state'];
if($login_state != '1'){ //服务端检查登录状态。不过登录状态是存在本地cookie里的所以还是有一定风险……
    http_response_code(403);
    exit;
}
$action = $_POST['action'];
if($action == 'delete_article'){
    $id = $_POST['id'];
    $articles = json_decode(file_get_contents('../json/articles/articles.json'),true);
    $index = 0;
    for($i=0;$i<count($articles['articles']);$i++){
        if($articles['articles'][$i]['id'] == $id){
            $index = $i;
            break;
        }
    }
    if($index !=0){
        foreach($articles['articles'][$index] as $key => $value){
            if(strpos($key,'img') == 0){ //删除图片
                unlink($value);
            }
        }
        unset($articles['articles'][$index]);
        $new_json = json_encode($articles,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
        file_put_contents('../json/articles/articles.json',$new_json);
        http_response_code(200);
        exit;
    }else{
        http_response_code(404);
        exit;
    }
}else if($action == 'delete_comment'){
    $id = $_POST['id'];
    $comments = json_decode(file_get_contents('../json/comments/comments.json'),true);
    $index = 0;
    for($i=0;$i<count($comments['comments']);$i++){
        if($comments['comments'][$i]['id'] == $id){
            $index = $i;
            break;
        }
    }
    if($index!=0){
        unset($comments['comments'][$index]);
        $new_json = json_encode($comments,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
        file_put_contents('../json/comments/comments.json',$new_json);
        http_response_code(200);
        exit;
    }else{
        http_response_code(404);
        exit;
    }
}else if($action == 'delete_annotation'){
    $item = $_POST['item'];
    $annotation = json_decode(file_get_contents('../json/navigator_intel.json'),true);
    foreach($annotation as $key => $value){
        for($i=0;$i<count($value);$i++){
            if($value[$i] == $item){
                unset($annotation[$key][$i]);
                $new_json = json_encode($annotation,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
                file_put_contents('../json/navigator_intel.json',$new_json);
                http_response_code(200);
                exit;
            }
        }
    }
    http_response_code(404);
    exit;
}else if($action == 'modify_article'){
    $id = $_POST['id'];
    $new_article = json_decode($_POST['new_article'],true);
    $articles = json_decode(file_get_contents('../json/articles/articles.json'),true);
    $index = 0;
    for($i=0;$i<count($articles['articles']);$i++){
        if($articles['articles'][$i]['id'] == $id){
            $index = $i;
            break;
        }
    }
    if($index !=0){
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
        $navigator_intel = json_decode(file_get_contents('../json/navigator_intel.json'),true);
        $article = array(
            'id' => strval($id),
            'title' => $new_article['title'],
            'content' => $new_article['content'],
            'author' => $new_article['author'],
            'tag' => $new_article['tag'],
            'year' => $new_article['year'],
            'time' => $new_article['time'],
            'pinned' => $new_article['pinned']
        );
        $articles['articles'][$index] = $article;
        $new_json = json_encode($articles,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
        file_put_contents('../json/articles/articles.json',$new_json);
        http_response_code(200);
        exit;
    }else{
        http_response_code(404);
        exit;
    }
}else if($action == 'modify_annotation'){
    $item = $_POST['item'];
    $new = $_POST['content'];
    $annotation = json_decode(file_get_contents('../json/navigator_intel.json'),true);
    foreach($annotation as $key => $value){
        for($i=0;$i<count($value);$i++){
            if($value[$i] == $item){
                $annotation[$key][$i] = $new;
                $new_json = json_encode($annotation,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
                file_put_contents('../json/navigator_intel.json',$new_json);
                http_response_code(200);
                exit;
            }
        }
    }
    http_response_code(404);
    exit;
}else{
    http_response_code(404);
    exit;
}
?>