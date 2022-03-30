'use strict';


/****  工具  ****/
define(['jquery', 'daterangepicker'], function ($) {
    /** 随机数4位 **/
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    /** JS中枚举 **/
    /** 自主神经：测验模块项 **/
    const TERM_ENUM = Object.freeze({
        rest5Ecg: 10,  //5分钟静息心电
        valsalva: 20, //Valsalva动作指数试验[吹嘴]
        deepBreathing: 30,  //深呼吸试验
        supineAndUpright: 40,  //倾斜试验-卧立位
        gripStrength: 50,    //握力试验
    });

    /** 自主神经:动作项 **/
    const ACTION_ENUM = Object.freeze({
        valsalvaBlowing: 21,  //吹气
        //valsalvaInhale: 22,   //吸气,
        dbExhale: 31,   //深呼气,
        dbInhale: 32,   //深吸气,
        suSupine: 41,   //倾斜试验-卧立位 - 平卧（仰）,
        suUpright: 42,  //倾斜试验-卧立位 - 站立,
        gripBP: 51,    //3次基础血压时间段
        grip: 52,    //每次握力
        bp: 100,        //血压测验(公共动作测验)
    });

    return {
        /**
         * 计算两个日期字符串之间, 相差的日时分秒
         * @param stDtStr 开始时间戳
         * @param edDtStr 结束时间戳
         */
        DateStrDifference: function(stDtStr, edDtStr) {
            let stime = new Date(stDtStr).getTime();
            let etime = new Date(edDtStr).getTime();
            let usedTime = etime - stime;  //两个时间戳相差的毫秒数
            let days = Math.floor(usedTime / (24 * 3600 * 1000));
            //计算出小时数
            let leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            let seconds = Math.floor((leave2 / 1000) % 60);
            //计算相差的秒
            let time = /*days + "天"+*/ hours + ":" + minutes + ":" + seconds;
            //var time = days;
            return time;
        },
        /**
         * 计算两个时间戳之间相差的日时分秒
         * @param stime 开始时间戳
         * @param etime 结束时间戳
         */
        TimestampDifference: function(stime, etime) {
            let usedTime = etime - stime;  //两个时间戳相差的毫秒数
            let days = Math.floor(usedTime / (24 * 3600 * 1000));
            //计算出小时数
            let leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            let seconds = Math.floor((leave2 / 1000) % 60);
            //计算相差的秒
            let time = /*days + "天"+*/ hours + ":" + minutes + ":" + seconds;
            //var time = days;
            return time;
        },

        /** 将 2021-04-08T08:36:17.000+00:00 转 YYYY-MM-DD HH:MM:SS **/
        dateNormalToDateStr: function (str) {
            let date = new Date(str);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

            return (Y + M + D + h + m + s);

        },
        /** 将 时间戳 转化为 YYYY-MM-DD HH:MM:SS **/
        timestampToDateTimeStr: function (timestamp) {
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

            let strDate = Y + M + D + h + m + s;
            return strDate;

        },
        /** 将 时间戳 转化为 HH:MM:SS **/
        timestampToTimeStr: function (timestamp) {
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            let ms = date.getMilliseconds();
            return (h + m + s);

        },

        /** 将 时间戳 转化为 MM:SS **/
        timestampToMinuteStr: function (timestamp) {
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            //let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            let ms = date.getMilliseconds();
            return (m + s);

        },

        /*** 根据性别类型，转为中文 ***/
        getGenderLabel: function (g) {
            if (g == "M") {
                return "男"
            } else if (g == "W") {
                return "女"
            }
            return "未知";
        },

        /*************  获取GUID *******************/
        getGuid: function () {
            return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
        },

        /**************** 获取DOM所有兄弟节点 ******************/
        sibling: function (elem) {
            let r = [];
            let n = elem.parentNode.firstChild;
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        },

        /**************** 获取URL中的一个参数 ******************/
        getQueryString: function (name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },

        /*** 获取像素比，将 Canvas 宽高进行放大，放大比例为：devicePixelRatio / webkitBackingStorePixelRatio , 我们写了一个兼容的方法。 ***/
        getPixelRatio: function (context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        },

        /******* 阿拉伯数字转中文数字  ******************/
        digitToChinese:function (num) {
            if (!/^\d*(\.\d*)?$/.test(num)) {
                alert("Number is wrong!");
                return "Number is wrong!";
            }
            let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
            let BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
            let a = ("" + num).replace(/(^0*)/g, "").split("."),
                k = 0,
                re = "";
            for (let i = a[0].length - 1; i >= 0; i--) {
                switch (k) {
                    case 0:
                        re = BB[7] + re;
                        break;
                    case 4:
                        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                            re = BB[4] + re;
                        break;
                    case 8:
                        re = BB[5] + re;
                        BB[7] = BB[5];
                        k = 0;
                        break;
                }
                if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
                if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
                k++;
            }
            if (a.length > 1) //加上小数部分(如果有小数部分)
            {
                re += BB[6];
                for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
            }
            return re;
        },

        /***** 获取当前页面的缩放值 ******/
        detectZoom: function () {
            let ratio = 0,
                screen = window.screen,
                ua = navigator.userAgent.toLowerCase();

            if (window.devicePixelRatio !== undefined) {
                ratio = window.devicePixelRatio;
            } else if (~ua.indexOf('msie')) {
                if (screen.deviceXDPI && screen.logicalXDPI) {
                    ratio = screen.deviceXDPI / screen.logicalXDPI;
                }
            } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
                ratio = window.outerWidth / window.innerWidth;
            }

            if (ratio) {
                ratio = Math.round(ratio * 100) / 100;
            }
            return ratio;
        },
        /***** json对象合并的方法 ******/
        extend: function(des, src, override){
            src = this.deepCopy(src);
            if(src instanceof Array){
                for(let i = 0, len = src.length; i < len; i++)
                    extend(des, src[i], override);
            }
            for(let i in src){
                if(override || !(i in des)){
                    des[i] = src[i];
                }
            }
            return des;
        },
        /***** 深拷贝, 就是遍历那个被拷贝的对象 ******/
        deepCopy: function (obj) {
            let result, oClass = getClass(obj);

            if (oClass == "Object") result = {}; //判断传入的如果是对象，继续遍历
            else if (oClass == "Array") result = []; //判断传入的如果是数组，继续遍历
            else return obj; //如果是基本数据类型就直接返回

            for (let i in obj) {
                let copy = obj[i];

                if (this.getClass(copy) == "Object") result[i] = this.deepCopy(copy); //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
                else if (this.getClass(copy) == "Array") result[i] = this.deepCopy(copy); //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
                else result[i] = copy; //基本数据类型则赋值给属性
            }
            return result;
        },
        getClass: function (o) { //判断数据类型
            return Object.prototype.toString.call(o).slice(8, -1);
        },
        /**********   HRV中ECG的获取区块的颜色   **********/
        getAreaColor: function (v) {
            switch (v) {
                /*** 模块 ***/
                case TERM_ENUM.rest5Ecg:
                    return "#83C886";
                case TERM_ENUM.valsalva:
                    return "#FEC06E";
                case TERM_ENUM.deepBreathing:  //深呼吸试验
                    return "#84E3E7";
                case TERM_ENUM.supineAndUpright:  //倾斜试验-卧立位
                    return "#5FC3EA";
                case TERM_ENUM.gripStrength:  //握力
                    return "#BEA27A";
                /*** 动作 ***/
                case ACTION_ENUM.valsalvaBlowing: //吹气
                    return "#D6CAB9";
                case ACTION_ENUM.dbExhale:  //吸气
                    return "#F79ADD";
                case ACTION_ENUM.dbInhale:  //呼气
                    return "#D9D873";
                case ACTION_ENUM.suSupine:  //平躺
                    return "#F9D286";
                case ACTION_ENUM.suUpright: //站立
                    return "#B3E2C7";
                case ACTION_ENUM.gripBP: //测基础血压时
                    return "#ECAB8B";
                case ACTION_ENUM.grip: //握力
                    return "#ED9657";
                case ACTION_ENUM.bp:
                    return "#5AA3FB";
                default: //失效的颜色
                    return "#FE6A8E";
            }
        },
        /**********   HRV中ECG的获取区块的名称   **********/
        getAreaName: function (v) {
            switch (v) {
                /*** 模块 ***/
                case TERM_ENUM.rest5Ecg:
                    return "5分钟静息";
                case TERM_ENUM.valsalva:
                    return "Valsalva 动作指数";
                case TERM_ENUM.deepBreathing:
                    return "深呼吸试验";
                case TERM_ENUM.supineAndUpright:
                    return "倾斜试验-卧立位";
                case TERM_ENUM.gripStrength:
                    return "握力试验";
                /*** 动作 ***/
                case ACTION_ENUM.valsalvaBlowing: //吹气
                    return "吹气";

                case ACTION_ENUM.dbExhale:  //吸气
                    return "吸气";
                case ACTION_ENUM.dbInhale:  //呼气
                    return "呼气";
                case ACTION_ENUM.suSupine:  //平躺
                    return "平躺";
                case ACTION_ENUM.suUpright: //站立
                    return "站立";
                case ACTION_ENUM.gripBP: //测基础血压时
                    return "测基础血压时";
                case ACTION_ENUM.grip: //握力
                    return "测握力时";
                case ACTION_ENUM.bp:
                    return "血压";
                default: //失效的颜色
                    return "请选择测试项";
            }
        },
        /*** 获取ECG 250Hz时间范围内 的总点数 ***/
        addTermColorDescDom: function(_d) {
            let html = '';
            for(let k in TERM_ENUM){
                let v = TERM_ENUM[k];
                html += '<div class="term-color-content"><div class="term-item"><i class="color-area" style="background: ' + this.getAreaColor(v)
                    + '"></i><span>' + this.getAreaName(v) + '</span></div>'
                for(let ak in ACTION_ENUM) {
                    let av = ACTION_ENUM[ak];
                    if((v == TERM_ENUM.rest5Ecg && av == ACTION_ENUM.bp)  //将5分钟静息里面的操纵写上BP颜色
                        || parseInt(av/10)*10 == v) {
                        html += '<div class="term-item"><i class="color-area" style="background: ' + this.getAreaColor(av)
                            + '"></i><span>' + this.getAreaName(av) + '</span></div>'
                    }
                }
                html += "</div>";
            }
            _d.innerHTML = html;
        },


        /*** 获取ECG 250Hz时间范围内 的总点数 ***/
        getEcgPointBy250Hz: function (stime, etime) {
            return parseInt((etime - stime)/ 4);
        },
        /****   ECG心电线路颜色   ****/
        getEcgDrawLineColor: function(v) {
            if (v) {
                return this.getAreaColor(v);
            }
            return "#000000";
        },
        /** JS中枚举 **/
        /** 自主神经：测验模块项 **/
        termEnum: TERM_ENUM,
        /** 自主神经:动作项 **/
        actionEnum: ACTION_ENUM,





        /***************************************** *****************************************/
        /***************************************** *****************************************/
        /*******************************     Eject 弹出框      ******************************/
        /***************************************** *****************************************/
        /***************************************** *****************************************/
        Eject: function() {
            let _this = this;
            let qback = $('<div class="qback"></div>')
            _this.Ealert = function (obj) {
                let alertBox = $('<div class="alertBox"></div>')
                let alertHead = $('<div class="alertHead">' + obj.title + '</div>')
                let alertMes = $('<div class="alertMes">' + obj.message + '</div>')
                let alertBtn = $('<span class="alertBtn">确定</span>').on('click', function () {
                    qback.remove();
                    alertBox.remove();
                })
                alertBox.append(alertHead);
                alertBox.append(alertMes);
                alertBox.append(alertBtn);
                qback.append(alertBox);
                $('body').append(qback);
                alertBox.css({'marginTop': -alertBox.outerHeight() / 2 + 'px'});
            }
                , _this.ECheckTimer = function (obj) {
                let startDate, endDate;
                let confirmBox = $('<div class="alertBox"></div>')
                let confirmHead = $('<div class="alertHead">选择时间</div>')
                let confirmMes = $('<div class="alertMes"><input type="text" class="datepicker" placeholder="点击选择时间段" autocomplete="off"></div>')
                let confirmBtn = $('<span class="ConBtn">确定</span>').on('click', function () {
                    qback.remove()
                    confirmBox.remove()
                    setTimeout(function () {
                        obj.define(startDate, endDate)
                    }, 100)
                })
                $(".alertMes .datepicker").daterangepicker({
                    timePicker: true, //显示时间
                    timePicker24Hour: true, //时间制
                    timePickerSeconds: true, //时间显示到秒
                    drops: "down",
                    minDate: moment(new Date(obj.min)),
                    maxDate: moment(new Date(obj.max)),
                    locale: {
                        format: 'YYYY-MM-DD HH:mm:ss',
                        applyLabel: "应用",
                        cancelLabel: "取消",
                        resetLabel: "重置",
                    }}, function (start, end) {
                    startDate = start;
                    endDate = end;
                });
                let confirmcancel = $('<span class="cancel">取消</span>').on('click', function () {
                    qback.remove()
                    confirmBox.remove()
                    setTimeout(function () {
                        if (obj.cancel) obj.cancel()
                    }, 100)
                })
                confirmBox.append(confirmHead);
                confirmBox.append(confirmMes);
                confirmBox.append(confirmBtn);
                confirmBox.append(confirmcancel);
                qback.append(confirmBox);
                $('body').append(qback);
                confirmBox.css({'marginTop': -confirmBox.outerHeight() / 2 + 'px'});
            }
                , _this.Econfirm = function (obj) {
                let confirmBox = $('<div class="alertBox"></div>')
                let confirmHead = $('<div class="alertHead">' + obj.title + '</div>')
                let confirmMes = $('<div class="alertMes">' + obj.message + '</div>')
                let confirmBtn = $('<span class="ConBtn">确定</span>').on('click', function () {
                    qback.remove()
                    confirmBox.remove()
                    setTimeout(function () {
                        obj.define()
                    }, 100)
                })
                let confirmcancel = $('<span class="cancel">取消</span>').on('click', function () {
                    qback.remove()
                    confirmBox.remove()
                    setTimeout(function () {
                        if (obj.cancel) obj.cancel()
                    }, 100)
                })
                confirmBox.append(confirmHead);
                confirmBox.append(confirmMes);
                confirmBox.append(confirmBtn);
                confirmBox.append(confirmcancel);
                qback.append(confirmBox);
                $('body').append(qback);
                confirmBox.css({'marginTop': -confirmBox.outerHeight() / 2 + 'px'});
            }
                , _this.Etoast = function (mes, time) {
                let timer = null;
                let ToastBox = $('<div class="ToastBox">' + mes + '</div>')
                qback.append(ToastBox);
                $('body').append(qback);
                ToastBox.css({'marginTop': -ToastBox.outerHeight() / 2 + 'px'});
                clearInterval(timer)
                timer = setInterval(function () {
                    time--
                    if (time <= 0) {
                        clearInterval(timer)
                        qback.remove()
                        ToastBox.remove()
                    }
                }, 1000)
            }
                , _this.Eloading = function () {
                let Loading = $('<div class="LoadingBox"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div><div>Loading...</div></div>');
                qback.append(Loading);
                $('body').append(qback);
                Loading.css({'marginTop': -Loading.outerHeight() / 2 + 'px'});
            },_this.Eclose = function () {
                qback.empty();
                qback.remove();
            }
                , _this.EConfirmRadio = function (obj) {
                let confirmBox = $('<div class="alertBox"></div>')
                let confirmHead = $('<div class="alertHead">标记ECG类型</div>')
                let confirmMes = $('<div class="alertMes"><row><input type="radio" name="ecgSignType" value="1" checked>选中ECG' +
                    '<input type="radio" name="ecgSignType" value="0" style="margin-left: 20px">删除ECG</row></div>')
                let confirmBtn = $('<span class="ConBtn">确定</span>').on('click', function () {
                    let val = $("input[name='ecgSignType']:checked").val();
                    qback.remove()
                    confirmBox.remove()
                    setTimeout(function () {
                        obj.define(val)
                    }, 100)
                })
                let confirmcancel = $('<span class="cancel">取消</span>').on('click', function () {
                    qback.remove()
                    confirmBox.remove()
                    setTimeout(function () {
                        if (obj.cancel) obj.cancel()
                    }, 100)
                })
                confirmBox.append(confirmHead);
                confirmBox.append(confirmMes);
                confirmBox.append(confirmBtn);
                confirmBox.append(confirmcancel);
                qback.append(confirmBox);
                $('body').append(qback);
                confirmBox.css({'marginTop': -confirmBox.outerHeight() / 2 + 'px'});
            }
        }


    }


}



)
