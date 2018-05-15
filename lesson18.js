/*
* @Author: dangxiaoli
* @Date:   2018-05-14 20:37:40
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-05-14 21:28:24
*/


function parseBody(req, cb){
    cb(null, body);
}

function checkIdInDatabase(body, cb){
    cb(null, dbResult);
}


function returnResult(dbResult, res){
    if(dbResult && dbResult.length > 0){
        res.end('true');
    }else{
        res.end('false');
    }
}


function requestHandler(req, res){
    parseBody(req, function(err, body){
        checkIdInDatabase(body, function(err, dbResult){
            returnResult(dbResult, res);
        })
    })
}


//
var middlewares = [
    function fn1(req, res, next){
        parseBody(req, function(err, body){
            if(err){
                return next(err);
            }
            req.body = body;
            next();
        })
    },
    function fun2(req, res, next){
        checkIdInDatabase(req.body.id, function(err, rows){
            if(err){
                return next(err);
            }
            res.dbResult = rows;
            next();
        })
    },
    function fun3(req, res, next){
        if(res.dbResult && res.dbResult.length > 0){
            res.end('true');
        }else{
            res.end('false');
        }
        next();
    }
]

function requestHandler(req, res){
    var i = 0;
    function next(err){
        if(err){
            return res.end('error:', err.toString());
        }
        if(i < middlewares.length){
            middlewares[i++](req, res, next)
        }else{
            return
        }
    }
    next();
}


//动手实现一个中间件链式调用，整体思路是：
//1. 将所有处理逻辑的函数（中间件）放在一个list中
//2. 请求到达时，循环调用list中的处理逻辑函数()
