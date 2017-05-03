/**
 * Created by john on 17/5/4.
 */
/**
 * Created by john on 17/5/3.
 */
;
(function () {
    var index = $('script[src*="index="]').attr("src").split("=")[1];
    $('body').append('<div class="weui-tabbar">'+
        '    <a href="../home/index.html" class="weui-tabbar__item ">'+
    '    <div class="weui-tabbar__icon"><i class="iconfont icon-shouye"></i></div>'+
    '<p class="weui-tabbar__label">首 页</p>'+
    '</a>'+
    '<a href="../shopping/index.html" class="weui-tabbar__item ">'+
    '    <div class="weui-tabbar__icon"><i class="iconfont icon-gouwuche"></i></div>'+
    '<p class="weui-tabbar__label">购物车</p>'+
    '    </a>'+
    '    <a href="../order/index.html" class="weui-tabbar__item ">'+
    '    <div class="weui-tabbar__icon"><i class="iconfont icon-dingdan"></i></div>'+
    '<p class="weui-tabbar__label">订 单</p>'+
    '</a>'+
    '<a href="../ucenter/index.html" class="weui-tabbar__item weui-bar__item--on">'+
    '   <div class="weui-tabbar__icon"><i class="iconfont icon-wode"></i></div>'+
    '<p class="weui-tabbar__label">个 人</p>'+
    '</a>'+
    '</div>');
    $('.weui-tabbar a').removeClass('weui-bar__item--on');
    $('.weui-tabbar a:eq('+index+')').addClass('weui-bar__item--on');
}());
