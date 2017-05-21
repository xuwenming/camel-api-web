/**
 * Created by snow on 17/5/3.
 */
var orderId = GetRequest('orderId');
var amount = GetRequest('amount');
var time = 59, balanceAmount = 0;
$(function () {
    $.hideLoadMore();

    $('.orderId').html(orderId);
    $('.amount').html('￥' + Util.fenToYuan(amount));

    if($('.pay-list li[data-pay-way=ye]').length != 0) {
        getBalance();
        $('#vcode-btn').bind('click', getValidateCode);
        $('#balancePay').bind('click', balancePay);
    }

    $('#payBtn').bind('click', pay);

    $('.pay-list li').click(function() {
        if($(this).find('i.on').length != 0) return;
        $('.pay-list li i.on').removeClass('on').addClass('off');
        $(this).find('i').removeClass('off').addClass('on');
    });

});

function getBalance() {
    ajaxPostSync('api/apiBalanceController/getBalance', {}, function(data){
        if(data.success) {
            balanceAmount = data.obj.amount;
            $('.balanceAmount').html(Util.fenToYuan(balanceAmount));
        }
    });
}

function pay() {
    var payWay = $('.pay-list li i.on').closest('li').attr('data-pay-way');
    if(payWay == 'wx') {
        if(getDevice() != 'Android' && getDevice() != 'iOS') {
            $.alert("请在手机微信内打开进行支付！", "系统提示！");
            return;
        }
       // amount = 1; // TODO 测试专用
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
        if(balanceAmount < amount) { // 余额不足
            $.modal({
                title: "余额不足！",
                text: "您的钱包可用余额为"+Util.fenToYuan(balanceAmount)+"元",
                buttons: [
                    { text: "取消", className: "default"},
                    { text: "去充值", onClick: function(){
                        window.location.href = '../balance/recharge.html';
                    } },
                ]
            });
        } else {
            $('#balancePayPopup').popup();
        }

    } else if(payWay == 'zz') {
        var url = '../pay/remit_one.html?amount=' + amount;
        if(orderId) url += '&orderId=' + orderId;
        window.location.href = url;
    }
}

// 余额支付
function balancePay() {
    var vcode = $("#vcode").val();
    if(Util.checkEmpty(vcode)) {
        $.toptip('请输入验证码', 'error');
        return;
    }
    ajaxPost('api/pay/balancePay', {amount:amount, orderId:orderId, payWay:'PW01', orderType : 'OT01', vcode : vcode}, function(data){
        if(data.success) {
            $.toast("支付成功", function(){
                if(orderId)
                    window.location.replace('../order/order_detail.html?orderId=' + orderId);
            });
        } else {
            $.toptip(data.msg, 'error');
        }
    }, function(){
        $.loading.load({type:2, msg:'支付中...'});
    });
}

function getValidateCode() {
    $('#vcode-btn').html("重发（<span id=\"time\">"+time+"</span>）").unbind('click');
    time--;
    var interval = setInterval(function(){
        $("#time").html(time);
        if(time == 0) {
            clearInterval(interval);
            $("#vcode-btn").html("获取验证码").bind("click", getValidateCode);
            time = 59;
        } else {
            time -- ;
        }
    }, 1000);

    ajaxPost('api/pay/getVCode', {}, function(data){
        if(data.success) {
            $.toptip('验证码已发送至手机', 'success');
        } else {
            $.toptip(data.msg, 'error');
            clearInterval(interval);
            $("#vcode-btn").html("获取验证码").bind("click", getValidateCode);
            time = 59;
        }
    });
}
