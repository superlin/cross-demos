var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'cors示例' });
});

router.get('/ping-jsonp', function(req, res, next) {
  res.render('ping-jsonp', { title: 'image ping & jsonp' });
});

router.get('/img', function(req, res, next) {
  res.send('我是一张图片，我说这句话好像没什么用');
});

router.get('/jsonp', function(req, res, next) {
  res.send('pagefunc(' + Math.random() + ')');
});

router.get('/comet', function(req, res, next) {
  res.render('comet', { title: 'comet' });
});

router.get('/poll/:id', function(req, res, next) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  });
  setTimeout(function(){
    res.send("第"+req.params.id+"次获得随机数："+Math.random());
  }, 1000);
});

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

module.exports = router;
