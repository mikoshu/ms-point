# ms-point 使用文档

## 工具安装

+ npm install -g ms-point 更新最新 ms-point
+ sudo npm install -g ms-point (苹果系统)

## 创建目录

### 关键字：

    msp init
    msp start
    msp pack

+ 如果是全新项目，在目录下使用msp init命令初始化项目目录和文件。
+ 初始化后的目录下会生成一个wwwroot文件夹，若已有该文件夹则忽略。
+ 初始化成功后，将自己的项目放入该文件夹下即可运行 msp start 开启服务（默认80端口，如端口被占用，可在命令行提示中输入想要的端口号执行服务）。

## 集成功能

+ scss，sass 实时在线预览（无需编译打包）
+ livereload 自动刷新
+ ssi include 语法
+ js文件css文件打包 

## 打包处理

+ 通过执行 msp pack 执行打包命令（默认不压缩文件）。
+ 默认生成打包文件目录为 ./dist 如已经存在dist文件夹，则会将内部文件删除后再将打包文件复制进目录，因此若存在有用的同名文件夹请修改文件夹名称。
+ msp pack 命令会处理 sass 文件以及 ssi 语法，如果需要压缩 js 或 css 可跟参数 -j|--javascript ， -c|--css 或者 -a|--all。
+ -j|--javascript 该参数会将所有js文件压缩。
+ -c|--css 该参数会将所有css文件压缩（即使原先是scss或者sass也会被预编译后压缩）。
+ -a|--all 该参数会将css和js都压缩。

## 打包实例

	msp pack -a

+ 运行如上代码，会将当前wwwroot目录下的内容打包到项目文件夹 ./dist 文件夹下，且压缩js以及css文件。（ 默认配置已处理scss编译以及ssi语法 ）