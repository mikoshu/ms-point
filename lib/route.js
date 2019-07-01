module.exports = { // 反代配置 可配置多个代理
	'/testApi': { // 改方法将把所有包含 testApi 的请求反向代理到 http://xxx.com  具体参数配置请参照 https://www.npmjs.com/package/http-proxy-middleware
		target: 'http://xxx.com',
		pathRewrite: {},
		changeOrigin:true,
		cookieDomainRewrite: ''
	},
	'/testApi2': { // 改方法将把所有包含 testApi2 的请求反向代理到 http://yyy.com 
		target: 'http://yyy.com',
		pathRewrite: {},
		changeOrigin:true,
		cookieDomainRewrite: ''
	}
}