# ms-point 使用文档

## 修改新增功能

+ 编译出错时打印错误提示，不会自动关闭服务器。
+ `css`文件自动添加前缀。
+ `png`文件压缩。

## 工具安装

+ `npm install -g ms-point` 更新最新 ms-point
+ `sudo npm install -g ms-point` (苹果系统)
+ 若安装出错可能为node-sass模块出错，请使用淘宝镜像 cnpm 命令如下(cnpm安装方法 <a href="https://npm.taobao.org/">点击此处</a> 查看)：
+ `cnpm install -g ms-point`

## 创建目录

### 关键字：

    msp init
    msp start
    msp pack

+ 如果是全新项目，在目录下使用`msp init`命令初始化项目目录和文件。
+ 初始化后的目录下会生成一个`wwwroot`文件夹，若已有该文件夹则忽略。
+ 初始化生成的`wwwroot`目录下将生成一个`example`文件夹，该文件夹下有本工具基本用法的实例。
+ 若已存在`wwwroot`目录，则不生成`example`实例文件。
+ 初始化成功后，将自己的项目放入`wwwroot`文件夹下即可运行 `msp start` 开启服务（默认80端口，如端口被占用，可在命令行提示中输入想要的端口号执行服务）。

## 集成功能

+ `scss`，`sass` 实时在线预览（无需编译打包）
+ `livereload` 自动刷新
+ `ssi` `include` 语法 (语法形式为： `<!--#include virtual="header.shtml" -->` 如上语句将把该行代码位置替换成header.shtml文件内容。支持其他ssi语法 具体参阅 <a href="https://www.npmjs.com/package/ssi">ssi</a> )
+ `js`文件`css`文件打包 
+ `css`文件自动添加前缀
+ `png`文件压缩

## 打包处理

+ 通过执行 `msp pack` 执行打包命令（默认不压缩文件）。
+ 默认生成打包文件目录为 `./dist` 如已经存在 `dist`文件夹，则会将内部文件删除后再将打包文件复制进目录，因此若存在有用的同名文件夹请修改文件夹名称。
+ `msp pack` 命令会处理 `sass` 文件以及 `ssi` 语法，如果需要压缩 `js` 或 `css` 可跟参数 `-j|--javascript` ， `-c|--css` 或者 `-a|--all`。
+ `-j|--js` 该参数会将所有`js`文件压缩。（暂不支持ES6语法压缩，若存在ES6语法将导致报错退出）。
+ `-c|--css` 该参数会将所有`css`文件压缩（即使原先是`scss`或者`sass`也会被预编译后压缩）。
+ `-a|--all` 该参数会将`css`和`js`都压缩。
+ `-p|--png` 该参数会将`wwwroot`目录下的所有`.png`图片压缩。

## 打包实例

	msp pack -a

+ 运行如上代码，会将当前`wwwroot`目录下的内容打包到项目文件夹 `./dist` 文件夹下，且压缩`js`以及`css`文件。（ 默认配置已处理`scss`编译以及`ssi`语法 ）

## 注意

+ 若用`sass`编译`css`文件，`html`文件内部 `<link>` 标签的 `href` 属性后缀应为 `.css` 后台开启的`express`服务器会将同名的 `.scss` 或 `.sass` 文件编译后代理到同名的 `.css` 请求内容里，如：

	`<link href="css/style.css" rel="stylesheet">`

  以上链接，若 `css/` 目录下不存在`style.css`文件，将会请求 `style.scss` 或 `style.sass` 文件并且编译后作为`css`文件。执行 `msp pack` 命令后会在 `./dist` 目录下生成`css`文件，因此`html`文件里无需改变。

+ 对于 `.html` 和 `.shtml` 文件，服务器也会在同名之间互相代理，如目录下没有 `index.shtml` 文件，访问 `localhost/index.shtml `时，则会访问到同名的 `.html` 文件。 同样如果不存在 `.html` 文件时，会访问到同名的`.shtml `文件。但执行 `msp pack` 打包命令以后，所有的 `.shtml` 文件都将被重命名为 `.html` 。因此如有跳转链接时，统一使用 `.html` 后缀。

+ `wwwroot` 目录只用于托管项目资源，请勿将 `node_modules` 文件夹放入`wwwroot`目录下，打包时将会忽略`node_modules`目录。如需node模块资源可将其放在与`wwwroot`目录同级的`node_modules`下。

## 高级

+ `msp init` 初始化时生成 `DEV-INF/route.js` 文件，该文件用于对生成的 `express` 服务器进行配置。
+ 若需要对`express`服务器进行操作，可在初始化时创建的 `DEV-INF/route.js` 文件进行相关配置，该文件已暴露服务器对象为`app` ，可以对其做反向代理等处理，也可在本地引入`node`模块对其进行处理。