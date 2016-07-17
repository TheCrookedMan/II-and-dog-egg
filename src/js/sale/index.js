(function() {
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);

    if (!userinfo.Uid) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
        normal();
    } else {
        initCommitionMoney();
        $(".pinfo .setting").show();
        $(".mySale .list.mt05").show();
        if (userinfo.Uidentity == 1) {
            $(".pinfo .UserIdentity").text("身份：推广大使");
            $(".pinfo .link a").text("爱心传递");
            $(".pinfo .link a").attr('href', '/profile/how_1.html');
        } else {
            $(".pinfo .UserIdentity").text("身份：普通会员");
            $(".pinfo .link a").text("如何成为健康推广大使？");
            $(".pinfo .link a").attr('href', '/profile/how_2.html');
        }

        if (userinfo.IdentityState == 1) {
            $(".pinfo .link a").text("如何继续做公益");
            $(".pinfo .link a").attr('href', '/profile/how_3.html');
            $(".IdentityStateDisable").show();
        } else {
            $(".IdentityStateActive").show();
            // countdownTimer.init("2016-10-10 10:10:00",function(d){
            countdownTimer.init(userinfo.LostAgentTime, function(d) {
                $(".IdentityStateActive .time").html("距截止还有<em>" + d.day + "</em>天<em>" + d.hour + "</em>时<em>" + d.min + "</em>分<em>" + d.sec + "</em>秒 ");
            });
        }
    }

    function normal() {
        $(".pinfo .UserIdentity").text("身份：普通会员");
        $(".pinfo .link a").text("如何成为健康推广大使？");
        $(".pinfo .link a").attr('href', '/profile/how_2.html');

        $(".mySale .link-toPrice").attr('href', 'javascript:;');
        $(".mySale .link-toCode").attr('href', 'javascript:;');
        $(".mySale .link-toTeam").attr('href', 'javascript:;');
        $(".mySale .link-toSale").attr('href', 'javascript:;');

        $(".mySale").on("click", "a", function() {
            modal.alert({ text: "暂无记录，购买土鸡蛋年卡套餐即可成为健康推广大使获得爱心回报，快来吧！" })
        })
    }

    function initCommitionMoney() {
        $.post('/distribution/commitionMoney.post', { Uid: userinfo.Uid }).success(function(data) {
            if (data.code == "1" && !!data.data) {
                var record = data.data;
                $(".FrozenMoney").text(record.FrozenMoney.toFixed(2));
                $(".WithdrawMoney").text(record.WithdrawMoney.toFixed(2));
            }
        });
    }
}).call(this);
