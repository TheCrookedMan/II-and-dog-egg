(function() {
    $.get('/template/index/index_category.t').success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".catelog.text-c").html(data);
        }
    }).error(function(err) {});

    $.get('/template/index/index_lett-nav.t').success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $("#left-nav ul").html(data);
        }
    }).error(function(err) {});

    echo.init({
        offset: 0,
        throttle: 100,
        unload: false,
        callback: function(element, op) {
            $(element).parents(".echo-loading").removeClass("echo-loading");
            console.log(element, 'has been', op + 'ed');
        }
    });
    
    //搜索

    var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
    $tooltip.appendTo(document.body);
    var $form = $('#searchForm');
    var keywords;

    $form.validator({
        validate: function(validity) {
            $tooltip.hide();  
        },
        submit: function(form) {
            keywords=$("#keywords").val();
            if (this.isFormValid()) {
                var data = common.parseForm("form");
                $.post('/product/search.html?searchkey="'+keywords+'"', data).success(function(data) {
                    modal.alert(data.msg);
                });
            }
            return false;
        }
    });

    var validator = $form.data('amui.validator');

    $form.on('focusin focusout', '.am-form-error input', function(e) {
        if (e.type === 'focusin') {
            var $this = $(this);
            var offset = $this.offset();
            var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));

            $tooltip.text(msg).show().css({
                left: offset.left + 10,
                top: offset.top - $(this).outerHeight() - 10
            });
        } else {
            $tooltip.hide();
        }
    });


    // openid:::oLy9ruJlZgr8DmR8NM86JDoV6Ep8

}).call(this)
