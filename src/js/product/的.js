
























        
            
                    
                        $("#skuImg").attr("src",v[j].Image);
                        var str0='<a href="javascript:void(0)" class="can">'+v[j].AttrValue+'</a>';
                        var str0='<a href="javascript:void(0)" class="disable">'+v[j].AttrValue+'</a>';
                        weight=v[j].AttrValue;
                    $("#sku dl dd").append(str0);
                    $(".detail_foot").append(str0);
                    $(".detail_foot").append(str0);
                    $("a.can:first").addClass("cur");   
                    $('.am-dimmer').hide();
                    $('.btn.buy').hide();
                    $(this).hide();
                    $modal.modal();
                    $modal.modal();
                    else{
                    if(v[j].State==0){
                    modal.tip("该商品没有视频介绍");
                    var str0='<a href="javascript:void(0)"  class="btn add">加入菜篮子</a>';
                    var str0='<a href="javascript:void(0)"  class="btn add">加入菜篮子</a>';
                    }
                    }
                 $("#imgs").append(str);
                 var str="<li><img src='"+imgs[p]+"'/></li>";
                $("#openmodel").on('click',function(){
                $("#selected").after(str);
                $("#sku").append(str);
                $("#skuSelected").html($(this).text());
                $("#skuSelected").html(txt);
                $("#tips").after(str);
                $(".buy").on('click',function(){
                $(".detail_foot").append(str)
                $(".detail_foot").append(str);
                $('.btn.add').hide()
                $('.btn.buy').show();
                $(this).addClass("cur").siblings(".can").removeClass("cur");
                else{
                for(var j in v){
                if(record.VideoId==null){
                var $modal = $('#my-actions');
                var str='<a href="javascript:void(0)"  class="btn buy" data-am-modal="{target: "#my-actions"}">加入菜篮子</a>';
                var str='<a href="javascript:void(0)"  class="btn disable">已售罄</a>';
                var str='<dl><dt>'+sku[i].key+'</dt><dd></dd></dl/>';
                var str='<em>“'+txt+'”</em>';
                var str='<p class="title">｜'+tips[i].key+'｜</p><p>'+tips[i].values+'</p>';
                var txt=$(this).text();
                var v=sku[i].value;
                }
                }
                }   
                });
                });
            $("#Description").html(record.Description);
            $("#media").on('click',function(){
            $("#Name").html(record.Name);
            $("#shipAddres").html(record.shipAddres);
            $("#ShopPrice").html("￥"+record.ShopPrice);
            $("#sku a.cur").each(function(){
            $("#skuPrice").html("￥"+record.ShopPrice);
            $("#StockNum").html(record.StockNum);
            $("#title").html(record.title);
            $("#weight").html(weight);
            $(".pdetail_modal .pinfo .close").on('click',function(){
            $("a.can").on('click',function(){
            $.post('/cart/4.post',{"pid": 1742,"uid":9}).success(function(data) {
            /*循环产品轮播*/
            ////产地、保质期、储存条件
            //console.log(sku);
            //sku
            //产地
            //价格
            //判断视频
            //名称
            //图片
            //已选择
            //库存
            //描述
            //标题
            //重量
            else{
            for(var i in sku){
            for(var i in tips){
            for(var p in imgs){
            if(record.StockNum >0 ){
            var img=record.img;
            var imgs=img.ImageArray;
            var record = data.data;
            var sku=record.SkuInfoArray;
            var tips=record.goodsAttributeList;
            var weight;
            }
            }
            }
            }
            }
            })
            })
            })
            })
            });
        $(".btn.add").on('click',function(){
        $('.am-slider').flexslider();
        //添加购物车
        if(data.code == "1" && !!data.data){
        }
        })
    $(".con ."+url).show().siblings().hide()
    $(this).addClass("cur").siblings("a").removeClass("cur");
    var url=$(this).data("id");
    }).error(function(err) {});
   $(".nav-tab a").on('click',function(){
   })
(function() {
9
}).call(this)