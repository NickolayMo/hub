<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\commands;

use yii\console\Controller;
use yii\console\ExitCode;

/**
 * This command echoes the first argument that you have entered.
 *
 * This command is provided as an example for you to learn how to create console commands.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class GearmanServiceController extends Controller
{
    /**
     * Запуск нужного кол-во воркеров
     * @param int $count
     * @return int
     */
    public function actionStart($count = 1)
    {
        while ($count > 0)
        {
            $cmd = 'php yii gearman/start '.$count. ' --fork=true';
            popen($cmd, 'r');
            --$count;
        }
        return ExitCode::OK;
    }

    /**
     * остановка всех воркеров
     * @return int
     */
    public function actionStop()
    {
        $cmd = 'ps axfww | grep php | grep gearman/start | awk \'{print $1}\' | xargs kill';
        popen($cmd, 'r');
        return ExitCode::OK;
    }

    /**
     * Перезапуск воркеров
     * @return int
     */
    public function actionRestart()
    {
        $cmd = 'ps axfww | grep php | grep -c gearman/start';
        $count = exec($cmd, $res);
        $this->actionStop();
        // -1 тк сама команда поиска тоже попадает
        $this->actionStart((int)$count - 1);
        return ExitCode::OK;
    }
}
