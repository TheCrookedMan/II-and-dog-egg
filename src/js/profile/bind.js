(function() {
    var OpenID = common.getOpenId();
    var wechatUserInfo = common.getCookie("wechatUserInfo");

    var ParentID = $.cookie('shareParentId');

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
                    'wName': wechatUserInfo.nickname,
                    'ParentID': ParentID
                }).success(function(data) {
                    if (data.code == "1") {
                        modal.tip("绑定成功！");
                        $('.am-dimmer').hide();
                        getUserInfo();
                        //window.location.href='/profile/address.html';

                    } else {
                        modal.tip(data.message);
                        $('.am-dimmer').hide();
                    }
                });
                return false;
            }
            return false;
        }
    });

    function getUserInfo() {
        $.post('/user/getUserInfo.post', { OpenID: OpenID }).success(function(data) {
            if ("1" == data.code && !!data.data) {
                var record = data.data;
                common.setCookie('userinfo', JSON.stringify(record));
                setTimeout(function() {
                    window.location.href = '/profile/profile.html';
                }, 1000);
            } else {
                common.setCookie('userinfo', '{}');
                window.location.href = fromUrl;
            }
        })
    }
}).call(this)
