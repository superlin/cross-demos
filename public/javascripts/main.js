//socket连接
var socket = io.connect("http://localhost:3000");
//连接
socket.on('connect', function(){
	socket.emit('chat');
});
//进入聊天成功
socket.on("profile", function(data){
	headicon = data.cover;
	$("#user-add-div").fadeOut(500, function(){
		$("#msg-input-div").fadeIn(500);
		$("#msg-input").focus();
	});
});
//消息
socket.on('message', function (data) {
	addMsg(data);
});

//加入聊天
$("#add-user-btn").click(function(){
	var name = $.trim($("#user-name").val());
	if(name == ""){
		//tooltip
		$("#user-name").tooltip('show');
		setTimeout(function(){
			$("#user-name").tooltip('hide');
		}, 1000);
		return;
	}
	socket.emit("set_name", name);
	$("#user-name").val("");
	myname = name;
});
$("#user-name").keyup(function(e) {
	if(e.keyCode == 13){
		$("#add-user-btn").click();
	}
}).tooltip({
	trigger: 'manual',
	title: "昵称不能为空",
	container: "body"
});
//消息输入
$("#send-msg-btn").click(function(){
	var msg = $.trim($("#msg-input").val());
	if(msg == ""){
		//tooltip
		$("#msg-input").tooltip('show');
		setTimeout(function(){
			$("#msg-input").tooltip('hide');
		}, 1000);
		return;
	}
	socket.emit("message", msg);
	$("#msg-input").val("");
	addMsg({content: msg, name: myname, cover: headicon}, true);
});
$("#msg-input").keyup(function(e) {
	if(e.keyCode == 13){
		$("#send-msg-btn").click();
	}
}).tooltip({
	trigger: 'manual',
	title: "消息不能为空",
	container: "body"
});

//聊天相关
var last_msg_time = false;
function addMsg(data, me){
	var now = new Date();
	if(last_msg_time){
		var diff = now.getTime() - last_msg_time.getTime();
		if(diff > 2*60*1000){
			//添加时间标签
			var time_item = $($("#time-template").html());
			var h = now.getHours();
			var m = now.getMinutes();
			var t = h + ":" + (m>10 ? m : "0"+m);
			time_item.find(".time-span").html(t);
			$("#msg-show-div").append(time_item);
		}
	}
	last_msg_time = now;
	var item;
	if(me){
		item = $($("#my-msg-template").html());
	} else {
		item = $($("#other-msg-template").html());
	}
	item.find(".cover-img").attr("src","/images/"+data.cover);
	item.find(".nick-holder").html(data.name);
	item.find(".content-holder").html(data.content);
	//滑动到最底部
	var tobottom = false;
  var div = document.getElementById("msg-show-div");
  if(div.scrollTop + div.clientHeight + 5 >= div.scrollHeight) tobottom = true;
  //添加消息
	$("#msg-show-div").append(item);
  //scroll到最底端
  if(tobottom) div.scrollTop = div.scrollHeight;
}
