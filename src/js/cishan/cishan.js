(function() {
	$.get('/template/cishan/cishan.t').success(function(data) {
        data = data.replace(/(^\s+)|(\s+$)/g, "");
        if ("" !== data) {
            $(".cishan").html(data);

            var price=$("#total").data("id");
            	var money=fmoney(price, 2);
            	money.toString();
            for(var j=0;j<money.length;j++){
				var q = money.substring(j,j+1);
				if(q!="."){
					var str='<li><img src="../../img/cibg.png"><em>'+q+'</em></li>';
					$("#total").append(str)
				}
				else{
					var str='<li class="dian">.</li>';
					$("#total").append(str)
				}
			}

        }
    }).error(function(err) {});

	function fmoney(s, n) {
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		t = "";
		for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	} 
    
}).call(this)
