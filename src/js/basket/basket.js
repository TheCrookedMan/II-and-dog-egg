(function() {


    $.get('/template/basket/basket_list.t', { "uid": 9 }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".pub_noData").hide();
            $(".list-ul").html(data);
            //滑动
            $('.list-li').touchWipe({itemDelete: '.btn'});
            if ($(".list-ul li.can").length > 0) {

            } else {

            }
        }

        //选择商品
        $('.list-li .set-default').on("click", function() {
            $(this).toggleClass("cur");
            var len=$('.list-li .set-default.cur').length;
            if(len>0)
            {
                $("#total").addClass("active");
                set_pack_money();
            }
            else{
                $("#total").removeClass("active");
                $(".all").removeClass('cur');
                $('#total_price').html('0');
                
            }　
        });

        //全选
        $('.all').on("click", function() {
            $(".all").toggleClass('cur');
            $(".list-li .set-default").toggleClass("cur");
            var len=$('.list-li .set-default.cur').length;
            if(len>0)
            {
                $("#total").addClass("active");
                $(".list-li .set-default").addClass('cur');
                $(".all").addClass('cur');
                set_pack_money();
            }
            else{
                $("#total").removeClass("active");
                $(".all").removeClass('cur');
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

        


        //增加购物车数量
        $(".btn .add").click(function(event) {
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
            //set_pack_money();
        });

        //减少购物车数量
        $(".btn .min").click(function(event) {
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
            //set_pack_money();
        });

        //删除购物车
        $('.del a').on('click',function(){
            var pid=$(this).data("id");
            $.post('/cart/delForCart.post', { "pids": pid,"uid":9 }).success(function(data) {
                $('#'+pid).remove();
                modal.tip("删除成功！");
                $('.am-dimmer').hide();
            }).error(function(err) {});
        })


        }).error(function(err) {});

}).call(this)
