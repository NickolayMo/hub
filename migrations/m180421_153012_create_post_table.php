<?php

use yii\db\Migration;

/**
 * Handles the creation of table `post`.
 */
class m180421_153012_create_post_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('post', [
            'id' => $this->primaryKey(),
            'link'=>$this->text(),
            'hkey'=>$this->text(),
            'content'=>$this->text(),
            'title'=>$this->text(),
            'source'=>$this->text(),
            'author'=>$this->text(),
            'publish_at'=>'timestamp not null DEFAULT NOW()',
            'created_at'=>'timestamp not null DEFAULT NOW()',
            'updated_at'=>'timestamp not null DEFAULT NOW()'
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('post');
    }
}
