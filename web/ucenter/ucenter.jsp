<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>我的</title>
    <jsp:include page="../inc.jsp"></jsp:include>
</head>
<body>
    <!--头部导航 开始-->

    <!--头部导航 结束-->

    <!--主体部分 开始-->
    <div class="ucenter_content">
        <div class="jiben">
            <a class="" href="/ucenter/config/ziliao.html">
                <div class="tx_box">

                    <div class="tx">
                        <img class="tx" src="/Public/images/default_avatar_128_128.jpg" >
                    </div>
                    <ul>
                        王子订单的                        <li>编号：1063</li>
                        <!--<li></li>-->
                    </ul>

                    <div class="myinfo"><i class="sstfont sst-xiangyou"></i></div>
                </div>
            </a>
            <div class="clearfix"></div>

        </div>

        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="/recharge/index/tangdou_chongzhi.html">
                <div class="weui-cell__bd">
                    <p><i class="sstfont sst-qianbao"  ></i>钱包</p>
                </div>
                <div class="weui-cell__ft">
                    ￥588888
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <p><i class="sstfont sst-mobile"  ></i>手机号</p>
                </div>
                <div class="weui-cell__ft">13818680753
                </div>
            </a>

            <a class="weui-cell weui-cell_access" href="/shop/index/cart.html">
                <div class="weui-cell__bd">
                    <p><i class="sstfont sst-shopName"  ></i>门店名称</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="/shop/index/my_collect.html">
                <div class="weui-cell__bd">
                    <p><i class="sstfont sst-address"  ></i>地址</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="/shop/index/order_list.html">
                <div class="weui-cell__bd">
                    <p><i class="sstfont sst-contactPeople"  ></i>联系人</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="/dashi/index/order_list.html">
                <div class="weui-cell__bd">
                    <p> <i class="sstfont sst-receiveAddress"  ></i>收货地址</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="/dashi/index/order_list.html">
                <div class="weui-cell__bd">
                    <p> <i class="sstfont sst-"  ></i>合同</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
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
        <a href="${pageContext.request.contextPath}/order/order_list.jsp" class="weui-tabbar__item ">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-dingdan"></i> </div>
            <p class="weui-tabbar__label">订 单</p>
        </a>
        <a href="${pageContext.request.contextPath}/ucenter/ucenter.jsp" class="weui-tabbar__item weui-bar__item--on">
            <div class="weui-tabbar__icon"> <i class="iconfont icon-wode"></i> </div>
            <p class="weui-tabbar__label">个 人</p>
        </a>
    </div>
    <!--底部固定导航 结束-->

    <script type="text/javascript">

    </script>
</body>

</html>
