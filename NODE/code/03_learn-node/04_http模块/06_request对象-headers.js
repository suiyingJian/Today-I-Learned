const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {
  console.log(req.headers);

  req.on('data', (data) => {
    
  })

  res.end("Hello Server");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
