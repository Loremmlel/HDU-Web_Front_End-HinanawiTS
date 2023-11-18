<?php
$json_data = file_get_contents('../json/statistical_data.json');
$data = json_decode($json_data,true);
$data['page_views'] += 1;
$new_json = json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
file_put_contents('../json/statistical_data.json',$new_json)
?>