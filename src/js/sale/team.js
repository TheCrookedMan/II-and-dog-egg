(function() {

	var wechatUserInfo = common.getCookie("wechatUserInfo");
    $(".people").attr('src', wechatUserInfo.headimgurl);
    $(".pinfo .txt .tit").text(wechatUserInfo.nickname);

    if (!userinfo.Uid) {
        $(".pinfo .UserIdentity").text("身份：普通会员");
    } else {
        if (userinfo.UserIdentity == 1) {
            $(".pinfo .UserIdentity").text("身份：健康大使");
            $(".pinfo .img .bg").attr('src', '/img/jiankangdashi@2x.png');
        } else {
            $(".pinfo .UserIdentity").text("身份：普通会员");
        }
    }

    $.post('/distribution/getLowerLevelCount.post', { Uid: userinfo.Uid }).success(function(data) {
    	if(data.code == "1" && !!data.data){
    		var record = data.data;
    		$.each(record,function(i,I){
    			$(".level-"+I.Level+" .grade").text(I.Agent);
    			$(".level-"+I.Level+" .normal-member").text(I.Normal);
                if($(".level-"+I.Level+" .grade").text()==0){
                    $(".level-"+I.Level+" .grade").parent().addClass("tips");
                    $(".level-"+I.Level+" .grade").parent().attr("href","javascript:void(0)");
                    $(".tips").on('click', function() {
                        modal.tip("暂无记录");
                        $('.am-dimmer').hide();
                    })
                }
                if($(".level-"+I.Level+" .normal-member").text()==0){
                   $(".level-"+I.Level+" .normal-member").parent().addClass("tips");
                   $(".level-"+I.Level+" .normal-member").parent().attr("href","javascript:void(0)");
                   $(".tips").on('click', function() {
                        modal.tip("暂无记录");
                        $('.am-dimmer').hide();
                    })
                }
    		})
    	}
    })
    $(".am-list>li>a").click(function(){
        $(this).find(".am-margin-right").toggleClass("am-icon-chevron-up");
        $(this).find(".am-margin-right").toggleClass("am-icon-chevron-down");
    })
}).call(this)
