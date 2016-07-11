(function() {
    function gallery() {
        this.pagenumber = 1;
        this.pagesize = 20;
        this.isEnd = false;
        this.uid = 9;
        this.orderstate = 1;
    }
    gallery.prototype = {
        init: function() {
            var self = this;
            $(".myOrder .tab ul li").on("click", "a", function(ev) {
                $(".myOrder .tab ul li a.cur").removeClass("cur");
                $(this).addClass("cur");
                self.orderstate = $(this).data("id");
                self.pagenumber = 1;
                $("#list").html("");
                self.get();
            });
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
            if ($(".myOrder .tab ul li a.cur").data("id") == 1) {
                $.get('/template/profile/order_noPay.t', {
                    "pagenumber": self.pagenumber,
                    "pagesize": self.pagesize,
                    "uid": self.uid,
                    "orderstate": 1
                }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" == data) {
                        self.isEnd = true;

                    } else {
                        self.isEnd = false;
                        if (self.pagenumber == 1) {
                            //console.log(data)
                            $("#list").html(data);
                        } else {
                            $("#list").html(data);
                            //console.log(data)
                        }
                    }
                }).error(function(err) {});
            }
            else if ($(".myOrder .tab ul li a.cur").data("id") == 0) {
                $.get('/template/profile/order_shiping.t', {
                    "pagenumber": self.pagenumber,
                    "pagesize": self.pagesize,
                    "uid": self.uid,
                    "orderstate": 0
                }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" == data) {
                        self.isEnd = true;

                    } else {
                        self.isEnd = false;
                        if (self.pagenumber == 1) {
                            //console.log(data)
                            $("#list").html(data);
                        } else {
                            $("#list").html(data);
                            //console.log(data)
                        }
                    }
                }).error(function(err) {});
            }
            else if ($(".myOrder .tab ul li a.cur").data("id") == 6) {
                $.get('/template/profile/order_done.t', {
                    "pagenumber": self.pagenumber,
                    "pagesize": self.pagesize,
                    "uid": self.uid,
                    "orderstate": 6
                }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" == data) {
                        self.isEnd = true;

                    } else {
                        self.isEnd = false;
                        if (self.pagenumber == 1) {
                            //console.log(data)
                            $("#list").html(data);
                        } else {
                            $("#list").html(data);
                            //console.log(data)
                        }
                    }
                }).error(function(err) {});
            }
            if ($(".myOrder .tab ul li a.cur").data("id") == 5) {
                $.get('/template/profile/order_cancel.t', {
                    "pagenumber": self.pagenumber,
                    "pagesize": self.pagesize,
                    "uid": self.uid,
                    "orderstate": 5
                }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" == data) {
                        self.isEnd = true;

                    } else {
                        self.isEnd = false;
                        if (self.pagenumber == 1) {
                            //console.log(data)
                            $("#list").html(data);
                        } else {
                            $("#list").html(data);
                            //console.log(data)
                        }
                    }
                }).error(function(err) {});
            }
        }
    }
    var orderList = new gallery();
    orderList.init();
}).call(this);