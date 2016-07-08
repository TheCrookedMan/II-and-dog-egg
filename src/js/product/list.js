$(function() {
    $('.am-popup-bd dl dt a').on("click", function() {　　　　
        $(this).parent().siblings().toggle();
        $(this).parents('dl').siblings().children('dd').slideUp()　　
    });
    $("#keyword").click(function() {
        $(this).siblings('.search').show();
    })
    $('.search a').on("click", function() {　　　　 $(this).parent().hide()　　 });

});


(function() {
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
        offset: 0,
        throttle: 100,
        unload: true,
        callback: function(element, op) {
            $(element).parents(".productList-echo-loading").removeClass("productList-echo-loading");
            console.log(element, 'has been', op + 'ed');
        }
    });
}).call(this)
