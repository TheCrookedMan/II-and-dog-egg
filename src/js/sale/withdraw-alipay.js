(function() {
    var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
    $tooltip.appendTo(document.body);
    var $form = $('#alipay_info');
    $form.validator({
        validate: function(validity) {
            $tooltip.hide();
            if (validity.field.name == "AccountNo") {
                if (validity.field.value == "" || !(common.regInteger(validity.field.value) || common.regEmail(validity.field.value))) {
                    validity.valid = false;
                } else {
                    validity.valid = true;
                }
            }
        },
        submit: function(form) {
            if (this.isFormValid()) {
                // var data = common.parseForm(".am-form");
                // // if (!regCardId.test(data.idcard)) {
                // //     modal.alert("身份证格式错误！");
                // //     return false;
                // // } 
                // // if (type == "improve_and_perfect") {
                // //     updateUserInfo(data);
                // // } else {
                // register(data);
                // // }
                return true;
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
                top: offset.top - $(this).outerHeight() - 25
            });
        } else {
            $tooltip.hide();
        }
    });
}).call(this)