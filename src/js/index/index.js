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
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {
            $(element).parents(".echo-loading").removeClass("echo-loading");
            console.log(element, 'has been', op + 'ed');
        }
    });

    //搜索

    var $form = $('#searchForm');
    var keywords;

    $form.submit(function() {
        keywords = $("#keywords").val();
        window.location.href = '/product/search.html?searchkey=' + $.trim(keywords);
        return false;
    })

    $("#keywords").change(function(){
      var content = $(this).val(); 
      if($.trim(content) == ''){
        $(this).siblings().hide()
      }
      else{
        $(this).siblings().show();
      }
    });

    $("#deltxt").on('click',function(){
        $(this).hide();
        $(this).siblings().val('')
    })

    $("#oftenKeyword p a").click(function() {
        var keyword = $(this).data("id");
        window.location.href = '/product/search.html?searchkey=' + $.trim(keyword);
    });

    // openid:::oLy9ruJlZgr8DmR8NM86JDoV6Ep8
}).call(this)
