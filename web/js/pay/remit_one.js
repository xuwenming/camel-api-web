/**
 * Created by snow on 17/5/3.
 */
var orderId = GetRequest('orderId');
var amount = GetRequest('amount');
$(function () {
    $.hideLoadMore();
    init();

    $('.next-btn').click(function(){
        window.location.href = '../pay/remit_two.html?amount=' + amount;
    });
});

function init() {
    ajaxPost('api/apiBaseDataController/basedata', {dataType:'TB'}, function(data){
        if(data.success) {
            var result = data.obj;
            for(var i in result) {
                if(result[i].id == 'TB01') {
                    $('.bank_card_no').html(result[i].name);
                } else if(result[i].id == 'TB02') {
                    $('.user_name').html(result[i].name);
                } else if(result[i].id == 'TB03') {
                    $('.bank_icon').attr('src', result[i].icon);
                    $('.bank_name').html(result[i].name);
                }
            }
        }
    });
}

