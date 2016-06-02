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
    .description('调用fis3打包')
    .action(function(){
        lib.pack()
    })

program
  .option('-d','输出到文件夹')
  .option('-h, --help','print this help message')
  .option('-v, --version', 'print product version and exit')
  .option('-r, --root <path>', 'specify project root')
  .option('-f, --file <filename>','specify the file path of `fis-conf.js`')
  .option('--no-color', 'disable colored output')
  .option('--verbose', 'enable verbose mode')

program.parse(process.argv)
