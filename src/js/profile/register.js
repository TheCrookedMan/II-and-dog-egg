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
                var ParentID = params.ParentID;
                if(!ParentID){
                    ParentID = $.cookie('shareParentId');
                }
                $.post('/user/register.post', {
                    username: params.mobileNo,
                    userpwd: pwd,
                    verifycode: params.smsCode,
                    OpenID: OpenID,
                    ParentID: ParentID,
                    wImage: wechatUserInfo.headimgurl,
                    wName: wechatUserInfo.nickname
                }).success(function(data) {
                    if ("1" == data.code) {

                        if (!ParentID) {
                            console.log("=======console log========== register user page =================OpenID：" + OpenID + "========username："+params.mobileNo+"======userpwd："+pwd+"=========openid："+OpenID);
                        }

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
                // window.location.href = '/profile/profile.html';
                history.go(-1);
            } else {
                common.setCookie('userinfo', '{}');
                // window.location.href = '/profile/profile.html';
                history.go(-1);
            }
        })
    }

    function sendSMS(mobileNo) {
        $.post('/smsCode/register_smscode.post', { phone: mobileNo, type: 0 }).success(function(data) {

            if ("1" == data.code) {
                modal.alert({ text: data.message });
                $(".am-form .sendSMS").attr('disabled', 'disabled');
                timeout();
            } else if (!!data.data && data.data['IsExist']) {
                modal.tip(data.message);
                setTimeout(function() {
                    window.location.href = "/profile/bind.html?fromUrl="+fromUrl;
                }, 2000)
            } else {
                modal.alert({ text: data.message });
            }
        })
    }
}).call(this)
