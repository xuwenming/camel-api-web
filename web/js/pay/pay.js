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
    var index = $('.pay-list li i.on').closest('li').index();
    if(index == 0) {
        amount = 1; // TODO 测试专用
        var params = {amount:amount, orderId:orderId, payWay:'PW02', orderType : 'OT01'}; // 微信支付
        if(isWeiXin()) {
            wxPayCall(params, function(){
                $.toast("支付成功", function(){
                    window.location.replace('../order/order_detail.html?orderId=' + orderId);
                });
            }, function(){
                // 跳转订单详情
                window.location.replace('../order/order_detail.html?orderId=' + orderId);
            });
        } else {
            $.alert("请在微信内打开订单，进行支付！", "系统提示！");
        }
    } else {

    }

}
