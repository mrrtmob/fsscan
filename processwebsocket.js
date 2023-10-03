
function fscanSocketHeartbeat()
{
	try{
		if(fscanSocket.readyState == 1){
			fscanSocket.send(" ");
			setTimeout("fscanSocketHeartbeat()", 1000*60*10);
			console.log("fscan heart beat time out");
		}
	}catch(error){
		console.log("send error: "+error.message);
	}
}

function fscanOnOpen(event)
{
	setTimeout("fscanSocketHeartbeat()", 1000*60*10);
}

function fscanOnMessage(event)
{ 
	var fscandata = event.data;
	document.getElementById('data').innerHTML = fscandata
	console.log("data: "+fscandata);
}

function fscanOnClose(event)
{ 
	console.log("fscan on close");
	fscanSocket.close();
	setTimeout("fscanCreateWebSocket()",1000);
}  

function fscanOnError(event)
{ 
	console.log("fscan on error");
}  

function fscanCreateWebSocket() {
	console.log("fscan create web socket");
	try{
		fscanSocket = new WebSocket('ws://127.0.0.1:8889/websocket/webSocketProcessServer');
		fscanSocket.onopen = fscanOnOpen;
		fscanSocket.onmessage = fscanOnMessage;
		fscanSocket.onclose =  fscanOnClose;
		fscanSocket.onerror = fscanOnError;
	}catch(error){
		console.log("open websocket error: "+error.message);
	}
}

function sendDataToFscan()
{
	var data = '{"code":0,"msg":"GG","expressCampany":"ZTO"}'
	fscanSocket.send(data);
}

fscanCreateWebSocket();
