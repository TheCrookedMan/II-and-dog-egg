(function() {
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

    $("#nextPassword").on('click', function() {
        // var password = $("#password").val();
        // if (password.length == 6) {
        //     window.location.href = "/sale/setting/updatePassword-3.html?password=" + password;
        // } else {
        //     modal.alert({ text: '请输入6位密码！' });
        // }
        submitPassword();
    })

    function submitPassword() {
        // var password = $("#password").val();
        // if (password.length == 6) {
        //     window.location.href = "/sale/setting/updatePassword-3.html?password=" + password;
        // } else {
        //     modal.alert({ text: '请输入6位密码！' });
        // }
        var password = $("#password").val();
        if (password.length == 6) {
            password = $.md5(password);
            window.location.href = "/sale/setting/updatePassword-3.html?password=" + password;
        } else {
            modal.alert({ text: '请输入6位密码！' });
        }

    }
}).call(this)
