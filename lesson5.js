/*
* @Author: dangxiaoli
* @Date:   2018-05-11 19:59:35
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-05-11 21:13:34
*/
const async = require('async');



var concurrencyCount = 0;
var fetchUrl = function(url, cb){
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log( `现在的并发数是${concurrencyCount},正在抓取的是${url},耗时${delay}毫秒`);
    setTimeout(() => {
        concurrencyCount--;
        cb(null, url + 'html content');
    },delay)
}


var urls = [];
for(let i = 0; i < 30; i++){
    urls.push(`http://datasource_${i}`);
}

async.mapLimit(urls, 5, function(url, cb){
    fetchUrl(url, cb);
},function(err, result){
    console.log('final:');
    console.log(result);
})
