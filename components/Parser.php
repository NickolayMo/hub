<?php
namespace app\components;


use app\models\Post;

class Parser
{
    protected $elementMap = [
        'title'=>'.//span[contains(@class,"post__title-text")]',
        'content'=>'.//*[@data-io-article-url]'
    ];
    public function getPost($html, $url)
    {
        $hkey = md5($url);
        $model = Post::findOne(['hkey'=>$hkey]);
        if($model)
        {
            return;
        }
        $model = new Post();
        $doc = new \DOMDocument('1.0', 'UTF-8');
        $internalErrors = libxml_use_internal_errors(true);
        $doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES',  'UTF-8'));
        libxml_use_internal_errors($internalErrors);
        $xml = simplexml_import_dom($doc);
        $model->hkey = $hkey;
        $model->link = $url;
        $model->title = $this->getElement($xml, 'title');
        $model->content = $this->getElement($xml, 'content');
        $model->save();
    }

    /**
     * @param \SimpleXMLElement $xml
     * @param string $element
     * @return string
     */
    public function getElement($xml, $element)
    {
        $result = '';
        $data = $xml->xpath($this->elementMap[$element]);
        foreach ($data as $elem)
        {
            $children = $elem->children();
            if($children->count() > 0)
            {
                /** @var \SimpleXMLElement $ch */
                foreach ($elem->children() as $ch)
                {
                    $result .= (string)$ch->asXML();
                }
            }
            else
            {
                $result .= (string)$elem;
            }

        }
        return $result;
    }




}