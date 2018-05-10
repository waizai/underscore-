var http = require('http');
var connect = require('connect');
var RedisStore = require('connect-redis')(connect);
var domainMiddleware = require('domain-middleware');

var server = http.createServer();
var app = connect();
app.use(connect.session({
  key: 'key',
  secret: 'secret',
  store: new RedisStore(6379, 'localhost')
}));
//domainMiddleware的使用可以看前面的链接
app.use(domainMiddleware({
  server: server,
  killTimeout: 30000
}));



function parseBody(req, cb){
    cb(null, body)
}
