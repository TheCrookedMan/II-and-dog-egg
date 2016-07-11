(function() {
	
    $("#submit").click(function(){

    	var consignee=$("#consignee").val();
    	var mobile=$("#mobile").val();
    	var address=$("#address").val();

    	if($('.set-default').hasClass("cur")){
    		isdefault=1;
    	}
    	else{
    		isdefault=0;
    	}

    	$.post('/user/editReceiver.post', 
    		{
    			"address": address,
			    "mobile": mobile,
			    "regionid": 148,
			    "uid": 380,
			    "isdefault": isdefault,
			    "consignee": consignee,
			    "edittag": 1,    //0表示新增  1表示更新  -1表示删除
			    "said": said
    		}).success(function(data) {
                if(data.code == 1){
    				modal.tip("添加成功！");
	                $('.am-dimmer').hide();
	                window.location.href='/profile/address.html';
    			}
    			else{
    				modal.tip(data.message);
    				$('.am-dimmer').hide();
    			}
	    }).error(function(err) {});
    })

    if(isdefault==1){
    	$('.set-default').addClass('cur');
    }

	$('.set-default').on("click",function(){
　　　　$(this).toggleClass("cur");
　　});

}).call(this)
