/*
* @Author: dangxiaoli
* @Date:   2018-05-10 20:09:00
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-05-10 20:20:59
*/
const express = require('express');
const utility = require('utility');


var app = express();
app.get('/',function(req, res, next){
    var q = req.query.q;

    var md5Val = utility.md5(q);
    res.send(md5Val);
})

app.listen(3000, function(req, res){
    console.log(`app is running at port 3000`)
})
