(function() {
	$("#submit").click(function(){
	    	var name=$("#name").val();
	    	var password=$("#password").val();
	    	$.post('/distribution/appBind.post', 
	    		{
	    			"username": name,
				    "userpwd": password,
				    'OpenID':1
	    		}).success(function(data) {
	    			if(data.code == 1){
	    				modal.tip("绑定成功！");
		                $('.am-dimmer').hide();
		                //window.location.href='/profile/address.html';
	    			}
	    			else{
	    				modal.tip(data.message);
	    				$('.am-dimmer').hide();
	    				return false;
	    			}
	                
		    }).error(function(err) {});
	    })
}).call(this)
