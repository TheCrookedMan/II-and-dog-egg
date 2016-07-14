(function() {

    function gallery() {
        this.pagenumber = 1;
        this.pagesize = 20;
        this.isEnd = false;
    }
    gallery.prototype = {
        init: function() {
            var self = this;
            self.get();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pagenumber++;
                    self.get();
                }
            }, function() {
                /* 上拉到顶 */
            });
        },
        get: function() {
            var self = this;
            $.get('/template/profile/profile_coupon.t', {
                "pagenumber": self.pagenumber,
                "pagesize": self.pagesize,
                "uid": userinfo.UserID
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    if (self.pagenumber == 1) {
                        $(".coupon .list ul").html(data);
                    } else {
                        $(".coupon .list ul").append(data);
                    }
                }
                var len = $(".coupon .list ul li.can").length;
                $("#couponNum").text(len);
            }).error(function(err) {});
        }
    }
    var productList = new gallery();
    productList.init();
}).call(this)
