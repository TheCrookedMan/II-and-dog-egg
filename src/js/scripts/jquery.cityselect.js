/*
Ajax 三级省市联动
http://code.ciaoca.cn/
日期：2012-7-18

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项
------------------------------ */
(function($) {
    $.fn.citySelect = function(settings) {
        if (this.length < 1) {
            return;
        };

        // 默认值
        settings = $.extend({
            url: "../js/scripts/city.min.js",
            prov: -1,
            city: -1,
            dist: -1,
            nodata: 'none',
            required: true
        }, settings);

        var box_obj = this;
        var prov_obj = box_obj.find(".prov");
        var city_obj = box_obj.find(".city");
        var dist_obj = box_obj.find(".dist");
        var prov_val = settings.prov;
        var city_val = settings.city;
        var dist_val = settings.dist;
        var select_prehtml = (settings.required) ? "" : "<option value=''>请选择</option>";
        var city_json;

        // 赋值市级函数
        var cityStart = function() {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
            };

            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || typeof(city_json[prov_id].L) == "undefined") {
                if (settings.nodata == "none") {
                    city_obj.css("display", "none");
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    city_obj.css("visibility", "hidden");
                    dist_obj.css("visibility", "hidden");
                };
                return;
            };

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json[prov_id].L, function(i, city) {
                temp_html += "<option value='" + city.I + "'>" + city.N + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({
                "display": "",
                "visibility": ""
            }).siblings('.val').text(city_json[prov_id].L[0].N);
            distStart();
        };

        // 赋值地区（县）函数
        var distStart = function() {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
                city_id--;
            };
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0 || typeof(city_json[prov_id].L[city_id].L) == "undefined") {
                if (settings.nodata == "none") {
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    dist_obj.css("visibility", "hidden");
                };
                return;
            };

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json[prov_id].L[city_id].L, function(i, dist) {
                temp_html += "<option value='" + dist.I + "'>" + dist.N + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({
                "display": "",
                "visibility": ""
            }).siblings('.val').text(city_json[prov_id].L[city_id].L[0].N);
        };

        var init = function() {
            // 遍历赋值省份下拉列表
            temp_html = select_prehtml;

            $.each(city_json, function(i, item) {
                temp_html += "<option value='" + item.I + "'>" + item.N + "</option>";
            });

            prov_obj.html(temp_html).siblings('.val').text(city_json[0].N);

            // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
            if (settings.prov >= 0) {
                prov_obj.siblings('.val').text(prov_obj.val(settings.prov).find('option:selected').text());
            }
            cityStart();

            if (settings.city >= 0) {
                city_obj.siblings('.val').text(city_obj.val(settings.city).find('option:selected').text());
            }
            distStart();

            if (settings.dist >= 0) {
                dist_obj.siblings('.val').text(dist_obj.val(settings.dist).find('option:selected').text());
            };

            // 选择省份时发生事件
            prov_obj.bind("change", function() {
                cityStart();
                // console.log('prov')
            });

            // 选择市级时发生事件
            city_obj.bind("change", function() {
                distStart();
            });
        };

        // 设置省市json数据
        if (typeof(settings.url) == "string") {
            $.getJSON(settings.url, function(json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        };
    };
})(jQuery);
