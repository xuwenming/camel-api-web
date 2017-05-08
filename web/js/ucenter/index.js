/**
 * Created by snow on 17/5/3.
 */
$(function () {
    $.hideLoadMore();
    init();

    $('.receiptAddress').click(function() {
        try {
            JWEIXIN.openAddress(function (data) {
                var params = {};
                params.userName = data.userName;
                params.postalCode = data.postalCode;
                params.provinceName = data.provinceName;
                params.cityName = data.cityName;
                params.countyName = data.countryName;
                params.detailInfo = data.detailInfo.replace(/[\r\n]/g, "");
                params.telNumber = data.telNumber;

                $('.userInfo').html(data.userName + " " + data.telNumber);
                $('.address').html(data.provinceName + data.cityName + data.countryName + data.detailInfo);
                ajaxPost('api/apiUserAddressController/add', params, function(data){
                    if(data.success) {
                        // 不做任何操作
                    }
                });

                //alert(data.userName + " " + data.postalCode + " " + data.provinceName + " " + data.cityName
                //+ " " + data.countryName + " " + data.detailInfo + " " + data.nationalCode + " " + data.telNumber)
            });
        } catch (e) {
            console.log(e);
        }
    });
});

function init() {
    ajaxPost('api/apiUserController/get', {}, function(data){
        if(data.success) {
            var user = data.obj;
            $('.headImage').css('background-image', 'url('+user.icon+')');
            $('.nickName').html(user.nickName);
            $('.balance').html('￥' + Util.fenToYuan(user.mbBalance));
            $('.phone').html(user.phone);
            if(user.mbShop) {
                $('.shopName').html(user.mbShop.name);
                $('.shopAddress').html(user.mbShop.regionPath + user.mbShop.address);
            }
            if(user.mbUserAddress) {
                $('.userInfo').html(user.mbUserAddress.userName + " " + user.mbUserAddress.telNumber);
                $('.address').html(user.mbUserAddress.provinceName + user.mbUserAddress.cityName + user.mbUserAddress.countyName + user.mbUserAddress.detailInfo);
            }
            $('.mbContract').html(user.mbContract);
        }
    });
}