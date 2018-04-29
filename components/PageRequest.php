<?php
namespace app\components;


class PageRequest
{
    public static function getPage($url, $options = [])
    {
        $user_agent='Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,                $url);
        curl_setopt($ch, CURLOPT_HEADER,             0);
        //curl_setopt($ch, CURLOPT_HTTPHEADER,         []);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,     1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER,     1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION,     1);
        curl_setopt($ch, CURLOPT_MAXREDIRS,         10);
        curl_setopt($ch, CURLOPT_TIMEOUT,             30);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT,     1);
        curl_setopt($ch, CURLOPT_FORBID_REUSE,         1);
        curl_setopt($ch, CURLOPT_POST,                 1);
        //curl_setopt($ch, CURLOPT_POSTFIELDS,         []);
        curl_setopt($ch, CURLOPT_USERAGENT,         $user_agent);
       // curl_setopt($ch, CURLOPT_HEADERFUNCTION,     []);


        $response = curl_exec($ch);
        $info     = curl_getinfo($ch);
        $error    = curl_error($ch);
        curl_close($ch);
        return $response;
    }

    public static function getArticlesUrl($html)
    {
        $doc = new \DOMDocument('1.0', 'UTF-8');
        $internalErrors = libxml_use_internal_errors(true);
        $doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES',  'UTF-8'));
        libxml_use_internal_errors($internalErrors);
        $xml = simplexml_import_dom($doc);
        $postLinks = $xml->xpath('.//a[@class="post__title_link"]');
        $result = [];
        foreach ($postLinks as $link)
        {
            $result[] = (string)$link->attributes()->href;
        }
        return $result;
    }


}