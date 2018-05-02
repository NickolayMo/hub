<?php
namespace app\models;
use yii\data\ActiveDataProvider;

class PostSearch extends Post
{
    public $q;

    public function rules()
    {
        return [
            [['q'], 'safe']
        ];
    }

    public function search($params)
    {
        $query = Post::find()->orderBy(['publish_at'=>SORT_DESC]);
        $dataProvider = new ActiveDataProvider([
            'query' => $query
        ]);

        $data['PostSearch'] = $params;
        $this->load($data);
        if (!$this->validate()) {
            return $dataProvider;
        }
        $query->andFilterWhere([
            'or',
            ['ilike', 'title', $this->q],
            ['ilike', 'content', $this->q],
        ]);
        return $dataProvider;
    }
}