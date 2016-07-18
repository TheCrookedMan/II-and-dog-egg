(function() {
    var OpenID = common.getOpenId();
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    $("#bindForm").validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var params = common.parseForm(".am-form");
                var pd = $.md5(params.password);
                $.post('/distribution/appBind.post', {
                    "username": params.name,
                    "userpwd": pd,
                    'openid': OpenID,
                    'wImage': wechatUserInfo.headimgurl,
                    'wName': wechatUserInfo.nickname
                }).success(function(data) {
                    if (data.code == "1") {
                        modal.tip("绑定成功！");
                        $('.am-dimmer').hide();
                        //window.location.href='/profile/address.html';
                        setTimeout(function() {
                            history.go(-1);
                        }, 1000);
                    } else {
                        modal.tip(data.message);
                        $('.am-dimmer').hide();
                    }
                });
                return false;
            }
            return false;
        }
    })
}).call(this)
