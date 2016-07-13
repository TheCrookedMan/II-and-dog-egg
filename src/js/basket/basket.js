(function() {
    $.get('/template/basket/basket_list.t', { "uid": 9 }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $('.pub_noData').hide();
            $(".list-ul").html(data);
            if( $(".list-ul .list-li").length > 0){
                $("#total").show()
            }
            $('.list-li').touchWipe({itemDelete: '.btn'});


            //选择商品
            $('.list-li .set-default').on("touchstart", function() {
                $(this).toggleClass("cur");
                var len=$('.list-li .set-default.cur').length;
                //存储商品pids传给订单确认页
                var arrPids=[];
                $(".list-li .set-default.cur").each(function(i,value){
                    var path=$(this).parents(".list-li").data("id");
                    arrPids[i]=path;  
                });

                if(len>0)
                {
                    $("#total").addClass("active");
                    $("#getPay").removeClass('disable');
                    $("#getPay").attr("href","/basket/order.html?pids="+arrPids);
                    set_pack_money();
                }
                else{
                    $("#total").removeClass("active");
                    $(".all").removeClass('cur');
                    $("#getPay").attr("href","javascript:void(0)");
                    $("#getPay").addClass('disable');
                    $('#total_price').html('0');
                    
                }　
            });
            // $('.list-li.can').on("touchstart", function() {
            //     $(this).find('.set-default').toggleClass("cur");
            //     var len=$('.list-li .set-default.cur').length;
            //     if(len>0)
            //     {
            //         $("#total").addClass("active");
            //         set_pack_money();
            //     }
            //     else{
            //         $("#total").removeClass("active");
            //         $(".all").removeClass('cur');
            //         $('#total_price').html('0');
                    
            //     }　
            // });

            //全选
            $('.all').on("click", function() {
                $(".all").toggleClass('cur');
                $(".list-li .set-default").toggleClass("cur");
                var len=$('.list-li .set-default.cur').length;
                //存储商品pids传给订单确认页
                var arrPids=[];
                $(".list-li .set-default.cur").each(function(i,value){
                    var path=$(this).parents(".list-li").data("id");
                    arrPids[i]=path;  
                });
                
                if(len>0)
                {
                    $("#total").addClass("active");
                    $(".list-li .set-default").addClass('cur');
                    $(".all").addClass('cur');
                    $("#getPay").removeClass('disable');
                    $("#getPay").attr("href","/basket/order.html?pids="+arrPids);
                    set_pack_money();
                }
                else{
                    $("#total").removeClass("active");
                    $(".all").removeClass('cur');
                    $("#getPay").attr("href","javascript:void(0)");
                    $("#getPay").addClass('disable');
                    $('#total_price').html('0');
                }　
            });


            //计算总价
            function set_pack_money()
            {
                var goods_price = 0;
                $(".list-li .set-default.cur").each(function(index, el)
                {
                    var this_buy_num = $(this).parents("li").find(".pNum").text();
                    var thisnum =  $(this).parents('li').find('.price em').html();
                    if(thisnum>0){
                        goods_price+=thisnum*this_buy_num;
                    }
                });
                $('#total_price').html(goods_price);
            }

            //滑动
            

            //增加购物车数量
            $(".btn .add").on('touchstart',function(){
                var pid=$(this).data('id');
                var thisnum = $(this).siblings("input").val();
                var buy_num_now = parseInt(thisnum)+1;
                $.post('/cart/editCart.post', { "pid": pid,"uid":9,'num': buy_num_now}).success(function(data) {
                    if (data.code == 1) {
                        $("#input_"+pid).val(buy_num_now);
                        $("#pNum_"+pid).html(buy_num_now);
                        set_pack_money();
                    }
                    else{
                        modal.tip(data.message);
                        $('.am-dimmer').hide();
                        return false;
                    }
                    
                }).error(function(err) {});
            });

            //减少购物车数量
            $(".btn .min").on('touchstart',function(){
                var pid=$(this).data('id');
                var thisnum = $(this).siblings("input").val();
                if(parseInt(thisnum)-1<0){
                    return false;
                }
                var buy_num_now = parseInt(thisnum)-1;
                if(buy_num_now<0){
                    buy_num_now = 1;
                }
                $.post('/cart/editCart.post', { "pid": pid,"uid":9,'num': buy_num_now}).success(function(data) {
                    if (data.code == 1) {
                        $("#input_"+pid).val(buy_num_now);
                        $("#pNum_"+pid).html(buy_num_now);
                        set_pack_money();
                    }
                    else{
                        modal.tip(data.message);
                        $('.am-dimmer').hide();
                        return false;
                    }  
                }).error(function(err) {});
            });

            //删除购物车
            $('.del a').on('touchstart',function(){
                var pid=$(this).data("id");
                $.post('/cart/delForCart.post', { "pids": pid,"uid":9 }).success(function(data) {
                    $('#'+pid).remove();
                    modal.tip("删除成功！");
                    if( $(".list-ul .list-li").length <=0){
                        $("#total").hide();
                        $('.pub_noData').show();
                    }
                    $('.am-dimmer').hide();
                }).error(function(err) {});
            })
        }
        else{
            
        }

    }).error(function(err) {});


}).call(this)
