(function() {
    var OpenID = common.getOpenId();
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    var unionid = wechatUserInfo.unionid;
    var publicNumber = "";
    $("#password").val(publicNumber);
    $(".updatePassword-password").on("keyup", "#password", function(ev) {
        var keyValue = $(this).val();
        if ((!/^[0-9]*$/.test(keyValue) || "" == keyValue) && ev.keyCode != 8) {
            $("#password").val(publicNumber);
            $("#password").focus().blur();
            return false;
        }
        keyValue = keyValue.substr(-1);
        if (keyValue >= 0 && keyValue <= 9) {
            var number = $(this).val();
            publicNumber = number;
            var len = number.length;
            if (len > 6) {
                $(this).val(number.substring(0, 6));
                publicNumber = $(this).val();
                $("#password").blur();
            } else {
                $.each($(".password-panel span"), function(i, I) {
                    if (i < len) {
                        $(I).text("*");
                    } else {
                        $(I).text("");
                    }
                });
            }
        } else if (ev.keyCode == 8) {
            var number = $(this).val();
            publicNumber = number;
            var len = number.length;
            $.each($(".password-panel span"), function(i, I) {
                if (i < len) {
                    $(I).text("*");
                } else {
                    $(I).text("");
                }
            });
        }
    });
    $(".updatePassword-password").on("open.modal.amui", function() {
        var list = $(this).find(".password-panel span");
        $.each(list, function(k, K) {
            $(K).text("");
        });
        $("#password").val("");
    })

    $("#okPassword").on('click', function() {
        submitPassword();
    })

    function submitPassword() {
        var pwd = $("#password").val();
        if ($.md5(pwd) == password) {
            // submitPassword();
        } else if (pwd.length != 6) {
            modal.alert({ text: '请输入6位密码！' });
            return false;
        } else {
            modal.alert({ text: '密码不一致！' });
            return false;
        }

        $.post('/distribution/SetSecurityCode.post', { Uid: userinfo.Uid, SecurityCode: password }).success(function(data) {
            if ("1" == data.code) {
                // window.location.href = "/profile/profile.html";
                getUserInfo();
            } else {
                modal.alert({ text: data.message });
            }
        });
    }

    function getUserInfo() {
        $.post('/user/getUserInfo.post', { OpenID: unionid }).success(function(data) {
            if ("1" == data.code && !!data.data) {
                var record = data.data;
                common.setCookie('userinfo', JSON.stringify(record));
            } else {
                common.setCookie('userinfo', '{}');
            }
            window.location.href = '/profile/profile.html';
        })
    }
}).call(this)
