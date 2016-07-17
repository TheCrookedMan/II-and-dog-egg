(function() {
    $.get('/template/profile/order_detail.t', {
        "osn": osn,
        "uid": userinfo.Uid
    }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        $("#order_detail").html(data);
        $(".ship").attr('href',"/profile/order-status.html?orderId="+orderId);

        $(".time").each(function(){
            var time=parseInt($(this).html().replace(/[^0-9]/ig,""));
            var d=new Date(time); 
                time=formatDate(d);
            $(".time").html(time);
        })
        
        var len = $(".order_detail .list-li").length;
        len = len - 2;
        if(len<=0){
            $(".more").hide()
        }
        else{
           $("#numOther").html(len); 
        }
        
        $(".more").on('click', function() {
            $(this).toggleClass("cur");
            $(".order_detail .list-li.other").toggle()
        });

        //确认收货
        $("#ok_shiping").on('click', function() {
            $.post('/user/takeDelivery.post', { "uid": userinfo.Uid,oid:orderId }).success(function(data) {
                if (data.code == 1) {
                    modal.tip("成功！");
                    $('.am-dimmer').hide();
                    window.location.href='/profile/order.html';
                } else {
                    modal.tip(data.message);
                    $('.am-dimmer').hide();
                }
            }).error(function(err) {});
        });

        //取消订单
        $("#del_order").on('click', function() {
            $.post('/user/CancelOrder.post', { "uid": userinfo.Uid,oid:orderId }).success(function(data) {
                if (data.code == 1) {
                    modal.tip("成功！");
                    $('.am-dimmer').hide();
                    window.location.href='/profile/order.html';
                } else {
                    modal.tip(data.message);
                    $('.am-dimmer').hide();
                }
            }).error(function(err) {});
        });

    }).error(function(err) {});

    function formatDate(now) { 
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds(); 

        if (month<10)
        {
            month="0"+month.toString();
        }
        if(date<10){
            date="0"+date.toString();
        }
        if(hour<10){
            hour="0"+hour.toString();
        }
        if(minute<10){
            minute="0"+minute.toString();
        }
        if(second<10){
            second="0"+second.toString();
        }
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    } 
}).call(this);
