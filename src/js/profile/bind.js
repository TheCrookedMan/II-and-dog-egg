(function() {
    var OpenID = common.getOpenId();
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    var unionid = wechatUserInfo.unionid;
    var ParentID = $.cookie('shareParentId');
    var fromUrl = window.location.search.substr(1).replace("fromUrl=", "");

    $("#bindForm").validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var params = common.parseForm(".am-form");
                var pd = $.md5(params.password);
                $.post('/distribution/appBind.post', {
                    "username": params.name,
                    "userpwd": pd,
                    // 'openid': OpenID,
                    'openid': unionid,
                    'wImage': wechatUserInfo.headimgurl,
                    'wName': wechatUserInfo.nickname,
                    'ParentID': ParentID
                }).success(function(data) {
                    if (data.code == "1") {
                        modal.tip("绑定成功！");
                        $('.am-dimmer').hide();

                        if (!ParentID) {
                            $.post('/log/write.post', { info: "=======console log========== bind app page =================OpenID：" + OpenID + "========username：" + params.name + "======userpwd：" + pd + "=========openid：" + OpenID });
                        }
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
        $.post('/user/getUserInfo.post', { OpenID: unionid }).success(function(data) {

            if ("1" == data.code && !!data.data) {
                var record = data.data;
                common.setCookie('userinfo', JSON.stringify(record));
                if (!!fromUrl) {
                    window.location.href = fromUrl;
                } else {
                    setTimeout(function() {
                        // history.go(-1)
                        window.location.href = '/profile/profile.html';
                    }, 1000);
                }

            } else {
                common.setCookie('userinfo', '{}');
                window.location.href = fromUrl;
            }
        })
    }
}).call(this)
