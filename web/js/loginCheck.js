$(function(){
    var tokenId = $.cookie('camel_tokenId');
    // 验证tokenId是否有效
    if(tokenId)
        ajaxPostSync('api/apiCommon/validToken', {}, function(data){
            if(!data.success && data.obj == 'token_expire') {
                tokenId = null;
                $.cookie('camel_tokenId', tokenId);
            }
        });

    if(!tokenId) {
        tokenId = GetRequest()['tokenId'];
        if(tokenId == undefined) {
            if(isWeiXin()) {
                window.location.href = server_url + "api/apiUserController/loginByWx";
                return;
            } else {
                // TODO 非微信浏览器，暂不做其他操作
                $.showContent();
                $.cookie('camel_tokenId', '123456789', {expires:12*60*60*1000, path:'/'});
                return;
            }
        } else {
            $.cookie('camel_tokenId', tokenId, {expires:12*60*60*1000, path:'/'});
        }
    }
    // 判断是否绑定手机号
    if(tokenId) {
        if(location.href.indexOf('/ucenter/bindPhone.html') > -1) {
            $.showContent();
            return;
        }
        ajaxPost('api/apiUserController/getInfo', {}, function(data){
            if(!data.success) {
                $.cookie('camel_tokenId', null);
                window.location.href = server_url + "api/apiUserController/loginByWx";
                return;
            }
            if(data.success && data.obj && !data.obj.phone) {
                window.location.replace('../ucenter/bindPhone.html');
            } else {
                $.showContent();
            }
        });
    }
});