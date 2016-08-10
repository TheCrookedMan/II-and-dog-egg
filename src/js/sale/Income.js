(function() {
    $.post('/distribution/getIncome.post', {
        Uid: userinfo.Uid
    }).success(function(data) {
        if ('1' == data.code && !!data.data) {
            var recode = data.data;
            // if (recode.TotalCommission > 0) {
            var totalPrice = recode.TotalCommission.toFixed(2);
            totalPrice = totalPrice.split(".");
            $(".totalPrice .bPirce").text(totalPrice[0] + ".");
            $(".totalPrice .sPirce").text(totalPrice[1]);
            // }
            var today = recode.Today;
            // if (today > 0) {
            $(".todayPrice").text(today.toFixed(2));
            // }
            var frozenMoney = recode.FrozenMoney;
            // if (frozenMoney > 0) {
            $(".FrozenMoney .price").text(frozenMoney.toFixed(2));
            // }
            var withdrawMoney = recode.WithdrawMoney;
            // if (withdrawMoney > 0) {
            $(".WithdrawMoney .price").text(withdrawMoney.toFixed(2));
            // }
            var cashed = recode.Cashed;
            // if (cashed > 0) {
            $(".CashedPrice").text(cashed.toFixed(2));
            // }
            $(".withdraw").on("click", ".withdrawButton", function(ev) {
                if (userinfo.IsSetSecurityCode) {
                    window.location.href = "/sale/request-withdraw.html?withdrawMoney=" + withdrawMoney;
                } else {
                    modal.confirm({
                        text: '暂未设置提现密码',
                        okValue: '去设置',
                        cancelValue: '下次吧',
                        onConfirm: function() {
                            window.location.href = "/sale/setting/main.html";
                        }
                    })
                }

            })
        }
    });
}).call(this)
