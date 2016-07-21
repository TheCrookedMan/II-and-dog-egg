(function() {

    $("#submit").click(function() {

        var consignee = $("#consignee").val();
        var mobile = $("#mobile").val();
        var address = $("#address").val();

        if ($('.set-default').hasClass("cur")) {
            isdefault = 1;
        } else {
            isdefault = 0;
        }

        var areaId = $("#select-area")[0].selectedOptions;
        areaId = $(areaId).data("regionid");

        $.post('/user/editReceiver.post', {
            "address": address,
            "mobile": mobile,
            "regionid": areaId,
            "uid": userinfo.Uid,
            "isdefault": isdefault,
            "consignee": consignee,
            "edittag": 1, //0表示新增  1表示更新  -1表示删除
            "said": said
        }).success(function(data) {
            if (data.code == 1) {
                modal.tip("修改成功！");
                $('.am-dimmer').hide();
                history.go(-1);
                // window.location.href = '/profile/address.html';
            } else {
                modal.tip(data.message);
                $('.am-dimmer').hide();
            }
        }).error(function(err) {});
    })

    if (isdefault == 1) {
        $('.set-default').addClass('cur');
    }

    $('.set-default').on("click", function() {　　　　 $(this).toggleClass("cur");　　 });

    $("#select-provinces").change(function(ev) {
        var index = this.selectedIndex;
        initCity(arealist[index]['L']);
    });

    $("#select-city").change(function(ev) {
        var index = this.selectedIndex;
        initArea(cityData[index]['L']);
    })


    this.cityData = [];

    this.provincesId = -1;
    this.cityId = -1;
    this.areaId = -1;
    $.each(arealist, function(i, I) {
        $.each(I.L, function(j, J) {
            $.each(J.L, function(k, K) {
                if (K['I'] == regionid) {
                    debugger
                    provincesId = I['I'];
                    cityId = J['I'];
                    areaId = K['I'];
                }
            })
        })
    });

    initProvinces(arealist);

    function initProvinces(data) {
        var list = [];
        $.each(data, function(i, I) {
            if (provincesId == I['I']) {
                list.push("<option selected>" + I.N + "</option>");
            } else {
                list.push("<option>" + I.N + "</option>");
            }
        });
        $("#select-provinces").html(list.join(""));
        var index = $("#select-provinces")[0].selectedIndex;
        initCity(arealist[index]['L']);
    }

    function initCity(data) {
        var list = [];
        cityData = data;
        $.each(data, function(i, I) {
            if (cityId == I['I']) {
                list.push("<option selected>" + I.N + "</option>");
            } else {
                list.push("<option>" + I.N + "</option>");
            }

        });
        $("#select-city").html(list.join(""));
        var index = $("#select-city")[0].selectedIndex;
        initArea(data[index]['L']);
    }

    function initArea(data) {
        var list = [];
        $.each(data, function(i, I) {
            if (areaId == I['I']) {
                list.push("<option selected data-regionid=" + I.I + ">" + I.N + "</option>");
            } else {
                list.push("<option data-regionid=" + I.I + ">" + I.N + "</option>");
            }

        });
        $("#select-area").html(list.join(""));
    }
}).call(this)
