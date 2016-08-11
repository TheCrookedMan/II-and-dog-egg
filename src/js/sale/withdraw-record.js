(function() {
    function record() {
        this.pageNo = 1;
        this.pageSize = 20;
        this.isEnd = false;
    }
    record.prototype = {
        init: function() {
            var self = this;
            self.get();
            // scroll.on(function() {
            //     if (!self.isEnd) {
            //         self.pageNo++;
            //         self.get();
            //     }
            // }, function() {
            //     /* 上拉到顶 */
            // });
        },
        get: function() {
            var self = this;
            modal.loading("open","正在加载...");
            $.get('/template/sale/withdraw_record.t', {
                "page": self.pageNo,
                "pagesize": self.pageSize,
                "Uid": userinfo.Uid,
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                modal.loading("close");
                if ("" == data) {
                    self.isEnd = true;
                    $("body .scroll-prompt").text("-没有更多数据-");
                } else {
                    self.isEnd = false;
                    if (self.pageNo == 1) {
                        $("section.withdraw-record").html(data);
                    } else {
                        $("section.withdraw-record").append(data);
                    }
                }
            }).error(function(err) {});
        }
    }
    new record().init();
}).call(this)
