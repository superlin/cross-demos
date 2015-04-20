##跨域通信demos
1.	图像ping
2.	JSONP
3.	Comet
	3.1.	Http Streaming
	3.2.	Long Polling
4.	Server-sent Events
5.	Websocket
6.	iframe
	6.1.	document.domain
	6.2.	URL.hash
	6.3.	Cross-fragment
	6.4.	Window.name
	6.5.	postMessage

##注意：
*	1-5请求都是发送到``localhost:3000``，为了实现跨域，打开页面时地址请使用``127.0.0.1:3000``
*	iframe需要配置hosts

```
127.0.0.1 www.myapp.com
127.0.0.1 sample.myapp.com
127.0.0.1 www.otherapp.com
```
