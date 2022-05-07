const http = require('http');
const server = http.createServer();
const fs = require('fs')

server.listen(8000, () => {
	console.log('service run: http://127.0.0.1:8000');
});

server.on('request', (req, res) => {
	try {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Content-Type', 'application/json');

    const requestAddress = req.url.split('?')[0];
    const callback = {
      '/upload': () => {
        // 只处理客户端上传的二进制文件，非formdata表单数据
        const arr = [];
        req.on('data', (chunk) => {
          arr.push(chunk);
        });

        req.on('end', () => {
          const data = Buffer.concat(arr);
          const savePath = 'chapter24/xhr/node/';
          const fileName = 'test.png';
          fs.writeFile(savePath + fileName, data, err => {
            if(err) {
              console.error(err);
              res.statusCode = 500;
              res.end('上传失败');
            } else {
              res.statusCode = 200;
              res.end('上传成功');
            }
          })
        });
      }
    }
		
    if (callback[requestAddress] instanceof Function) {
      return callback[requestAddress]();
    }

    res.writeHead(200, '响应成功');
    res.end('成功收到请求');
	} catch (ex) {
		console.error(ex.message);
		res.statusCode = 500;
		res.end('service error');
	}
});
