// 引入express框架
const express = require('express');
// 引入数据库处理模块
const mongoose = require('mongoose');
// 引入路径处理模块
const path = require('path');
// 引入session模块
var session = require('express-session');
// 处理文件上传
const formidableMiddleware = require('express-formidable');
// 导入morgan这个第三方模块
const morgan = require('morgan');


// web服务器
const app = express();
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// session配置
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
// 处理post参数
app.use(formidableMiddleware({
	// 文件上传目录
	uploadDir: path.join(__dirname, 'public', 'uploads'),
	// 最大上传文件为2M
	maxFileSize: 2 * 1024 * 1024,
	// 保留文件扩展名
	keepExtensions: true
}));

// 数据库连接
mongoose.connect('mongodb://cyy:690301@localhost:27017/show_cloud', { useNewUrlParser: true, useCreateIndex: true})
	.then(() => console.log('数据库连接成功'))
	.catch(() => console.log('数据库连接失败'));

// 获取系统环境变量 返回值是对象
if (process.env.NODE_ENV === 'development') {
	// 当前是开发环境
	console.log('当前是开发环境')
	// 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
	app.use(morgan('dev'))
} else {
	// 当前是生产环境
	console.log('当前是生产环境')
}

// 路由
require('./routes')(app);

// 返回系统监听
app.listen(3000, () => console.log('服务器启动成功'));
