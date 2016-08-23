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
                if ("1" == data.code && !!data.data) {
                    if (data.data.IsCheck) {
                        window.location.href = "/sale/setting/updatePassword-2.html";
                    } else {
                        if ("undefined" == typeof(data.data.Surplus)) {
                            modal.alert({
                                text: "密码输入错误超过10次，为了您的账户安全；我们已将您的提现功能锁定，请联系客服解锁400-072-1717"
                            });
                        } else {
                            modal.alert({
                                text: "密码错误，您还可以再输入" +
                                    data.data.Surplus + "次"
                            });
                        }

                    }
                } else {
                    modal.alert({ text: data.message });
                }
            });
        } else {
            modal.alert({ text: '请输入6位密码！' });
        }
    }
}).call(this)
