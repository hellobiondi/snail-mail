<?php
header("Access-Control-Allow-Origin: *");

const FILENAME = "user.json";

$json_str = file_get_contents(FILENAME);

if ( isset($_GET['text']) ) {
    $nickname = $_GET['nickname'] ?? 'Unknown';
    $text = $_GET['text'];

    $messages = json_decode($json_str);
    $messages[] = [
        "who" => $nickname,
        "text" => $text
    ];

    // keep latest 20 messages only.
    while ( count($messages) > 10) {
        $messages = array_shift($messages);        
    }

    $json_str = json_encode($messages,JSON_PRETTY_PRINT);

    file_put_contents(FILENAME,$json_str);
}
echo $json_str;