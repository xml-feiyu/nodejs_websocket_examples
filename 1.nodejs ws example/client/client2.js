"use strict";
exports.__esModule = true;
var WebSocket = require("isomorphic-ws");
var wseventdata_1 = require("./wseventdata");
var ws = new WebSocket('ws://localhost:18000');
var socketData = { 'event': 'null', 'data': 'null' };
ws.onopen = function () {
    console.log('CONNECTED');
};
ws.onclose = function () {
    console.log('DISCONNECTED');
};
//The type of 'message' here is different from the one in the client.ts
// The message we got here is in a more complex structure as showed below
// So we should test the type of message.data instead of message
/*
MessageEvent {
 target: [WebSocket],
 type: 'message',
 data: '{"event":"end","data":"response: 0.3416359669492526"}'
}
*/
ws.onmessage = function (message) {
    console.log('received: %s', message);
    if (typeof message.data === 'string') {
        socketData = JSON.parse(message.data);
    }
    if (socketData.event === 'hello') {
        wseventdata_1.resWs.data = 'response: ' + Math.random();
        ws.send(JSON.stringify(wseventdata_1.resWs), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    if (socketData.event === 'end') {
        setTimeout(function () {
            console.log('connection is to be closed');
            ws.close();
        }, 3000);
    }
};
