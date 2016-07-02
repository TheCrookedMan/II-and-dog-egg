$(function(){
   $(".nav-tab a").on('click',function(){
   	var url=$(this).data("id");
   	$(this).addClass("cur").siblings("a").removeClass("cur");
   	$(".con ."+url).show().siblings().hide()
   })
});