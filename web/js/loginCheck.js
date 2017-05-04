$(function(){
    var tokenId = $.cookie('tokenId');
    if(!tokenId) {
        tokenId = GetRequest()['tokenId'];
        if(tokenId == undefined) {
            if(isWeiXin()) {
                window.location.href = "http://www.mobiang.com/camel/api/apiUserController/loginByWx";
            } else {
                // TODO 非微信浏览器，暂不做其他操作
                $.showContent();
            }
        } else {
            $.cookie('tokenId', tokenId, {path:'/'});
            $.showContent();
        }
    } else {
        $.showContent();
    }
});