(function() {
    $.post('/product/productDetail.post', { "pid": pid }).success(function(data) {
        if(data.code == "1" && !!data.data){
            var record = data.data;
            var img=record.img;
            var imgs=img.ImageArray;
            for(var p in imgs){
                var str='<li><img src='+imgs[p]+'/></li>';
                $("#imgs").append(str);
            }
        }
    })
}).call(this)