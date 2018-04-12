
module.exports = function () {
  var fs = require('fs'),
    path = require('path'),
    uglifyJs = require('uglify-js'),
    CleanCSS = require('clean-css'),
    Dir = path.join(process.cwd(), "/wwwroot/"),
    dist = path.join(process.cwd(), "/dist/"),
    ssi = require('ssi'),
    sass = require('node-sass'),
    imagemin = require('imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    autoprefixer = require('autoprefixer'),
    postcss = require('postcss'),
    jsU = false,
    cssU = false,
    imgU = false;

  var arv = process.argv.splice(2);

  arv.forEach(function (val, index) {
    if (val == "-j" || val == "--js") {
      jsU = true
    } else if (val == "-c" || val == "--css") {
      cssU = true
    } else if(val == "-p" || val == "--png"){
      imgU = true
    }else if (val == "-a" || val == "--all") {
      jsU = true
      cssU = true
      imgU = true
    }
  })


  fs.exists(dist, function (exist) {
    if (exist) {
      console.log("已经存在dist目录")
      deleteFolder(dist)
      fs.mkdirSync(dist, 0777, function (err) {
        if (err) {
          console.log(err)
        }
      })
      getFile(Dir, "")
    } else {
      console.log("不存在dist目录,创建dist目录")
      fs.mkdirSync(dist, 0777, function (err) {
        if (err) {
          console.log(err)
        }
      })
      getFile(Dir, "")
    }
  })


  function getFile(dir, flo) {
    var arr = fs.readdirSync(dir)
    arr.forEach(function (val) {
      if (val == ".git") {  // 忽略.git目录
        return false
      }
      if (val == 'node_modules') { // 忽略 node_modules 目录
        return false
      }
      fs.stat(dir + val, function (err, stat) {
        if (stat.isDirectory()) {
          isDir(path.join(dist, flo, val)) // 如果是目录，则创建该目录，递归改目录
          var url = path.join(dir, val, "/")
          getFile(url, path.join(flo, val))
        } else {                           // 如果是文件，则创建上级目录，创建文件
          var ext = path.extname(val)
          var fullname = path.join(flo, val)
          var todir = path.join(dist, flo)
          var toFullName = path.join(dist, fullname)
          if (ext == ".js" && jsU) {
            fs.readFile(dir + val, "utf8", function (err, data) {
              if (err) {
                console.log(err)
              } else {
                var result = uglifyJs.minify(data)
                if (result.error) {
                  console.log('压缩js出错，无法压缩js将直接复制js文件，如使用ES2015等高级语法请使用Babel编译')
                  var code = data
                } else {
                  console.log(dir + val + '压缩成功！')
                  var code = result.code
                }
                isDir(todir)
                fs.writeFile(toFullName, code, { encoding: 'utf8' }, function (err) {
                  if (err) {
                    console.log(err)
                  }
                  //console.log(dir + val + "js压缩复制到dist文件夹成功！")
                })
              }
            })

          } else if (ext == ".html" || ext == ".shtml") {
            if (ext == ".shtml") {
              var basename = path.basename(val, ".shtml")
              var filename = path.join(dist, flo, basename + ".html")
            } else {
              var filename = toFullName
            }
            var parser = new ssi(Dir, dist, dir + val, true)
            fs.readFile(dir + val, "utf8", function (err, data) {
              if (err) {
                console.log(err)
              } else {
                var content = parser.parse(dir + val, data)
                fs.writeFile(filename, content.contents, { encoding: "utf8" }, function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
              }
            })
          } else if (ext == ".scss" || ext == ".sass") {
            if (ext == ".scss") {
              var basename = path.basename(val, ".scss")
              var filename = path.join(dist, flo, basename + ".css")
            } else if (ext == ".sass") {
              var basename = path.basename(val, ".sass")
              var filename = path.join(dist, flo, basename + ".css")
            } else {
              var filename = toFullName
            }
            //var compressed = cssU ? 'compressed' : 'nested'
            sass.render({
              file: dir + val,
              outputStyle: 'nested'
            }, function (error, data) {
              if (error) {
                console.log(error)
              } else {
                isDir(todir)
                if (cssU) {
                  var minifiedCSS = new CleanCSS().minify(data.css.toString()).styles;
                  var cssData = minifiedCSS
                } else {
                  var cssData = data.css.toString()
                }
                postcss([autoprefixer]).process(cssData,{from:undefined}).then(function (result) {
                  result.warnings().forEach(function (warn) {
                    console.warn("css提示：" + warn.toString());
                  });
          
                  fs.writeFile(filename, result.css, { encoding: "utf8" }, function (err) {
                    if (err) {
                      console.log(err)
                    }
                  })
                });
                
              }

            })

          } else if (ext == '.css') {
            fs.readFile(dir + val, 'utf-8', function (err, data) {
              var source = data;
              if (err) {
                console.log(err);
              } else {
                var filename = toFullName;
                if (cssU) {
                  var minifiedCSS = new CleanCSS().minify(source).styles;
                  var cssData = minifiedCSS
                } else {
                  var cssData = source
                }
                postcss([autoprefixer]).process(cssData, { from: undefined }).then(function (result) {
                  result.warnings().forEach(function (warn) {
                    console.warn('css提示：'+warn.toString());
                  });

                  fs.writeFile(filename, result.css, { encoding: "utf8" }, function (err) {
                    if (err) {
                      console.log(err)
                    }
                  })
                });
              }
            })
          } else if(ext == '.png' && imgU){
            console.log('压缩图片:'+val)
            imagemin([dir+'*.png'], todir, {
              plugins: [
                imageminPngquant({ quality: '65-80' })
              ]
            })
          }else {
            isDir(todir)
            readable = fs.createReadStream(dir + val);
            writable = fs.createWriteStream(toFullName);
            readable.pipe(writable);
          }

        }
      })
    })
  }


  function isDir(path) {
    var exist = fs.existsSync(path)
    if (exist) {
      //console.log("已存在目录"+path)
    } else {
      console.log("创建目录：" + path)
      fs.mkdirSync(path, 0777, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }
  }

  function deleteFolder(url) {
    var files = [];
    if (fs.existsSync(url)) {
      files = fs.readdirSync(url);
      files.forEach(function (file, index) {
        var curPath = path.join(url, file);
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteFolder(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
          console.log("删除目录：" + curPath)
        }
      });
      fs.rmdirSync(url);
    }
  };
}
