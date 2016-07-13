(function() {
    $.get('/template/basket/order.t', { "uid": userinfo.Uid, 'type': 1, 'pids': pids }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {

            $("#orderMain").html(data);

            //发票
            $("#getInvoice").on('click', function() {
                $("#invoicePage").show();
                $("#orderMain").hide();
            })

            //开启发票
            $('.toggle').on("click", function() {
                $(this).toggleClass("cur");
                if ($('.toggle.cur').length) {
                    $('#invoiceTxt').html("需开发票");
                    $("#inputInoice").attr({ "disabled": false })
                } else {
                    $('#invoiceTxt').html("不需开发票");
                    $("#inputInoice").attr({ "disabled": true })
                }　　
            });

            //关闭发票窗口
            $("#ok").on('click', function() {
                $("#invoicePage").hide();
                $("#orderMain").show();
            })

            //获取优惠券
            $("#getCoupon").on('click', function() {
                $.post('/user/validCouponList.post', { "uid": userinfo.Uid, 'allproductamount': 30 }).success(function(data) {
                    var record = data.data;
                    var couponList = record.couponList;
                    if (couponList.length > 0) {
                        $.get('/template/basket/coupon.t', { "uid": userinfo.Uid, 'allproductamount': 30 }).success(function(data) {
                            $("#orderMain").hide();
                            $(".coupon .list ul").html(data);
                            $("#orderCoupon").show();
                        }).error(function(err) {});
                    } else {
                        modal.tip('没有可用的优惠券！');
                        $('.am-dimmer').hide();
                        return false;
                    }
                }).error(function(err) {});
            })

            //获取收货地址
            $("#getAddress").on('click', function() {
                $.get('/template/profile/address.t', { "uid": userinfo.Uid }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" !== data) {
                        $("#orderMain").hide();
                        $("#orderAddress").html(data);
                        $("#orderAddress").show();
                    }
                }).error(function(err) {});
            })

            //选择优惠券
            $(".coupon .list ul li a").on('click', function() {
                var txt = $(this).parent().data("id");
                $("#orderMain").show();
                $("#orderCoupon").hide();
                $("#couponTxt").html(txt);
            })
        }

    }).error(function(err) {});

}).call(this)
