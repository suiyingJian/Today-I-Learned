const express = require('express');
const router = require('./routers/users');

const app = express();

app.get('/products/:id/:name', (req, res, next) => {
  console.log(req.params);
  // req.params => 在数据库中查询真实的商品数据
  res.end("商品的详情数据~");
})

app.get('/login', (req, res, next) => {
  console.log(req.query);

  // 设置响应吗
  res.status(204);

  // res.type("application/json");
  // res.end(JSON.stringify({name: "why", age: 18}));
  // res.json({name: "why", age: 18})
  // 设置内容
  res.json(["abc", "cba", "abc"]);
});

/**
 * 举个例子:
 *   请求所有的用户信息: get /users
 *   请求所有的某个用户信息: get /users/:id
 *   请求所有的某个用户信息: post /users body {username: passwod:}
 *   请求所有的某个用户信息: delete /users/:id 
 *   请求所有的某个用户信息: patch /users/:id {nickname: }
 */

app.listen(8000, () => {
  console.log("普通中间件服务器启动成功~");
});

