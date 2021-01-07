<?php

function get_data ($url) {

    $curl= curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);

    $data = curl_exec($curl);

    curl_close($curl);
    
     return $data;
};

function filter_data($str){
    //ФИЛЬТРЫ
    //преобразует символы
    $str = htmlspecialchars($str);
    //декодирует url
    $str = urldecode($str);
    //удаляет пробелы по краям
    $str = trim($str);

    return $str;
}
