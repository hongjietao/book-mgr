const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
  console.log(ctx.URL);
})

app.listen(3000, () => {
  console.log('success!');
  console.log('3000');
})