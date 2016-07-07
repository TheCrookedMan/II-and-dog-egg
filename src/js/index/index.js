(function() {
    $.get('/template/index/index_category.t').success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".catelog.text-c").html(data);
        }
    }).error(function(err) {});

    $.get('/template/index/index_lett-nav.t').success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $("#left-nav ul").html(data);
        }
    }).error(function(err) {});

    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {
            $(element).parents(".echo-loading").removeClass("echo-loading");
            console.log(element, 'has been', op + 'ed');
        }
    });

}).call(this)
