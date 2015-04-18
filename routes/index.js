var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'cors示例' });
});

/*图片ping与jsonp页面*/
router.get('/ping-jsonp', function(req, res, next) {
  res.render('ping-jsonp', { title: 'image ping & jsonp' });
});

/*图片ping请求*/
router.get('/img', function(req, res, next) {
  res.send('我是一张图片，我说这句话好像没什么用');
});

/*jsonp请求*/
router.get('/jsonp', function(req, res, next) {
  res.send('pagefunc(' + Math.random() + ')');
});

/*comet页面*/
router.get('/comet', function(req, res, next) {
  res.render('comet', { title: 'comet' });
});

/*长轮询*/
router.get('/poll/:id', function(req, res, next) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  });
  setTimeout(function(){
    res.send("第"+req.params.id+"次获得随机数："+Math.random());
  }, 1000);
});

/*http stream*/
router.get('/stream', function(req, res, next) {
	res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/html'
	});
  var count = 0;
  var sid = setInterval(function(){
  	res.write(Math.random()+"");
  	if(++count == 5){
  		clearInterval(sid);
  		res.end();
  	}
  }, 1000);
});

/*sse页面*/
router.get('/sse', function(req, res, next) {
  res.render('sse', { title: 'sse' });
});

/*sse连接*/
router.get('/event-stream', function(req, res, next) {
  res.writeHead(200, {
    "Content-Type":"text/event-stream",
    "Cache-Control":"no-cache",
    "Connection":"keep-alive",
    "Access-Control-Allow-Origin" : "*"
  });
  res.write("retry: 10000\n");
  res.write("event: connecttime\n");
  res.write("data: " + (new Date()) + "\n\n");
  res.write("data: " + (new Date()) + "\n\n");

  var interval = setInterval(function() {
    res.write("data: " + (new Date()) + "\n\n");
  }, 1000);
  req.connection.addListener("close", function () {
    clearInterval(interval);
  }, false);
});

/*websocket页面*/
router.get('/websocket', function(req, res, next) {
  res.render('websocket', { title: 'websocket' });
});


module.exports = router;
