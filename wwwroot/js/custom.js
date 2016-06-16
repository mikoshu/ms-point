!function($) {
	$(document).ready(function(){
		jeDate({
			dateCell:"#textymdhms",  
			isinitVal:false,
			isTime:true, 
			festival: true, //显示节日
			minDate:"2014-09-19 00:00:00",
		})
		jeDate.skin("gray")
		var $check = $(".check-box")
		$check.on("click",function(){ // checkbox
			var $this = $(this),
				name = $this.attr("name")
			$(".check-box[name="+name+"]").removeClass("on")
			$this.addClass("on")
		})

	})
}(jQuery)

