/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */

var jsApiList = [
    'checkJsApi',
    'onMenuShareAppMessage',
    'onMenuShareTimeline',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'getLocalImgData',
    'hideOptionMenu',
    'showOptionMenu',
    'showAllNonBaseMenuItem',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'onVoicePlayEnd',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'openAddress'
];
var appId, timestamp, nonceStr, signature;
ajaxPostSync("api/apiCommon/wxJSSign", {signUrl:location.href}, function(data){
    if(data.success) {
        appId = data.obj.appId;
        timestamp = data.obj.timestamp;
        nonceStr = data.obj.nonceStr;
        signature = data.obj.signature;
    }
});
wx.config({
    debug: false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: jsApiList
});

var JWEIXIN = {};
wx.ready(function () {
    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    JWEIXIN.checkJsApi = function() {
        wx.checkJsApi({
            jsApiList: jsApiList,
            success: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };

    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    JWEIXIN.onMenuShareAppMessage = function(shareData, success){
        wx.onMenuShareAppMessage({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                //alert('已分享');
                if(success)
                    success('AppMessage');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    };

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    JWEIXIN.onMenuShareTimeline = function(shareData, success) {
        wx.onMenuShareTimeline({
            title: shareData.title,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
               // alert('已分享');
                if(success)
                    success('Timeline');
            },
            cancel: function (res) {
               // alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    };

    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    JWEIXIN.onMenuShareQQ = function (shareData, success) {
        wx.onMenuShareQQ({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            trigger: function (res) {
               // alert('用户点击分享到QQ');
            },
            complete: function (res) {
               // alert(JSON.stringify(res));
            },
            success: function (res) {
               // alert('已分享');
                if(success)
                    success('QQ');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
               // alert(JSON.stringify(res));
            }
        });
    };

    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    JWEIXIN.onMenuShareWeibo = function (shareData, success) {
        wx.onMenuShareWeibo({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            trigger: function (res) {
               // alert('用户点击分享到微博');
            },
            complete: function (res) {
               // alert(JSON.stringify(res));
            },
            success: function (res) {
               // alert('已分享');
                if(success)
                    success('Weibo');
            },
            cancel: function (res) {
               // alert('已取消');
            },
            fail: function (res) {
               // alert(JSON.stringify(res));
            }
        });
    };

    // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
    JWEIXIN.onMenuShareQZone = function (shareData, success) {
        wx.onMenuShareQZone({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            trigger: function (res) {
                //alert('用户点击分享到QZone');
            },
            complete: function (res) {
               // alert(JSON.stringify(res));
            },
            success: function (res) {
               // alert('已分享');
                if(success)
                    success('QZone');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    };

    // 4 音频接口
    // 4.2 开始录音
    JWEIXIN.startRecord = function (success) {
        wx.startRecord({
            // TODO 是否有success方法
            success: function(){
                if(success)
                    success();
            },
            cancel: function () {
                //alert('用户拒绝授权录音');
            }
        });
    };

    // 4.3 停止录音
    JWEIXIN.stopRecord = function (success) {
        wx.stopRecord({
            success: function (res) {
                //alert(res);
                if(success)
                    success(res.localId);
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    };

    // 4.4 监听录音自动停止
    JWEIXIN.onVoiceRecordEnd = function(success) {
        wx.onVoiceRecordEnd({
            complete: function (res) {
                if(success)
                    success(res.localId);
                //voice.localId = res.localId;
               // alert('录音时间已超过一分钟');
            }
        });
    };

    // 4.5 播放音频
    JWEIXIN.playVoice = function (localId) {
        if (localId == '') {
            //alert('请先使用 startRecord 接口录制一段声音');
            return;
        }
        wx.playVoice({
            localId: localId
        });
    };

    // 4.6 暂停播放音频
    JWEIXIN.pauseVoice = function (localId) {
        wx.pauseVoice({
            localId: localId
        });
    };

    // 4.7 停止播放音频
    JWEIXIN.stopVoice = function (localId) {
        wx.stopVoice({
            localId: localId
        });
    };

    // 4.8 监听录音播放停止
    JWEIXIN.onVoicePlayEnd = function(success) {
        wx.onVoicePlayEnd({
            complete: function (res) {
                if(success)
                    success(res.localId);
                //alert('录音（' + res.localId + '）播放结束');
            }
        });
    };


    // 4.8 上传语音
    JWEIXIN.uploadVoice = function (localId, success) {
        if (localId == '') {
           // alert('请先使用 startRecord 接口录制一段声音');
            return;
        }
        wx.uploadVoice({
            localId: localId,
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
               // alert('上传语音成功，serverId 为' + res.serverId);
                //voice.serverId = res.serverId;
                if(success)
                    success(res.serverId);
            }
        });
    };

    // 5 图片接口
    // 5.1 拍照、本地选图
    JWEIXIN.chooseImage= function (success, count) {
        wx.chooseImage({
            count: count || 9, // 默认9
            success: function (res) {
                if(success)
                    success(res.localIds);
                //images.localId = res.localIds;
                //alert('已选择 ' + res.localIds.length + ' 张图片');
            }
        });
    };

    // 5.2 图片预览 imageUrls = []
    JWEIXIN.previewImage = function (imageUrls, index) {
        wx.previewImage({
            current: imageUrls[index || 0],
            urls: imageUrls
        });
    };

    // 5.3 上传图片 localIds = []
    JWEIXIN.uploadImage = function (localIds, success) {
        if (localIds.length == 0) {
            //alert('请先使用 chooseImage 接口选择图片');
            return;
        }
        var i = 0, length = localIds.length;
        //images.serverId = [];
        function upload() {
            wx.uploadImage({
                localId: localIds[i],
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function (res) {
                    i++;
                    //alert('已上传：' + i + '/' + length);
                    //images.serverId.push(res.serverId);
                    res.localId = res.localId || localIds[i-1];
                    if(success)
                        success(res.serverId, res.localId, i);
                    if (i < length) {
                        upload();
                    }
                },
                fail: function (res) {
                   // alert(JSON.stringify(res));
                }
            });
        }
        upload();
    };

    // 5.4 获取本地图片接口
    JWEIXIN.previewImage = function (localId, success) {
        wx.getLocalImgData({
            localId: localId, // 图片的localID
            success: function (res) {
                var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                if(success)
                    success(localData);
            }
        });
    };

    // 8 界面操作接口
    // 8.1 隐藏右上角菜单
    JWEIXIN.hideOptionMenu = function () {
        wx.hideOptionMenu();
    };

    // 8.2 显示右上角菜单
    JWEIXIN.showOptionMenu = function () {
        wx.showOptionMenu();
    };

    // 8.6 显示所有被隐藏的非基本菜单项
    JWEIXIN.showAllNonBaseMenuItem = function () {
        wx.showAllNonBaseMenuItem({
            success: function () {
                alert('已显示所有非基本菜单项');
            }
        });
    };
    JWEIXIN.openAddress = function(success) {
        alert(111);
        wx.openAddress({
            success: function (res) {
                // 用户成功拉出地址
                // alert(res);
                if(res && res.errMsg == 'openAddress:ok' && success)
                    success(res);
            },
            cancel: function () {
                // 用户取消拉出地址
            }
        });
    };

    // 默认影藏菜单
    JWEIXIN.hideOptionMenu();
});
