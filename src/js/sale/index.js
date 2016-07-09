(function() {
    $.post('/distribution/commitionMoney.post', { Uid: 1 }).success(function(data) {
        if(data.code == "1" && !!data.data){
        	var record = data.data;
        	$(".FrozenMoney").text(record.FrozenMoney.toFixed(2));
        	$(".WithdrawMoney").text(record.WithdrawMoney.toFixed(2));
        }
    })
}).call(this)
