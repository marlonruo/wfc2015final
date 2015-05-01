<?php

$datos = $_GET['datos'];

$file = fopen("archivo.txt", "w");

fwrite($file, $datos . PHP_EOL);

fclose($file);

?>