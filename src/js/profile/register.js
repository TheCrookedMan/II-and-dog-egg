(function() {
    var time, count = 60;
    var OpenID = common.getOpenId();
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    var fromUrl = window.location.search.substr(1).replace("fromUrl=", "");
    $(".am-form").on("click", ".sendSMS", function(ev) {
        var data = common.parseForm(".am-form");
        if (common.regMobileNo(data.mobileNo)) {
            sendSMS(data.mobileNo)
        } else {
            modal.alert({ text: "情确认手机号是否输入正确！" });
        }
    });

    function timeout() {
        time = setInterval(function() {
            if (count <= 1) {
                count = 60;
                $(".am-form .sendSMS").removeAttr('disabled');
                $(".am-form .sendSMS").text("发送验证码");
                clearTimeout(time);
            } else {
                count--;
                $(".am-form .sendSMS").text(count + " 秒后重发");
            }
        }, 1000);
    }

    $('#registerForm').validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var params = common.parseForm(".am-form");
                $.post('/user/register.post', {
                    username: params.mobileNo,
                    userpwd: $.md5(params.userpwd),
                    verifycode: params.smsCode,
                    OpenID: OpenID,
                    ParentID: params.ParentID,
                    wImage: wechatUserInfo.headimgurl,
                    wName: wechatUserInfo.nickname
                }).success(function(data) {
                    if ("1" == data.code) {
                        getUserInfo();
                        // var record = data.data;
                        // common.setCookie('userinfo',JSON.stringify(record));
                        // window.location.href = fromUrl;
                    } else {
                        modal.alert({ text: data.message });
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
                window.location.href = fromUrl;
            } else {
                common.setCookie('userinfo', '{}');
                window.location.href = fromUrl;
            }
        })
    }

    function sendSMS(mobileNo) {
        $.post('/smsCode/register_smscode.post', { phone: mobileNo, type: 0 }).success(function(data) {
            modal.alert({ text: data.message });
            if ("1" == data.code) {
                $(".am-form .sendSMS").attr('disabled', 'disabled');
                timeout();
            }
        })
    }
}).call(this)
