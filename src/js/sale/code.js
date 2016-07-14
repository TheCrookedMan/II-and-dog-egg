(function() {
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);
    if (!userinfo.UserID) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
    } else {
        if (userinfo.UserIdentity == 1) {
            $(".pinfo .UserIdentity").text("身份：推广大使");
        } else {
            $(".pinfo .UserIdentity").text("身份：普通会员");
        }
    }
    var host = window.location.host;
    var qrcodeText = host + '/profile/register.html?ParentID=' + userinfo.UserID;
    $('#doc-qrcode').empty().qrcode({
        text: qrcodeText, // 要生产二维码的文字
        render: "svg", // 渲染方式，默认的选择顺序为 `canvas` -> `svg` -> `table`
        width: 175, // 二维码宽度 `px`
        height: 175, // 二维码高度 `px`
        correctLevel: 3, // 纠错级别，可取 0、1、2、3，数字越大说明所需纠错级别越大
        background: "#ffffff", // 背景色
        foreground: "#000000" // 前景色
    });
}).call(this)
