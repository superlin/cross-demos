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


/*子域名跨域*/
router.get('/demo1', function(req, res, next) {
  res.render('iframe/demo1', { title: '子域名跨域' });
});

router.get('/demo1-iframe', function(req, res, next) {
  res.render('iframe/demo1-iframe', { title: '子域名跨域-iframe' });
});

/*URL hash跨域*/
router.get('/demo2', function(req, res, next) {
  res.render('iframe/demo2', { title: 'URL hash跨域' });
});

router.get('/demo2-b', function(req, res, next) {
  res.render('iframe/demo2-b', { title: 'URL hash跨域-iframe' });
});

/*cross frame跨域*/
router.get('/demo3', function(req, res, next) {
  res.render('iframe/demo3', { title: 'cross frame跨域' });
});

router.get('/demo3-b', function(req, res, next) {
  res.render('iframe/demo3-b', { title: 'cross frame跨域-目标页面' });
});

router.get('/demo3-req-proxy', function(req, res, next) {
  res.render('iframe/demo3-req-proxy', { title: 'cross frame跨域-请求代理' });
});

router.get('/demo3-res-proxy', function(req, res, next) {
  res.render('iframe/demo3-res-proxy', { title: 'cross frame跨域-响应代理' });
});

/*window.name跨域*/
router.get('/demo4', function(req, res, next) {
  res.render('iframe/demo4', { title: 'window.name跨域' });
});

router.get('/demo4-req', function(req, res, next) {
  res.render('iframe/demo4-req', { title: 'window.name跨域' });
});

router.get('/demo4-res', function(req, res, next) {
  res.send("nothing");
});


/*postMessage跨域*/
router.get('/demo5', function(req, res, next) {
  res.render('iframe/demo5', { title: 'postMessage跨域' });
});

router.get('/demo5-b', function(req, res, next) {
  res.render('iframe/demo5-b', { title: 'postMessage跨域' });
});

module.exports = router;
