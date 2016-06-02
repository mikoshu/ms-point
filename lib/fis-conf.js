var baseSrc = "wwwroot/"

fis.set('project.files', [baseSrc+'**']);

fis.match( '*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match( '*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    // options...
  })
})
fis.match( '*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

fis.match('*.shtml', {
  parser: fis.plugin('ssi'),
  rExt: '.html'
})

fis.match('*.html', {
  parser: fis.plugin('ssi')
})

fis.hook('relative'); 
//让所有文件，都使用相对路径。 
fis.match('**', { relative: true })

