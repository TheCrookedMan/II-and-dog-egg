(function() {
    var OpenID = common.getOpenId();
    var random = Math.random()*Math.random();
    var wechatUserInfo = common.getCookie("wechatUserInfo");
    var unionid = wechatUserInfo.unionid;
    random = random.toString().substr(-4,4);
    var subject = "";
    var body = "";
    $.post('/user/GetOrderProdInfo.post',{oid:orderId}).success(function(data){
        if("1" == data.code && !!data.data){
            var record = data.data;
            var info = record.Info;
            subject = info.subject;
            body = info.body;
            $(".detail_foot a.btn").addClass('buy');
            $(".detail_foot a.btn").removeClass('disable');
        }
    });
    // if(!payInfo){
    //     payInfo = "支付商品信息为空！";
    // }
    $("body").on('click', '.btn.buy', function(ev) {
        $.post('/user/eycharges.post', {
            'order_no': osn+random,
            'amount': orderAmount*100,
            'channel': 'wx_pub',
            'currency': 'cny',
            'subject': subject,
            'body': body,
            'client_ip': '203.156.219.94',
            'open_id': OpenID
        }).success(function(charge) {
            pingpp.createPayment(charge, function(result, err) {
                if (result == "success") {
                    window.location.href = "/profile/order-paySucess.html?userMobile="+userMobile+"&username="+username+"&addressInfo="+addressInfo+"&orderAmount="+orderAmount+"&TotalPrice="+TotalPrice+"&OSN="+osn+"&orderId="+orderId;
                	// debugger
                    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                } else if (result == "fail") {
                	// debugger
                    // charge 不正确或者微信公众账号支付失败时会在此处返回
                } else if (result == "cancel") {
                	// debugger
                    // 微信公众账号支付取消支付
                }
            });
        })
    });

    // function
}).call(this)
