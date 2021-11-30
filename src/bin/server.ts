import http from "http"
import app from "../app"

var port = process.env.PORT || '7000';
app.set('port', port);

var server = http.createServer(app);
let request = http.request({ port: `${port}`, host: '127.0.0.1' });
request.setHeader('Access-Control-Request-Headers', `xoxe.xoxp-1-Mi0yLTE4MTE5NDUwNjE2ODItMTgxMjE0OTA5OTc2My0yNzk5MDYzNzg4Mjg4LTI3ODc5NzQ1MTY1NDUtZGI4MDU4MWEzZjUyYzFlNTg0ZGMwMGQ3ZWEzMzdkODk5NzBmZmI5MTgzYzJiZGU5OTU1YTZlNDA0YWJlMjhjNA`)

server.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});

export default server;