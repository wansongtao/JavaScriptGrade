const http = require('http');
const server = http.createServer();

server.listen(8000);

server.on('request', (req, res) => {
  try {
    const methodName = req.url.split('=')[1];

    res.statusCode = 200;
    res.end(`${methodName}({name: 'wst', age: '24'})`);
  } catch(ex) {
    console.error(ex.message);

    res.statusCode = 500;
    res.end('server error');
  }
});