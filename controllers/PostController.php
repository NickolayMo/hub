<?php

namespace app\controllers;
use app\components\Site;
use app\models\PostSearch;
use yii\rest\ActiveController;

class PostController extends ActiveController
{

    public $modelClass = 'app\models\Post';

    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    // restrict access to
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET'],
                    'Access-Control-Allow-Credentials' => true,
                    // Allow OPTIONS caching
                    'Access-Control-Max-Age' => 3600,
                    // Allow the X-Pagination-Current-Page header to be exposed to the browser.
                    'Access-Control-Expose-Headers' => [
                        'X-Pagination-Current-Page',
                        'X-Pagination-Page-Count',
                        'X-Pagination-Per-Page',
                        'X-Pagination-Total-Count',
                    ],
                ],

            ],
        ];
    }

    public function actions()
    {
        return [
            'index' => [
                'class' => 'yii\rest\IndexAction',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
                'prepareDataProvider' => [$this, 'prepareDataProvider']
            ],
            'view' => [
                'class' => 'yii\rest\ViewAction',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
            ]
        ];
    }

    public function prepareDataProvider()
    {
        $search = new PostSearch();
        return $search->search(\Yii::$app->request->getQueryParams());
    }

    public function actionPull()
    {
        return Site::getAll();
    }

}
