(function() {
    $(".updatePassword-password").on("keyup", "#password", function(ev) {
        var keyValue = $(this).val();
        keyValue = keyValue.substr(-1);
        if (keyValue >= 0 && keyValue <= 9) {
            var number = $(this).val();
            var len = number.length;
            if (len > 6) {
                $(this).blur();
            } else {
                $.each($(".password-panel span"), function(i, I) {
                    if (i < len) {
                        $(I).text("*");
                    } else {
                        $(I).text("");
                    }
                });
                // if (len == 6) {
                //     $(this).blur();
                //     submitPassword();
                // }
            }
        } else if (ev.keyCode == 8) {
            var number = $(this).val();
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
                window.location.href = "/profile/profile.html";
            } else {
                modal.alert({ text: data.message });
            }
        });
    }
}).call(this)
