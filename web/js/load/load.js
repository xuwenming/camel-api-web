(function($){
	var numCount = 0;
	$.loading = {
		load: function(options){
			numCount ++ ;
			if($("div[id^=loading_]").length > 0 || $("div[id^=loading_]", window.parent.document).length > 0) return;
			var defaults = {id:'',msg:'正在加载中', imageUrl:'load.gif', type:1};
			var opts = $.extend(defaults, options);

			var loadHtml;
			if(opts.type == 1) {
				loadHtml = "<div id=\"loading_"+opts.id+"\">"
					+ "<div class=\"DialogDiv\" style=\"display:none; \">"
					+ "<div class=\"weui-infinite-scroll\" style=\"font-size:12px;\"><div class=\"infinite-preloader\"></div>"+defaults.msg+"</div>"
					+ "</div></div>";
			} else if(opts.type == 2) {
				loadHtml = "<div id=\"loading_"+opts.id+"\" style='opacity: 0.5;filter: alpha(opacity = 0.5);'>"
					+ "<div class=\"DialogDiv\" style=\"display:none; \">"
					+ "<div class=\"U-guodu-box\" style='padding: 10px 60px;'><div class='U-msg'>"
					+ "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">"
					+ "<tr><td align=\"center\"><img src=\""+opts.imageUrl+"\"></td></tr>"
					+ "<tr><td align=\"center\"><font>"+opts.msg+"</font></td></tr>"
					+ "</table></div></div></div></div>";
			} else {
				loadHtml = "<div id=\"loading_"+opts.id+"\" style='opacity: 0.5;filter: alpha(opacity = 0.5);'>"
					+ "<div class=\"DialogDiv\" style=\"display:none; \">"
					+ "<div class=\"U-guodu-box\" style='padding: 0px 50px 0px 40px;'><div class='U-msg' style='padding-bottom: 0px;'>"
						//+ "<div class=\"weui-infinite-scroll\" style=\"font-size:12px;\"><div class=\"infinite-preloader\"></div>"+defaults.msg+"</div>"
					+ "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style='margin-top: 12px;'>"
						//+ "<tr><td align=\"center\"><img src=\""+opts.imageUrl+"\"></td></tr>"
					+ "<tr><td align=\"center\"><img style='margin-top: 5px;' src=\""+opts.imageUrl+"\"></td><td align=\"center\" style='padding-left: 8px;'><font>"+opts.msg+"</font></td></tr>"
					+ "<tr height='20px'><td align=\"center\"></td><td align=\"left\" valign='top' style='padding-left:15px;'><font class='moreMsg' style='letter-spacing:4px;'></font></td></tr>"
					+ "</table></div></div></div></div>";
			}

				//+ "</div></div>";
			$("body").append(loadHtml);
			
			$("#loading_" + opts.id).css({ display: "block", height: $(document).height() });
			var yscroll = document.documentElement.scrollTop;
			var screenx=$(window).width();
			var screeny=$(window).height();
		  	$(".DialogDiv").css("display", "block");
 			$(".DialogDiv").css("top",yscroll+"px");
			var DialogDiv_width=$(".DialogDiv").width();
			var DialogDiv_height=$(".DialogDiv").height();
			$(".DialogDiv").css("left",(screenx/2-DialogDiv_width/2)+"px");
			$(".DialogDiv").css("top",(screeny/2-DialogDiv_height/2)+"px");
			//$("body").css("overflow","hidden");
			/*setTimeout(function(){
				if($("div[id^=loading_]").length > 0) {
					$("div[id^=loading_]").find("table tr td font").html("加载失败，<a href='javascript:location.reload();' style='color:white;'><i>点击这里</i></a>&nbsp;重新加载！")
				}
			}, 5000);*/
		}, 
		close: function(time) {
			setTimeout(function(){
				$("div[id^=loading_]").remove();
				numCount -- ;
			}, time || 0);

		}
	};

	/**
	//备份jquery的ajax方法
	var _ajax=$.ajax;
	var index = 1;
	//重写jquery的ajax方法
	$.ajax=function(opt){
		opt.index = index;
		//备份opt中error和success方法
		var fn = {
			error:function(XMLHttpRequest, textStatus, errorThrown){},
			success:function(data, textStatus){},
			beforeSend:function(XMLHttpRequest){},
			complete:function(XMLHttpRequest,textStatus){}
		}
		if(opt.error){
			fn.error=opt.error;
		}
		if(opt.success){
			fn.success=opt.success;
		}
		if(opt.beforeSend){
			fn.beforeSend=opt.beforeSend;
		}
		if(opt.complete){
			fn.complete=opt.complete;
		}

		//扩展增强处理
		var _opt = $.extend(opt,{
			beforeSend:function(XMLHttpRequest){
	        	fn.beforeSend(XMLHttpRequest);
	        },
			error:function(XMLHttpRequest, textStatus, errorThrown){
				//错误方法增强处理
				fn.error(XMLHttpRequest, textStatus, errorThrown);
				//$.loading.close(opt.index);
			},
			success:function(data, textStatus){
				//成功回调方法增强处理
				fn.success(data, textStatus);
			},
			complete:function(XMLHttpRequest,textStatus){
				fn.complete(XMLHttpRequest,textStatus);
				setTimeout(function(){
					$.loading.close();
				}, 500);
           	}
		});
		_ajax(_opt);
		index = index + 1;
	};**/

})(jQuery);

