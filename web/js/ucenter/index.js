/**
 * Created by snow on 17/5/3.
 */
$(function () {
    $.hideLoadMore();
    init();
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
                $('.userInfo').html(user.mbUserAddress.contactPeople + " " + user.mbUserAddress.contactPhone);
                $('.address').html(user.mbUserAddress.address);
            }
            $('.mbContract').html(user.mbContract);
        }
    });
}