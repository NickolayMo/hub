<?php
namespace app\components\jobs;

use app\components\PageRequest;
use app\components\Parser;
use shakura\yii2\gearman\JobBase;

class GrabArticle extends JobBase
{
    public function execute(\GearmanJob $job = null)
    {
       $params = $this->getWorkload($job)->getParams();
       $html = PageRequest::getPage($params['url']);
       $parser = new Parser();
       $parser->getPost($html, $params['url']);
    }
}