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
            $('.weui-loadmore').hide();
            $('div[class$="content"]').show();

        }
    });

    /**
     * 加载js csc
     * */
    $.include(['js/jquery-weui.js',
        'js/swiper.js',
        'js/common.js',
        'js/extJquery.js',
        'js/jquery.lazyload.js',
        'js/load/load.js',
        'js/fastclick.js',
        'js/jquery.raty.js',
        'css/swiper.min.css',
        'css/weui.min.css',
        'css/jquery-weui.css',
        'css/swiper.min.css',
        'css/style.css',
        'css/iconfont.css',
        'js/load/load.css']);

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
        $('body').prepend('<div class="weui-loadmore"> <i class="weui-loading"></i> <span class="weui-loadmore__tips">正在加载</span> </div>').show();
    }
    $(function () {
        hideContent();
    });
}());
