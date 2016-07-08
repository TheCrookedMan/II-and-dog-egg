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
        unload: true,
        callback: function(element, op) {
            $(element).parents(".echo-loading").removeClass("echo-loading");
            console.log(element, 'has been', op + 'ed');
        }
    });


    //搜索

    var $form = $('#searchForm');
    var keywords;

    $form.submit(function(){
        keywords=$("#keywords").val();
        $form.action='/product/search.html?searchkey="'+keywords+'"'
    })

    $("#oftenKeyword p a").click(function(){
        var keyword = $(this).data("id");
        console.log(keyword);
        window.location.href='/product/search.html?searchkey="'+keyword+'"'
    })
}).call(this)
