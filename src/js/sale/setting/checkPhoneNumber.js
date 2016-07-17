(function() {
    var time, count = 60;

    $(".am-form").on("click", ".sendSMS", function(ev) {
        var data = common.parseForm(".am-form");

        if (common.regMobileNo(data.mobileNo)) {
            sendSMS(data.mobileNo)
        } else {
            modal.alert({ text: "请确认手机号是否输入正确！" });
        }
    })

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

    $(".am-form").validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var data = common.parseForm(".am-form");
                CheckSmsCode(data.mobileNo, data.smsCode);
            }
            return false;
        }
    });

    function sendSMS(mobileNo) {
        $.post('/user/SendSmscode.post', { phone: mobileNo, type: 2 }).success(function(data) {
            modal.alert({ text: data.message });
            if ("1" == data.code) {
                $(".am-form .sendSMS").attr('disabled', 'disabled');
                timeout();
            }
        });
    }

    function CheckSmsCode(mobileNo, smsCode) {
        $.post('/user/CheckSmsCode.post', { phone: mobileNo, type: 2, yzm: smsCode }).success(function(data) {
            if ("1" == data.code && !!data.data) {
                var record = data.data;
                if (record.IsCheck) {
                    window.location.href = "/sale/setting/updatePassword-2.html";
                } else {
                    modal.alert({ text: data.message });
                }
            } else {
                modal.alert({ text: data.message });
            }
        });
    }
}).call(this);