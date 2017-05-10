/**
 * Created by snow on 17/5/3.
 */
var orderId = GetRequest('orderId');
$(function () {
    init();
});

function init() {
    $('.order-mess li:not(:first)').hide();
    ajaxPost('api/apiOrderController/get', {id : orderId}, function(data){
        if(data.success) {
            var order = data.obj, btnHtml = '';
            if(order.status == 'OD01') {
                $('.statusIcon').attr('src', '../images/order_status_1.png');
                btnHtml = '<a class="border doCancel">取消订单</a><a class="solid doPay">去支付</a>';
            } else if(order.status == 'OD10' || order.status == 'OD05') {
                $('.statusIcon').attr('src', '../images/order_status_0.png');
            } else if(order.status == 'OD20') {
                $('.statusIcon').attr('src', '../images/order_status_3.png');
                btnHtml = '<a class="solid doReceipt">确认收货</a>';
            } else if(order.status == 'OD30') {
                $('.statusIcon').attr('src', '../images/order_status_2.png');
            }

            $('.orderId').html(order.id);
            console.log(order.mbOrderItemList);
            drawItem(order.mbOrderItemList);

            var contactPhone = order.contactPhone.substr(0, 3) + '****' + order.contactPhone.substr(order.contactPhone.length - 4);
            $('#address .info').empty().append('<h3><b>'+order.contactPeople+'</b><span>'+contactPhone+'</span></h3>');
            $('#address .info').append('<p>'+order.deliveryAddress+'</p>');

            $('.deliveryWay').html(order.deliveryWayName);
            $('.userRemark').html(order.userRemark);

            if(order.invoiceWay == 'IW02') {
                $('#companyName').val(order.companyName);
                $('#companyTfn').val(order.companyTfn);
                $('#bankName').val(order.bankName);
                $('#bankNumber').val(order.bankNumber);
                $('#invoiceUse').val(order.invoiceUse);
            } else {
                $('.invoice-title').append('（' + order.invoiceWayName + '）');
            }

            $('.totalPrice').html('￥' + Util.fenToYuan(order.totalPrice));
            if(btnHtml) $('.btns').html(btnHtml);

            // 取消订单
            $('.btns').find('.doCancel').click(order.id, _cancelOrder);
            // 支付
            $('.btns').find('.doPay').click(order, _pay);
            // 确认收货
            $('.btns').find('.doReceipt').click(order.id, _receipt);
        }

        $.hideLoadMore();
    });
}

function drawItem(itemList) {
    for (var i=0; i<itemList.length; i++) {
        buildItem(itemList[i]);
    }
}

function buildItem(orderItem) {
    var viewData = Util.cloneJson(orderItem);
    viewData.marketPrice = '￥' + Util.fenToYuan(orderItem.marketPrice);
    viewData.contractPrice = '￥' + Util.fenToYuan(orderItem.buyPrice);
    var dom = Util.cloneDom("order_item2_template", orderItem, viewData);

    dom.find('i.ui-img-cover').css('background-image', 'url('+orderItem.item.url+')');
    dom.addClass('ui-row-flex');
    if(orderItem.marketPrice == orderItem.buyPrice) {
        dom.find('.bot').html('<p><span name="contractPrice">'+viewData.contractPrice+'</span></p>');
    }

    dom.click(orderItem.item.id, function(event){
        window.location.href = '../item/item_detail.html?itemId=' + event.data;
    });

    $('.order-item-list').append(dom);
    return dom;
}

function _cancelOrder(event) {
    $.confirm("确认要取消订单吗?", "系统提示", function() {
        ajaxPost('api/apiOrderController/delete', {id:event.data}, function(data){
            if(data.success) {
                window.location.replace('../order/index.html');
            }
        });
    });
}

function _pay(event) {
    var order = event.data;
    window.location.href = '../pay/pay.html?orderId=' + order.id + '&amount=' + order.totalPrice;
}

function _receipt(event) {
    $.confirm("确认收货交易将完成，您是否确认?", "系统提示", function() {
        ajaxPost('api/apiOrderController/receipt', {id:event.data}, function(data){
            if(data.success) {
                $('.statusIcon').attr('src', '../images/order_status_2.png');
                $('.btns').find('.doReceipt').remove();
            }
        });
    });
}