/**
 * Created by LQ on 2018/11/2.
 */
//搭建服务器

//服务器引用的模块化语法都是commonjs模块化语法
//引入express
const express = require('express');
//引入数据库
const db = require('./db');
//引入路由器模块,自定义模块./
const router = require('./router路由器')
//创建app应用对象
const app = express();

(async () => {
  await db;
  //应用路由器
  app.use(router);
})()



//监听端口号
app.listen(4000, err => {
  if(!err) console.log('服务器启动成功了~');
  else console.log(err);
})