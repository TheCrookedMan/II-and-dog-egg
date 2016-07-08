(function() {
	var said=$("#said").val();

	$.get('/template/profile/profile_address.t', { 'uid': 380}).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".edit_address").html(data);
        }
    }).error(function(err) {});

    
	$('.set-default').on("click",function(){
　　　　$(this).toggleClass("cur")
　　});
}).call(this)
