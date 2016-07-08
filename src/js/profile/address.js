(function() {
	$.get('/template/profile/profile_address.t', { 'uid': 380}).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".address").html(data);
        }
    }).error(function(err) {});
}).call(this)
