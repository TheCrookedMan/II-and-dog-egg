(function() {
    function gallery() {
        this.pagenumber = 1;
        this.pagesize = 20;
        this.isEnd = false;
        this.uid = userinfo.Uid;
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
            if ($(".myOrder .tab ul li a.cur").data("id") == 0) {
                $.get('/template/profile/order_noPay.t', {
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
                    $(".time").each(function(){
                        var time=parseInt($(this).html().replace(/[^0-9]/ig,""));
                        var d=new Date(time); 
                            time=formatDate(d);
                        $(this).html(time);
                    })
                }).error(function(err) {});
            } else if ($(".myOrder .tab ul li a.cur").data("id") == 1) {
                $.get('/template/profile/order_shiping.t', {
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
                    $(".time").each(function(){
                        var time=parseInt($(this).html().replace(/[^0-9]/ig,""));
                        var d=new Date(time); 
                            time=formatDate(d);
                        $(this).html(time);
                    })
                }).error(function(err) {});
            } else if ($(".myOrder .tab ul li a.cur").data("id") == 2) {
                $.get('/template/profile/order_done.t', {
                    "pagenumber": self.pagenumber,
                    "pagesize": self.pagesize,
                    "uid": self.uid,
                    "orderstate": 2
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
                    $(".time").each(function(){
                        var time=parseInt($(this).html().replace(/[^0-9]/ig,""));
                        var d=new Date(time); 
                            time=formatDate(d);
                        $(this).html(time);
                    })
                }).error(function(err) {});
            }
            if ($(".myOrder .tab ul li a.cur").data("id") == 3) {
                $.get('/template/profile/order_cancel.t', {
                    "pagenumber": self.pagenumber,
                    "pagesize": self.pagesize,
                    "uid": self.uid,
                    "orderstate": 3
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
                    $(".time").each(function(){
                        var time=parseInt($(this).html().replace(/[^0-9]/ig,""));
                        var d=new Date(time); 
                            time=formatDate(d);
                        $(this).html(time);
                    })
                }).error(function(err) {});
            }
        }
    }
    var orderList = new gallery();
    orderList.init();

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
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    } 
}).call(this);
