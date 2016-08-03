(function() {
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);
    if (!userinfo.Uid) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
        normal();
    } else {
        $(".pinfo .setting").show();
        if (userinfo.UserIdentity == 1) {
            $(".pinfo .UserIdentity").text("身份：健康大使");
            $(".pinfo .img .bg").attr('src','/img/jiankangdashi@2x.png');
            $(".pinfo .link a").text("爱心传递？");
            $(".pinfo .link a").attr('src', '/profile/how_2.html');
        } else {
            $(".pinfo .UserIdentity").text("身份：普通会员");
            $(".pinfo .link a").text("如何成为健康大使？");
            $(".pinfo .link a").attr('src', '/profile/how_1.html');
        }
        if (userinfo.IdentityState == 1) {
            $(".pinfo .link a").text("如何继续做公益？");
            $(".pinfo .link a").attr('src', '/profile/how_3.html');
        }
    }
    function normal() {
        $("#bindAppA").show();
        $(".pinfo .UserIdentity").text("身份：普通会员");
        $(".pinfo .link a").text("如何成为健康大使？");
        $(".pinfo .link a").attr('src', '/profile/how_2.html');
    }
}).call(this);
