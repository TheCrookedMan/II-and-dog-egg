(function() {
    $(".updatePassword-password").on("keydown", "#password", function(ev) {
        if (ev.keyCode >= 48 && ev.keyCode <= 57) {
            var number = $(this).val();
            var len = number.length + 1;
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
            var len = number.length - 1;
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

    $("#setPassword").on('click',function(){
        var pwd=$("#password").val();
        if(pwd.length==6){
           submitPassword();
        }
        else{
            modal.alert({ text: '请输入6位密码！' });
        }
    })

    function submitPassword() {
        var password=$("#password").val();
        $.post('/distribution/checkSetSecurityCode.post', { Uid: userinfo.Uid, SecurityCode: password }).success(function(data) {
            if ("1" == data.code && !!data.data) {
                  window.location.href = "/sale/setting/updatePassword-2.html";
            } else {
                modal.alert({ text: data.message });
            }
        });
    }
}).call(this)
