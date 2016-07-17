(function() {
    $.get('/template/profile/order_status.t', {
        "oid": orderId
    }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        $("#order_detail").html(data);
    }).error(function(err) {});
}).call(this);
