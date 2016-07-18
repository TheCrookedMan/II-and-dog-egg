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
                if (len == 6) {
                    $(this).blur();
                    submitPassword();
                }
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

    $("#setPassword").on('click', function() {
        // var pwd=$("#password").val();
        // if(pwd.length==6){
        //    submitPassword();
        // }
        // else{
        //     modal.alert({ text: '请输入6位密码！' });
        // }
        submitPassword();
    })

    function submitPassword() {
        var password = $("#password").val();
        if (password.length == 6) {
            password = $.md5(password);
            $.post('/distribution/checkSetSecurityCode.post', { Uid: userinfo.Uid, SecurityCode: password }).success(function(data) {
                if ("1" == data.code && !!data.data && data.data.IsCheck ) {
                    window.location.href = "/sale/setting/updatePassword-2.html";
                } else {
                    modal.alert({ text: data.message });
                }
            });
        } else {
            modal.alert({ text: '请输入6位密码！' });
        }
    }
}).call(this)
