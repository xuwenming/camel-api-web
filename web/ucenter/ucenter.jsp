<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>我的</title>
    <jsp:include page="../inc.jsp"></jsp:include>
</head>
<body>
    <!--头部导航 开始-->
    <header class="bar bar-nav">
        <h1 class="title">我的</h1>
    </header>
    <!--头部导航 结束-->

    <!--主体部分 开始-->
    <div class="content">

    </div>
    <!--主体部分 结束-->

    <!--底部固定导航 开始-->
    <div class="weui-tabbar">
        <a href="/" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-shouye"></i> </div>
            <p class="weui-tabbar__label">首 页</p>
        </a>
        <a href="/shopping/shopping.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-gouwuche"></i> </div>
            <p class="weui-tabbar__label">购物车</p>
        </a>
        <a href="/order/order_list.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-dingdan"></i> </div>
            <p class="weui-tabbar__label">订 单</p>
        </a>
        <a href="/ucenter/ucenter.jsp" class="weui-tabbar__item weui-bar__item--on">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-wode"></i> </div>
            <p class="weui-tabbar__label">个 人</p>
        </a>
    </div>
    <!--底部固定导航 结束-->

    <script type="text/javascript">

    </script>
</body>

</html>
