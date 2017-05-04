$(function(){
    var tokenId = $.cookie('tokenId');
    if(!tokenId) {
        tokenId = GetRequest()['tokenId'];
        if(tokenId == undefined) {
            if(isWeiXin()) {
                window.location.href = "http://www.mobiang.com/camel/api/apiUserController/loginByWx";
            } else {
                // 跳转登录注册页
            }
        } else {
            $.cookie('tokenId', tokenId, {path:'/'});
            $.showContent();
        }
    } else {
        $.showContent();
    }
});