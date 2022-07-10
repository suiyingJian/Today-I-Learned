const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log("common middleware01");
  next();
})

// 路径匹配的中间件
app.use('/home', (req, res, next) => {
  console.log("home middleware 01");
});

// 中间插入了一个普通的中间件
app.use((req, res, next) => {
  console.log("common middleware02");
  next();
})

app.use('/home', (req, res, next) => {
  console.log("home middleware 02");
});

app.listen(8000, () => {
  console.log("express初体验服务器启动成功~");
});
