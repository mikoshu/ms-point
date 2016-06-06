var baseSrc = "wwwroot/"

fis.set('project.files', [baseSrc+'**']); // 配置需要执行的项目路径

fis.match( '*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match( '*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.scss', {
  // fis-parser-node-sass-x sass，scss转换成css文件
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    // options... 内置参数可查看 fis-parser-node-sass 文档
  })
})
fis.match( '*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

fis.match('*.shtml', {
  // fis-parser-ssi 处理页面内ssi语法处内容
  parser: fis.plugin('ssi'),
  rExt: '.html'
})

fis.match('*.html', {
  // fis-parser-ssi 处理页面内ssi语法处内容
  parser: fis.plugin('ssi')
})

fis.hook('relative'); 
//让所有文件，都使用相对路径。 
fis.match('**', { relative: true })

