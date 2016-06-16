!function($) {
	$(document).ready(function(){
		var $img = $(".ac-img"),
			$box = $(".ac-box")
		$img.on("click",function(e){
			var $this = $(this)
			$this.next().slideToggle()
			.parent().siblings(".goods-list-box")
			.find(".ac-box").slideUp();
			
		})
	})
}(jQuery)