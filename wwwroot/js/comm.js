!function($) {
	// 通用
	$(document).ready(function(){ // 导航栏动画
		var $nav = $(".top-nav");
		var li = $nav.find("li").mouseover(function(){ // 二级菜单
			var $this = $(this)
			$this.find(".sub-nav").css("display","block")
			.mouseout(function(){
				$(this).css("display","none")
			})
			$this.siblings("li").find(".sub-nav").css("display","none")
		})

		$(window,document).on("scroll",function(){
			var top = $(document).scrollTop()
			if(top > 0){
				$nav.addClass("not-top")
			}else{
				$nav.removeClass("not-top")
			}
		})

		$('.ani-show').detectAndAddClass('ani-in') // 页面监听滚动位置动画
	})


	$.fn.detectAndAddClass = function(className) { // 监听页面滚动是否到达元素高度
		this.each(function(){
			var $this = $(this),
				top = $this.offset().top,
				w_h = window.innerHeight,
				height = w_h - ($this.height()*0.2);
			function regScroll() {
				// detect height
				if($(document).scrollTop() >= top-height ) {
					$this.addClass(className)
					$(window).off('scroll', regScroll)
				}
			}
			$(window).on('scroll', regScroll)
		})
	}

}(jQuery)