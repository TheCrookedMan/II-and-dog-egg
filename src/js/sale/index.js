(function() {
    $.post('/distribution/commitionMoney.post', { Uid: userinfo.Uid }).success(function(data) {
        if (data.code == "1" && !!data.data) {
            var record = data.data;
            $(".FrozenMoney").text(record.FrozenMoney.toFixed(2));
            $(".WithdrawMoney").text(record.WithdrawMoney.toFixed(2));
        }
    });

    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);

    if (!userinfo.Uid) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
        normal();
    } else {
        $(".pinfo .setting").show();
        $(".mySale .list.mt05").show();
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

        $(".mySale .link-toPrice").attr('href', 'javascript:;');
        $(".mySale .link-toCode").attr('href', 'javascript:;');
        $(".mySale .link-toTeam").attr('href', 'javascript:;');
        $(".mySale .link-toSale").attr('href', 'javascript:;');

        $(".mySale").on("click", "a", function() {
            modal.alert({ text: "啊哦暂无记录！单次购满699即可升级为健康推广大使获得丰厚收益，快来吧！" })
        })
    }
}).call(this);
