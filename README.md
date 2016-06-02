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
+ 初始化后的目录下会生成一个wwwroot文件夹，同事生成一份fis-conf.js文件，该文件将用于打包项目，已有相关默认配置，具体配置请查看fis3官方文档。
+ 初始化成功后，将自己的项目放入该文件夹下即可运行 msp start 开启服务。

## 集成功能

+ scss，sass 实时在线预览（无需编译打包）
+ livereload 自动刷新
+ ssi include 语法
+ fis3 

## 打包处理

+ 本工具集成百度fis3的各种功能，执行msp pack命令后，可跟fis3 配置参数运行fis3打包等操作。
+ 可修改生成的fis-conf.js文件，进行自定义打包配置。

## 打包实例

	msp pack release -d ./output

+ 运行如上代码，会将当前wwwroot目录下的内容打包到项目文件夹output文件夹下，（ 默认配置已处理scss编译以及ssi语法 ）