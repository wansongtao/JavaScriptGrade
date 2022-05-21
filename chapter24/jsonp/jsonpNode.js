const http = require('http');
const server = http.createServer();

server.listen(8000);

server.on('request', (req, res) => {
  try {
    // 注意：这里url只传递一个参数callback
    const callback = req.url.split('=')[1];

    res.statusCode = 200;

    // 返回JSONP格式数据
    res.end(`${callback}({"name": "JSONP"})`);
  } catch(ex) {
    console.error(ex.message);

    res.statusCode = 500;
    res.end('throw new Error("server error")');
  }
});