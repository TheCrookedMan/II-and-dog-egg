$(function() {
	$('.set-default').on("click",function(){
　　　　$(this).toggleClass("cur")
　　});
     $('.list-li').touchWipe({itemDelete: '.btn'});
});