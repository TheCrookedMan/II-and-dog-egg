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

        var regionid = $("#select-area")[0].selectedOptions;
        regionid = $(regionid).data("regionid");

        $.post('/user/editReceiver.post', {
            "address": address,
            "mobile": mobile,
            "regionid": regionid,
            "uid": userinfo.Uid,
            "isdefault": isdefault,
            "consignee": consignee,
            "edittag": 0, //0表示新增  1表示更新  -1表示删除
            "said": ''
        }).success(function(data) {
            if (data.code == 1) {
                modal.tip("添加成功！");
                $('.am-dimmer').hide();
                history.go(-1);
                // window.getAddressFun();
                // window.location.href = '/profile/address.html';
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



    $("#select-provinces").change(function(ev) {
        var index = this.selectedIndex;
        initCity(arealist[index]['L']);
    });

    $("#select-city").change(function(ev) {
        var index = this.selectedIndex;
        initArea(cityData[index]['L']);
    })

    initProvinces(arealist);
    this.cityData = [];
    function initProvinces(data) {
        var list = [];
        $.each(data, function(i, I) {
            list.push("<option>" + I.N + "</option>");
        });
        $("#select-provinces").html(list.join(""));
        var index = $("#select-provinces")[0].selectedIndex;
        initCity(arealist[index]['L']);
    }

    function initCity(data) {
        var list = [];
        cityData = data;
        $.each(data, function(i, I) {
            list.push("<option>" + I.N + "</option>");
        });
        $("#select-city").html(list.join(""));
        var index = $("#select-city")[0].selectedIndex;
        initArea(data[index]['L']);
    }

    function initArea(data) {
        var list = [];
        $.each(data, function(i, I) {
            list.push("<option data-regionid="+I.I+">" + I.N + "</option>");
        });
        $("#select-area").html(list.join(""));
    }


}).call(this)
