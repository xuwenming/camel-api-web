<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>订单列表</title>
    <jsp:include page="../inc.jsp"></jsp:include>
</head>
<body>
    <!--头部导航 开始-->
    <header class="bar bar-nav">
        <h1 class="title">订单列表</h1>
    </header>
    <!--头部导航 结束-->

    <!--主体部分 开始-->
    <div class="content">
        <div class="sortbox">
            <div class="weui-row">
                <div class="weui-col-33"><a href="" class="on">待支付</a></div>
                <div class="weui-col-33"><a href="">待发货</a></div>
                <div class="weui-col-33"><a href="">已完成</a></div>
            </div>
        </div>
    </div>
    <!--主体部分 结束-->

    <!--底部固定导航 开始-->
    <div class="weui-tabbar">
        <a href="${pageContext.request.contextPath}/" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-shouye"></i> </div>
            <p class="weui-tabbar__label">首 页</p>
        </a>
        <a href="${pageContext.request.contextPath}/shopping/shopping.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-gouwuche"></i> </div>
            <p class="weui-tabbar__label">购物车</p>
        </a>
        <a href="${pageContext.request.contextPath}/order/order_list.jsp" class="weui-tabbar__item weui-bar__item--on">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-dingdan"></i> </div>
            <p class="weui-tabbar__label">订 单</p>
        </a>
        <a href="../ucenter/index.html" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-wode"></i> </div>
            <p class="weui-tabbar__label">个 人</p>
        </a>
    </div>
    <!--底部固定导航 结束-->

    <script type="text/javascript">

    </script>
</body>

</html>
