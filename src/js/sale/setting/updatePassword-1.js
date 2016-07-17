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

    function submitPassword() {
    	var SecurityCode=$("#password").val();
        $("#ok_shiping").on('click', function() {
            $.post('/distribution/setSecurityCode.post', { "Uid": userinfo.Uid,'SecurityCode':SecurityCode }).success(function(data) {
                if (data.code == 1) {
                    window.location.href='/sale/setting/updatePassword-2.html';
                } else {
                    modal.tip(data.message);
                    $('.am-dimmer').hide();
                }
            }).error(function(err) {});
        });
    }
}).call(this)
