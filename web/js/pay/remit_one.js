/**
 * Created by snow on 17/5/3.
 */
var orderId = GetRequest('orderId');
var amount = GetRequest('amount');
$(function () {
    $.hideLoadMore();
    init();

    $('.next-btn').click(function(){
        if($('.ui-img-cover.active').length == 0) {
            $.toast("<font size='3pt;'>请选择汇款银行</font>", "text");
            return;
        }
        var url = '../pay/remit_two.html?amount=' + amount + "&bankCode=" + $('.ui-img-cover.active').attr('data-id');
        if(orderId) url += '&orderId=' + orderId;
        window.location.href = url;
    });

    $('.remit-list').on('click', '.ui-img-cover', function(){
        $('.ui-img-cover.active').removeClass('active');
        $(this).addClass('active');
    });
});

function init() {
    ajaxPost('api/apiBaseDataController/basedata', {dataType:'TB'}, function(data){
        if(data.success) {
            var result = data.obj;
            for(var i in result) {
                $.extend(result[i], eval('(' + result[i].description + ')'));
                if(result[i].isdeleted == 1) continue;

                var viewData = Util.cloneJson(result[i]);
                var dom = Util.cloneDom("remit_template", result[i], viewData);
                dom.find('.ui-img-cover').attr('data-id', result[i].id);
                $(".remit-list").append(dom);
            }
        }
    });
}

