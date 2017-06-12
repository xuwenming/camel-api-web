/**
 * Created by snow on 17/5/5.
 */
$(function () {
    init();

    setTimeout(function(){
        $('#shopAddress').click(function() {
            try {
                JWEIXIN.openAddress(function (data) {
                    $('#shopAddress').val(data.provinceName + data.cityName + data.countryName + data.detailInfo.replace(/[\r\n]/g, ""));
                    if($('#contactPeople').val() == '') {
                        $('#contactPeople').val(data.userName);
                    }
                    $('#regionId').val('');
                });
            } catch (e) {
                console.log(e);
            }
        });
    }, 20);

    $('#submitShop').bind('click', submitShop);
});

function init() {
    ajaxPost('api/apiUserController/getShop', {}, function(data){
        if(data.success && data.obj) {
            var shop = data.obj;
            if(shop.auditStatus == 'AS01') {
                $('#submitShop').addClass('gray').html('认证中...');
            } else if(shop.auditStatus == 'AS02') {
                $('#submitShop').addClass('gray').html('认证成功');
                $('.icon').show().find('img').attr('src', '../images/auth_success.png')
            } else {
                $('#shopId').val(shop.id);
                $('.icon').show().find('img').attr('src', '../images/auth_failed.png')
            }
            $('#shopName').val(shop.name);
            $('#shopAddress').val(shop.regionPath || "" + shop.address);
            $('#contactPeople').val(shop.contactPeople);
            $('#regionId').val(shop.regionId);
        }
        $.hideLoadMore();
    });
}

function submitShop() {
    if($('#submitShop').hasClass('gray')) return;
    var shopName = $.trim($('#shopName').val());
    if(Util.checkEmpty(shopName)) {
        $.toptip('请输入门店名称', 'error');
        return;
    }
    var shopAddress = $('#shopAddress').val();
    if(Util.checkEmpty(shopAddress)) {
        $.toptip('请选择门店地址', 'error');
        return;
    }
    var contactPeople = $.trim($('#contactPeople').val());
    if(Util.checkEmpty(contactPeople)) {
        $.toptip('请输入联系人', 'error');
        return;
    }
    var params = {name : shopName, address : shopAddress, contactPeople : contactPeople, regionId : $('#regionId').val()};
    if($('#shopId').val()) params.id = $('#shopId').val();

    ajaxPost('api/apiUserController/submitShop', params, function(data){
        if (data.success) {
            window.location.replace('../ucenter/index.html');
        } else {
            $.toptip(data.msg, 'error');
        }
    }, function(){
        $.loading.load({type:2, msg:'提交中...'});
    }, -1);
}

