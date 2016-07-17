(function() {
    $.post('/user/accountBalance.post', { "uid": userinfo.Uid }).success(function(data) {
        if (data.code == "1" && !!data.data) {
            var record = data.data;
            $(".price").html(record.balan)
        }
    }).error(function(err) {});
}).call(this)
