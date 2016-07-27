(function() {
    var is_rece = 1;
    var TotalCouponPrice = 0;
    var countTotalPrice = 0;
    var balance = 0;
    var maxBalance = 0;
    var addressInfo = "";
    var userMobile = "";
    var username = "";
    var usableBalance = 0;
    var currentPage = "order";
    $.get('/template/basket/order.t', { "uid": userinfo.Uid, 'type': 1, 'pids': pids }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {

            $("#orderMain").html(data);

            //发票
            $("#getInvoice").on('click', function() {
                history.pushState({ foo: "invoicePage" }, "发票");
                currentPage = "invoicePage";
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
                // $("#invoicePage").hide();
                // $("#orderMain").show();
                history.go(-1);
            })

            //余额
            $("#getyuer").on('click', function() {
                count();
                $("input.yuer").val('');
                $("#yuer").show();
                $.post('/user/accountBalance.post', { "uid": userinfo.Uid }).success(function(data) {
                    if (data.code == "1" && !!data.data) {
                        var record = data.data;
                        history.pushState({ foo: "balance" }, "输入余额");
                        currentPage = "balance";
                        maxBalance = record.balan;
                        maxBalance *= 1;

                        if (maxBalance > usableBalance) {
                            $("i.yuer").text(maxBalance.toFixed(2));
                            $("input.yuer").attr('placeholder', '本次可使用余额支付 ' + usableBalance.toFixed(2) + " 元");
                        } else {
                            $("i.yuer").text(maxBalance.toFixed(2));
                            $("input.yuer").attr('placeholder', '本次可使用余额支付 ' + maxBalance.toFixed(2) + " 元");
                        }

                        // if (maxBalance > usableBalance) {
                        //     var text = '可用余额' + maxBalance.toFixed(2);
                        //     var placeholder = '可支付余额为：' + maxBalance.toFixed(2);
                        //     modal.prompt({
                        //         title: '余额',
                        //         text: text,
                        //         placeholder: placeholder,
                        //         inputType: 'number',
                        //         onConfirm: function(value) {
                        //             if (value > maxBalance) {
                        //                 modal.alert({ text: '超出可用余额！' })
                        //             } else {
                        //                 balance = value * 1;
                        //                 $("#yuerTxt").html(balance.toFixed(2));
                        //                 count();
                        //             }
                        //         }
                        //     });
                        // } else {
                        //     var text = '可用余额' + usableBalance.toFixed(2);
                        //     var placeholder = '可支付余额为：' + usableBalance.toFixed(2);
                        //     modal.prompt({
                        //         title: '余额',
                        //         text: text,
                        //         placeholder: placeholder,
                        //         inputType: 'number',
                        //         onConfirm: function(value) {
                        //             if (value > usableBalance) {
                        //                 modal.alert({ text: '超出可用余额！' })
                        //             } else {
                        //                 balance = value * 1;
                        //                 $("#yuerTxt").html(balance.toFixed(2));
                        //                 count();
                        //             }
                        //             return false;
                        //         }
                        //     });
                        // }

                    }
                }).error(function(err) {});
                $("#orderMain").hide();
            })

            //确认余额
            $("#ok_yuer").on('click', function() {
                var inputBalance = $("input.yuer").val();
                inputBalance *= 1;
                if (maxBalance < inputBalance) {
                    modal.alert({ text: '超出可用余额！' })
                    return false;
                }
                if (usableBalance < inputBalance) {
                    modal.alert({ text: '超出本次订单可使用余额！' })
                    return false;
                }
                $("#yuerTxt").html(inputBalance.toFixed(2));

                balance = inputBalance;
                balance *= 1;
                count();
                history.go(-1);
                // $("#yuer").hide();
                // $("#orderMain").show();
            });

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
                    history.pushState({ foo: "couponList" }, "优惠券地址");
                    currentPage = "couponList";
                }).error(function(err) {});
            });

            //获取收货地址
            $("#getAddress").on('click', function() {
                getAddressFun(function() {
                    history.pushState({ foo: "addressList" }, "选择地址");
                    currentPage = "addressList";
                });

            });

            //选择优惠券
            $(".coupon .list ul li a").on('click', function() {
                var txt = $(this).parent().data("id");
                // $("#orderMain").show();
                // $("#orderCoupon").hide();
                history.go(-1);
                $("#couponTxt").html(txt);
                TotalCouponPrice = txt * 1;

                count();
            });
            $(".link-to-product-list").attr('href', '/basket/productList.html?uid=' + userinfo.Uid + '&type=1&pids=' + pids);
            count();
            getDefaultAddress();
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
                if (record.orderAmount > 0) {
                    window.location.href = "/profile/order-pay.html?osn=" + record.oNum + "&orderAmount=" + record.orderAmount + "&TotalAmount=" + record.TotalAmount + "&CouponMoney=" + record.CouponMoney + "&userMobile=" + userMobile + "&username=" + username + "&orderId=" + record.oId + "&TotalPrice=" + TotalPrice + "&payInfo=" + payInfo + "&addressInfo=" + addressInfo;
                } else {
                    window.location.href = "/profile/order-paySucess.html?userMobile=" + userMobile + "&username=" + username + "&OSN=" + record.oNum + "&orderId=" + record.oId + "&TotalPrice=" + TotalPrice + "&addressInfo=" + addressInfo;
                }
            } else {
                modal.alert({ text: data.message });
            }
        })
    }

    function getDefaultAddress() {
        $.post('/user/defaultAddressOrderInfo.post', { "uid": userinfo.Uid, 'type': 1, 'pids': pids }).success(function(data) {
            if ("1" == data.code && !!data.data && !!data.data.receiverInfo) {
                var record = data.data.receiverInfo;
                if (typeof(record.ProvinceName) == 'object' && JSON.stringify(record.ProvinceName) == "null") {
                    $('#getAddress .name').text("");
                    $('#getAddress .mobile').text("");
                    $('#getAddress .area').text("");
                } else {
                    userMobile = record.Mobile;
                    username = record.Consignee;
                    addressInfo = record.ProvinceName + "，" + record.CityName + "，" + record.CountyName + "，" + record.Address;
                    $('#getAddress .name').text(username);
                    $('#getAddress .mobile').text(userMobile);
                    $('#getAddress .area').text(addressInfo);
                }
            }
        });
    }

    function count() {
        TotalShipFee *= 1;
        countTotalPrice = parseFloat(TotalPrice) + parseFloat(TotalShipFee) - parseFloat(TotalCouponPrice) - parseFloat(balance);
        usableBalance = parseFloat(TotalPrice) + parseFloat(TotalShipFee) - parseFloat(TotalCouponPrice);
        $(".countTotalPrice").text("¥ " + countTotalPrice.toFixed(2));
        $(".couponPrice").text("- ¥ " + TotalCouponPrice.toFixed(2));
        $(".balancePrice").text("- ¥" + balance.toFixed(2));
        $(".TotalShipFee").text("＋¥" + TotalShipFee.toFixed(2));
    }

    $("#orderAddress").on('click', '.addressALink', function(ev) {
        var said = $(this).data('said');
        var self = this;
        modal.loading("open");
        $.post('/user/modifyAddressOrderInfo.post', {
            uid: userinfo.Uid,
            weight: TotalWeight,
            productamount: ProductAmount,
            said: said
        }).success(function(data) {
            modal.loading("close");
            if ("1" == data.code && !!data.data) {
                // $("#orderMain").show();
                // $("#orderAddress").hide();
                var Consignee = $(self).find('.Consignee').text();
                var Mobile = $(self).find('.Mobile').text();
                var area = $(self).find('.area').text();

                userMobile = Mobile;
                username = Consignee;
                addressInfo = area;

                $('#getAddress .name').text(Consignee);
                $('#getAddress .mobile').text(Mobile);
                $('#getAddress .area').text(area);
                window.said = said;
                var record = data.data;
                TotalShipFee = record.shopFee;
                count();
                history.go(-1);
            }
        })
        ev.stopPropagation();
    });


    $("#orderAddress").on("click", ".addAddress", function(ev) {
        showAddAddressFun();
        ev.stopPropagation();
    });

    $("#orderAddress").on("click", ".updateAddress", function(ev) {
        var url = $(this).data('url');
        updateAddressFun(url);
        ev.stopPropagation();
    });

    function showAddAddressFun() {
        $.get('/template/profile/profile_addressAdd.t').success(function(data) {
            data = data.replace(/(^\s+)|(\s+$)/g, "");
            if ("" !== data) {
                history.pushState({ foo: "addUserAddress" }, "新增地址");
                currentPage = "addUserAddress";

                $("#orderAddress").hide();
                $("#addUserAddress").html(data);
                $("#addUserAddress").show();
            }
        })
    }

    function updateAddressFun(url) {
        $.get(url).success(function(data) {
            data = data.replace(/(^\s+)|(\s+$)/g, "");
            if ("" !== data) {
                history.pushState({ foo: "updateUserAddress" }, "修改地址");
                currentPage = "updateUserAddress";

                $("#orderAddress").hide();
                $("#updateUserAddress").html(data);
                $("#updateUserAddress").show();
            }
        });
    }

    function getAddressFun(callback) {
        modal.loading("open");
        $.get('/template/profile/profile_address.t', { "uid": userinfo.Uid }).success(function(data) {
            data = data.replace(/(^\s+)|(\s+$)/g, "");
            modal.loading("close");
            if ("" !== data) {
                $("#orderMain").hide();
                $("#addUserAddress").hide();
                $("#updateUserAddress").hide();
                $("#orderAddress").html(data);
                $("#orderAddress").show();
                !!callback && callback();
            }
        }).error(function(err) {});
    }
    window.getAddressFun = getAddressFun;

    $("#orderAddress").on("click", ".delAddress", function(ev) {
        var said = $(this).data('id');
        var regionid = $(this).data('regionid');
        var mobile = $(this).data('mobile');
        var address = $(this).data('address');
        var isdefault = $(this).data('isdefault');
        var consignee = $(this).data('consignee');
        $.post('/user/editReceiver.post', {
            "address": address,
            "mobile": mobile,
            "regionid": regionid,
            "uid": userinfo.Uid,
            "isdefault": isdefault,
            "consignee": consignee,
            "edittag": -1, //0表示新增  1表示更新  -1表示删除
            "said": said
        }).success(function(data) {
            if (data.code == 1) {
                modal.tip("删除成功！");
                $('.am-dimmer').hide();
                $('li#' + said).remove();
            } else {
                modal.tip(data.message);
                $('.am-dimmer').hide();
            }
        }).error(function(err) {});

        ev.stopPropagation();
    });

    $("#orderAddress").on("click", ".closeAddressList", function(ev) {
        // $("#orderMain").show();
        // $("#orderAddress").hide();
        history.go(-1);
        ev.stopPropagation();
    });

    window.onpopstate = function(event) {
        if ("addressList" == currentPage) {
            $("#orderMain").show();
            $("#orderAddress").hide();
            currentPage = "order";
        } else if ("balance" == currentPage) {
            $("#yuer").hide();
            $("#orderMain").show();
            currentPage = "order";
        } else if ("addUserAddress" == currentPage) {
            currentPage = "addressList";
            $("#orderAddress").show();
            $("#addUserAddress").hide();
            getAddressFun();
        } else if ("updateUserAddress" == currentPage) {
            currentPage = "addressList";
            $("#orderAddress").show();
            $("#updateUserAddress").hide();
            getAddressFun();
        } else if ("invoicePage" == currentPage) {
            currentPage = "order";
            $("#invoicePage").hide();
            $("#orderMain").show();
        } else if ("couponList" == currentPage) {
            $("#orderMain").show();
            $("#orderCoupon").hide();
            currentPage = "order";
        }
    };

}).call(this)
