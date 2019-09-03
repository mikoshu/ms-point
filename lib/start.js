var	server = require("../index")
var port = 80

var arv = process.argv;

arv.forEach(function (val) {
	if(val.indexOf('port=') > -1){
		port = val.split('port=')[1]
	}
})

module.exports = function(){
	server(port)
}
