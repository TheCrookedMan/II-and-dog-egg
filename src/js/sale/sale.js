(function() {
    $.post('/distribution/getSalesCount.post', { Uid: 1 }).success(function(data) {
        if ("1" == data.code && !!data.data) {
            var record = data.data;
            if (record.totalSales > 0) {
                $(".totalSales").text(record.totalSales.toFixed(2));
            }
            if (record.totalCommission > 0) {
                $(".totalCommission").text(record.totalCommission.toFixed(2));
            }
        }
    });

    function sale() {
        this.pageNo = 1;
        this.pageSize = 20;
        this.isEnd = false;
        this.condition = 0;
    }
    sale.prototype = {
        init: function() {
            var self = this;
            self.refresh();
            // scroll.on(function() {
            //     if (!self.isEnd) {
            //         self.pageNo++;
            //         self.refresh();
            //     }
            // }, function() {
            //     /* 上拉到顶 */
            // });
        },
        refresh: function() {
            var self = this;
            $.get('/template/sale/salesList.t', {
                "page": self.pageNo,
                "pagesize": self.pageSize,
                "condition": self.condition,
                "Uid": 1
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;

                } else {
                    self.isEnd = false;
                    if (self.pageNo == 1) {
                        $(".saleList .cord").html(data);
                    } else {
                        $(".saleList .cord").append(data);
                    }
                }
            }).error(function(err) {});
        },
        reset: function(condition) {
            this.condition = condition;
            this.pageNo = 1;
            this.pageSize = 20;
            this.isEnd = false;
            this.refresh();
        }
    }
    this.saleList = new sale();
    this.saleList.init();


    $("#my-actions").on("click", ".record a", function(ev) {
        var condition = $(this).data("condition");
        saleList.reset(condition);
        $("#my-actions").modal('close');
    })

}).call(this)
