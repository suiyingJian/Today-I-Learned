const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new Koa();
const testRouter = new Router();

const SERCET_KEY = "abccba123";

// 登录接口
testRouter.post('/test', (ctx, next) => {
  const user = {id: 110, name: 'why'};
  const token = jwt.sign(user, SERCET_KEY, {
    expiresIn: 10
  });

  ctx.body = token;
});

// 验证接口
testRouter.get('/demo', (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, SERCET_KEY);
    ctx.body = result;
  } catch (error) {
    console.log(error.message);
    ctx.body = "token是无效的~";
  }

});

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log("服务器启动成功~");
})

