
module.exports = function(){
  var fs = require('fs'),
      path = require('path'),
      uglifyJs = require('uglify-js'),
      Dir = path.join(process.cwd(),"/wwwroot/"),
      dist = path.join(process.cwd(),"/dist/"),
      ssi = require('ssi'),
      sass = require('node-sass'),
      jsU = false,
      cssU = false

var arv = process.argv.splice(2);

arv.forEach(function(val,index){
  if(val == "-j" || val == "--javascript"){
    jsU = true
  }else if(val == "-c" || val == "--css"){
    cssU = true
  }else if(val == "-a" || val == "--all"){
    jsU = true
    cssU = true
  }
})


    fs.exists(dist,function(exist){
      if(exist){
        console.log("已经存在dist目录")
        deleteFolder(dist)
        fs.mkdirSync(dist, 0777,function(err){
          if(err){
            console.log(err)
          }
        })
        getFile(Dir,"")
      }else{
        console.log("不存在dist目录,创建dist目录")
        fs.mkdirSync(dist, 0777,function(err){
          if(err){
            console.log(err)
          }
        })
        getFile(Dir,"")
      }
    })


    function getFile(dir,flo){
      var arr = fs.readdirSync(dir)
      arr.forEach(function(val){
        fs.stat(dir+val,function(err,stat){
          if(!stat.isDirectory()){
            var ext = path.extname(val)
            var fullname = path.join(flo,val)
            var todir = path.join(dist,flo)
            var toFullName = path.join(dist,fullname)
            if(ext == ".js" && jsU){
              var result = uglifyJs.minify(dir+val)
              //console.log(result.code)
              isDir(todir)
              fs.writeFile(toFullName,result.code,{encoding:'utf8'},function(err){
                if(err){
                  console.log(err)
                }
                //console.log(dir + val + "js压缩复制到dist文件夹成功！")
              })
            }else if(ext == ".html" || ext == ".shtml"){
              if(ext == ".shtml"){
                var basename = path.basename(val,".shtml")
                var filename = path.join(dist,flo,basename + ".html")
              }else{
                var filename = toFullName
              }
              var parser = new ssi(Dir,dist,dir+val,true)
              fs.readFile(dir+val,"utf8",function(err,data){
                if(err){
                  console.log(err)
                }else{
                  var content = parser.parse(dir+val,data)
                  fs.writeFile(filename,content.contents,{encoding:"utf8"},function(err){
                    if(err){
                      console.log(err)
                    }
                  })
                }
              })
            }else if(ext == ".css" || ext == ".scss" || ext == ".sass"){
              if(ext == ".scss"){
                var basename = path.basename(val,".scss")
                var filename = path.join(dist,flo,basename + ".css")
              }else if(ext == ".sass"){
                var basename = path.basename(val,".sass")
                var filename = path.join(dist,flo,basename + ".css")
              }else{
                var filename = toFullName
              }
              var compressed = cssU ? 'compressed' : 'nested'
              var data = sass.renderSync({
                    file: dir+val,
                    outputStyle: compressed
                })
              isDir(todir)
              fs.writeFile(filename,data.css.toString(),{encoding:"utf8"},function(err){
                if(err){
                  console.log(err)
                }
              })
            }else{
              isDir(todir)
              readable = fs.createReadStream( dir+val );
              writable = fs.createWriteStream( toFullName );  
              readable.pipe( writable );
            }
          }else{
            var url = path.join(dir,val,"/")
            getFile(url,path.join(flo,val))
          }
        })
      })
    }


    function isDir(path){
      var exist = fs.existsSync(path)
      if(exist){
        //console.log("已存在目录"+path)
      }else{
        console.log("创建目录："+path)
        fs.mkdirSync(path, 0777,function(err){
          if(err){
            console.log(err)
          }
        })
      }
    }

    function deleteFolder(url) {

        var files = [];

        if( fs.existsSync(url) ) {

            files = fs.readdirSync(url);

            files.forEach(function(file,index){

                var curPath = path.join(url,file);
                
                if(fs.statSync(curPath).isDirectory()) { // recurse

                    deleteFolder(curPath);

                } else { // delete file

                    fs.unlinkSync(curPath);
                    console.log("删除目录："+curPath)
                }

            });

            fs.rmdirSync(url);

        }

    };
}
