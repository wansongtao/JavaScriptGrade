const http = require('http');
const server = http.createServer();
const fs = require('fs');

server.listen(8000, () => {
	console.log('service run: http://127.0.0.1:8000');
});

server.on('request', (req, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json');

		const requestAddress = req.url.split('?')[0];
		const callback = {
			'/upload': () => {
				const arr = [];
				req.on('data', (chunk) => {
					arr.push(chunk);
				});

				req.on('end', () => {
					const data = Buffer.concat(arr);
					const contentType = req.headers['content-type'];

					const processFunc = {
						/**
						 * @description 上传的表单里带有文件内容
						 * @returns
						 */
						'multipart/form-data': () => {
							/**
               * 将上传的formdata（包含文件内容数据）表单数据转换为字符串输出如下：
               * ------WebKitFormBoundaryGBP3FuEWGO1eNpnF   (\n)
                Content-Disposition: form-data; name="age"  (\n)
                  (\n)
                24  (\n)
                ------WebKitFormBoundaryGBP3FuEWGO1eNpnF  (\n)
                Content-Disposition: form-data; name="file"; filename="Snipaste_2022-04-18_09-42-45.png"  (\n)
                Content-Type: image/png  (\n)
                  (\n)
                �PNG（从这里开始就是文件的二进制数据，不能转换为字符串，所以呈现乱码）
                
               */

							// 如果二进制数据里查找不到'Content-Type'字符串的二进制数据，则代表用户没有上传文件
							const typeIdx = data.indexOf('Content-Type');
							if (typeIdx === -1) {
								return processFunc['application/x-www-form-urlencoded']();
							}

							// 获取文件内容数据和字符串数据的分割位置索引，即文件二进制数据的前一位索引（换行符）
							const splitIdx = data.indexOf(
								'\n',
								data.indexOf('\n', typeIdx) + 1
							);

							// 截取formdata里的字符串数据
							const text = data
								.subarray(0, splitIdx)
								.toString()
								.replace(/\r\n/g, '');

							// 获取分割字符串，如：------WebKitFormBoundaryGBP3FuEWGO1eNpnF
							const splitStr = data
								.subarray(0, data.indexOf('\r\n'))
								.toString();

							const formData = {};
							let fileName = '';
							text.split(splitStr).forEach((val) => {
								if (!val) {
									return;
								}

								if (val.indexOf('filename') !== -1) {
									const end = val.lastIndexOf('"');
									const start = val.lastIndexOf('"', end - 1);

									fileName = val.substring(start + 1, end);
								} else {
									// 键名会转义，值不会
									const start = val.indexOf('"');
									const end = val.indexOf('"', start + 1);

									const key = decodeURIComponent(val.substring(start + 1, end));
									const value = val.substring(end + 1);
									formData[key] = value;
								}
							});

							console.log(formData, 'formdata');

							const savePath = 'chapter24/xhr/node/';
							// 截取formdata里的二进制文件数据
							const file = data.subarray(splitIdx + 1);
							fs.writeFile(savePath + fileName, file, (err) => {
								if (err) {
									console.error(err);
									res.statusCode = 500;
									res.end('上传失败');
								} else {
									res.statusCode = 200;
									res.end(
										JSON.stringify({
											code: 200,
											message: '上传成功',
											data: formData
										})
									);
								}
							});
						},
						/**
						 * @description 上传的表单数据不带文件数据
						 */
						'application/x-www-form-urlencoded': () => {
							// 截取formdata里的字符串数据
							const text = data.toString().replace(/\r\n/g, '');

							// 获取分割字符串，如：------WebKitFormBoundaryGBP3FuEWGO1eNpnF
							const splitStr = data
								.subarray(0, data.indexOf('\r\n'))
								.toString();

							const formData = {};
							text.split(splitStr).forEach((val) => {
								if (!val || val.indexOf('filename') !== -1) {
									return;
								}

								// 键名会转义，值不会
                const start = val.indexOf('"');
                const end = val.indexOf('"', start + 1);

                if (start === -1 || end === -1) {
                  return
                }

                const key = decodeURIComponent(val.substring(start + 1, end));
                const value = val.substring(end + 1);
                formData[key] = value;
							});

							console.log(formData, 'formdata');

							res.statusCode = 200;
							res.end(
								JSON.stringify({
									code: 200,
									message: 'content-type error',
									data: formData
								})
							);
						}
					};

					if (processFunc[contentType] instanceof Function) {
						return processFunc[contentType]();
					}

					res.statusCode = 400;
					res.end(
						JSON.stringify({
							code: 200,
							message: 'content-type error',
							data: null
						})
					);
				});
			}
		};

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
