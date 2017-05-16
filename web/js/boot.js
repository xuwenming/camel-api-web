/**
 * Created by john on 17/5/3.
 */
;
(function () {
    $.extend({
        includePath: '../',
        include: function (file) {
            var files = typeof file == "string" ? [file] : file;
            for (var i = 0; i < files.length; i++) {
                var name = files[i].replace(/^\s|\s$/g, "");
                var att = name.split('.');
                var ext = att[att.length - 1].toLowerCase();
                var isCSS = ext == "css";
                var tag = isCSS ? "link" : "script";
                var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
                var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
                if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
            }
        },
        showContent: function () {
            $('div[class$="content"]').show();

        },
        hideLoadMore : function() {
            $('.weui-loadmore:not(.loading)').hide();
        },
        showLoadMore : function() {
            $('.weui-loadmore:not(.loading)').show();
        }
    });

    /**
     * 加载js csc
     * */
    $.include([
        'js/jquery-weui.min.js',
        'js/md5.min.js',
        'js/swiper.min.js',
        'js/common.js',
        'js/extJquery.js',
        'js/jquery.lazyload.js',
        'js/load/load.js',
        'js/fastclick.js',
        'js/jquery.include.js',
        'js/loginCheck.js',

        'css/weui.min.css', // 必须放在jquery-weui.min.css前面，否则部分样式失效
        'css/jquery-weui.min.css',
        'css/swiper.min.css',
        'js/load/load.css',
        'css/ui.base.css',
        'css/ui.common.css'
    ]);

    window.addEventListener('load', function () {
        FastClick.attach(document.body);
    }, false);
    /**
     * 校验token是否失效
     */
    function invalidToken () {
        //TODO 校验cookie是否有效
    }

    invalidToken();
    /**
     * 隐藏主题
     */
    function hideContent () {
        //$('body').show();
        if($('.weui-loadmore').length > 0) {
            $('body').show();
        } else {
            $('body').prepend('<div class="weui-loadmore"> <i class="weui-loading"></i> <span class="weui-loadmore__tips">正在加载</span> </div>').show();
        }

        $('div[class$="content"]').hide();
    }
    $(function () {
        hideContent();
    });
}());
