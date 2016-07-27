(function() {
    var qrcodeText = "不是推广大使，不能推广！";

    qrcodeText = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+window.appid+"&redirect_uri="+window.redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=/index/index.html?shareParentId=" + userinfo.Uid + "&connect_redirect=1#wechat_redirect";

    if ("1" == comeFromShare) {
        showShareUserInfo();
    } else {
        showUserInfo();
    }
    // var host = window.location.host;
    // var qrcodeText = 'http://'+host + '/profile/register.html?ParentID=' + userinfo.Uid;

    // if (userinfo.UserIdentity == 1) {
    //     $(".qrcode-disabled").hide();
    // } else {
    //     $(".qrcode-disabled").show();
    // }
    initShare("扫描二维码看看我和二丫的故事", "我在二丫家边吃边玩边做公益，你也一起来吧！");


    function showUserInfo() {
        var wechatUserInfo = common.getCookie("wechatUserInfo");
        $(".people").attr('src', wechatUserInfo.headimgurl);
        $(".pinfo .txt .tit").text(wechatUserInfo.nickname);

        if (!userinfo.Uid) {
            $(".pinfo .UserIdentity").text("身份：普通会员");
        } else {
            if (userinfo.UserIdentity == 1) {
                $(".pinfo .UserIdentity").text("身份：推广大使");
                $(".pinfo .img .bg").attr('src', '/img/jiankangdashi@2x.png');
                qrcodeText = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+window.appid+"&redirect_uri="+window.redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=/index/index.html?shareParentId=" + userinfo.Uid + "&connect_redirect=1#wechat_redirect";
            } else {
                $(".pinfo .UserIdentity").text("身份：普通会员");
            }
        }
        initQRCode();
    }

    function showShareUserInfo() {
        if(!shareParentId){
            $.post('/log/write.post', { info: "二维码分享页面，用户通过其他用户的分享进入。shareParentId 为空！"});
            return false;
        }
        $.post('/user/getUserInfo.post', { Uid: shareParentId }).success(function(data) {
            if ("1" == data.code && !!data.data) {
                var record = data.data;
                $(".people").attr('src', record.wImage);
                $(".pinfo .txt .tit").text(record.wName);
                if (record.UserIdentity == 1) {
                    $(".pinfo .UserIdentity").text("身份：推广大使");
                    $(".pinfo .img .bg").attr('src', '/img/jiankangdashi@2x.png');
                    qrcodeText = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+window.appid+"&redirect_uri="+window.redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=/index/index.html?shareParentId=" + record.Uid + "&connect_redirect=1#wechat_redirect";
                } else {
                    $(".pinfo .UserIdentity").text("身份：普通会员");
                }
                initQRCode();
            } else {}
        })
        
    }

    function initQRCode() {
        // $("#doc-qrcode").attr('src','/qr/:text'+qrcodeText);
        $('#doc-qrcode').empty().qrcode({
            text: qrcodeText, // 要生产二维码的文字
            render: "canvas", // 渲染方式，默认的选择顺序为 `canvas` -> `svg` -> `table`
            width: 175, // 二维码宽度 `px`
            height: 175, // 二维码高度 `px`
            correctLevel: 3, // 纠错级别，可取 0、1、2、3，数字越大说明所需纠错级别越大
            background: "#ffffff", // 背景色
            foreground: "#000000" // 前景色
        });
    }

}).call(this)
