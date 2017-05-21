/**
 * Created by snow on 17/5/3.
 */
var loading = true, currPage = 1, rows = 10, tabIndex = GetRequest('tabIndex') || 0;
var statusIcon = {
    OD01 : "../images/order_status_1.png",
    OD05 : "../images/order_status_10.png",
    OD10 : "../images/order_status_10.png",
    OD20 : "../images/order_status_20.png",
    OD30 : "../images/order_status_30.png"
};
$(function () {
    CAMEL_ORDER.init();
});

var CAMEL_ORDER = {
    init : function() {
        this._bindEvent();
        $(document.body).infinite().on("infinite", function() {
            if(loading) return;
            loading = true;
            setTimeout(function() {
                CAMEL_ORDER._getOrderList($('#statusTabs div:has(a.active)').index());
            }, 200);
        });

        $('#statusTabs div:eq('+tabIndex+') a').addClass('active');
        CAMEL_ORDER._getOrderList();
    },
    _bindEvent : function() {
        $('#statusTabs div').click(function() {
            $('#statusTabs a.active').removeClass('active');
            $(this).find('a').addClass('active');
            $('.mask-layer').show();
            tabIndex = $(this).index();
            currPage = 1;
            $(".order-list").empty();
            $.showLoadMore();
            CAMEL_ORDER._getOrderList();
        });
    },
    _getOrderList : function() {
        var params = {page:currPage, rows:rows, sort:'addtime', order:'desc'};
        if(tabIndex == 0)
            params.status = 'OD01'; // 待支付
        else if(tabIndex == 1)
            params.status = 'OD10,OD05'; // 待发货
        else if(tabIndex == 2)
            params.status = 'OD20'; // 待收货
        else if(tabIndex == 3)
            params.status = 'OD30'; // 已完成

        ajaxPost('api/apiOrderController/dataGrid', params, function(data){
            if(data.success) {
                var result = data.obj;
                if(result.rows.length != 0) {
                    for(var i in result.rows) {
                        CAMEL_ORDER._buildOrder(result.rows[i]);
                    }
                } else {
                    if(result.total == 0)
                        $(".order-list").append(Util.noDate(1, '您还没有相关的订单'));
                }

                if(result.rows.length >= rows) {
                    loading = false;
                    currPage ++;
                    $.showLoadMore();
                } else {
                    loading = true;
                    $.hideLoadMore();
                }
                $('.mask-layer').hide();
            } else {
                loading = true;
                $.hideLoadMore();
                $('.mask-layer').hide();
            }
        });
    },
    _buildOrder: function (order) {
        var viewData = Util.cloneJson(order), btnHtml = '';
        if(order.status == 'OD01') {
            btnHtml = '<a class="cancel">取消订单</a><a class="pay">去支付</a>';
        } else if(order.status == 'OD20') {
            btnHtml = '<a class="receipt">确认收货</a>';
        }
        viewData.statusIcon = statusIcon[order.status];

        viewData.itemCount = !order.mbOrderItemList ? 0 :order.mbOrderItemList.length;
        viewData.totalPrice = '￥' + Util.fenToYuan(order.totalPrice);
        var dom = Util.cloneDom("order_list_template", order, viewData);
        $('.order-list').append(dom);

        dom.children('.order-item-list').click(order.id, function(event){
            window.location.href = '../order/order_detail.html?orderId=' + event.data + '&tabIndex=' + tabIndex;
        });

        CAMEL_ORDER._drawItem(dom.find('.order-item-list'), order.mbOrderItemList);

        var $btn = dom.find('.ui-order-list-btn');
        if(btnHtml == '') $btn.remove();
        else $btn.html(btnHtml);

        // 取消订单
        $btn.find('.cancel').click(order.id, CAMEL_ORDER._cancelOrder);
        // 支付
        $btn.find('.pay').click(order, CAMEL_ORDER._pay);
        // 确认收货
        $btn.find('.receipt').click(order.id, CAMEL_ORDER._receipt);
    },
    _drawItem : function(elm, itemList) {
        for (var i=0; i<itemList.length; i++) {
            CAMEL_ORDER._buildItem(elm, itemList[i]);
        }
    },
    _buildItem : function(elm, orderItem) {
        var viewData = Util.cloneJson(orderItem);
        viewData.marketPrice = '￥' + Util.fenToYuan(orderItem.marketPrice);
        viewData.contractPrice = '￥' + Util.fenToYuan(orderItem.buyPrice);
        var dom = Util.cloneDom("order_item2_template", orderItem, viewData);

        dom.find('i.ui-img-cover').css('background-image', 'url('+orderItem.item.url+')');
        dom.addClass('ui-row-flex');
        if(orderItem.marketPrice == orderItem.buyPrice) {
            dom.find('.bot').html('<p><span name="contractPrice">'+viewData.contractPrice+'</span></p>');
        }

        elm.append(dom);
        return dom;
    },
    _cancelOrder : function(event) {
        var $li = $(this).closest('li');
        $.confirm("确认要取消订单吗?", "系统提示", function() {
            ajaxPost('api/apiOrderController/delete', {id:event.data}, function(data){
                if(data.success) {
                    $li.remove();
                    if($(".order-list li").length == 0)
                        $(".order-list").append(Util.noDate(1, '您还没有相关的订单'));
                }
            });
        });
    },
    _pay : function(event) {
        var order = event.data;
        window.location.href = '../pay/pay.html?orderId=' + order.id + '&amount=' + order.totalPrice;
    },
    _receipt : function(event) {
        $.confirm("确认收货交易将完成，您是否确认?", "系统提示", function() {
            ajaxPost('api/apiOrderController/receipt', {id:event.data}, function(data){
                if(data.success) {
                    $('#statusTabs div:eq(2)').click();
                }
            });
        });
    }
};
