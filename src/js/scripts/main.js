$(function() {

    // 今日抢购
    (function($, win) {


        if (!$('#countdown').length) {
            return;
        }

        // 倒计时
        function Countdown(options) {
            this.opts = $.extend({}, Countdown.Default, options);
            this.init();
        }

        Countdown.prototype.init = function() {
            var self = this;
            var opts = self.opts;

            self.$el = $(opts.selecter);
            self.$text = $(opts.texter);

            opts.start = new Date(opts.startTime) / 1000;
            opts.current = new Date(opts.currentTime) / 1000;
            opts.end = new Date(opts.endTime) / 1000;

            opts.status = 1; // 1 表示未开始 2 表示进行中 3 表示已结束

            self.calculate();
            self.bind();
        };

        Countdown.prototype.calculate = function() {
            var self = this;
            var opts = self.opts;

            var count = 0;

            if (opts.status === 1) {
                count = opts.start - opts.current;
            }

            if (opts.status === 1 && count < 0) {
                opts.status = 2;
                self.$text.text(opts.endText);
                count = opts.end - opts.current;
            }

            if (opts.status === 2) {
                count = opts.end - opts.current;
            }

            if (opts.status === 2 && count < 0) {
                self.$text.text(opts.alreadyText);
                clearInterval(opts.timeid);
                return;
            }

            self.rander(count);
        };

        Countdown.prototype.rander = function(count) {
            var self = this;
            var opts = self.opts;

            var hour = Math.floor(count / (60 * 60));
            var minute = Math.floor((count - hour * 60 * 60) / 60);
            var second = Math.floor(count - hour * 60 * 60 - minute * 60);

            (hour < 10) && (hour = '0' + hour);
            (minute < 10) && (minute = '0' + minute);
            (second < 10) && (second = '0' + second);

            var html = opts.template
                .replace('{{hour}}', hour)
                .replace('{{minute}}', minute)
                .replace('{{second}}', second);

            self.$el.html(html);
        };

        Countdown.prototype.bind = function() {
            var self = this;
            var opts = self.opts;

            opts.timeid = setInterval(function() {
                opts.current++;
                self.calculate();
            }, 1000);
        };

        Countdown.Default = {
            selecter: '#countdown',
            currentTime: '2015/06/20 10:00:00',
            startTime: '2015/06/20 10:00:30',
            endTime: '2015/06/20 11:00:30',
            texter: '#texter',
            startText: '距离抢购开始时间还剩',
            endText: '距离抢购结束时间还剩',
            alreadyText: '抢购已结束',
            template: '<span>{{hour}}</span><span>{{minute}}</span><span>{{second}}</span>'
        };


        // 抢购列表
        function Soldbot(options) {
            this.opts = $.extend({}, Soldbot.Default, options);
            this.init();
        }
        Soldbot.prototype.init = function() {
            var self = this;
            var opts = self.opts;

            self.$el = $(opts.selecter);

            self.rander();
            opts.callback && opts.callback(self.$el);
        };

        Soldbot.prototype.rander = function() {
            var self = this;
            var opts = self.opts;

            var html = '';
            var list = opts.dataList;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                html += opts.template
                    .replace('{{link}}', item.link)
                    .replace('{{title}}', item.title)
                    .replace('{{src}}', item.src);
            };

            self.$el.html(html);
        };

        Soldbot.Default = {
            selecter: '#soldbot',
            template: '<a href="{{link}}" class="index-sold-bot-item" title="{{title}}"><span class="img-warp"><img data-src="{{src}}" alt=""></span></a>',
            dataList: [],
            callback: function($element) {
                new Imageload({
                    selecter: $element
                });
            }
        };


        // 图片加载显示
        function Imageload(options) {
            this.opts = $.extend({}, Imageload.Default, options);
            this.init();
        }

        Imageload.prototype.init = function() {
            var self = this;
            var opts = self.opts;

            opts.links = [];
            self.$img = $(opts.selecter).find('img').each(function(i, el) {
                opts.links.push($(el).data('src'));
            });

            self.bind();
        };

        Imageload.prototype.bind = function() {
            var self = this;
            var opts = self.opts;

            for (var i = 0; i < opts.links.length; i++) {
                loadImage(i, opts.links[i]);
            };

            function loadImage(index, src) {
                var image = new Image();

                if (image.complete) {
                    self.$img.eq(index).attr('src', src);
                    console.log('completer', index);
                } else {
                    image.onload = function() {
                        self.$img.eq(index).attr('src', src);
                        console.log('onload', index);
                    };
                }
            }
        };

        Imageload.Default = {
            selecter: ''
        };


        // 加载今日抢购数据
        $.ajax({
            url: 'http://services.xian17.com/api/user/seckillALLlist',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                var data = res.data;

                console.log(data)

                if (res.code === '1' && res.data) {
                    // 倒计时
                    new Countdown({
                        currentTime: parseInt(data.currentTime.replace('/Date(', '').replace(')/', '')),
                        startTime: parseInt(data.startTime.replace('/Date(', '').replace(')/', '')),
                        endTime: parseInt(data.endTime.replace('/Date(', '').replace(')/', ''))
                    });
                    // 倒计时
                    // new Countdown({
                    //     currentTime: '2015/06/20 10:00:00',
                    //     startTime: '2015/06/20 10:00:10',
                    //     endTime: '2015/06/20 10:00:20'
                    // });
                    // 抢购列表
                    new Soldbot({
                        dataList: data.list
                    });
                } else {
                    console.log('今日抢购数据没有了！')
                }
            },
            error: function() {
                console.log('加载今日抢购数据失败！');
            }
        });

    })($, window);

    /* touch slide */
    (function($, win) {

        if (!$('#touchSlider').length) {
            return;
        }

        function Plugin(options) {
            this.opts = $.extend(true, Plugin.Default, options);
            this.init();
        }

        Plugin.prototype.init = function() {
            var self = this;
            var opts = self.opts;

            self.$el = $(opts.selecter);
            if (!self.$el.length) {
                return
            };

            self.$item = self.$el.find(opts.item);

            opts.itemWidth = Math.ceil(self.$el.height() * opts.scale + 24);
            opts.leng = self.$item.length;
            opts.index = 0;

            opts.boundary = ($(window).width() - opts.itemWidth) / 2 + opts.itemWidth;

            self.$el.width(opts.itemWidth);

            self.$item.each(function(index, el) {
                var x = index * opts.itemWidth > opts.boundary ? opts.boundary : index * opts.itemWidth;

                $(el).css({
                    transition: 'all 0s ease-out',
                    // transform: 'translate3d(' + x + 'px, 0, ' + (-Math.abs(index - opts.index) * opts.perspective) + 'px)',
                    transform: 'translate(' + x + 'px, 0)'
                });


            });
            self.$item.eq(0).addClass('active');

            self.bind();
        };

        Plugin.prototype.bind = function() {
            var self = this;
            var opts = self.opts;

            // touchstart
            function touchstartHandler(event) {
                var touch = event.touches[0];

                opts.startX = touch.pageX;
                opts.startY = touch.pageY;

                opts.startTime = (new Date()).getTime();

                opts.offsetX = 0;
                opts.offsetY = 0;
                opts.dir = '';
            }

            // touchmove
            function touchmoveHandler(event) {
                var touch = event.touches[0];

                opts.endX = touch.pageX;
                opts.endY = touch.pageY;
                opts.offsetX = opts.endX - opts.startX;
                opts.offsetY = opts.endY - opts.startY;

                // var offsetTime = (new Date()).getTime() - opts.startTime;

                // if (offsetTime < 50) {
                //     return;
                // };
                if (opts.dir === 'Y' || Math.abs(opts.offsetY) - Math.abs(opts.offsetX) > 10) {
                    opts.dir = 'Y';


                } else if (opts.dir === 'X' || Math.abs(opts.offsetX) - Math.abs(opts.offsetY) > 10) {
                    opts.dir = 'X'


                    var prev = opts.index - 1;
                    var next = opts.index + 1;

                    var bl = opts.offsetX / opts.itemWidth;

                    self.$item.eq(opts.index).css({
                        transition: 'all 0s ease-out',
                        // transform: 'translate3d(' + opts.offsetX + 'px, 0, ' + (-Math.abs(bl) * opts.perspective) + 'px)',
                        transform: 'translate(' + opts.offsetX + 'px, 0'
                    });

                    if (prev >= 0 && Math.abs(-opts.itemWidth + opts.offsetX) < opts.boundary) {
                        self.$item.eq(prev).css({
                            transition: 'all 0s ease-out',
                            // transform: 'translate3d(' + (-opts.itemWidth + opts.offsetX) + 'px, 0, ' + (-1 + bl) * opts.perspective + 'px)',
                            transform: 'translate(' + (-opts.itemWidth + opts.offsetX) + 'px, 0)'
                        });
                    }

                    if (next < opts.leng && Math.abs(opts.itemWidth + opts.offsetX) < opts.boundary) {
                        self.$item.eq(next).css({
                            transition: 'all 0s ease-out',
                            // transform: 'translate3d(' + (opts.itemWidth + opts.offsetX) + 'px, 0, ' + (-1 - bl) * opts.perspective + 'px)',
                            transform: 'translate(' + (opts.itemWidth + opts.offsetX) + 'px, 0'
                        });
                    }

                }
                event.stopPropagation();
                event.preventDefault();
            }

            // touchend
            function touchendHandler(event) {

                var dir;

                if (Math.abs(opts.offsetX) > 50 && opts.offsetX > 0) {
                    dir = -1;
                } else if (Math.abs(opts.offsetX) > 50 && opts.offsetX < 0) {
                    dir = 1;
                } else {
                    dir = 0;
                }

                var index = opts.index + dir;

                if (index < 0) {
                    index = 0;
                };

                if (index >= opts.leng) {
                    index = opts.leng - 1;
                };

                opts.index = index;

                self.$item.eq(opts.index).addClass('active').css({
                    transition: 'all .3s ease-out',
                    transform: 'translate3d(0, 0, 0)'
                });

                // 向左滑动
                var prev = opts.index - 1;
                var next = opts.index + 1;

                if (prev >= 0) {
                    self.$item.eq(prev).removeClass('active').css({
                        transition: 'all .3s ease-out',
                        transform: 'translate(' + (-opts.itemWidth) + 'px, 0)',
                        // transform: 'translate3d(' + (-opts.itemWidth) + 'px, 0, -' + opts.perspective + 'px)'
                    });
                }

                if (next < opts.leng) {
                    self.$item.eq(next).removeClass('active').css({
                        transition: 'all .3s ease-out',
                        // transform: 'translate3d(' + (opts.itemWidth) + 'px, 0, -' + opts.perspective + 'px)',
                        transform: 'translate(' + (opts.itemWidth) + 'px, 0)'
                    });
                };

                // 回调函数
                opts.moveafter && opts.moveafter(opts.index);
                event.stopPropagation();
                // event.preventDefault();
            }

            // var el = self.$el.get(0);
            var el = document.getElementById('full');

            el.addEventListener('touchstart', touchstartHandler, false);
            el.addEventListener('touchmove', touchmoveHandler, false);
            el.addEventListener('touchend', touchendHandler, false);

        };

        Plugin.Default = {
            selecter: '#touchSlider',
            item: '.secend-slide-item',
            scale: 452 / 715,
            perspective: 200,
            moveafter: null // 移动结束后触发的回调函数
        };

        var backgroundImage = [
            'images/secend/bg-01.jpg',
            'images/secend/bg-02.jpg',
            'images/secend/bg-03.jpg'
        ];

        new Plugin({
            moveafter: function(i) {
                $('#secendFoot').children().eq(i).removeClass('hide').siblings().addClass('hide');
                $('#secendBg').children().eq(i).addClass('active').siblings().removeClass('active');
            }
        });


    })($, window)

});
