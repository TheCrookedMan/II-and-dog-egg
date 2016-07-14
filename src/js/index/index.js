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

    // $("#oftenKeyword p a").click(function() {
    //     var keyword = $(this).data("id");
    //     window.location.href = '/product/search.html?searchkey=' + $.trim(keyword);
    // });


    //经常购买
     function swiper(selector, options) {
        this.slider = selector.find(".slider")[0];
        this.$slider = $(this.slider);
        this.$wrapper = selector.find(".wrapper");
        this.wrapper = this.$wrapper[0];
        this.$selector = selector;
        this.options = options;
        this.offset = 10;
        this.init();
    }
    swiper.prototype = {
        pre: function($pre) {
            var scrollLeft = this.$wrapper.scrollLeft();
            var sliderWidth = this.$slider.width();
            var length = scrollLeft - sliderWidth;

            if (length + this.offset > 0) {
                this.$wrapper.scrollLeft(length);
            }
            this.sliderButtonType();
        },
        next: function($next) {
            var scrollLeft = this.$wrapper.scrollLeft();
            var sliderWidth = this.$slider.width();
            var wrapperWidth = this.$wrapper.width();
            var length = scrollLeft + sliderWidth;
            var scrollWidth = this.wrapper.scrollWidth;

            if (length < scrollWidth - wrapperWidth + this.offset) {
                this.$wrapper.scrollLeft(length);
            }

            this.sliderButtonType();
        },
        init: function() {
            var self = this;
            this.$selector.on("click", ".slider-pre.active", function(ev) {
                self.pre($(this));
                ev.stopPropagation();
            });
            this.$selector.on("click", ".slider-next.active", function(ev) {
                self.next($(this));
                ev.stopPropagation();
            })
            this.$selector.on("click", ".slider", function(ev) {
                $(this).siblings(".cur").removeClass("cur");
                $(this).addClass("cur");
                self.options.onClick && self.options.onClick($(this));
                ev.stopPropagation();
            });

            if (self.$selector.find(".slider").length > 0) {
                // self.$slider.addClass("cur");
                self.options.onComplete && self.options.onComplete(this.$wrapper.find('.cur'));
            }
            self.sliderButtonType();
        },
        sliderButtonType: function() {
            var scrollLeft = this.$wrapper.scrollLeft();
            var sliderWidth = this.$slider.width();
            var wrapperWidth = this.$wrapper.width();
            var scrollWidth = this.wrapper.scrollWidth;
            if (scrollWidth > wrapperWidth) {
                if (scrollLeft + wrapperWidth < scrollWidth) {
                    this.$selector.find(".slider-next").addClass("active");
                } else {
                    this.$selector.find(".slider-next").removeClass("active");
                }
                if (scrollLeft > 0) {
                    this.$selector.find(".slider-pre").addClass("active");
                } else {
                    this.$selector.find(".slider-pre").removeClass("active");
                }
            }
        }
    }
    $.fn.swiper = function(options) {
        var opts = $.extend(options);
        new swiper(this, opts);
    }

    function initSwiperList() {
        $(".data-list").swiper({
            onClick: function(selector) {
               
            },
            onComplete: function(selector) {
               
            }
        });
    }
     initSwiperList()
    // openid:::oLy9ruJlZgr8DmR8NM86JDoV6Ep8
}).call(this)
