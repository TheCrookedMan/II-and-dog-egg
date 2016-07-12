(function() {
	$.get('/template/cishan/cishan.t', { 'Uid': 380}).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".cishan").html(data);
        }
    }).error(function(err) {});
}).call(this)
