$(function(){
    var tokenId = $.cookie('tokenId');
    // TODO 验证tokenId是否有效
    if(!tokenId) {
        tokenId = GetRequest()['tokenId'];
        var isBindPhone = GetRequest()['isBindPhone'];
        if(tokenId == undefined) {
            if(isWeiXin()) {
                window.location.href = server_url + "api/apiUserController/loginByWx";
            } else {
                // TODO 非微信浏览器，暂不做其他操作
                $.showContent();
            }
        } else {
            $.cookie('tokenId', tokenId, {path:'/'});
            if(isBindPhone == 2) {
                window.location.href = '../ucenter/bindPhone.html';
            } else {
                $.showContent();
            }
        }
    } else {
        $.showContent();
    }
});