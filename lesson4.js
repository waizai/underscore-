/*
* @Author: dangxiaoli
* @Date:   2018-05-11 12:23:16
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-05-11 19:58:59
*/
const express = require('express');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');


var cnodeUrl = 'https://cnodejs.org/';

var app = express();
superagent.get(cnodeUrl)
    .end(function(err, res){
        if(err){
            return console.error(err);
        }

        var topicUrls = [];
        const $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function(idx, ele){
            var $ele = $(ele);
            var href = url.resolve(cnodeUrl, $ele.attr('href'));
            topicUrls.push(href);
        })
        console.log(topicUrls)

        var ep = new eventproxy();

        ep.after('got_file', topicUrls.length, function(topics){
            //topics是个数组
            topics = topics.map(topicPair => {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                const $ = cheerio.load(topicHtml);

                return({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                })
            })
            console.log(`final`)
            console.log(topics)
        })


        topicUrls.forEach(url => {
            superagent.get(url)
            .end(function(err, res){
                console.log(`fetch ${url} successful`);
                ep.emit('got_file', [url, res.text])
            })
        })
    })



app.listen(3000,function(req, res){
    console.log(`app is running at port 3000`)
})
