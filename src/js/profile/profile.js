(function() {
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);
    if (!userinfo.Uid) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
        normal();
    } else {
        if (userinfo.Uidentity == 1) {
            $(".pinfo .UserIdentity").text("身份：推广大使");
            $(".pinfo .link a").text("如何推广？");
            $(".pinfo .link a").attr('src', '/profile/how_1.html');
        } else {
            $(".pinfo .UserIdentity").text("身份：普通会员");
            $(".pinfo .link a").text("如何成为健康推广大使？");
            $(".pinfo .link a").attr('src', '/profile/how_2.html');
        }
        if (userinfo.IdentityState == 1) {
            $(".pinfo .link a").text("如何恢复身份？");
            $(".pinfo .link a").attr('src', '/profile/how_3.html');
        }
    }
    function normal() {
        $(".pinfo .UserIdentity").text("身份：普通会员");
        $(".pinfo .link a").text("如何成为健康推广大使？");
        $(".pinfo .link a").attr('src', '/profile/how_2.html');
    }
}).call(this);
