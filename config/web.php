<?php

$params = require __DIR__ . '/params.php';
$db = yii\helpers\ArrayHelper::merge(
    require __DIR__ . '/db.php',
    require __DIR__ . '/db-local.php'
);

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
//        'request' => [
//            'parsers' => [
//                'application/json' => 'yii\web\JsonParser',
//            ],
//            'enableCookieValidation' => false,
//            'cookieValidationKey' => 'my_secret_key',
//
//        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
		'assetManager'=>[
			'basePath'=>'/tmp'		
		],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,

        'urlManager' => [
            'enablePrettyUrl' => true,
           // 'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                ['class' => 'yii\rest\UrlRule', 'controller' => 'post'],
            ],
        ],
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'enableCookieValidation' => false,
        ],


        'gearman' => [
            'class' => 'shakura\yii2\gearman\GearmanComponent',
            'servers' => [
                ['host' => '127.0.0.1', 'port' => 4730],
            ],
            'user' => 'root',
            'jobs' => [
                'grab_page' => [
                    'class' => app\components\jobs\GrabPage::class
                ],
                'grab_article' => [
                    'class' => app\components\jobs\GrabArticle::class
                ],
            ],

        ],
        'response' => [
            'format' => yii\web\Response::FORMAT_JSON,
            'charset' => 'UTF-8',
        ],
    ],
    'params' => $params,
    'controllerMap' => [
        'gearman' => [
            'class' => 'shakura\yii2\gearman\GearmanController',
            'gearmanComponent' => 'gearman'
        ]
    ]
];

if (YII_ENV_DEV)
{
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        'allowedIPs' => ['192.168.99.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        'allowedIPs' => ['192.168.99.1', '::1'],
    ];
}

return $config;
