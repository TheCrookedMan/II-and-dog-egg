(function() {
    var withdrawMoney = $("#withdrawMoney").val();
    withdrawMoney *= 1;
    $("#Amount").on("keyup", function(ev) {
        var Amount = $(this).val();
        Amount *= 1;
        if (Amount > withdrawMoney) {
            modal.alert({ text: '最大提现金额为：' + withdrawMoney + '元' });
            $(this).val(withdrawMoney);
        } else {
            checkAccountBalance(Amount);
        }
    });
    var publicNumber = "";
    $("#password").val(publicNumber);
    $("#alipay-password").on("keyup", "#password", function(ev) {
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
                if (len == 6) {
                    $(this).blur();
                    submitPassword();
                }
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
    $("#alipay-password").on("open.modal.amui", function() {
        var list = $(this).find(".password-panel span");
        $.each(list, function(k, K) {
            $(K).text("");
        });
        $("#password").val("");
    })

    function submitPassword() {
        var password = $("#password").val();
        if (password.length == 6) {
            password = $.md5(password);
            $.post('/distribution/checkSetSecurityCode.post', { Uid: userinfo.Uid, SecurityCode: password }).success(function(data) {
                if ("1" == data.code && !!data.data) {
                    if (data.data.IsCheck) {
                        //密码验证通过
                        alipayWithDraw();
                        $("#alipay-password").modal('close');
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

    function alipayWithDraw() {
        var form = common.parseForm("#bankCard");
        $.post('/distribution/withdrawalApply.post', {
            Uid: userinfo.Uid,
            AccountNo: form.AccountNo,
            TrueName: form.TrueName,
            Amount: form.Amount,
            Remark: form.Remark,
            Type: form.Type,
            Bank: form.Bank
        }).success(function(data) {
            if ("1" == data.code) {
                window.location.href = "/sale/withdraw-success.html";
            } else {
                modal.alert({ text: data.message });
            }
        })
    }
    $('#bankCard').validator({
        submit: function(form) {
            if (this.isFormValid()) {
                $("#alipay-password").modal('open');
                return false;
            }
            return false;
        }
    });

    function checkAccountBalance(money) {
        $.post('/distribution/checkAccountBalance.post', { Uid: userinfo.Uid, Money: money }).success(function(data) {
            if ("1" == data.code && !!data.data) {
                if (data.data.check) {
                    var comcharge = data.data.comcharge;
                    $(".withdraw-info .fee em").text(comcharge.toFixed(2));
                } else {
                    $(".withdraw-info .fee em").text("0.00");
                }
            }
        })
    }
}).call(this)
