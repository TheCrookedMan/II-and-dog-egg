$(function() {
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
            '/img/secend/bg-01.jpg',
            '/img/secend/bg-02.jpg',
            '/img/secend/bg-03.jpg'
        ];

        new Plugin({
            moveafter: function(i) {
                $('#secendFoot').children().eq(i).removeClass('hide').siblings().addClass('hide');
                $('#secendBg').children().eq(i).addClass('active').siblings().removeClass('active');
            }
        });


    })($, window)
})
