/**
 * Created by LQ on 2018/11/2.
 */
//引入mongoose模块
const mongoose = require('mongoose');

//连接数据库是一个异步的操作，promise
module.exports = new Promise((resolve, reject) => {
  //连接mongodb数据库,connect方法
  mongoose.connect('mongodb://localhost:27017/gzhipin', {useNewUrlParser: true});
//绑定事件监听
  mongoose.connection.once('open',err => {
    if (!err) {
      console.log('数据库连接成功了~');
      resolve();
    } else {
      console.log(err);
      reject();
    }
  })
})