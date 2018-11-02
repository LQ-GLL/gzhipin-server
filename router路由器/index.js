/**
 * Created by LQ on 2018/11/2.
 */
//引入express
const express = require('express');
//引入md5加密
const md5 = require('blueimp-md5');
//引入Users
const Users = require('../models/users');


//获取Router
const Router = express.Router;
//创建路由器对象
const router = new Router();
//解析请求体的数据
router.use(express.urlencoded({extended: true}));

//登录
router.post('/login', (req, res )=> {
  res.send('login路由的响应');
})
//注册
router.post('/register', (req, res) => {
  //1、收集用户信息
  const {username, password, type} = req.body;
  //2、判断用户输入是否合法
  if(!username || !password || !type) {
    //说明数据不合法
    res.json({
      'code': 2,
      'msg': '用户输入不合法'
    });
    return;
  }
  //3、去数据库查找用户是否存在
  Users.findOne({username}, (err, data) => {
    if (!err) {
        //方法没错
      if (data) {
          //找到指定用户，用户名已经存在
        res.json({
          'code': 1,
          'msg': '此用户已存在'
        });
      } else {
          //注册成功，将用户信息保存在数据库中
        Users.create({username, password: md5(password), type}, (err, data) => {
          if (!err) {
              //注册成功
            //data创建成功的文档对象
            res.json({
              code: 0,
              data: {
                _id: data.id,
                username: data.username,
                type: data.type
              }
            })
          } else {
              //方法出错了
            res.json({
              'code': 3,
              'mag': '网络不稳定'
            });
          }
        })
        
      }
    } else {
        //方法出错
      res.json({
        'code': 3,
        'mag': '网络不稳定'
      });
    }
  })
  //4、注册成功，将用户信息保存在数据库中
  res.send('register路由的响应');
})
//路由器要暴露出去在app中应用
//这种方式可以直接引入，不需要解构赋值（和默认暴露相似）
module.exports =router;

/*
###post需要第三方中间件
 */