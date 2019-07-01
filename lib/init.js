var fs = require("fs"),
	baseSrc = require("../baseSrc")(),
	configfile = __dirname + '/route.js',
	flagFile = false,
	path = require("path")


module.exports = create




function create(){
	addFile()
	var is_exsits = fs.existsSync(path.join(process.cwd(),baseSrc))
	if(is_exsits){
		console.log("[!] 已存在 wwwroot 根目录！执行 msp start 开启服务。")
	}else{
		fs.mkdirSync(baseSrc, 0777,function(err){
			if(err){
				console.log(err)
			}
		})
		var dir = path.join(__dirname.replace(/lib/,''),'test');
		function getFile(dir,s){
			var arr = fs.readdirSync(dir);
			arr.forEach(function(val){
				fs.stat(path.join(dir,val),function(err,stat){
		          if(stat.isDirectory()){
		          	fs.mkdirSync(path.join(baseSrc,s,val), 0777,function(err){
			          if(err){
			            console.log(err)
			          }
			        })
			        var last = path.join(s,val)
		            getFile(path.join(dir,val),last);
		          }else{
		          	var toFullName = path.join(baseSrc,s,val);
		          	readable = fs.createReadStream( path.join(dir,val) );
	              	writable = fs.createWriteStream( toFullName );  
	              	readable.pipe( writable );
		          }
		        })     
			});
		}
		getFile(dir,'');
		console.log("[!] 创建根目录 wwwroot 成功！执行 msp start 开启服务。");
	}
}

function addFile(){
	var exsits = fs.existsSync(path.join(process.cwd(),"/DEV-INF"))
	if(exsits){
		console.log("[!] 已存在 DEV-INF 开发配置目录！")
		createFile()
	}else{
		fs.mkdirSync("DEV-INF", 0777,function(err){
			if(err){
				console.log(err)
			}
		})
		console.log("[!] 创建根目录 DEV-INF 成功！")
		createFile()
	}
}

function createFile(){
	var exists = fs.existsSync(path.join(process.cwd(),"/DEV-INF","route.js"))
	if(exists){
		console.log("[!] 已存在route.js文件！")
	}else{
		fs.readFile(configfile,'utf8',function(err,data){
			fs.writeFile(path.join(process.cwd(),"/DEV-INF",'/route.js'),data,"utf8",function(err){
				if(err){
					console.log("init.js:"+ err)
				}else{
					console.log("[!] 创建默认开发配置成功 > /DEV-INF/route.js ！")
				}
			})
		})
	}
}

// function addFile(){
// 	fs.exists(process.cwd()+'/fis-conf.js',function(exsits){
// 		if(exsits){
// 			console.log('已经存在config文件')
// 			flagFile = true
// 		}else{
// 			fs.readFile(configfile,'utf8',function(err,data){
// 				fs.writeFile(process.cwd()+'/fis-conf.js',data,"utf8",function(err){
// 					if(err){
// 						console.log("init.js:"+ err)
// 					}else{
// 						flagFile = true
// 						console.log("[!] 创建默认配置文件成功！")
// 						console.log("[!] 初始化成功，请将项目放至“wwwroot”目录下,可执行 msp start 开启服务")
// 					}
// 				})
// 			})
// 		}
// 	})
// }








