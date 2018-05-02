<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "post".
 *
 * @property int $id
 * @property string $link
 * @property string $hkey
 * @property string $content
 * @property string $title
 * @property string $source
 * @property string $author
 * @property integer $publish_at
 * @property string $created_at
 * @property string $updated_at
 */
class Post extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'post';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['link', 'hkey', 'content', 'title', 'author', 'source', 'publish_at'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'link' => 'Link',
            'hkey' => 'Hkey',
            'content' => 'Content',
            'title' => 'Title',
            'author' => 'Title',
            'source' => 'Title',
            'publish_at' => 'Title',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
