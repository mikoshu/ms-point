#!/usr/bin/env node

var program = require('commander'),
    lib = require('../lib'),
    fs = require('fs'),
    pkg = fs.readFileSync(__dirname.replace(/\\bin/,'')+'/package.json'),
    version = JSON.parse(pkg).version

program
    .version(version)

program
    .command('init')
    .description('初始化项目目录')
    .action(function() {
       lib.init()
    });

program
    .command('start')
    .description('开启服务器')
    .action(function() {
       lib.start()
    });

program
    .command('pack')
    .description('打包wwwroot目录')
    .action(function(){
        lib.pack()
    })

program
  .option('-a, --all','打包文件中.js和.css文件进行压缩')
  .option('-j, --javascript','打包时压缩js文件')
  .option('-v, --version', '查看ms-point版本号')
  .option('-c, --css', '打包时只压缩css')

program
    .command('*')
    .action(function(env) {
        console.log('无效的参数名："%s"，请输入 msp --help 查看参数介绍 ', env)
    }) 

program.parse(process.argv)
