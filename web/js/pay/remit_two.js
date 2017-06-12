/**
 * Created by snow on 17/5/3.
 */
var orderId = GetRequest('orderId');
var amount = GetRequest('amount');
var bankCode = GetRequest('bankCode');
$(function () {
    $.hideLoadMore();

    $("#transferBtn").bind("click", transfer);

    $('#amount').val(Util.fenToYuan(amount));
    $("#remitterTime").val(new Date().format('yyyy-MM-dd HH:mm')).datetimePicker({
        title: '汇款日期',
        min: "1990-12-12",
        max: "2050-12-12 12:12",
        onChange: function (picker, values, displayValues) {
            //console.log(values);
        }
    });
});

function transfer() {
    var remitter = $.trim($('#remitter').val());
    if(Util.checkEmpty(remitter)) {
        $.toptip('请填写汇款人');
        return;
    }
    amount = $.trim($('#amount').val());
    if(Util.checkEmpty(amount) || amount == 0) {
        $.toptip('请填写汇款金额');
        return;
    }
    var remark = $.trim($('#remark').val());
    if(Util.checkEmpty(remark)) {
        $.toptip('请填写汇款备注');
        return;
    }

    if(orderId)
        ajaxPost('api/pay/remitPay', {amount:amount*100,orderId:orderId,payWay:'PW03',orderType:'OT01',remitter:remitter,remark:remark,remitterTime:$('#remitterTime').val(),bankCode:bankCode}, function(data){
            $.loading.close();
            if(data.success) {
                $.alert('提交成功！请耐心等待审核','系统提示', function(){
                    window.location.replace('../order/order_detail.html?orderId=' + orderId);
                });
            } else {
                $.alert(data.msg,'系统提示', function(){
                    window.location.replace('../order/order_detail.html?orderId=' + orderId);
                });
            }
        }, function(){
            $.loading.load({type:2, msg:'提交中...'});
        }, -1);
    else
        ajaxPost('api/apiBalanceController/balanceRemit', {amount:amount*100,remitter:remitter,remitterTimeStr:$('#remitterTime').val(),content:remark,bankCode:bankCode}, function(data){
            $.loading.close();
            if(data.success) {
                $.alert('提交成功！请耐心等待审核','系统提示', function(){
                    window.location.replace('../ucenter/index.html');
                });
            } else {
                $.alert(data.msg,'系统提示');
            }
        }, function(){
            $.loading.load({type:2, msg:'提交中...'});
        }, -1);
}


