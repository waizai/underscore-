/*
* @Author: dangxiaoli
* @Date:   2018-05-10 20:32:58
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-05-10 22:02:24
*/
const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');



var app = express();
app.get('/',function(req, res, next){
    superagent.get('https://cnodejs.org/')
        .end(function(err, sres){
            if(err){
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function(idx, ele){
                var $ele = $(ele);
                items.push({
                    title: $ele.attr('title'),
                    href: $ele.attr('href')
                });
            })

            res.send(items);
        })

})

app.listen(3000, function(req, res){
    console.log(`app is running at port 3000`)
})
