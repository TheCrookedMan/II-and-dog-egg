(function() {
    $.get('/template/profile/order_detail.t', {
        "osn": osn,
        "uid": userinfo.UserID
    }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        $("#order_detail").html(data);
        var len = $(".order_detail .list-li").length;
        len = len - 2;
        $("#numOther").html(len);
        $(".more").on('click', function() {
            $(this).toggleClass("cur");
            $(".order_detail .list-li.other").toggle()
        })
    }).error(function(err) {});
}).call(this);
