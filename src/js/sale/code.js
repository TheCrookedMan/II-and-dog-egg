(function() {
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);

    var qrcodeText = "";
    if (!userinfo.Uid) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
    } else {
        if (userinfo.UserIdentity == 1) {
            $(".pinfo .UserIdentity").text("身份：推广大使");
            qrcodeText = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e6f77b139c239fc&redirect_uri=http%3a%2f%2fm.xian17.com%2fwechatAuth.html&response_type=code&scope=snsapi_userinfo&state=/index/index.html?shareParentId="+shareParentId+"&connect_redirect=1#wechat_redirect";
        } else {
            $(".pinfo .UserIdentity").text("身份：普通会员");
        }
    }
    var host = window.location.host;
    // var qrcodeText = 'http://'+host + '/profile/register.html?ParentID=' + userinfo.Uid;

    $('#doc-qrcode').empty().qrcode({
        text: qrcodeText, // 要生产二维码的文字
        render: "svg", // 渲染方式，默认的选择顺序为 `canvas` -> `svg` -> `table`
        width: 175, // 二维码宽度 `px`
        height: 175, // 二维码高度 `px`
        correctLevel: 3, // 纠错级别，可取 0、1、2、3，数字越大说明所需纠错级别越大
        background: "#ffffff", // 背景色
        foreground: "#000000" // 前景色
    });
    if (userinfo.UserIdentity == 1) {
        $(".qrcode-disabled").hide();
    } else {
        $(".qrcode-disabled").show();
    }
    initShare("扫描二维码看看我和二丫的故事","我在二丫家边吃边玩边做公益，你也一起来吧！");
}).call(this)
