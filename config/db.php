<?php

return [
    'class' => 'yii\db\Connection',
      'dsn' => 'pgsql:host=localhost;dbname=dbname',
	'username' => 'dbuser',
	'password' => '123',
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
