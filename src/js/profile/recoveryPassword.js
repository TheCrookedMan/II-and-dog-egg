(function() {
    var time, count = 60;
    var fromUrl = window.location.search.substr(1).replace("fromUrl=", "");
    $(".am-form").on("click", ".sendSMS", function(ev) {
        var data = common.parseForm(".am-form");
        if (common.regMobileNo(data.mobileNo)) {
            sendSMS(data.mobileNo)
        } else {
            modal.alert({ text: "请确认手机号是否输入正确！" });
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
                var pwd = $.md5(params.userpwd);

                $.post('/sign_recovery.post', {
                    phone: params.mobileNo,
                    password: pwd,
                    yzm: params.smsCode,

                }).success(function(data) {
                    if ("1" == data.code) {
                        modal.alert({
                            text: data.message
                        })
                        setTimeout(function() { history.go(-1); }, 3000);
                    } else {
                        modal.alert({ text: data.message });
                    }
                });
                return false;
            }
            return false;
        }
    });

    function sendSMS(mobileNo) {
        $.post('/smsCode/register_smscode.post', { phone: mobileNo, type: 1 }).success(function(data) {
            if ("1" == data.code) {
                modal.alert({ text: data.message });
                $(".am-form .sendSMS").attr('disabled', 'disabled');
                timeout();
            } else if (!!data.data && data.data['IsExist']) {
                modal.tip(data.message);
                // setTimeout(function() {
                //     window.location.href = "/profile/bind.html?fromUrl=" + fromUrl;
                // }, 2000)
            } else {
                modal.alert({ text: data.message });
            }
        })
    }
}).call(this)
