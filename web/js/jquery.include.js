/**
 * ***********
 * {js name} 动态加载 module
 * {author} liang
 * =========================================================================================================================
 */

$(function(){
	
	$(".include").each(function(){
		
		var pageUrl = $(this).attr("data-src"), index = $(this).attr("data-index"), isHeader = $(this).hasClass('header');
		$.get(pageUrl,function(html){
			if(isHeader) {
				$("head").append(html);
			} else {
				$("body").append(html);

				//if($(".header").length != 0) {
				//	$(".header-name").text(document.title);
				//}

				if($(".bottom").length != 0 && !$(".bottom a").eq(index).hasClass("active")) {
					$(".bottom a").eq(index).addClass("active");
				}
			}
		})
	})
	
})
	
	
