(function() {
    $.post('/product/productDetail.post', { "pid": pid }).success(function(data) {
        if(data.code == "1" && !!data.data){
            var record = data.data;
            var img=record.img;
            var imgs=img.ImageArray;
            for(var p in imgs){
                var str='<li><img src="'+imgs[p]+'"/></li>';
                $("#imgs").append(str);
            }
        }
        var weight;
        $("#Description").html(record.Description);
        $("#Name").html(record.Name);
        $("#shipAddres").html(record.shipAddres);
        $("#ShopPrice").html("￥"+record.ShopPrice);
        $("#skuPrice").html("￥"+record.ShopPrice);
        $("#StockNum").html(record.StockNum);
        $("#title").html(record.title);
        $("#media").on('click',function(){
            if(record.VideoId==null){
                modal.tip("该商品没有视频介绍");
                $('.am-dimmer').hide();
            }
            else{

            }
        })

        var sku=record.SkuInfoArray;
        for(var i in sku){
            var str='<dl><dt>'+sku[i].key+'</dt><dd></dd></dl/>';
            $("#sku").append(str);
            var v=sku[i].value;
            for(var j in v){
                weight=v[j].AttrValue;
                $("#weight").html(weight);
                if(v[j].State==0){
                    var str0='<a href="javascript:void(0)" class="can">'+v[j].AttrValue+'</a>';
                    $("#sku dl dd").append(str0);
                }
                else{
                   var str0='<a href="javascript:void(0)" class="disable">'+v[j].AttrValue+'</a>';
                   $("#sku dl dd").append(str0);
                }
                $("a.can:first").addClass("cur");
                $("#skuImg").attr("src",v[j].Image);
            }
        }
       
        var tips=record.goodsAttributeList;
        for(var i in tips){
            var str='<p class="title">｜'+tips[i].key+'｜</p><p>'+tips[i].values+'</p>';
            $("#tips").after(str);
        }

        var $modal = $('#my-actions');

        if(record.StockNum >0 ){
            var str='<a href="javascript:void(0)"  class="btn buy" data-am-modal="{target: "#my-actions"}">加入菜篮子</a>';
            var str0='<a href="javascript:void(0)"  class="btn add">加入菜篮子</a>';
            $(".detail_foot").append(str);
            $(".detail_foot").append(str0);
            $('.btn.add').hide();
            $(".buy").on('click',function(){
                $(this).hide();
                $('.btn.add').show();
                $modal.modal();
            })
            $("#openmodel").on('click',function(){
                $modal.modal();
                $('.btn.add').show();
                $('.btn.buy').hide();
            })
        }
        else{
            var str='<a href="javascript:void(0)"  class="btn disable">已售罄</a>';
            $(".detail_foot").append(str);
        }


        $(".pdetail_modal .pinfo .close").on('click',function(){
            $('.btn.add').hide()
            $('.btn.buy').show();
        })

        $("a.can").on('click',function(){
            $(this).addClass("cur").siblings(".can").removeClass("cur");
            var txt=$(this).text();
            $("#skuSelected").html(txt);
        })

        $(".pdetail_modal .select dl dd a.cur").each(function(){
            $("#skuSelected").html($(this).text());
            var str='<em>“'+$(this).text()+'”</em>';
            $("#selected").after(str);
        });

        $(".nav-tab a").on('click',function(){
            $(this).addClass("cur").siblings("a").removeClass("cur");
            var url=$(this).data("id");
            $(".con ."+url).show().siblings().hide();
        })

        $('.am-slider').flexslider();
    })
}).call(this);