(function() {
    $("#alipay-password").on("keydown", "#password", function(ev) {
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
                    setTimeout(function() {
                        $("#alipay-password").modal('toggle');
                    }, 500)
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
    $("#alipay-password").on("open.modal.amui", function() {
        var list = $(this).find(".password-panel span");
        $.each(list, function(k, K) {
            $(K).text("");
        });
        $("#password").val("");
    })

    function submitPassword() {

    }
}).call(this)
