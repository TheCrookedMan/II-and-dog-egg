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
                "uid": userinfo.Uid
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
                $(".time").each(function(){
                    var time=parseInt($(this).html().replace(/[^0-9]/ig,""));
                    var d=new Date(time); 
                        time=formatDate(d);
                    $(this).html(time);
                })
            }).error(function(err) {});
        }
    }
    var productList = new gallery();
    productList.init();

    function formatDate(now) { 
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds(); 

        if (month<10)
        {
            month="0"+month.toString();
        }
        if(date<10){
            date="0"+date.toString();
        }
        if(hour<10){
            hour="0"+hour.toString();
        }
        if(minute<10){
            minute="0"+minute.toString();
        }
        if(second<10){
            second="0"+second.toString();
        }
        return year+"-"+month+"-"+date; 
    } 
}).call(this)
