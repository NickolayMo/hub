<?php
namespace app\components;


use app\models\Post;

class Parser
{
    const SOURCE = 'habr.com';
    protected $elementMap = [
        'title'=>'.//span[contains(@class,"post__title-text")]',
        'content'=>'.//*[@data-io-article-url]',
        'author'=>'.//*[@class="post__meta"]//*[contains(@class, "user-info__nickname")]'
    ];
    protected $unsetTags = ['script'];
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
        $htmlObj = simplexml_import_dom($doc);
        $model->hkey = $hkey;
        $model->link = $url;
        $model->title = $this->getElement($htmlObj, 'title', false);
        $model->author = $this->getElement($htmlObj, 'author', false);
        $model->source = self::SOURCE;
        $model->content = $this->getElement($htmlObj, 'content');
        $model->publish_at = $this->getPublicationDate($html);
        $model->save();
    }

    public function getPublicationDate($html)
    {
        preg_match('/article_publication_date":\s"([^"]+)/', $html, $matches);
        if(!isset($matches[1]))
        {
            return null;
        }
        return date('Y-m-d H:i:m', strtotime($matches[1]));
    }

    /**
     * @param \SimpleXMLElement $html
     * @param string $element
     * @return string
     */
    public function getElement($html, $element, $asHtml = true)
    {
        $result = '';
        $data = $html->xpath($this->elementMap[$element]);
        foreach ($data as $elem)
        {

            if($asHtml)
            {
                $result .= (string)$elem->asXML();
            }
            else
            {
                $result .= (string)$elem;
            }
        }

        return $result;
    }

}