$(function(){
	$('.am-popup-bd dl dt a').on("click",function(){
　　　　$(this).parent().siblings().toggle();
		$(this).parents('dl').siblings().children('dd').slideUp()
　　});
})
