var fs = require("fs"),
	baseSrc = require("../baseSrc")(),
	//filename = __dirname.substring(0,__dirname.length-4) + "/pathArr.json",
	//configfile = __dirname + '/fis-conf.js',
	flagFile = false


module.exports = create


function create(){
	var is_exsits = fs.existsSync(process.cwd() + '/' + baseSrc)
	if(is_exsits){
		console.log("[!] 已存在 wwwroot 根目录！执行 msp start 开启服务。")
	}else{
		fs.mkdirSync(baseSrc, 0777,function(err){
			if(err){
				console.log(err)
			}else{
				console.log("[!] 创建根目录 wwwroot 成功！执行 msp start 开启服务。")
			}
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








