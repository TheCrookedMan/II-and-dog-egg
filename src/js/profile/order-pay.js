(function() {
    var OpenID = common.getOpenId();
    var random = Math.random()*Math.random();
    random = random.toString().substr(-4,4);
    $("body").on('click', '.btn.buy', function(ev) {
        $.post('/user/eycharges.post', {
            'order_no': osn+random,
            'amount': orderAmount,
            'channel': 'wx_pub',
            'currency': 'cny',
            'subject': 'test',
            'body': 'test',
            'client_ip': '203.156.219.94',
            'open_id': OpenID
        }).success(function(charge) {
            pingpp.createPayment(charge, function(result, err) {
                if (result == "success") {
                	debugger
                    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                } else if (result == "fail") {
                	debugger
                    // charge 不正确或者微信公众账号支付失败时会在此处返回
                } else if (result == "cancel") {
                	debugger
                    // 微信公众账号支付取消支付
                }
            });
        })
    });

    // function
}).call(this)
