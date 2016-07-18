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

    $("#nextPassword").on('click',function(){
        var password=$("#password").val();
        if(password.length==6){
            window.location.href = "/sale/setting/updatePassword-3.html?password="+password;
        }
        else{
            modal.alert({ text: '请输入6位密码！' });
        }
    })

    function submitPassword() {
        var password=$("#password").val();
    	window.location.href = "/sale/setting/updatePassword-3.html?password="+password;
    }
}).call(this)
