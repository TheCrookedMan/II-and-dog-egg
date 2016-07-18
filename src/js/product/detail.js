(function() {
    $.post('/product/productDetail.post', { "pid": pid }).success(function(data) {
        if (data.code == "1" && !!data.data) {
            var record = data.data;
            //console.log(record);
            var isSimpleTag = record.isSimpleTag;
            if (isSimpleTag == 1) {
                var str = '<div class="txt" id="title"></div>';
                $("#ps").append(str);
                $("#title").html(record.title);
            } else {
                var str = '<div class="time"><i class="am-icon-clock-o"></i><span>仅剩时间：<em></em></span></div>';
                $("#ps").append(str);

                // // 倒计时
                // var timer = window.setInterval(function(){
                //     var year=$(".pub-countdown").data("year");
                //     var month=$(".pub-countdown").data("mm");
                //     var day=$(".pub-countdown").data("day");

                //     var now = new Date();
                //     var endDate = new Date(year, month-1, day); 
                //     var leftTime=endDate.getTime()-now.getTime(); 
                //     var leftsecond = parseInt(leftTime/1000); 

                //     var day1=Math.floor(leftsecond/(60*60*24)); 
                //     var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
                //     var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
                //     var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);

                //     if (day1<10)
                //     {
                //         day1="0"+day1.toString();
                //     }
                //     if(hour<10){
                //         hour="0"+hour.toString();
                //     }
                //     if(minute<10){
                //         minute="0"+minute.toString(); 
                //     }
                //     if(second<10){
                //         second="0"+second.toString();
                //     }


                //     if (leftsecond > 1) {
                //         $(".pub-countdown").find(".t_d").text(day1);
                //         $(".pub-countdown").find(".t_h").text(hour);
                //         $(".pub-countdown").find(".t_m").text(minute);
                //         $(".pub-countdown").find(".t_s").text(second);
                //     } else {
                //         clearInterval(timer);
                //     } 
                // }, 1000);

            }

            var img = record.img;
            var imgs = img.ImageArray;
            for (var p in imgs) {
                var str = '<li><img src="' + imgs[p] + '"/></li>';
                $("#imgs").append(str);
            }
            var weight;

            var isEnd = false;
            $("#Description").html('');
            $(".nav-tab").hide();

           function getScrollTop() {
            //滚动条在Y轴上的滚动距离
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if (document.body) {
                    bodyScrollTop = document.body.scrollTop;
                }
                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            }

            //浏览器视口的高度
            function getWindowHeight() {
                var windowHeight = 0;
                if (document.compatMode == "CSS1Compat") {
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    windowHeight = document.body.clientHeight;
                }
                return windowHeight;
            }

            //文档的总高度
            function getScrollHeight() {
                var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                if (document.body) {
                    bodyScrollHeight = document.body.scrollHeight;
                }
                if (document.documentElement) {
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                return scrollHeight;
            }

            $(window).on("scroll", function(){
                //函数内判断，距离底部50px的时候则进行数据加载
                if (getScrollTop() + getWindowHeight() + 50 >= getScrollHeight()) {
                   $(".nav-tab").show();
                   $(window).off("scroll");
                   $("#Description").html(record.Description);
                }
                else if(getScrollTop()<=400){
                    $(".nav-tab").hide();
                }
                else{
                    $(".nav-tab").show();
                }
            })


            $("#Name").html(record.Name);
            $("#shipAddres").html(record.shipAddres);
            $("#ShopPrice").html("￥" + record.ShopPrice);
            $("#skuPrice").html("￥" + record.ShopPrice);
            $("#StockNum").html(record.StockNum);

            if(record.VideoId == null){
                $("#media").hide()
            }
            else{
                $("#media").show()
            }
            $("#media").on('click', function() {
                if (record.VideoId == null) {
                    modal.tip("该商品没有视频介绍");
                    $('.am-dimmer').hide();
                } else {

                }
            })

            var sku = record.SkuInfoArray;
            if(sku.length>0){
                for (var i in sku) {
                    var str = '<dl><dt>' + sku[i].key + '</dt><dd></dd></dl/>';
                    $("#sku").append(str);
                    var v = sku[i].value;
                    for (var j in v) {
                        weight = v[j].AttrValue;
                        $("#weight").html(weight);
                        if (v[j].State == 0) {
                            var str0 = '<a href="javascript:void(0)" class="can">' + v[j].AttrValue + '</a>';
                            $("#sku dl dd").append(str0);
                        } else {
                            var str0 = '<a href="javascript:void(0)" class="disable">' + v[j].AttrValue + '</a>';
                            $("#sku dl dd").append(str0);
                        }
                        $("a.can:first").addClass("cur");
                        $("#skuImg").attr("src", v[j].Image);
                    }
                }
            }
            else{
                var urll=$(".am-slides li:first-child img").attr("src");
                $("#skuSelected").html(record.Name);
                $("#skuImg").attr("src", urll);
                $("#selected").after(record.Name);
            }
            

            var tips = record.goodsAttributeList;
            for (var i in tips) {
                var str = '<p class="title">｜' + tips[i].key + '｜</p><p>' + tips[i].values + '</p>';
                $("#tips").after(str);
            }

            var $modal = $('#my-actions');

            if (record.StockNum > 0) {
                var str = '<a href="javascript:void(0)"  class="btn buy" data-am-modal="{target: "#my-actions"}">加入菜篮子</a>';
                var str0 = '<a href="javascript:void(0)"  class="btn add">加入菜篮子</a>';
                $(".detail_foot").append(str);
                $(".detail_foot").append(str0);
                $('.btn.add').hide();
                $(".buy").on('click', function() {
                    $(this).hide();
                    $('.btn.add').show();
                    $modal.modal();
                })
                $("#openmodel").on('click', function() {
                    $modal.modal();
                    $('.btn.add').show();
                    $('.btn.buy').hide();
                })
            } else {
                var str = '<a href="javascript:void(0)"  class="btn disable">已售罄</a>';
                $(".detail_foot").append(str);
            }


            $(".pdetail_modal .pinfo .close").on('click', function() {
                $('.btn.add').hide()
                $('.btn.buy').show();
            })

            $("a.can").on('click', function() {
                $(this).addClass("cur").siblings(".can").removeClass("cur");
                var txt = $(this).text();
                $("#skuSelected").html(txt);
            })

            $(".pdetail_modal .select dl dd a.cur").each(function() {
                $("#skuSelected").html($(this).text());
                var str = '<em>“' + $(this).text() + '”</em>';
                $("#selected").after(str);
            });

            $(".nav-tab a").on('click', function() {
                $(this).addClass("cur").siblings("a").removeClass("cur");
                var url = $(this).data("id");
                $(".con ." + url).show().siblings().hide();
            })

            $('.am-slider').flexslider();

            $('.btn.add').on('click', function() {
                if(!userinfo.Uid){
                    modal.tip("用户未登录！");
                    return false;
                }
                $('.btn.add').hide()
                $('.btn.buy').show();
                $.post('/cart/addProdToCart.post', { "pid": pid, "uid": userinfo.Uid, 'number': 1 }).success(function(data) {
                    $modal.modal('close');
                    modal.tip("添加菜篮子成功！");
                    $('.am-dimmer').hide();
                }).error(function(err) {});
            })
        }
    }).error(function(err) {});
}).call(this);
