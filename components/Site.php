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

    /**
     * Получение всех новых статей
     * @return bool
     */
    public static function getAll()
    {
        Yii::$app->gearman->getDispatcher()->background('grab_page', new JobWorkload([
            'params' => [
                'url' => self::SITE_URL.'/all/'
            ]
        ]));

        return true;
    }

}