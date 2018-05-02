<?php
if (YII_ENV_DEV) {
    $config['modules']['debug'] = [
        // uncomment the following to add your IP if you are not connecting from localhost.
        'allowedIPs' => ['192.168.99.1', '::1'],
    ];
    $config['modules']['gii'] = [
        // uncomment the following to add your IP if you are not connecting from localhost.
        'allowedIPs' => ['192.168.99.1', '::1'],
    ];
    return $config;

}
return [];