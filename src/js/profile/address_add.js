(function() {
    $("#submit").click(function() {
        var consignee = $("#consignee").val();
        var mobile = $("#mobile").val();
        var address = $("#address").val();
        var isdefault;
        if ($('.set-default').hasClass("cur")) {
            isdefault = 1;
        } else {
            isdefault = 0;
        }

        $.post('/user/editReceiver.post', {
            "address": address,
            "mobile": mobile,
            "regionid": 148,
            "uid": userinfo.Uid,
            "isdefault": isdefault,
            "consignee": consignee,
            "edittag": 0, //0表示新增  1表示更新  -1表示删除
            "said": ''
        }).success(function(data) {
            if (data.code == 1) {
                modal.tip("添加成功！");
                $('.am-dimmer').hide();
                window.location.href = '/profile/address.html';
            } else {
                modal.tip(data.message);
                $('.am-dimmer').hide();
                return false;
            }

        }).error(function(err) {});
    })

    $('.set-default').on("click", function() {　　　　
        $(this).toggleClass("cur");
    });
}).call(this)
