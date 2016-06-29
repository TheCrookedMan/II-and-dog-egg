$(function(){
	var gallery = $('.swiper-container').swiper({
		slidesPerView:'auto',
		watchActiveIndex: true,
		centeredSlides: true,
		pagination:'.pagination',
		paginationClickable: true,
		resizeReInit: true,
		keyboardControl: true,
		grabCursor: true,
		onImagesReady: function(){
			changeSize();
		}
	})
	function changeSize() {
		//Unset Width
		$('.swiper-slide').css('width','')
		//Get Size
		var imgWidth = $('.swiper-slide img').width();
        var len=$('.swiper-slide img').length;
		if (imgWidth+40>$(window).width()) imgWidth = $(window).width()-40;
		//Set Width
		$('.swiper-slide').css('width', imgWidth-20);
        $('.swiper-wrapper').css('width', (imgWidth+40)*len);
       
	}

	changeSize();
	
	$(window).resize(function(){
		changeSize()
		gallery.resizeFix(true)
	})

	//判断手机滑动
	var startX = 0;
            
    //touchstart事件
    function touchSatrtFunc(evt) {
        try
        {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            //记录触点初始位置
            startX = x;
        }
        catch (e) {
            alert('touchSatrtFunc：' + e.message);
        }
    }

    //touchmove事件，这个事件无法获取坐标
    function touchMoveFunc(evt) {
        try
        {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            //判断滑动方向
            if (x - startX != 0) {
                 var j=$(".pagination span.swiper-active-switch").index();
                 j=j+1;
                 var url='url(../img/bg'+j+'.jpg)';
                 //console.log(url);
                 $(".swiper-container").css("background-image",url)
            }
        }
        catch (e) {
            alert('touchMoveFunc：' + e.message);
        }
    }

    //touchend事件
    function touchEndFunc(evt) {
        try {
        }
        catch (e) {
            alert('touchEndFunc：' + e.message);
        }
    }

    //绑定事件
    function bindEvent() {
        document.addEventListener('touchstart', touchSatrtFunc, false);
        document.addEventListener('touchmove', touchMoveFunc, false);
        document.addEventListener('touchend', touchEndFunc, false);
    }

    //判断是否支持触摸事件
    function isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            bindEvent(); //绑定事件
        }
        catch (e) {
            alert("不支持TouchEvent事件！" + e.message);
        }
    }
    window.onload = isTouchDevice;
})
