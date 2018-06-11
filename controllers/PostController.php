<?php

namespace app\controllers;

use app\models\Post;
use app\models\PostSearch;
use shakura\yii2\gearman\JobWorkload;
use Yii;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;
use yii\rest\Controller;

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
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        return $actions;
    }

    public function prepareDataProvider()
    {
        $search = new PostSearch();
        return $search->search(\Yii::$app->request->getQueryParams());
    }
    public function actionGet()
    {
            $query = Post::find();
            $dataProvider = new ActiveDataProvider([
                'query' => $query,
                'pagination' => [
                    'pageSize' => 10,
                ]
            ]);
           $dataProvider->getModels();

        return $dataProvider;
    }

    public function actionPull()
    {
        Yii::$app->gearman->getDispatcher()->background('grab_page', new JobWorkload([
            'params' => [
                'url' => 'https://habr.com/all/'
            ]
        ]));
        return true;
    }

}
