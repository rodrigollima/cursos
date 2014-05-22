<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');

require 'app/config/config.php';
require 'app/DB.php';

require 'vendor/autoload.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim(array(
    'debug' => false
));

$app->contentType("application/json");

$app->error(function (\Exception $e = null) use ($app) {
    echo '{"error":{"text":"'. $e->getMessage() .'"}}';
});

function formataJson($obj)
{
    echo json_encode($obj);
}

include("customers.php");
include("employee.php");

$app->run();