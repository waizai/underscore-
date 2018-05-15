/*
* @Author: dangxiaoli
* @Date:   2018-05-14 17:26:26
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-05-14 20:16:13
*/
var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

var funcs = [foo,bar,baz,qux];
var result = Q(initialVal);
