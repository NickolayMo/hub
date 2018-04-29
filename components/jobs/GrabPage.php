<?php
namespace app\components\jobs;

use app\components\PageRequest;
use shakura\yii2\gearman\JobBase;
use shakura\yii2\gearman\JobWorkload;
use Yii;

class GrabPage extends JobBase
{
    public function execute(\GearmanJob $job = null)
    {
        $params = $this->getWorkload($job)->getParams();
        $html = PageRequest::getPage($params['url']);
        $articlesUrls = PageRequest::getArticlesUrl($html);
        foreach ($articlesUrls as $articlesUrl)
        {
            Yii::$app->gearman->getDispatcher()->background('grab_article', new JobWorkload([
                'params' => [
                    'url' => $articlesUrl
                ]
            ]));
        }


    }
}