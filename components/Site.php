<?php
namespace app\components;


use shakura\yii2\gearman\JobWorkload;
use Yii;

/**
 * Class Site
 * @package app\components
 */
class Site
{
    const SITE_URL = 'https://habr.com';
    const LIMIT = 10;

    /**
     * Получение всех новых статей
     * @return bool
     */
    public static function getAll()
    {

        $page = 1;
        while ($page <= self::LIMIT)
        {
            Yii::$app->gearman->getDispatcher()->background(
                'grab_page',
                new JobWorkload([
                                     'params' => [
                                         'url' => self::SITE_URL.'/all/page'.$page.'/'
                                     ]
                                 ]));
            $page++;
        }
        return true;
    }

}