(function() {
    $.post('/distribution/getLowerLevelCount.post', { Uid: userinfo.Uid }).success(function(data) {
    	if(data.code == "1" && !!data.data){
    		var record = data.data;
    		$.each(record,function(i,I){
    			$(".level-"+I.Level+" .grade").text(I.Agent);
    			$(".level-"+I.Level+" .normal-member").text(I.Normal);
    		})
    	}
    })
}).call(this)
