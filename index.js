var express = require('express'),
	app = express(),
	sass = require('node-sass'),
	livereload = require('./express-livereload'),
	serveIndex = require('serve-index'),
	ssi = require('ssi'),
	ir = require('inquirer'),
	opener = require('opener'),
	net = require('net'),
	fs = require('fs'),
	path = require('path'),
	URL = require('url'),
	baseSrc = require('./baseSrc')(),
	baseSrc = "/" + baseSrc,
	port = 3000,
	livePort = 35729,
	routerObj = {}

module.exports = portIsOccupied

function portIsOccupied (port) {
	// 创建服务并监听该端口
	var server = net.createServer().listen(port)

	server.on('listening', function () { // 执行这块代码说明端口未被占用
		server.close() // 关闭服务
		console.log('端口：' + port + '可用，启动服务器...') // 控制台输出信息
		opener("http://localhost:" + port)	
		/************************/
		checkPort()
		manager(process.cwd()+baseSrc)
		app.listen(port,function(){
			console.log('服务器开启成功！端口 :'+port);
			console.warn('提示：若使用sass或scss语法，请在html的<link>标签src属性内将样式文件后缀拓展名改成.css，否则无法调用样式文件！');
			console.log('如：<link rel="stylesheet" type="text/css" href="css/style.scss"> ');
			console.log('应改为：<link rel="stylesheet" type="text/css" href="css/style.css">');
		})
		
		function checkPort(){
			var liveServer = net.createServer().listen(livePort)
				liveServer.on('listening', function () { // 执行这块代码说明端口未被占用
				liveServer.close() // 关闭服务

				livereload(app, { // 配置 livereload
					applyJSLive: true,
					applyCSSLive: true,
					applyImgLive: true,
					watchDir:  process.cwd() + baseSrc,
					port: livePort
				})
			})
			liveServer.on('error',function(err){
				if(err){
					livePort += 1
					checkPort(port)
				}
			})
		}
		
		
	/**********************/
	})

	server.on('error', function (err) {
		if (err) { // 端口已经被使用
			console.log('端口：' + port + '已被占用，更换其他端口来启动服务。')
			getPort()
		}
	})
}

function manager(src){
		var routes = fs.existsSync(path.join(process.cwd(),"/DEV-INF","/route.js")) // app服务用于开发者操作
	 	if(routes){
 			var dev_url = path.join(process.cwd(),"/DEV-INF","/route.js"),
 			dev_server = require(dev_url)(app)
 		}

		app.get('**/*.shtml',function(req,res,next){  // .shtml 后缀文件 修改header 为html
			var url = URL.parse(req.url).pathname
			var filename = path.join(src,url)
			toReload(filename,src,req.hostname,function(html){
				res.setHeader("Content-Type","text/html")
				res.send(html)
			})
		})
		 
		app.get('**/*.html',function(req,res,next){ // .html 后缀文件如不存在映射到相同文件名的 .shtml文件
			var url = URL.parse(req.url).pathname,
		 		filename = path.basename(url,'.html'),
		 		dirname = path.dirname(url),
		 		base = path.join(src,dirname,filename),
		 		file_url = base +".html"

		 	fs.exists(file_url,function(exists){
		 		if(exists){
		 			toReload(base + ".html",src,req.hostname,function(html){
						res.send(html)
					})
		 		}else{
		 			fs.exists(base + ".shtml",function(exists){
		 				if(exists){
		 					toReload(base + ".shtml",src,req.hostname,function(html){
								res.send(html)
							})
		 				}else{
		 					res.send("没有找到这个文件哦！！")
		 				}
		 			})
		 		}
		 	})
		})


		app.get('**/*.css',function(req,res){  // 将.css 文件映射到 .scss上
			var url = URL.parse(req.url).pathname
			var	filename = path.basename(url,'.css'),
		 		dirname = path.dirname(url),
		 		base = path.join(src,dirname,'/',filename),
		 		scss_url = base + ".scss",
		 		sass_url = base + ".sass",
		 		css_url = base + ".css",
		 		file_url = "";

		 	fs.exists(css_url,function(exists){
		 		if(exists){
		 			fs.readFile(css_url,"utf8",function(err,data){
						if(err){
							console.log(err)
						}else{
							res.setHeader('Content-Type','text/css')
							res.send(data)
						}
					})
		 		}else{
		 			fs.exists(scss_url,function(exists){
		 				if(exists){
		 					file_url = scss_url
		 					getCssData()
		 				}else{
		 					fs.exists(sass_url,function(exists){
		 						if(exists){
		 							file_url = sass_url
		 							getCssData()
		 						}else{
		 							res.send("不存在这个css相关文件哦~")
		 						}
		 					})
		 				}
		 			})
		 		}
		 	})



		 	function getCssData(){
		 		var data = sass.renderSync({
						file: file_url
					})
		 		res.setHeader('Content-Type','text/css')
				res.send(data.css.toString())
		 	}
		})

	 	app.use(serveIndex(src,{
			'icons': true
		}))

	 	app.use(express.static(path.join(process.cwd(),baseSrc)) )

		
}


function toReload(filename,src,hostname,callback){  // 处理html和shtml文件，加入livereload.js并处理ssi语法
	var parser = new ssi(src,src,'**/*.shtml',true)
	fs.exists(filename,function(exists){
		if(exists){
			fs.readFile(filename,"utf8",function(err,data){
				if(err){
					console.log(err)
					callback(err)
				}else{
					var data = parser.parse(filename,data)
					if(data.contents.indexOf("</head>") > -1){
						var html = data.contents.split("</head>")
							html[0] += '<script src="http://'+ hostname +':'+livePort+'/livereload.js?snipver=1"></script></head>'
							html = html[0] + html[1]
					}else{
						var html = data.contents
					}
					callback(html)
				}
			})
		}else{
			callback("木有找到该文件哦~~")
		}
	})
}

function getPort(){
	ir.prompt([{
        type: "input",
        name: "name",
        message: "请输入新端口号（eg: 3000）："
    }]).then (function(result) {
    	if(result.name){
    		portIsOccupied(result.name)
    	}else{
    		console.log("[!] 输入端口号不能为空！")
    		getPort()
    	}  
    })
}