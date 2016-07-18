// 宅配卡
$(function() {

    
    // 表单提交方法对象
    var FormSuccess = {};
    var domain = 'http://192.168.1.6:5698/';

    // 表单提交
    $('form').Validform({
        tiptype: function(msg, o, cssctl) {
            if (!o.obj.is("form")) {

                var tips = o.obj.data('tips');

                if (!tips) {
                    var $span = o.obj.siblings(".Validform_checktip");
                    var objtip = $span.length ? $span : $('<span class="Validform_checktip"></span>').insertAfter(o.obj);
                } else {
                    var $span = o.obj.parent().siblings('.' + tips);
                    var objtip = $span.length ? $span : $('<span></span>').addClass(tips).insertAfter(o.obj.parent());
                }

                cssctl(objtip, o.type);

                if (o.type === 2) {
                    objtip.text('');
                    return;
                }
                objtip.text(msg);
            }
        },
        callback: function($that) {

            // 提交按钮
            var $btn = $that.find('button[type="submit"]');
            var action = $that.attr('action');
            var name = $that.attr('name');
            var formData = $that.serialize();

            var btnText = $btn.html();

            // flag
            $that.attr('disabled', 'disabled');
            $btn.text('正在提交...');

            $.ajax({
                    url: domain + action,
                    type: 'post',
                    dataType: 'json',
                    data: formData,
                })
                .done(function(res) {

                    FormSuccess[name](res);
                })
                .fail(function() {
                    $('#wrong').text('请求出错！')
                })
                .always(function() {
                    $btn.text(btnText);
                    $that.removeAttr('disabled');
                });


            return false;
        }
    });

    // 获取页面 url 参数
    var query = (function GetRequest() {
      var url = location.search; //获取url中"?"符后的字串
       var theRequest = new Object();
       if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
             theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
          }
       }
       return theRequest;
    })();
    
    console.log(query);

    // 宅配卡激活页面 INDEX
    (function () {
        if (window.CURRENT_PAGE != 'INDEX') {
            return;
        }

        // 表单提交回调
        FormSuccess['activate'] = function (res) {
            if (res.code == 1) {

                location.href = "activate-info.html?activate=" + res.jump;

            } else {
                $('#wrong').text(res.message);
            }
        };
    })();
   

    // 填写信息页面 INFO
    (function () {
        
        if (window.CURRENT_PAGE != 'INFO') {
            return;
        }

        // 省市联动
        $('#cityselect').citySelect();

        // 拉取卡面信息
        $.ajax({
            url: domain + '/api/user/VIPModel',
            type: 'post',
            dataType: 'json',
            data: {id: query.activate},
        })
        .done(function(res) {
            
            // 请求成功后
            if (res.code == 1) {
                $('#attr').text(res.data.attr);
                $('#content').text(res.data.content);
                $('#card').val(res.data.card);
            }else{
                $('#wrong').text(res.message);
            }
        })
        .fail(function() {
            $('#wrong').text('请求出错！');
        });

        // 表单提交回调
        FormSuccess['info'] = function (res) {
            if (res.code==1) {
                location.href='activate-age.html?success=' + query.activate;
            }else{
                $('#wrong').text(res.message);
            }
        };
    })();

    // 年龄信息
    (function () {
        
        if (window.CURRENT_PAGE != 'AGE') {
            return;
        }

        // 数量选择
        $('.js-number').on('click', '.prev', function(event) {
            numberHandler(-1,  $(this).siblings('input'));

        }).on('click', '.next', function(event) {

            numberHandler(1, $(this).siblings('input'));
        }).on('blur', 'input', function(event) {

            numberHandler(0, $(this));
        });

        $('#cardId').val(query.success)

        function numberHandler (dir, $input) {
            var ys = parseInt($input.val());

            isNaN(ys) ? ys = 0 : ys = ys + dir;

            $input.val(ys < 0 ? 0 : ys);
        }

        // 表单提交回调
        FormSuccess['age'] = function (res) {
            if (res.code==1) {
                location.href='activate-other.html?success=' + query.success;
            }else{
                $('#wrong').text(res.message);
            }
        };

    })();

    // 其他信息
    (function () {
        
        if (window.CURRENT_PAGE != 'OTHER') {
            return;
        }

        $('#cardId').val(query.success);
        var obj = {};

        // 不喜欢吃
        obj.dislike = [];

        // 
        obj.constitution = [];

        $(document).on('click', '.select', function() {
            var $this = $(this);

            var val = $this.data('val');
            var key = $this.attr('key');

            if ($this.hasClass('active')) {
                var index = $.inArray(val, obj[key]);

                obj[key].splice(index, 1);
                $this.removeClass('active');

            }else{

                obj[key].push(val);
                $this.addClass('active');
            }

            $('#' + key).val(obj[key].join(','));
        });

        // 表单提交回调
        FormSuccess['other'] = function (res) {
            if (res.code==1) {
                location.href='activate-success.html?success=' + query.success;
            }else{
                $('#wrong').text(res.message);
            }
        };


    })();

    // 激活成功
    (function () {
        
        if (window.CURRENT_PAGE != 'SUCCESS') {
            return;
        }

        // 获取信息
        $.ajax({
            url: domain + '/api/user/MemberBindModel',
            type: 'post',
            dataType: 'json',
            data: {id: query.success}
        })
        .done(function(res) {
            // 请求成功后
            if (res.code == 1) {
                $('#user').text(res.data.user);
                $('#phone').text(res.data.phone);
                $('#addr').text(res.data.addr);
                $('#remarks').text(res.data.remarks);
            }else{
                $('#wrong').text(res.message);
            }
        })
        .fail(function() {
            $('#wrong').text('请求出错！');
        });
    })();


});
