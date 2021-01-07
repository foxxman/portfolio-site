<?php
require './config.php';
require './functions.php';

//получение json-строки
$data = file_get_contents('php://input');
// file_put_contents('1.json', $data);//запись информации в файл 1.json
// echo $data;
//проверка на передачу
if (!isset($data) || empty($data)) die('Ничего не передано');

//преобразование в массив
$json = json_decode($data,true);

$message = "Новая заявка с сайта Портфолио:\n";

//проверка на пустую строку
if($json['name'] && $json['contact']){
    //составление сообщения
    $message .= $json['name'] .", ". $json['contact'];

    
    $my_data = [
        'message' => $message
    ];

    get_data(BASE_URL . TOKEN . "/send?" . http_build_query($my_data));

    $response = [
        'status' => 'ok',
        'message' => 'Спасибо! Скоро я с Вами свяжусь!'
    ]; 

} else{

    if(!$json['name']){
        $error_message = 'Пожалуйста, введите Ваше имя';
    } else if(!$json['contact']){
        $error_message = 'Пожалуйста, введите информацию для связи';
    } else{
        $error_message = 'Что-то пошло не так';
    }

    $response=[
        'status' => 'error',
        'message' => $error_message
    ];
}

//отправляем заголовок, должен отправляться первым
header("Content-Type: application/json; charset-utf-8");
echo json_encode($response);