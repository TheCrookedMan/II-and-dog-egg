/*
    common 公共
 */
(function() {
    var common = function() {
        this.reg_cellPhone = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
        this.reg_cardId = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        this.reg_integer = /^\+?[1-9][0-9]*$/;
        this.reg_skip = /\s/;
        this.reg_beforeWeight = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        this.reg_height = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        //单位：秒
        // this.maxAge = 365 * 24 * 60 * 60;
        // 单位：天
        this.expires = 30;
        this.reg_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    };
    common.prototype = {
        parseForm: function(selector) {
            var data = $(selector).serializeArray(),
                obj = {};
            for (var i = 0; i < data.length; i++) {
                var I = data[i];
                obj[I.name] = I.value;
            }
            return obj;
        },
        regMobileNo: function($v) {
            return this.reg_cellPhone.test($v);
        },
        regCardId: function(id) {
            return this.reg_cardId.test(id);
        },
        regInteger: function(num) {
            return this.reg_integer.test(num);
        },
        regSkip: function(str) {
            return this.reg_skip.test(str);
        },
        regEmail: function(str) {
            return this.reg_email.test(str);
        },
        regBeforeWeight: function(value) {
            return this.reg_beforeWeight.test(value);
        },
        regHeight: function(value) {
            return this.reg_height.test(value);
        },
        regRealAge: function(date) {
            date = new Date(date);
            var now = new Date().getTime();
            var age = date.getTime();
            var difference = now - age;
            if (difference < 0) {
                return false;
            } else {
                var d = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);
                if (d >= 16 && d <= 60) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        formatDate: function(date, format) {
            date = new Date(date);
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };

            format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
                var v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                } else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        },
        toWeek: function(data) {
            var date = typeof data == 'string' ? data * 1 : data;
            date = new Date(date);
            var map = {
                "1": "周一",
                "2": "周二",
                "3": "周三",
                "4": "周四",
                "5": "周五",
                "6": "周六",
                "0": "周日",
            }
            return map[date.getDay().toString()];
        },
        setCookie: function(name, value) {
            $.cookie(name, value, { expires: this.expires, path: '/' })
        },
        getCookie: function(name) {
            var value = $.cookie(name);
            if (undefined == value) {
                return {}
            }
            return JSON.parse(value);
        },
        getOpenId: function() {
            return $.cookie('openId');
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    };
    this.common = new common();
}).call(this);
/*
    身份证验证
 */
(function() {
    var regCardId = function() {
        this.vcity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",     21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",     33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",     42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }; 
    }
    regCardId.prototype = {
        test: function(scCard) {
            if (scCard.length != 0) {      
                if (!this.checkCard(scCard)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        checkCard: function(obj)  { 
            if (this.isCardNo(obj) === false)   {   
                return false;  
            } 
            if (this.checkProvince(obj) === false)   {   
                return false;  
            } 
            if (this.checkBirthday(obj) === false)   {   
                return false;  
            } 
            if (this.checkParity(obj) === false)   {   
                return false;  
            }  
            return true; 
        },
        isCardNo: function(obj)  {
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
            if (reg.test(obj) === false) {   
                return false;  
            }  
            return true;
        },
        checkProvince: function(obj)  {  
            var province = obj.substr(0, 2);  
            if (this.vcity[province] == undefined)   {   
                return false;  
            }  
            return true; 
        },
        checkBirthday: function(obj)  {  
            var len = obj.length;
            /*身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字 */
            if (len == '15')   {   
                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;   
                var arr_data = obj.match(re_fifteen);   
                var year = arr_data[2];   
                var month = arr_data[3];   
                var day = arr_data[4];   
                var birthday = new Date('19' + year + '/' + month + '/' + day);   
                return this.verifyBirthday('19' + year, month, day, birthday);  
            }
            /*身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X */
            if (len == '18')   {   
                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;   
                var arr_data = obj.match(re_eighteen);   
                var year = arr_data[2];   
                var month = arr_data[3];   
                var day = arr_data[4];   
                var birthday = new Date(year + '/' + month + '/' + day);   
                return this.verifyBirthday(year, month, day, birthday);  
            }  
            return false; 
        },
        verifyBirthday: function(year, month, day, birthday)  {  
            var now = new Date();  
            var now_year = now.getFullYear();
            if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {   
                var time = now_year - year;   
                if (time >= 0 && time <= 130) {    
                    return true;
                }   
                return false;
            }  
            return false; 
        },
        checkParity: function(obj)  {  
            obj = this.changeFivteenToEighteen(obj);  
            var len = obj.length;  
            if (len == '18')   {   
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
                var cardTemp = 0,
                    i, valnum;   
                for (i = 0; i < 17; i++)    {     cardTemp += obj.substr(i, 1) * arrInt[i];    }   
                valnum = arrCh[cardTemp % 11];   
                if (valnum == obj.substr(17, 1))    {    
                    return true;   
                }   
                return false;  
            }  
            return false; 
        },
        changeFivteenToEighteen: function(obj)  {  
            if (obj.length == '15')   {   
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
                var cardTemp = 0,
                    i = 0;    
                obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);   
                for (i = 0; i < 17; i++) {
                    cardTemp += obj.substr(i, 1) * arrInt[i];
                }   
                obj += arrCh[cardTemp % 11];   
                return obj;  
            }  
            return obj; 
        }
    }
    this.regCardId = new regCardId();
}).call(this);
// scroll
(function() {
    var scroll = function() {}
    scroll.prototype = {
        on: function(bottomCallback, topCallback) {
            this.off();
            $(window).scroll(function() {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();

                if (scrollTop + windowHeight == scrollHeight) {
                    //滚动到底部执行事件  
                    bottomCallback && bottomCallback();

                    // if ($("body .scroll-prompt").length <= 0) {
                    //     $("body").append('<p class="scroll-prompt">-滑动加载更多-</p>');
                    // }
                }
                if (scrollTop == 0) {
                    //滚动到头部部执行事件  
                    topCallback && topCallback();
                }
            });
        },
        off: function() {
            $(window).off('scroll');
        }
    }
    this.scroll = new scroll();
}).call(this);

/*
    countdown 倒计时
 */
(function() {
    var countdown = function() {
        this.timer;
        this.endDate;
    }
    countdown.prototype = {
        init: function(date, callback) {
            var self = this;
            self.endDate = new Date(date);
            clearInterval(self.timer);
            self.timer = setInterval(function() {
                self.formatTime(self.endDate, callback);
            }, 1000);
        },
        formatTime: function(end, callback) {
            var self = this,
                lastTimeObj = {
                    day: '00',
                    hour: '00',
                    min: '00',
                    sec: '00'
                };
            var now = new Date().getTime();
            var end = end.getTime();
            if (!end) {
                clearInterval(self.timer);
                return false;
            }
            var difference = end - now;
            if (difference <= 0) {
                clearInterval(self.timer);
                return callback(lastTimeObj);
            }
            var t = difference,
                list = [];
            var d = Math.floor(t / 1000 / 60 / 60 / 24);
            var h = Math.floor(t / 1000 / 60 / 60 % 24);
            var m = Math.floor(t / 1000 / 60 % 60);
            var s = Math.floor(t / 1000 % 60);
            if (d >= 1) {
                lastTimeObj['day'] = d;
            }
            if (h < 10) {
                lastTimeObj['hour'] = "0" + h.toString();
            } else {
                lastTimeObj['hour'] = h;
            }
            if (m < 10) {
                lastTimeObj['min'] = "0" + m.toString();
            } else {
                lastTimeObj['min'] = m;
            }
            if (s < 10) {
                lastTimeObj['sec'] = "0" + s.toString();
            } else {
                lastTimeObj['sec'] = s;
            }
            return callback(lastTimeObj);
        }
    }
    this.countdownTimer = new countdown();
}).call(this);
