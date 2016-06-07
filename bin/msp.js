#!/usr/bin/env node

var program = require('commander'),
	lib = require('../lib')

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
  

program.parse(process.argv)
