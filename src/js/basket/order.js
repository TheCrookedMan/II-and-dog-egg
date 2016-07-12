(function() {

    $.get('/template/basket/order.t', { "uid": 9 ,'type':1,'pids':pids}).success(function(data) {
    	data = data.replace(/(^\s+)|(\s+$)/g, "");
    	if ("" !== data) {
    		$(".order_ok").html(data);
    	}
    }).error(function(err) {});

}).call(this)
