(function() {
    var OpenID = common.getOpenId();
    $(".am-form").validator({
        submit: function(form) {
            if (this.isFormValid()) {
                var params = common.parseForm(".am-form");
                $.post('/distribution/appBind.post', {
                    "username": params.name,
                    "userpwd": params.password,
                    'OpenID': OpenID
                }).success(function(data) {
                    if (data.code == 1) {
                        modal.tip("绑定成功！");
                        $('.am-dimmer').hide();
                        //window.location.href='/profile/address.html';
                    } else {
                        modal.tip(data.message);
                        $('.am-dimmer').hide();
                        return false;
                    }
                });
                return false;
            }
            return false;
        }
    })
}).call(this)
