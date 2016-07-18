(function() {
    var is_rece = 1;
    var TotalCouponPrice = 0;
    var countTotalPrice = 0;
    var balance = 0;
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
                    is_rece = 1;
                    $("#inputInoice").attr({ "disabled": false })
                } else {
                    $('#invoiceTxt').html("不需开发票");
                    is_rece = 0;
                    $("#inputInoice").attr({ "disabled": true })
                }　　
            });

            //关闭发票窗口
            $("#ok").on('click', function() {
                $("#invoicePage").hide();
                $("#orderMain").show();
            })

            //余额
            $("#getyuer").on('click', function() {
                $("#yuer").show();
                $.post('/user/accountBalance.post', { "uid": userinfo.Uid }).success(function(data) {
                    if (data.code == "1" && !!data.data) {
                        var record = data.data;
                        $("#balance").val(record.balan * 1);
                        $(".yuer").html(record.balan);
                    }
                }).error(function(err) {});
                $("#orderMain").hide();
            })

            //确认余额
            $("#ok_yuer").on('click', function() {
                $("#yuer").hide();
                $("#yuerTxt").html($(".yuer").html());
                $("#orderMain").show();
                balance = $("#balance").val();
                balance *= 1;
                count();
            })

            //获取优惠券
            $("#getCoupon").on('click', function() {
                $.post('/user/validCouponList.post', { "uid": userinfo.Uid, 'allproductamount': TotalPrice }).success(function(data) {
                    var record = data.data;
                    var couponList = record.couponList;
                    if (couponList.length > 0) {
                        $.get('/template/basket/coupon.t', { "uid": userinfo.Uid, 'allproductamount': TotalPrice }).success(function(data) {
                            $("#orderMain").hide();
                            $(".coupon .list ul").html(data);
                            $("#orderCoupon").show();
                        }).error(function(err) {});
                    } else {
                        $(".couponPrice").text("- ¥ 0.00");
                        modal.tip('没有可用的优惠券！');
                        $('.am-dimmer').hide();
                        return false;
                    }
                }).error(function(err) {});
            });

            //获取收货地址
            $("#getAddress").on('click', function() {
                $.get('/template/profile/profile_address.t', { "uid": userinfo.Uid }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" !== data) {
                        $("#orderMain").hide();
                        $("#orderAddress").html(data);
                        $("#orderAddress").show();
                    }
                }).error(function(err) {});
            });

            //选择优惠券
            $(".coupon .list ul li a").on('click', function() {
                var txt = $(this).parent().data("id");
                $("#orderMain").show();
                $("#orderCoupon").hide();
                $("#couponTxt").html(txt);
                // $(".couponPrice").text("－¥ 0.00");
                // TotalCouponPrice = 0;
            });
            $(".link-to-product-list").attr('href', '/basket/productList.html?uid=' + userinfo.Uid + '&type=1&pids=' + pids);
            count();
        }

    }).error(function(err) {});

    $("body").on('click', '.submitOrder', function(ev) {
        var remarks = $("#remarks").val();
        submitOrder({
            pids: pids,
            uid: userinfo.UBID,
            remarks: remarks,
            is_rece: is_rece,
            /*
                type: 1:从购物车过来的，3：秒杀  4：表示直接购买到订单确认页
             */
            type: 1,
            said: said,
            balance: balance
        });
    });

    function submitOrder(params) {
        $.post('/user/submitOrder.post', params).success(function(data) {
            if ("1" == data.code && !!data.data) {
                var record = data.data;
                window.location.href = "/profile/order-pay.html?osn=" + record.oNum + "&orderAmount=" + record.orderAmount + "&TotalAmount=" + record.TotalAmount + "&CouponMoney=" + record.CouponMoney;
            } else {
                modal.alert({ text: data.message });
            }
        })
    }

    function getDefaultAddress() {
        $.post('/user/defaultAddressOrderInfo.post', { "uid": userinfo.Uid, 'type': 1, 'pids': pids }).success(function(data) {
            if ("1" == data.code && !!data.data && !!data.data.receiverInfo) {
                var record = data.data.receiverInfo;
                $('#getAddress .name').text(record.Consignee);
                $('#getAddress .mobile').text(record.Mobile);
                $('#getAddress .area').text(record.ProvinceName + "，" + record.CityName + "，" + record.CountyName + "，" + record.Address);
            }
        })
    }

    getDefaultAddress();

    function count() {
        $(".balancePrice").text("- ¥" + balance.toFixed(2));
        countTotalPrice = parseFloat(TotalPrice) + parseFloat(TotalShipFee) - parseFloat(TotalCouponPrice) - parseFloat(balance);
        $(".countTotalPrice").text("¥ " + countTotalPrice.toFixed(2));
    }

}).call(this)
