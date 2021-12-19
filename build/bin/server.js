"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var app_1 = __importDefault(require("../app"));
var port = process.env.PORT || '7000';
app_1.default.set('port', port);
var server = http_1.default.createServer(app_1.default);
var request = http_1.default.request({ port: "" + port, host: '127.0.0.1' });
request.setHeader('Access-Control-Request-Headers', "xoxe.xoxp-1-Mi0yLTE4MTE5NDUwNjE2ODItMTgxMjE0OTA5OTc2My0yNzk5MDYzNzg4Mjg4LTI3ODc5NzQ1MTY1NDUtZGI4MDU4MWEzZjUyYzFlNTg0ZGMwMGQ3ZWEzMzdkODk5NzBmZmI5MTgzYzJiZGU5OTU1YTZlNDA0YWJlMjhjNA");
server.listen(port, function () {
    console.log("Server is running at: http://localhost:" + port);
});
exports.default = server;
