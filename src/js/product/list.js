(function() {
    $("#keyword").click(function() {
        $(this).siblings('.search').show();
    })

    $.get('/template/product/list_nav.t').success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $("#listNav").html(data);
        }
    }).error(function(err) {});

    //搜索

    var $form = $('#searchForm');
    var keywords;

    $form.submit(function() {
        keywords = $("#keywords").val();
        window.location.href = '/product/search.html?searchkey=' + $.trim(keywords);
        return false;
    })

    $("#keywords").change(function(){
      var content = $(this).val(); 
      if($.trim(content) == ''){
        $(this).siblings().hide()
      }
      else{
        $(this).siblings().show();
      }
    });

    $("#deltxt").on('click',function(){
        $(this).parents(".search").hide();
        $(this).siblings().val('')
    })

    function gallery() {
        this.pageNo = 1;
        this.pageSize = 20;
        this.isEnd = false;
        this.sortdirection = 0;
        this.sortcolumn = 0;
        this.categoryId = categoryId;
    }
    gallery.prototype = {
        init: function() {
            var self = this;
            $(".product .tab ul li").on("click", "a", function(ev) {
                if ($(this).data("id") == "sortcolumn") {
                    $(".product .tab ul li a.cur").removeClass("cur");
                    $(this).addClass("cur");
                    $(this).toggleClass("sort");
                    if($(this).hasClass("sort")){
                        $("ul.am-gallery").html("");
                        self.sortcolumn = 1;
                        self.sortdirection = 0;
                        $("ul.am-gallery").html('<li class="no-data"><p><img src="/img/em3.png"></p><p>二丫家还没有这款商品诶~ <br>您再看看别哒~</p></li>');
                        self.get();
                    }
                    else{
                        $("ul.am-gallery").html("");
                        self.sortcolumn = 0;
                        self.sortdirection = 0;
                        $("ul.am-gallery").html('<li class="no-data"><p><img src="/img/em3.png"></p><p>二丫家还没有这款商品诶~ <br>您再看看别哒~</p></li>');
                        self.get();
                    }
                }
                else if ($(this).data("id") == "sortdirection") {
                    $(".product .tab ul li a.cur").removeClass("cur");
                    $(this).addClass("cur");
                    $(this).toggleClass("sort");
                    if($(this).hasClass("sort")){
                        $("ul.am-gallery").html("");
                        self.sortdirection = 1;
                        self.sortcolumn = 0;
                        $("ul.am-gallery").html('<li class="no-data"><p><img src="/img/em3.png"></p><p>二丫家还没有这款商品诶~ <br>您再看看别哒~</p></li>');
                        self.get();
                    }
                    else{
                        $("ul.am-gallery").html("");
                        self.sortdirection = 0;
                        self.sortcolumn = 0;
                        $("ul.am-gallery").html('<li class="no-data"><p><img src="/img/em3.png"></p><p>二丫家还没有这款商品诶~ <br>您再看看别哒~</p></li>');
                        self.get();
                    }
                }
                else{
                    $(".product .tab ul li a.cur").removeClass("cur");
                    $(this).addClass("cur");
                    self.sortdirection = 0;
                    self.sortcolumn = 0;
                    $("ul.am-gallery").html("");
                    $("ul.am-gallery").html('<li class="no-data"><p><img src="/img/em3.png"></p><p>二丫家还没有这款商品诶~ <br>您再看看别哒~</p></li>');
                    self.get();
                }
            });

            self.get();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.get();
                }
            }, function() {
                /* 上拉到顶 */
            });
        },
        get: function() {
            var self = this;
            $.get('/template/product/list_gallery.t', {
                "page": self.pageNo,
                "pagesize": self.pageSize,
                "sortdirection": self.sortdirection,
                "sortcolumn": self.sortcolumn,
                "cid": self.categoryId
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;

                } else {
                    self.isEnd = false;
                    if (self.pageNo == 1) {
                        $("ul.am-gallery").html(data);
                    } else {
                        $("ul.am-gallery").append(data);
                    }
                }
            }).error(function(err) {});
        },
        setAttributes: function(sortdirection, sortcolumn) {
            this.sortdirection = sortdirection;
            this.sortcolumn = sortcolumn;
            return this;
        }
    }
    var productList = new gallery();
        productList.init();

    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {
            $(element).parents(".productList-echo-loading").removeClass("productList-echo-loading");
            console.log(element, 'has been', op + 'ed');
        }
    });
}).call(this)
