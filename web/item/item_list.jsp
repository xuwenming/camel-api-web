<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>首页</title>
    <jsp:include page="../inc.jsp"></jsp:include>
</head>
<body>
    <!--头部导航 开始-->
    <header class="bar bar-nav">
        <h1 class="title">首页</h1>
    </header>
    <!--头部导航 结束-->

    <!--主体部分 开始-->
    <div class="content">
        <div class="weui-search-bar" id="searchBar">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
                    <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" id="searchText">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
    </div>
    <!--主体部分 结束-->

    <!--底部固定导航 开始-->
    <div class="weui-tabbar">
        <a href="${pageContext.request.contextPath}/" class="weui-tabbar__item weui-bar__item--on">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-shouye"></i> </div>
            <p class="weui-tabbar__label">首 页</p>
        </a>
        <a href="${pageContext.request.contextPath}/shopping/shopping.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-gouwuche"></i> </div>
            <p class="weui-tabbar__label">购物车</p>
        </a>
        <a href="${pageContext.request.contextPath}/order/order_list.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-dingdan"></i> </div>
            <p class="weui-tabbar__label">订 单</p>
        </a>
        <a href="${pageContext.request.contextPath}/ucenter/ucenter.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-wode"></i> </div>
            <p class="weui-tabbar__label">个 人</p>
        </a>
    </div>
    <!--底部固定导航 结束-->

    <script type="text/javascript">
        document.onreadystatechange =function(){
            if(document.readyState == 'interactive') {
                $.loading.load();
            }
            if(document.readyState == 'complete') {
                $.loading.close();
            }
        }
    </script>
</body>

</html>
