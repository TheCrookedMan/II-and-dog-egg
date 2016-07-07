(function() {
	$.get('/template/profile/profile_address.t').success(function(data) {
        //data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".title").append(data);
        }
    }).error(function(err) {});

// 	$('.set-default').on("click",function(){
// 　　　　$(this).toggleClass("cur")
// 　　});
}).call(this)
