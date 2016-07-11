(function() {
	$.get('/template/profile/profile_address.t', { 'uid': 380}).success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {

            $(".address").html(data);

            $(".delAddress").click(function(){
            	var said=$(this).data('id');
            	var regionid=$(this).data('regionid');
            	var mobile=$(this).data('mobile');
            	var address=$(this).data('address');
            	var isdefault=$(this).data('isdefault');
            	var consignee=$(this).data('consignee');
            	$.post('/user/editReceiver.post', 
	    		{
	    			"address": address,
				    "mobile": mobile,
				    "regionid": regionid,
				    "uid": 380,
				    "isdefault": isdefault,
				    "consignee":consignee,
				    "edittag": -1,    //0表示新增  1表示更新  -1表示删除
				    "said": said
	    		}).success(function(data) {
	                if(data.code == 1){
	    				modal.tip("删除成功！");
		                $('.am-dimmer').hide();
		                $('li#'+said).remove();
	    			}
	    			else{
	    				modal.tip(data.message);
	    				$('.am-dimmer').hide();
	    			}
		    }).error(function(err) {});
            })
        }
    }).error(function(err) {});
}).call(this)
