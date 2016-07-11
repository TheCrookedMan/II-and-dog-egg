(function() {
    $.get('/template/profile/order_detail.t', {
        "osn": osn,
        "uid": 9
    }).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        $("#order_detail").html(data);
    }).error(function(err) {});
}).call(this);