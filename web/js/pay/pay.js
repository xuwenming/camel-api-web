/**
 * Created by snow on 17/5/3.
 */
var orderId = GetRequest('orderId');
var amount = GetRequest('amount');
$(function () {
    $.hideLoadMore();

    $('.orderId').html(orderId);
    $('.amount').html('￥' + Util.fenToYuan(amount));

    $('#payBtn').bind('click', pay);

    $('.pay-list li').click(function() {
        if($(this).find('i.on').length != 0) return;
        $('.pay-list li i.on').removeClass('on').addClass('off');
        $(this).find('i').removeClass('off').addClass('on');
    });
});

function pay() {
    var payWay = $('.pay-list li i.on').closest('li').attr('data-pay-way');
    if(payWay == 'wx') {
        if(getDevice() != 'Android' && getDevice() != 'iOS') {
            $.alert("请在手机微信内打开进行支付！", "系统提示！");
            return;
        }
        amount = 1; // TODO 测试专用
        var params = {amount:amount}; // 微信支付
        if(orderId) { // 订单支付
            params = $.extend(params, {orderId:orderId, payWay:'PW02', orderType : 'OT01'});
        } else { // 钱包充值
            params = $.extend(params, {refType:'BT001'});
        }
        if(isWeiXin()) {
            params.trade_type = 'JSAPI';
            wxPayCall(params, function(){
                $.toast("支付成功", function(){
                    if(orderId)
                        window.location.replace('../order/order_detail.html?orderId=' + orderId);
                    else
                        window.location.replace('../balance/index.html');
                });
            }, function(){
                // 跳转订单详情
                if(orderId) window.location.replace('../order/order_detail.html?orderId=' + orderId);
            });
        } else {
            //params.trade_type = 'MWEB'; 暂不支持微信外支付
            $.alert("请在手机微信内打开进行支付！", "系统提示！");
        }
    } else if(payWay == 'ye') {

    } else if(payWay == 'zz') {
        var url = '../pay/remit_one.html?amount=' + amount;
        if(orderId) url += '&orderId=' + orderId;
        window.location.href = url;
    }

}
