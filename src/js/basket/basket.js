(function() {

//     $('.list-li').touchWipe({itemDelete: '.btn'});
$.get('/template/basket/basket_list.t',{"uid":9}).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
        	$(".pub_noData").hide();
            $(".list-ul").html(data);
            if($(".list-ul li.can").length>0){

            }
            else{
            	
            }
        }

        $('.set-default').on("click",function(){
	        $(this).toggleClass("cur");
	        $("#total").toggleClass("active");
	　　});
    }).error(function(err) {});
}).call(this)