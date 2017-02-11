function ugraph(id) {
    var canvas = new fabric.Canvas(id);
    var graph = {
        canvas: canvas,
        records: { data: [], active: 1, maxlength: 20 },
        canvasZoom: 1,

        /**
         * [addrecords 添加历史记录]
         * @Author   yfy
         * @DateTime 2016-05-18T11:03:32+0800
         * @return   {[type]}                 [description]
         */
        addrecords: function() {

            var savedate = this.save();
            if (this.records.data.length > 0 && this.records.active != this.records.data.length - 1) {
                this.records.data.splice(this.records.active + 1, this.records.data.length - 1 - this.records.active, savedate);
            } else if (this.records.data.length < this.records.maxlength) {
                this.records.data.splice(this.records.active + 1, 0, savedate);
            } else {
                this.records.data.splice(1, 1, savedate);
            }
            this.records.active = this.records.data.length - 1;


            return this.records;
        },

        /**
         * [recordsUndo 历史后退]
         * @Author   yfy
         * @DateTime 2016-05-18T11:03:50+0800
         * @return   {[type]}                 [description]
         */
        recordsUndo: function() {
            if (this.records.active > 0) {
                this.records.active--;
                this.draw(this.records.data[this.records.active], false);
            }
        },

        /**
         * [recordsRedo 历史前进]
         * @Author   yfy
         * @DateTime 2016-05-18T11:04:06+0800
         * @return   {[type]}                 [description]
         */
        recordsRedo: function() {
            if (this.records.active < this.records.data.length - 1) {
                this.records.active++;
                this.draw(this.records.data[this.records.active], false);
            }

        },

        /**
         * [SetcanvasZoom 设置缩放]
         * @Author   yfy
         * @DateTime 2016-05-18T11:04:22+0800
         * @param    {[type]}                 zoom [0-1]
         */
        zoomPoint:{x:canvas.width / 2,y:canvas.height / 2},
        SetcanvasZoom: function(zoom) {
            this.canvasZoom = zoom;
            this.canvas.zoomToPoint(new fabric.Point(this.zoomPoint.x, this.zoomPoint.y), this.canvasZoom);
        },
        /**
         * [init 初始化]
         * @Author   yfy
         * @DateTime 2016-05-18T11:04:52+0800
         * @param    {[type]}                 json [可选]
         * @return   {[type]}                      [description]
         */
        init: function(json) {
            fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
            canvas.selection = false;
            (function render() {
                canvas.renderAll();
                fabric.util.requestAnimFrame(render);
            })();
            if (json) {
                this.draw(json);
            }

        },

        /**
         * [draw 绘画]
         * @Author   yfy
         * @DateTime 2016-05-18T11:05:21+0800
         * @param    {[type]}                 json       [description]
         * @param    {[type]}                 recordsjud [可选 是否记录历史]
         * @return   {[type]}                            [description]
         */
        draw: function(json, recordsjud) {
            console.log(new Date())
            var _this = this;

            canvas.clear();
            var urlArr = [];
            for (var i in json.object) {
                if (json.object[i].genre == 'img' || json.object[i].genre == "svg") {
                    urlArr.push(json.object[i].shape.source);
                }
            }
            _this.loadImage(urlArr, function() {


                for (var i in json.object) {
                    window[json.object[i].id] = _this.creatShape(json.object[i]);
                }
                for (var j in json.straightLine) {
                    _this.straightLine(eval(json.straightLine[j].sObjId), eval(json.straightLine[j].eObjId), json.straightLine[j]);
                }
                for (var n in json.brokenLine) {
                    _this.brokenLine(eval(json.brokenLine[n].sObjId), eval(json.brokenLine[n].eObjId), json.brokenLine[n]);
                }
                for (var m in json.text) {
                    window[json.text[m].id] = _this.creatText(json.text[m]);
                }
                if (recordsjud == undefined || recordsjud) {
                    _this.addrecords();
                }
            });

console.log(new Date())

        },

        /**
         * [save 生成当前图形json]
         * @Author   yfy
         * @DateTime 2016-05-18T11:05:54+0800
         * @return   {[type]}                 [description]
         */
        save: function() {
            var _this = graph;
            var savejson = {
                object: [],
                straightLine: [],
                brokenLine: [],
                text: []
            };

            for (var i in _this.canvas.getObjects()) {

                if (_this.canvas.getObjects()[i].classify == 'obj') {
                    var obj = _this.canvas.getObjects()[i];
                    var obj_json = {};


                    obj_json = {

                        genre: obj.genre,
                        id: obj.id,
                        left: obj.left,
                        top: obj.top,
                        angle: obj.angle,
                        scaleX: obj.scaleX,
                        scaleY: obj.scaleY,

                        shape: {
                            top: 0,
                            left: 0,
                            source: obj.source,
                            crashPath: obj.content.crashPathInitial,
                            scaleX: obj.content.scaleX,
                            scaleY: obj.content.scaleY,
                            angle: obj.content.angle,
                            fill: obj.content.fill,
                            strokeDashArray: obj.content.strokeDashArray,
                            strokeLineCap: obj.content.strokeLineCap,
                            strokeLineJoin: obj.content.strokeLineJoin,
                            strokeMiterLimit: obj.content.strokeMiterLimit,
                            strokeWidth: obj.content.strokeWidth,
                            width: obj.content.width,
                            height: obj.content.height,
                            text: obj.content.text,
                            fontStyle: obj.content.fontStyle,
                            fontFamily: obj.content.fontFamily,
                            fontSize: obj.content.fontSize,
                            fontWeight: obj.content.fontWeight,
                            textAlign: 'center',
                            textDecoration: obj.content.textDecoration,
                        },
                        container: {
                            show: obj.container.show,
                            shape: obj.container.shape,
                            fill: obj.container.fill,
                            height: obj.container.height,
                            width: obj.container.width,
                            strokeDashArray: obj.container.strokeDashArray,
                            strokeWidth: obj.container.strokeWidth,
                            crashPath: obj.container.crashPath,
                            stroke: obj.container.stroke,
                            ry: obj.container.ry,
                            rx: obj.container.rx,
                            radius: obj.container.radius,
                        },

                        title: {
                            text: obj.title.text,
                            top: 'bottom',
                            left: 'certent',
                            textStyle: {
                                color: obj.title.fill,
                                fontStyle: obj.title.fontStyle,
                                fontSize: obj.title.fontSize
                            }
                        }
                    };


                    obj_json = _this.extend(true, {}, obj.json, obj_json);





                    savejson.object.push(obj_json);


                } else if (_this.canvas.getObjects()[i].classify == 'straightLine') {

                    var line = _this.canvas.getObjects()[i];
                    var line_json = {};


                    line_json = {
                        id: line.id,
                        sObjId: line.sObj.id,
                        eObjId: line.eObj.id,

                        style: {
                            strokeWidth: line.strokeWidth,
                            strokeDashArray: line.strokeDashArray,
                            stroke: line.stroke
                        },
                        title: {
                            text: line.text.text,
                            textStyle: {
                                color: line.text.fill,
                                fontStyle: line.text.fontStyle,
                                fontSize: line.text.fontSize
                            }
                        }

                    };

                    line_json = _this.extend(true, {}, defaults.straightLine, line_json);


                    savejson.straightLine.push(line_json);

                } else if (_this.canvas.getObjects()[i].classify == 'brokenLine') {
                    var line = _this.canvas.getObjects()[i];

                    var line_json = {};


                    line_json = {
                        id: line.id,
                        sObjId: line.sObj.id,
                        eObjId: line.eObj.id,

                        style: {
                            strokeWidth: line.strokeWidth,
                            strokeDashArray: line.strokeDashArray,
                            stroke: line.stroke
                        },
                        title: {
                            text: line.text.text,
                            textStyle: {
                                color: line.text.fill,
                                fontStyle: line.text.fontStyle,
                                fontSize: line.text.fontSize
                            }
                        }

                    };

                    line_json = _this.extend(true, {}, defaults.brokenLine, line_json);


                    savejson.brokenLine.push(line_json);

                } else if (_this.canvas.getObjects()[i].classify == 'text') {
                    var text = _this.canvas.getObjects()[i];
                    var text_json = {};


                    text_json = {
                        id: text.id,
                        text: text.text,
                        top: text.top,
                        left: text.left,
                        scaleX: text.scaleX,
                        scaleY: text.scaleY,
                        angle: text.angle,
                        fill: text.fill,
                        strokeDashArray: text.strokeDashArray,
                        strokeLineCap: text.strokeLineCap,
                        strokeLineJoin: text.strokeLineJoin,
                        strokeMiterLimit: text.strokeMiterLimit,
                        fontStyle: text.fontStyle,
                        fontFamily: text.fontFamily,
                        fontSize: text.fontSize,
                        fontWeight: text.fontWeight,
                        textAlign: 'center',
                        textDecoration: text.textDecoration,

                    };

                    text_json = _this.extend(true, {}, text.json, text_json);


                    savejson.text.push(text_json);

                }
            }

            return savejson;

        },


        /**
         * [loadImage 图片预加载]
         * @Author   yfy
         * @DateTime 2016-04-26T15:20:44+0800
         * @param    {[arr]}                  urlArr   [图片地址数组]
         * @param    {Function}               callback [加载完成回调]
         * @return   {[type]}                          [description]
         */
        loadImage: function(urlArr, callback) {
            var length = 0;
            if (urlArr.length == 0) {
                callback();
            }
            for (var i in urlArr) {

                var img = new Image();
                img.src = urlArr[i];
                if (img.complete) {
                    length++;
                    if (length == urlArr.length) {

                        callback();
                    }
                    continue;
                }
                img.onload = function() {
                    img.onload = null;
                    length++;
                    if (length == urlArr.length) {
                        callback();
                    }
                };
            }
        },


        /**
         * [distance 两点距离]
         * @Author   yfy
         * @DateTime 2016-04-26T15:23:36+0800
         * @param    {[object]}                 a1 [description]
         * @param    {[object]}                 a2 [description]
         * @return   {[type]}                    [description]
         */
        distance: function(a1, a2) {
            return Math.sqrt(Math.pow((a2.x - a1.x), 2) + Math.pow((a2.y - a1.y), 2));
        },


        /**
         * [midCoord 直线中点坐标]
         * @Author   yfy
         * @DateTime 2016-04-26T15:25:10+0800
         * @param    {[object]}                 a1 [description]
         * @param    {[object]}                 a2 [description]
         * @return   {[object]}                    [中点坐标]
         */
        midCoord: function(a1, a2) {
            return ({
                x: (a1.x + a2.x) / 2,
                y: (a1.y + a2.y) / 2,
            });
        },



        /**
         * [lineAngle 两点角度]
         * @Author   yfy
         * @DateTime 2016-04-26T15:25:58+0800
         * @param    {[object]}                 a1 [description]
         * @param    {[object]}                 a2 [description]
         * @return   {[number]}                    [角度]
         */
        lineAngle: function(a1, a2) {
            var diff_x = a2.x - a1.x,
                diff_y = a2.y - a1.y;
            return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
        },





        /**
         * [rotateCoord  a绕着b旋转angle度后的坐标]
         * @Author   yfy
         * @DateTime 2016-04-26T15:27:34+0800
         * @param    {[type]}                 a     [description]
         * @param    {[type]}                 b     [description]
         * @param    {[type]}                 angle [description]
         * @return   {[type]}                       [旋转坐标]
         */
        rotateCoord: function(a, b, angle) {
            var hudu = (Math.PI / 180) * (360 - angle);
            return {
                x: ((a.x - b.x) * Math.cos(hudu) + (a.y - b.y) * Math.sin(hudu) + b.x),
                y: (-(a.x - b.x) * Math.sin(hudu) + (a.y - b.y) * Math.cos(hudu) + b.y)
            };

        },




        /**
         * [randId 随机生成id名]
         * @Author   yfy
         * @DateTime 2016-04-26T15:32:10+0800
         * @param    {[type]}                 str [前缀]
         * @return   {[type]}                     [随机生成id]
         */
        randId: function(str) {
            var rand = parseInt(Math.random() * 10000000000);
            if (str) {
                rand = str + rand;
            }
            return rand;
        },


        /**
         * [isPointInPolygon 点是否在多边几何体内]
         * @Author   yfy
         * @DateTime 2016-04-26T15:32:59+0800
         * @param    {[type]}                 x      [横坐标]
         * @param    {[type]}                 y      [纵坐标]
         * @param    {[type]}                 coords [几何体顶点坐标集]
         * @return   {Boolean}                       [是否在几何体内 是返回true]
         */
        isPointInPolygon: function(x, y, coords) {
            var wn = 0;
            for (var shiftP, shift = coords[1] > y, i = 3; i < coords.length; i += 2) {
                shiftP = shift;
                shift = coords[i] > y;
                if (shiftP != shift) {
                    var n = (shiftP ? 1 : 0) - (shift ? 1 : 0);
                    if (n * ((coords[i - 3] - x) * (coords[i - 0] - y) - (coords[i - 2] - y) * (coords[i - 1] - x)) > 0)
                        wn += n;
                }
            }

            return (wn % 2 == 0) ? false : true;
        },


        /**
         * [crashCoord 两个不规则物体中点连线边界的接触点坐标]
         * @Author   yfy
         * @DateTime 2016-04-26T15:34:14+0800
         * @param    {[type]}                 sObj [线头物体]
         * @param    {[type]}                 eObj [线尾物体]
         * @return   {[type]}                      [两个接触点坐标]
         */
        crashCoord: function(sObj, eObj) {
            var start = {
                x: sObj.left,
                y: sObj.top
            };
            var end = {
                x: eObj.left,
                y: eObj.top
            };

            var num = Math.floor(Math.log(this.distance(start, end)) / Math.LN2);

            function crashCoordFn(sPoi, ePoi, obj) {

                for (var i = 0; i < num; i++) {
                    mPoi = this.midCoord(sPoi, ePoi);
                    if (this.isPointInPolygon(mPoi.x, mPoi.y, obj.crashPath)) {
                        sPoi = mPoi;
                    } else {
                        ePoi = mPoi;
                    }
                }

                return sPoi;


            }
            return ({
                'start': crashCoordFn(start, end, sObj),
                'end': crashCoordFn(end, start, eObj)
            });
        },


        /**
         * [crashCoord_point 点与物体中点连线边界的接触点坐标]
         * @Author   yfy
         * @DateTime 2016-04-26T15:35:36+0800
         * @param    {[type]}                 obj   [物体]
         * @param    {[type]}                 point [点]
         * @return   {[type]}                       [接触点坐标]
         */
        crashCoord_point: function(obj, point) {
            var start = {
                x: point.x,
                y: point.y
            };
            var end = {
                x: obj.left,
                y: obj.top
            };

            var num = Math.floor(Math.log(this.distance(start, end)) / Math.LN2);

            for (var i = 0; i < num; i++) {
                mPoi = this.midCoord(start, end);
                if (this.isPointInPolygon(mPoi.x, mPoi.y, obj.crashPath)) {
                    end = mPoi;
                } else {
                    start = mPoi;
                }
            }

            return start;


        },


        /**
         * [extend 对象扩展]
         * @Author   yfy
         * @DateTime 2016-04-26T15:36:29+0800
         * @return   {[type]}                 [扩展后的对象]
         */
        extend: function() {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};

                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) !== null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) { //如果是数组对象
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];

                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },



        /**
         * [addEvents 绑定事件]
         * @type {Object}
         */
        addEvents: {
            mousedown: function(callback) {
                canvas.on('mouse:down', callback);
            },
            mouseup: function(callback) {
                canvas.on('mouse:up', callback);
            },
            mousemove: function(callback) {
                canvas.on('mouse:move', callback);
            },
            mouseover: function(callback) {
                canvas.on('mouse:over', callback);
            },
            mouseout: function(callback) {
                canvas.on('mouse:out', callback);
            },
            click: function(callback) {
                function clickFn(e) {
                    canvas.off('mouse:up', clickFn);
                    callback(e);
                }
                canvas.on('mouse:down', function() {
                    canvas.on('mouse:up', clickFn);
                });
                canvas.on('mouse:move', function() {
                    canvas.off('mouse:up', clickFn);
                });
            },
            dbclick: function(callback) {
                function dbclickFn(e) {
                    canvas.off('mouse:up', clickFn);
                    callback(e);
                }
                canvas.on('mouse:up', function() {
                    canvas.on('mouse:up', dbclickFn);
                    canvas.on('mouse:move', function() {
                        canvas.off('mouse:up', dbclickFn);
                    });
                    setTimeout(function() {
                        canvas.off('mouse:up', dbclickFn);
                    }, 300);
                });
            },
            objmodified: function(callback) {
                canvas.on('object:modified', callback);
            },
            objrotating: function(callback) {
                canvas.on('object:rotating', callback);
            },
            objscaling: function(callback) {
                canvas.on('object:scaling', callback);
            },
            objmoving: function(callback) {
                canvas.on('object:moving', callback);
            },
            objselected: function(callback) {
                canvas.on('object:selected', callback);
            },
            objadded: function(callback) {
                canvas.on('object:added', callback);
            },
            objremoved: function(callback) {
                canvas.on('object:removed', callback);
            },
            cleared: function(callback) {
                canvas.on('canvas:cleared', callback);
            }
        },

        /**
         * [removeEvents 取消绑定事件]
         * @type {Object}
         */
        removeEvents: {
            mousedown: function(callback) {
                canvas.off('mouse:down', callback);
            },
            mouseup: function(callback) {
                canvas.off('mouse:up', callback);
            },
            mousemove: function(callback) {
                canvas.off('mouse:move', callback);
            },
            mouseover: function(callback) {
                canvas.off('mouse:over', callback);
            },
            mouseout: function(callback) {
                canvas.off('mouse:out', callback);
            },
            objmodified: function(callback) {
                canvas.off('object:modified', callback);
            },
            objrotating: function(callback) {
                canvas.off('object:rotating', callback);
            },
            objscaling: function(callback) {
                canvas.off('object:scaling', callback);
            },
            objmoving: function(callback) {
                canvas.off('object:moving', callback);
            },
            objselected: function(callback) {
                canvas.off('object:selected', callback);
            },
            objadded: function(callback) {
                canvas.off('object:added', callback);
            },
            objremoved: function(callback) {
                canvas.off('object:removed', callback);
            },
            cleared: function(callback) {
                canvas.off('canvas:cleared', callback);
            }
        },



        /**
         * [creatText 创建普通文字]
         * @Author   yfy
         * @DateTime 2016-05-17T14:48:28+0800
         * @param    {[type]}                 json [description]
         * @return   {[type]}                      [description]
         */
        creatText: function(json) {
            var _this = this;

            json = this.extend(true, {}, defaults.text, json);
            var text = new fabric.IText(json.text, json);
            text.classify = 'text';
            text.json = json;
            _this.canvas.add(text);
            text.on("modified", function() {
                _this.addrecords();
            });

        },







        /**
         * [creatShape 画物体]
         * @Author   yfy
         * @DateTime 2016-04-26T17:12:25+0800
         * @param    {[type]}                 json [物体json数据]
         * @return   {[type]}                      [物体]
         */
        creatShape: function(json) {
            var _this = this;
            var content = {};

            json.title = this.extend(true, {}, defaults.object.title, json.title);
            json.container = this.extend(true, {}, defaults.object.container, json.container);





            /**
             * 创建内容物体                        
             */
            if (json.genre == 'path') {
                json.shape = this.extend(true, {}, defaults.object.shape, json.shape);
                content = new fabric.Path(json.shape.source, json.shape);


            } else if (json.genre == 'circle') {
                if (json.shape.crashPath === []) {
                    for (var i in defaults.crashPath.circle) {
                        json.shape.crashPath[i] = defaults.crashPath.circle[i] * json.shape.radius * json.shape.scaleX / 50;
                    }
                }
                json.shape = this.extend(true, {}, defaults.object.shape, json.shape);
                content = new fabric.Circle(json.shape);


            } else if (json.genre == 'rect') {

                if (json.shape.crashPath === []) {
                    json.shape.crashPath = [0, 0, json.shape.width * json.shape.scaleX, 0, json.shape.width * json.shape.scaleX, json.shape.height * json.shape.scaleY, 0, json.shape.height * json.shape.scaleY, 0, 0];
                }

                json.shape = this.extend(true, {}, defaults.object.shape, json.shape);
                content = new fabric.Rect(json.shape);




            } else if (json.genre == 'img') {
                json.shape = this.extend(true, {}, defaults.object.shape, json.shape);
                var img = new Image();
                img.src = json.shape.source;
                json.shape.height = json.shape.width * img.height / img.width;

                if (json.shape.crashPath.length == 0) {
                    json.shape.crashPath = [0, 0, 0, json.shape.height, json.shape.width, json.shape.height, json.shape.width, 0, 0, 0];
                }
                content = new fabric.Image(img, json.shape);


            } else if (json.genre == 'svg') {
                json.shape = this.extend(true, {}, defaults.object.shape, json.shape);
                var img = new Image();
                img.src = json.shape.source;
                json.shape.width = img.width;
                content = new fabric.Image(img, json.shape);


            } else if (json.genre == 'textObj') {
                json.shape = this.extend(true, {}, defaults.object.shape, json.shape);
                console.log(json)
                content = new fabric.IText(json.shape.text, json.shape);
            }





            /**
             * [container 创建容器并合并]
             * 
             */
            var container = new fabric.Circle(defaults.container);

            if (json.container.show) {



                var obj = new fabric.Group([content, container], {
                    left: json.left,
                    top: json.top,
                    scaleX: json.scaleX ? json.scaleX : 1,
                    scaleY: json.scaleY ? json.scaleY : 1,
                    angle: json.angle ? json.angle : 0,
                    lockScalingX: json.lockScalingX,
                    lockScalingY: json.lockScalingY,
                    hasControls: json.hasControls,
                });
                obj.content = content;
                obj.container = container;
                obj.container.show = true;
                container.sendToBack();



                obj.content.crashPath = [];
                obj.container.crashPath = [];
                obj.content.crashPathInitial = json.shape.crashPath;
                obj.container.crashPathInitial = defaults.crashPath.circle.concat();




            } else {
                var obj = new fabric.Group([content], {
                    left: json.left,
                    top: json.top,
                    scaleX: json.scaleX ? json.scaleX : 1,
                    scaleY: json.scaleY ? json.scaleY : 1,
                    angle: json.angle ? json.angle : 0,
                    lockScalingX: json.lockScalingX,
                    lockScalingY: json.lockScalingY,
                    hasControls: json.hasControls,

                });
                obj.content = content;
                obj.container = container;
                obj.container.show = false;



                obj.content.crashPath = [];
                obj.container.crashPath = [];
                obj.content.crashPathInitial = json.shape.crashPath;
                obj.container.crashPathInitial = defaults.crashPath.circle.concat();



            }









            canvas.add(obj);
            obj.genre = json.genre;
            obj.classify = "obj";
            obj.id = json.id ? json.id : _this.randId("obj");
            obj.source = json.shape.source;






            /**
             * [crashPath 碰撞路径变化]
             * @type {Array}
             */
            obj.crashPath = [];

            obj.crashPathCon = function(con, option) {
                var oleft = obj.left;
                var otop = obj.top;
                var oscaleX = obj.scaleX;
                var oscaleY = obj.scaleY;
                var oangle = obj.angle;
                if (option) {
                    var oleft = option.left ? option.left : oleft;
                    var otop = option.top ? option.top : otop;
                    var oscaleX = option.scaleX ? option.oscaleX : ooscaleX;
                    var oscaleY = option.scaleY ? option.oscaleY : ooscaleY;
                    var oangle = option.angle ? option.angle : oangle;
                }


                obj.crashPath.length = 0;
                con.crashPath = con.crashPathInitial.concat();
                con.crashPath.scaleX = con.scaleX * oscaleX;
                con.crashPath.scaleY = con.scaleY * oscaleY;
                con.crashPath.angle = oangle;

                con.crashPath.left = oleft;
                con.crashPath.top = otop;
                con.crashPath.width = con.width;
                con.crashPath.height = con.height;

                for (var i = 0; i < con.crashPath.length; i += 2) {
                    var x0 = con.crashPath[i] * con.crashPath.scaleX + con.crashPath.left - con.crashPath.width * con.crashPath.scaleX / 2;
                    var y0 = con.crashPath[i + 1] * con.crashPath.scaleY + con.crashPath.top - con.crashPath.height * con.crashPath.scaleY / 2;

                    if (con.crashPath.angle !== 0) {
                        var Coord = _this.rotateCoord({
                            x: x0,
                            y: y0
                        }, {
                            x: oleft,
                            y: otop
                        }, con.crashPath.angle);

                        con.crashPath[i] = Coord.x;
                        con.crashPath[i + 1] = Coord.y;


                    } else {
                        con.crashPath[i] = x0;
                        con.crashPath[i + 1] = y0;
                    }


                }


                return con.crashPath;
            }
            obj.crashPathChange = function(option) {

                if (obj.container.show) {
                    obj.crashPath = obj.crashPathCon(obj.container, option)
                } else {
                    obj.crashPath = obj.crashPathCon(obj.content, option)
                }
            }

            obj.crashPathChange()






            //通过滤镜改变svg颜色
            obj.filterFill = function(color) {
                obj.content.filters.push(new fabric.Image.filters.Tint({
                    color: color
                }));
                obj.content.applyFilters(canvas.renderAll.bind(canvas));
            }

            if (json.shape.fill !== null && json.genre == 'svg') {
                obj.filterFill(json.shape.fill);
            }






            //创建物体名称文字
            obj.title = new fabric.IText(json.title.text, json.title);
            obj.title.depend = obj;
            obj.title.locationFn = function() {

                if (this.location == "bottom") {
                    this.setLeft(obj.left);
                    this.setTop(obj.top + obj.scaleY * obj.height / 2 + json.title.margin);
                    this.setCoords();
                } else if (this.location == "top") {
                    this.setLeft(obj.left);
                    this.setTop(obj.top - obj.scaleY * obj.height / 2 - json.title.margin);
                    this.setCoords();
                } else if (this.location == "left") {
                    this.setLeft(obj.left - obj.scaleX * obj.width / 2 - json.title.margin);
                    this.setTop(obj.top);
                    this.setCoords();
                } else if (this.location == "right") {
                    this.setLeft(obj.left + obj.scaleX * obj.width / 2 + json.title.margin);
                    this.setTop(obj.top);
                    this.setCoords();
                } else {
                    this.setLeft(obj.left);
                    this.setTop(obj.top);
                    this.setCoords();
                }
            };
            canvas.add(obj.title);
            obj.title.location = json.title.location;
            obj.title.locationFn();
            canvas.renderAll();











            /**
             * 物体改变其他属性重置               [description]
             */
            obj.change = function() {
                obj.title.locationFn();
                obj.crashPathChange();
                obj.setCoords()
                for (var i in obj.straightLine) {
                    obj.straightLine[i][0].points();
                }
                for (var j in obj.brokenLine) {
                    obj.brokenLine[j][0].points();
                }
            }




            /**
             * 物体绑定事件                 
             */
            obj.on("modified", function() {

                obj.crashPathChange();

                obj.title.locationFn();
                for (var j in obj.groupBox) {
                    obj.groupBox[j].redrawset();
                }
                _this.addrecords();

            });


            obj.on("moving", function() {


                obj.title.locationFn();


                obj.crashPathChange();

                for (var j in obj.groupBox) {
                    obj.groupBox[j].redrawset();
                }
            });


            obj.on("rotating", function() {
                obj.crashPathChange();

            })

            obj.on("scaling", function(e) {

                obj.crashPathChange();

            })



            /**
             * [removeContainer 容器删除]
             * @Author   yfy
             * @DateTime 2016-04-29T15:26:25+0800
             * 
             */
            obj.removeContainer = function() {
                obj.removeWithUpdate(obj.container);
                obj.container.show = false;
                obj.change();
            }


            /**
             * [changeContainer 容器修改]
             * @Author   yfy
             * @DateTime 2016-04-29T15:26:59+0800
             * @param    {[type]}                 shape [容器形状]
             * @return   {[obj]}                       [obj]
             */
            obj.changeContainer = function(shape) {

                var jud = obj.container.show;

                obj.removeContainer();

                if (shape) {
                    jud = true;
                }

                var shape = shape ? shape : obj.container.shape;

                oW = json.container.width > 0 ? json.container.width : defaults.object.container.width;
                oH = json.container.height > 0 ? json.container.height : defaults.object.container.height;
                oRX = json.container.rx ? json.container.rx : defaults.object.container.width / 1.36;
                oRY = json.container.ry ? json.container.ry : defaults.object.container.width / 2;
                oR = json.container.radius > 0 ? json.container.radius : defaults.object.container.radius;

                obj.content.set({
                    top: 0,
                    selectable: false,
                });


                if (shape == "rect") {
                    if (shape != obj.container.shape) {
                        obj.container = new fabric.Rect(json.container);
                        obj.container.set({
                            width: oW,
                            height: oH,
                        });
                    }
                    obj.container.setCoords()
                    obj.container.show = false;
                    obj.container.crashPath = [];
                    obj.container.crashPathInitial = [-obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, obj.container.width + obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, obj.container.width + obj.container.strokeWidth / 2, obj.container.height + obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, obj.container.height + obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2];
                } else if (shape == "square") {
                    if (shape != obj.container.shape) {
                        obj.container = new fabric.Rect(json.container);
                        obj.container.set({
                            width: oW,

                        })
                    }
                    obj.container.set({
                        height: obj.container.width,

                    })
                    obj.container.setCoords()
                    obj.container.show = false;
                    obj.container.crashPath = [];

                    obj.container.crashPathInitial = [-obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, obj.container.width + obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, obj.container.width + obj.container.strokeWidth / 2, obj.container.width + obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, obj.container.width + obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2, -obj.container.strokeWidth / 2];


                } else if (shape == "rhombus") {
                    if (shape != obj.container.shape) {
                        obj.container = new fabric.Rect(json.container);
                        obj.container.set({
                            width: oW,

                            angle: 45
                        })
                    }
                    obj.container.set({
                        height: obj.container.width,

                    })
                    obj.container.setCoords()
                    obj.container.show = false;
                    obj.container.crashPath = [];
                    obj.container.crashPathInitial = [obj.container.width / 2, -(Math.sqrt(2) - 1) / 2 * obj.container.width - obj.container.strokeWidth / 2 * Math.sqrt(2), obj.container.width + (Math.sqrt(2) - 1) / 2 * obj.container.width + obj.container.strokeWidth / 2 * Math.sqrt(2), obj.container.width / 2, obj.container.width / 2, obj.container.width + (Math.sqrt(2) - 1) / 2 * obj.container.width + obj.container.strokeWidth / 2 * Math.sqrt(2), -(Math.sqrt(2) - 1) / 2 * obj.container.width - obj.container.strokeWidth / 2 * Math.sqrt(2), obj.container.width / 2, obj.container.width / 2, -(Math.sqrt(2) - 1) / 2 * obj.container.width];

                } else if (shape == "circle") {
                    if (shape != obj.container.shape) {
                        obj.container = new fabric.Circle(json.container);

                        obj.container.set({
                            radius: Math.max(oR, json.container.radius),
                        })
                    }
                    obj.container.setCoords()
                    obj.container.show = true;
                    obj.container.crashPath = [];
                    obj.container.crashPathInitial = [];
                    for (var i in defaults.crashPath.circle) {
                        obj.container.crashPathInitial[i] = defaults.crashPath.circle[i] * (obj.container.radius + obj.container.strokeWidth / 2) * obj.container.scaleX / 50 - obj.container.strokeWidth / 2;
                    }
                } else if (shape == "triangle") {
                    if (shape != obj.container.shape) {
                        obj.container = new fabric.Triangle(json.container);
                        obj.container.set({
                            width: oW,
                        })

                    }

                    obj.container.set({
                        height: obj.container.width * Math.sqrt(3) / 2,
                    })
                    obj.content.set({
                        top: obj.container.width * Math.sqrt(3) / 12
                    })

                    obj.container.setCoords()
                    obj.container.show = true;
                    obj.container.crashPath = [];
                    obj.container.crashPathInitial = [obj.container.width / 2, -obj.container.strokeWidth, obj.container.width + obj.container.strokeWidth * Math.sqrt(3) / 2, obj.container.width * Math.sqrt(3) / 2 + obj.container.strokeWidth / 2, -obj.container.strokeWidth * Math.sqrt(3) / 2, obj.container.width * Math.sqrt(3) / 2 + obj.container.strokeWidth * Math.sqrt(3) / 2, obj.container.width / 2, -obj.container.strokeWidth];
                } else if (shape == "ellipse") {

                    if (shape != obj.container.shape) {
                        obj.container = new fabric.Ellipse(json.container);
                        obj.container.set({
                            rx: oRX,
                            ry: oRY,
                        })

                    }



                    obj.container.setCoords()
                    obj.container.show = true;
                    obj.container.crashPath = [];
                    obj.container.crashPathInitial = [];
                    for (var i = 0; i < defaults.crashPath.ellipse.length; i += 2) {
                        obj.container.crashPathInitial[i] = defaults.crashPath.ellipse[i] * (obj.container.rx + obj.container.strokeWidth / 2) * obj.container.scaleX / 100 - obj.container.strokeWidth / 2;
                        obj.container.crashPathInitial[i + 1] = defaults.crashPath.ellipse[i + 1] * (obj.container.ry + obj.container.strokeWidth / 2) * obj.container.scaleY / 61.8 - obj.container.strokeWidth / 2;
                    }
                }



                /**
                 * [attr 容器属性设置]
                 * @Author   yfy
                 * @DateTime 2016-04-29T15:28:33+0800
                 * @param    {[type]}                 option [属性]
                 */
                obj.container.attr = function(option) {

                    obj.container.set(option);
                    obj.changeContainer();
                }

                if (jud) {

                    obj.container.shape = shape;
                    obj.addContainer();
                }


            }


            /**
             * [addContainer 添加原有/默认容器]
             * @Author   yfy
             * @DateTime 2016-04-29T15:27:58+0800
             */
            obj.addContainer = function() {

                obj.container.set({
                    left: obj.left,
                    top: obj.top,
                })
                obj.addWithUpdate(obj.container);
                obj.container.sendToBack();
                obj.container.show = true;
                obj.setCoords()
                obj.change();


            }




            if (json.container.show) {

                obj.changeContainer(json.container.shape);
            }


            /**
             * [attr 物体属性设置]
             * @Author   yfy
             * @DateTime 2016-04-29T15:29:01+0800
             * @param    {[type]}                 option [description]
             * @return   {[type]}                        [description]
             */
            obj.attr = function(option) {
                    obj.set(option);
                    obj.change();
                    if (json.genre == 'svg' && option.fill) {
                        obj.filterFill(option.fill);
                    }
                }
                /**
                 * [attr 物体内容图形属性设置]
                 * @Author   yfy
                 * @DateTime 2016-04-29T15:29:16+0800
                 * @param    {[type]}                 option [description]
                 * @return   {[type]}                        [description]
                 */
            obj.content.attr = function(option) {
                obj.content.set(option);
                obj.content.setCoords()
                obj.change();
                if (json.genre == 'svg' && option.fill) {
                    obj.filterFill(option.fill);
                }
            }

            obj.removeFn = function() {
                var _this = graph;
                _this.canvas.remove(obj, obj.title);
                if (obj.straightLine) {
                    var removelinearr = [];
                    for (var i in obj.straightLine) {
                        for (var j in obj.straightLine[i]) {
                            removelinearr.push(obj.straightLine[i][j])
                        }
                    }
                    for (var k in removelinearr) {
                        removelinearr[k].removeFn();
                    }
                }
                if (obj.brokenLine) {
                    for (var n in obj.brokenLine) {
                        obj.brokenLine[n][0].removeFn();
                    }
                }
                graph.addrecords();
            }

            return obj;

        },


        /**
         * [getObj 获取指定id名的物体]
         * @Author   yfy
         * @DateTime 2016-04-29T15:29:53+0800
         * @param    {[type]}                 id [description]
         * @return   {[obj]}                    [obj]
         */
        getObj: function(id) {
            var objs = canvas.getObjects();
            for (var i in objs) {

                if (objs[i].id && objs[i].id == id) {
                    return objs[i];
                    break;
                }
            }
        },






        arrowhead: function(line) {
            var arrow = new fabric.Path("M0 10L5 0L 10 10", {
                fill: '',
                strokeWidth: line.strokeWidth,
                stroke: line.stroke,
                evented: false
            });
            canvas.add(arrow);
            return arrow;
        },

        straightLine: function(sObj, eObj, option) {
            var _this = this;

            var option = this.extend(true, {}, defaults.straightLine, option);
            var line = new fabric.Path("M-10000 -10000L-10000 -10000L -10000 -10000L-10000 -10000", option.style);
            canvas.add(line);


            line.classify = "straightLine";

            line.sObj = sObj;
            line.eObj = eObj;

            line.id = option.id ? option.id : this.randId("sl");

            //两个物体间有几条线
            line.sameLine = 0;


            line.linename = this.randId("sl");



            if (line.sObj.straightLine === undefined) {
                line.sObj.straightLine = {};
            }
            if (line.eObj.straightLine === undefined) {
                line.eObj.straightLine = {};
            }


            for (var name1 in line.sObj.straightLine) {
                for (var name2 in line.eObj.straightLine) {
                    if (name1 == name2) {
                        line.sameLine = line.eObj.straightLine[name1].length;
                        line.linename = name1;
                    }
                }
            }

            if (line.sameLine === 0) {
                line.sObj.straightLine[line.linename] = [];
                line.eObj.straightLine[line.linename] = [];
            }

            line.sObj.straightLine[line.linename].push(line);
            line.eObj.straightLine[line.linename].push(line);



            line.text = new fabric.IText(option.title.text, option.title.textStyle);
            canvas.add(line.text);
            line.text.depend = line;





            line.arrowhead = this.arrowhead(line);
            line.arrowhead.set({
                left: line.eObj.left,
                top: line.eObj.top + line.arrowhead.height / 2,
                angle: line.angle

            })
            line.arrowhead.show = option.arrowhead;
            if (line.arrowhead.show == false) {
                line.arrowhead.set({
                    opacity: 0,

                })
            }



            line.attr = function(json) {
                line.set(json);
                line.arrowhead.set(json);
                if (json.strokeDashArray) {
                    line.arrowhead.set({
                        strokeDashArray: null
                    });
                }
            }





            line.points = function() {
                //线条数量
                this.sameLine = this.eObj.straightLine[this.linename].length;
                var points = [];
                //折点线长bias
                var sHypotenuse = Math.floor(Math.sqrt(Math.pow(this.sObj.width * this.sObj.scaleX / 2, 2) + Math.pow(this.sObj.height * this.sObj.scaleY / 2, 2)));
                var eHypotenuse = Math.floor(Math.sqrt(Math.pow(this.eObj.width * this.eObj.scaleX / 2, 2) + Math.pow(this.eObj.height * this.eObj.scaleY / 2, 2)));
                /*           this.bias = hypotenuse1 > hypotenuse2 ? hypotenuse1 : hypotenuse2;*/

                //两obj中点坐标
                this.sCoord = {
                    x: Math.round(this.sObj.left),
                    y: Math.round(this.sObj.top)
                };
                this.eCoord = {
                    x: Math.round(this.eObj.left),
                    y: Math.round(this.eObj.top)
                };

                //中点距离
                this.distance = Math.round(_this.distance(this.sCoord, this.eCoord));

                //折点比例
                this.sLinescale = sHypotenuse / this.distance;
                this.eLinescale = eHypotenuse / this.distance;


                //折点坐标
                this.sturn = {};
                this.eturn = {};
                this.sturn.x = Math.round(-(this.sCoord.x - this.eCoord.x) * this.sLinescale + this.sCoord.x);
                this.sturn.y = Math.round(-(this.sCoord.y - this.eCoord.y) * this.sLinescale + this.sCoord.y);
                this.eturn.x = Math.round((this.sCoord.x - this.eCoord.x) * this.eLinescale + this.eCoord.x);
                this.eturn.y = Math.round((this.sCoord.y - this.eCoord.y) * this.eLinescale + this.eCoord.y);

                //折点坐标集
                if (this.sameLine % 2 !== 0) {
                    this.sturnpoint = this.sturn;
                    this.eturnpoint = this.eturn;
                    points.push({
                        x1: this.sturn.x,
                        y1: this.sturn.y,
                        x2: this.eturn.x,
                        y2: this.eturn.y,
                    });
                }

                var initiallength = this.sameLine % 2 === 0 ? 10 : 20;
                for (var i = 0; i < Math.floor(this.sameLine / 2); i++) {
                    points.push(this.turnpoint(20 * i + initiallength)[0]);
                    points.push(this.turnpoint(20 * i + initiallength)[1]);
                }




                //线段拼接
                for (var j in points) {
                    var spoi = _this.crashCoord_point(sObj, {
                        x: points[j].x1,
                        y: points[j].y1
                    });
                    var epoi = _this.crashCoord_point(eObj, {
                        x: points[j].x2,
                        y: points[j].y2
                    });
                    points[j].xs = spoi.x;
                    points[j].ys = spoi.y;
                    points[j].xe = epoi.x;
                    points[j].ye = epoi.y;
                }

                //改变线段
                if (this.sameLine == 1) {
                    var _angle = _this.lineAngle(this.sCoord, this.eCoord);
                    var _hudu = (Math.PI / 180) * _angle;
                    var _jud = this.eCoord.x >= this.sCoord.x;
                    this.path[0][1] = points[0].xs;
                    this.path[0][2] = points[0].ys;
                    this.path[1][1] = points[0].xs;
                    this.path[1][2] = points[0].ys;
                    this.path[2][1] = points[0].xe;
                    this.path[2][2] = points[0].ye;
                    this.path[3][1] = points[0].xe;
                    this.path[3][2] = points[0].ye;
                    this.text.set({
                        left: (points[0].x1 + points[0].x2) / 2 + _angle / 90 * 8,
                        top: (points[0].y1 + points[0].y2) / 2 - (1 - _angle / 90) * 8,
                        angle: _angle
                    }).setCoords();


                    this.arrowhead.set({
                        left: points[0].xe - (_jud ? Math.cos(_hudu) * this.arrowhead.width / 2 : -Math.cos(_hudu) * this.arrowhead.width / 2),
                        top: points[0].ye - (_jud ? Math.sin(_hudu) * this.arrowhead.height / 2 : -Math.sin(_hudu) * this.arrowhead.height / 2),
                        angle: _angle + (_jud ? 90 : -90)

                    });
                    this._setPositionDimensions({});
                    this.setCoords();


                } else {
                    for (var k in this.sObj.straightLine[this.linename]) {
                        var _line = this.sObj.straightLine[this.linename][k];
                        var _angle = _this.lineAngle({
                            x: points[k].x1,
                            y: points[k].y1
                        }, {
                            x: points[k].x2,
                            y: points[k].y2
                        });




                        if (_line.sObj == this.sObj) {
                            var _angle2 = _this.lineAngle({
                                x: points[k].x2,
                                y: points[k].y2
                            }, {
                                x: points[k].xe,
                                y: points[k].ye
                            });


                            var _hudu = (Math.PI / 180) * _angle2;
                            var _jud = points[k].xe >= points[k].x2;
                            _line.arrowhead.set({
                                left: points[k].xe - (_jud ? Math.cos(_hudu) * _line.arrowhead.width / 2 : -Math.cos(_hudu) * _line.arrowhead.width / 2),
                                top: points[k].ye - (_jud ? Math.sin(_hudu) * _line.arrowhead.height / 2 : -Math.sin(_hudu) * _line.arrowhead.height / 2),
                                angle: _angle2 + (_jud ? 90 : -90)

                            })

                        } else {
                            var _angle2 = _this.lineAngle({
                                x: points[k].x1,
                                y: points[k].y1
                            }, {
                                x: points[k].xs,
                                y: points[k].ys
                            });


                            var _hudu = (Math.PI / 180) * _angle2;
                            var _jud = points[k].xs >= points[k].x1;
                            _line.arrowhead.set({
                                left: points[k].xs - (_jud ? Math.cos(_hudu) * _line.arrowhead.width / 2 : -Math.cos(_hudu) * _line.arrowhead.width / 2),
                                top: points[k].ys - (_jud ? Math.sin(_hudu) * _line.arrowhead.height / 2 : -Math.sin(_hudu) * _line.arrowhead.height / 2),
                                angle: _angle2 + (_jud ? 90 : -90)

                            })
                        }


                        _line.path[0][1] = points[k].xs;
                        _line.path[0][2] = points[k].ys;
                        _line.path[1][1] = points[k].x1;
                        _line.path[1][2] = points[k].y1;
                        _line.path[2][1] = points[k].x2;
                        _line.path[2][2] = points[k].y2;
                        _line.path[3][1] = points[k].xe;
                        _line.path[3][2] = points[k].ye;
                        _line.text.set({
                            left: (points[k].x1 + points[k].x2) / 2 + _angle / 90 * 8,
                            top: (points[k].y1 + points[k].y2) / 2 - (1 - _angle / 90) * 8,
                            angle: _angle
                        }).setCoords();
                        _line._setPositionDimensions({});
                        _line.setCoords();


                    }
                }

            };
            line.removeFn = function() {

                for (var i = 0; i < line.sObj.straightLine[line.linename].length; i++) {
                    if (line.sObj.straightLine[line.linename][i] == line) {
                        line.sObj.straightLine[line.linename].splice(i, 1);
                        line.eObj.straightLine[line.linename].splice(i, 1);
                        break;
                    }
                }
                _this.canvas.remove(line, line.text, line.arrowhead);
                if (line.sObj.straightLine[line.linename][0]) line.sObj.straightLine[line.linename][0].points();

            };


            line.turnpoint = function(interval) {
                var points = [{
                    x1: '',
                    y1: '',
                    x2: '',
                    y2: ''
                }, {
                    x1: '',
                    y1: '',
                    x2: '',
                    y2: ''
                }];
                var scale = this.sCoord.y - this.eCoord.y === 0 ? 10000 : Math.abs((this.sCoord.x - this.eCoord.x) / (this.sCoord.y - this.eCoord.y));
                if (this.sCoord.x < this.eCoord.x) {
                    if (this.sCoord.y > this.eCoord.y) {
                        points[1].x1 = Math.round(this.sturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y1 = Math.round(this.sturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x1 = Math.round(this.sturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y1 = Math.round(this.sturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);

                        points[1].x2 = Math.round(this.eturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y2 = Math.round(this.eturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x2 = Math.round(this.eturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y2 = Math.round(this.eturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                    } else {
                        points[1].x1 = Math.round(this.sturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y1 = Math.round(this.sturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x1 = Math.round(this.sturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y1 = Math.round(this.sturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);

                        points[1].x2 = Math.round(this.eturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y2 = Math.round(this.eturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x2 = Math.round(this.eturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y2 = Math.round(this.eturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                    }
                } else {
                    if (this.sCoord.y > this.eCoord.y) {
                        points[1].x1 = Math.round(this.sturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y1 = Math.round(this.sturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x1 = Math.round(this.sturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y1 = Math.round(this.sturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);

                        points[1].x2 = Math.round(this.eturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y2 = Math.round(this.eturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x2 = Math.round(this.eturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y2 = Math.round(this.eturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                    } else {
                        points[1].x1 = Math.round(this.sturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y1 = Math.round(this.sturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x1 = Math.round(this.sturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y1 = Math.round(this.sturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);

                        points[1].x2 = Math.round(this.eturn.x + Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[1].y2 = Math.round(this.eturn.y + Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                        points[0].x2 = Math.round(this.eturn.x - Math.sqrt(interval * interval / (scale * scale + 1)));
                        points[0].y2 = Math.round(this.eturn.y - Math.sqrt(interval * interval / (scale * scale + 1)) * scale);
                    }
                }

                return points;
            };

            line.points();

            line.sObj.on("moving", function() {
                if (line.sObj.straightLine[line.linename][0]) line.sObj.straightLine[line.linename][0].points();
            });

            line.eObj.on("moving", function() {
                if (line.sObj.straightLine[line.linename][0]) line.sObj.straightLine[line.linename][0].points();
            });
            line.sObj.on("modified", function() {
                if (line.sObj.straightLine[line.linename][0]) line.sObj.straightLine[line.linename][0].points();
            });

            line.eObj.on("modified", function() {
                if (line.sObj.straightLine[line.linename][0]) line.sObj.straightLine[line.linename][0].points();
            });

            return line;
        },

        brokenLine: function(sObj, eObj, option) {
            var _this = this;

            var option = this.extend(true, {}, defaults.brokenLine, option);
            var line = new fabric.Path("M0 0L110 110L 220 220L120 330", option.style);
            canvas.add(line);


            line.classify = "brokenLine";

            line.sObj = sObj;
            line.eObj = eObj;

            line.id = option.id ? option.id : this.randId("bl");

            //两个物体间有几条线
            line.sameLine = 0;


            line.linename = this.randId("bl");



            if (line.sObj.brokenLine === undefined) {
                line.sObj.brokenLine = {};
            }
            if (line.eObj.brokenLine === undefined) {
                line.eObj.brokenLine = {};
            }


            for (var name1 in line.sObj.brokenLine) {
                for (var name2 in line.eObj.brokenLine) {
                    if (name1 == name2) {
                        line.sameLine = line.eObj.brokenLine[name1].length;
                        line.linename = name1;
                    }
                }
            }

            if (line.sameLine === 1) {
                line.remove();
                return;
            }

            if (line.sameLine === 0) {
                line.sObj.brokenLine[line.linename] = [];
                line.eObj.brokenLine[line.linename] = [];
            }

            line.sObj.brokenLine[line.linename].push(line);
            line.eObj.brokenLine[line.linename].push(line);



            line.text = new fabric.IText(option.title.text !== undefined ? option.title.text : "", option.title.textStyle);
            canvas.add(line.text);
            line.text.depend = line;
            line.direction = option.style.direction;





            line.arrowhead = this.arrowhead(line);
            line.arrowhead.set({
                left: line.eObj.left,
                top: line.eObj.top + line.arrowhead.height / 2,
                angle: line.angle

            })
            line.arrowhead.sendToBack();





            line.points = function() {
                //两obj中点坐标
                this.sCoord = {
                    x: Math.round(this.sObj.left),
                    y: Math.round(this.sObj.top)
                };
                this.eCoord = {
                    x: Math.round(this.eObj.left),
                    y: Math.round(this.eObj.top)
                };
                this.midCoord = {
                    x: (this.sCoord.x + this.eCoord.x) / 2,
                    y: (this.sCoord.y + this.eCoord.y) / 2
                }

                var sPoi, ePoi, points;


                if (line.direction == 'vertical') {
                    sPoi = _this.crashCoord_point(sObj, {
                        x: this.sCoord.x,
                        y: this.midCoord.y
                    });
                    ePoi = _this.crashCoord_point(eObj, {
                        x: this.eCoord.x,
                        y: this.midCoord.y
                    });
                    points = {
                        xs: sPoi.x,
                        ys: sPoi.y,
                        x1: this.sCoord.x,
                        y1: this.midCoord.y,
                        x2: this.eCoord.x,
                        y2: this.midCoord.y,
                        xe: ePoi.x,
                        ye: ePoi.y
                    };
                } else if (line.direction == 'horizontal') {
                    sPoi = _this.crashCoord_point(sObj, {
                        x: this.midCoord.x,
                        y: this.sCoord.y
                    });
                    ePoi = _this.crashCoord_point(eObj, {
                        x: this.midCoord.x,
                        y: this.eCoord.y
                    });
                    points = {
                        xs: sPoi.x,
                        ys: sPoi.y,
                        x1: this.midCoord.x,
                        y1: this.sCoord.y,
                        x2: this.midCoord.x,
                        y2: this.eCoord.y,
                        xe: ePoi.x,
                        ye: ePoi.y
                    };
                }

                if (_this.isPointInPolygon(points.x1, points.y1, sObj.crashPath) || _this.isPointInPolygon(points.x2, points.y2, eObj.crashPath)) {
                    line.direction = (line.direction == 'vertical' ? 'horizontal' : 'vertical');
                }


                //改变线段

                var _judy = this.eCoord.y >= this.sCoord.y;
                var _judx = this.eCoord.x >= this.sCoord.x;
                var arrowAngle = 0;
                var arrowExcursion = {
                    x: 0,
                    y: 0
                }
                if (line.direction == 'horizontal') {
                    arrowExcursion.y = 0;
                    if (_judx) {
                        arrowAngle = 90;
                        arrowExcursion.x = -this.arrowhead.width / 2;
                    } else {
                        arrowAngle = -90;
                        arrowExcursion.x = this.arrowhead.width / 2;
                    }
                } else {
                    arrowExcursion.x = 0;
                    if (_judy) {
                        arrowAngle = 180;
                        arrowExcursion.y = -this.arrowhead.height / 2;
                    } else {
                        arrowAngle = 0;
                        arrowExcursion.y = this.arrowhead.height / 2;
                    }
                }
                this.path[0][1] = points.xs;
                this.path[0][2] = points.ys;
                this.path[1][1] = points.x1;
                this.path[1][2] = points.y1;
                this.path[2][1] = points.x2;
                this.path[2][2] = points.y2;
                this.path[3][1] = points.xe;
                this.path[3][2] = points.ye;
                this.text.set({
                    left: (line.direction == 'horizontal' ? (points.x1 + points.x2) / 2 + 8 : (points.x1 + points.x2) / 2),
                    top: (line.direction == 'horizontal' ? (points.y1 + points.y2) / 2 : (points.y1 + points.y2) / 2 - 8),
                    angle: (line.direction == 'horizontal' ? 90 : 0)
                }).setCoords();


                this.arrowhead.set({
                    left: points.xe + arrowExcursion.x,
                    top: points.ye + arrowExcursion.y,
                    angle: arrowAngle

                });
                this._setPositionDimensions({});
                this.setCoords();
                this.sendToBack();



            };

            line.removeFn = function() {

                for (var i = 0; i < line.sObj.brokenLine[line.linename].length; i++) {
                    if (line.sObj.brokenLine[line.linename][i] == line) {
                        line.sObj.brokenLine[line.linename].splice(i, 1);
                        line.eObj.brokenLine[line.linename].splice(i, 1);
                        break;
                    }
                }
                _this.canvas.remove(line, line.text, line.arrowhead);


            };


            line.points();
            line.sObj.on("moving", function() {
                line.points();
            });

            line.eObj.on("moving", function() {
                line.points();
            });
            line.sObj.on("modified", function() {
                line.points();
            });

            line.eObj.on("modified", function() {
                line.points();
            });
            line.points();

            return line;

        },












        createGroup: function(e) {
            var _this = graph;
            if (e.target) {
                return;
            }
            var obj = {};
            var sPoi = {
                x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
            };

            var obj = new fabric.Rect({
                width: 0,
                height: 0,
                left: sPoi.x,
                top: sPoi.y,
                fill: '',
                originX: 'center',
                originY: 'center',
                strokeWidth: 1,
                stroke: 'red',
                hasControls: false,


            });
            canvas.add(obj);
            obj.classify = 'group';

            obj.ops = {};

            obj.objects = [];

            obj.drawStart = function(e) {
                var ePoi = {
                    x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                    y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
                };
                obj.set({
                    left: sPoi.x + (ePoi.x - sPoi.x) / 2,
                    top: sPoi.y + (ePoi.y - sPoi.y) / 2,
                    width: ePoi.x - sPoi.x,
                    height: ePoi.y - sPoi.y
                });

            };
            obj.redraw = function() {
                var maxL, maxT, minL, minT;
                for (var i in obj.objects) {
                    var _maxL = obj.objects[i].left + obj.objects[i].width * obj.objects[i].scaleX / 2;
                    var _maxT = obj.objects[i].top + obj.objects[i].height * obj.objects[i].scaleY / 2;
                    var _minL = obj.objects[i].left - obj.objects[i].width * obj.objects[i].scaleX / 2;
                    var _minT = obj.objects[i].top - obj.objects[i].height * obj.objects[i].scaleY / 2;
                    maxL = maxL > _maxL ? maxL : _maxL;
                    maxT = maxT > _maxT ? maxT : _maxT;
                    minL = minL < _minL ? minL : _minL;
                    minT = minT < _minT ? minT : _minT;
                }

                return {
                    width: maxL - minL,
                    height: maxT - minT,
                    left: (maxL + minL) / 2,
                    top: (maxT + minT) / 2
                };
            };

            obj.id = this.randId("group");

            obj.redrawset = function() {
                obj.ops = obj.redraw();
                obj.set({
                    left: obj.ops.left,
                    top: obj.ops.top,
                    width: obj.ops.width + 20,
                    height: obj.ops.height + 20
                });
                obj.setCoords();
            };

            obj.drawEnd = function(e) {
                canvas.off('mouse:move', obj.drawStart);
                canvas.off('mouse:up', obj.drawEnd);
                obj.setCoords();
                obj.sendToBack();
                for (var i in canvas.getObjects()) {
                    var cavObj = canvas.getObjects()[i];
                    if (cavObj.classify && (cavObj.classify == "obj" || cavObj.classify == 'group') && cavObj.isContainedWithinObject(obj) && cavObj != obj) {
                        obj.objects.push(cavObj);
                        if (cavObj.groupBox === undefined) { cavObj.groupBox = [] };
                        cavObj.groupBox.push(obj);
                    }
                }

                obj.redrawset();
                obj.on('moving', obj.move);


            };

            obj.move = function(e) {
                for (var i in obj.objects) {
                    obj.objects[i].set({
                        left: obj.objects[i].left + obj.left - obj.ops.left,
                        top: obj.objects[i].top + obj.top - obj.ops.top
                    });
                    obj.objects[i].setCoords();
                    obj.objects[i].change();
                }
                obj.ops.left = obj.left;
                obj.ops.top = obj.top;

            };

            obj.change = function() {
                obj.ops = obj.redraw();
            };


            obj.removeFn = function(e) {
                if (e.target && e.target == obj) {
                    return;
                }
                obj.sendToBack();
                obj.remove();

            };


            canvas.on('mouse:move', obj.drawStart);
            canvas.on('mouse:up', obj.drawEnd);
        },





        createSelectBox: function(e) {
            var _this = graph;
            if (e.target) {
                return;
            }
            var obj = {};
            var sPoi = {
                x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
            };

            var obj = new fabric.Rect({
                width: 0,
                height: 0,
                left: sPoi.x,
                top: sPoi.y,
                fill: 'rgba(0,153,255,.3)',
                originX: 'center',
                originY: 'center',
                strokeWidth: 0,
                hasControls: false,


            });
            canvas.add(obj);
            obj.classify = 'selectBox';

            var obj_ops = {};

            obj.objects = [];

            obj.drawStart = function(e) {
                var ePoi = {
                    x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                    y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
                };
                obj.set({
                    left: sPoi.x + (ePoi.x - sPoi.x) / 2,
                    top: sPoi.y + (ePoi.y - sPoi.y) / 2,
                    width: ePoi.x - sPoi.x,
                    height: ePoi.y - sPoi.y
                });

            };
            obj.redraw = function() {
                var maxL, maxT, minL, minT;
                for (var i in obj.objects) {
                    var _maxL = obj.objects[i].left + obj.objects[i].width * obj.objects[i].scaleX / 2;
                    var _maxT = obj.objects[i].top + obj.objects[i].height * obj.objects[i].scaleY / 2;
                    var _minL = obj.objects[i].left - obj.objects[i].width * obj.objects[i].scaleX / 2;
                    var _minT = obj.objects[i].top - obj.objects[i].height * obj.objects[i].scaleY / 2;
                    maxL = maxL > _maxL ? maxL : _maxL;
                    maxT = maxT > _maxT ? maxT : _maxT;
                    minL = minL < _minL ? minL : _minL;
                    minT = minT < _minT ? minT : _minT;
                }

                return {
                    width: maxL - minL,
                    height: maxT - minT,
                    left: (maxL + minL) / 2,
                    top: (maxT + minT) / 2
                };
            };
            obj.drawEnd = function(e) {
                canvas.off('mouse:move', obj.drawStart);
                canvas.off('mouse:up', obj.drawEnd);
                obj.setCoords();
                /*   obj.sendToBack();*/

                for (var i in canvas.getObjects()) {
                    var cavObj = canvas.getObjects()[i];
                    if (cavObj.classify && cavObj.classify == "obj" && cavObj.isContainedWithinObject(obj)) {
                        obj.objects.push(cavObj);
                    }
                }

                obj_ops = obj.redraw();
                obj.set({
                    left: obj_ops.left,
                    top: obj_ops.top,
                    width: obj_ops.width,
                    height: obj_ops.height
                });
                obj.setCoords();

                obj.on('moving', obj.move);
                obj.on('modified', function() {
                    _this.addrecords();
                });
                canvas.on('mouse:down', obj.removeFn);

            };

            obj.move = function(e) {
                for (var i in obj.objects) {
                    obj.objects[i].set({
                        left: obj.objects[i].left + obj.left - obj_ops.left,
                        top: obj.objects[i].top + obj.top - obj_ops.top
                    });
                    obj.objects[i].setCoords();
                    obj.objects[i].change();
                }
                obj_ops.left = obj.left;
                obj_ops.top = obj.top;

            };


            obj.removeFn = function(e) {
                if (e.target && e.target == obj) {
                    return;
                }
                obj.sendToBack();
                obj.remove();

            };


            canvas.on('mouse:move', obj.drawStart);
            canvas.on('mouse:up', obj.drawEnd);

        },

        //画直线
        drawStraightLine: function(e) {
            var _this = graph;
            var sObj = e.target;
            if (sObj === undefined || sObj.classify != 'obj') {
                return;
            }


            var line = new fabric.Path("M" + sObj.left + " " + sObj.top + " L " + (sObj.left + 1) + " " + (sObj.top + 1), defaults.straightLine.style);

            canvas.add(line);
            line.drawStart = function(e) {
                line.path[1][1] = (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom;
                line.path[1][2] = (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom;
                canvas.renderAll();
            };
            line.drawEnd = function(e) {
                canvas.off('mouse:move', line.drawStart);
                line.remove();
                var eObj = e.target;
                if (eObj && eObj != sObj && eObj.classify == "obj") {
                    _this.straightLine(sObj, eObj, defaults.straightLine);
                    graph.addrecords();
                }
                canvas.off('mouse:up', line.drawEnd);
            };

            canvas.on('mouse:move', line.drawStart);
            canvas.on('mouse:up', line.drawEnd);

        },
        //画单折线
        drawBrokenLine: function(e) {
            var _this = graph;
            var sObj = e.target;
            if (sObj === undefined || sObj.classify != 'obj') {
                return;
            }

            var line = new fabric.Path("M" + sObj.left + " " + sObj.top + " L " + (sObj.left + 1) + " " + (sObj.top + 1) + " L " + (sObj.left + 1) + " " + (sObj.top + 1) + " L " + (sObj.left + 1) + " " + (sObj.top + 1), defaults.brokenLine.style);

            canvas.add(line);
            line.drawStart = function(e) {
                line.path[1][1] = sObj.left;
                line.path[1][2] = ((e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom + sObj.top) / 2;
                line.path[2][1] = (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom;
                line.path[2][2] = ((e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom + sObj.top) / 2;
                line.path[3][1] = (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom;
                line.path[3][2] = (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom;

                canvas.renderAll();
            };
            line.drawEnd = function(e) {
                canvas.off('mouse:move', line.drawStart);
                line.remove();
                var eObj = e.target;
                if (eObj && eObj != sObj && eObj.classify == "obj") {
                    defaults.brokenLine.style.direction = 'vertical';
                    _this.brokenLine(sObj, eObj, defaults.brokenLine);
                    graph.addrecords();

                }
                canvas.off('mouse:up', line.drawEnd);
            };

            canvas.on('mouse:move', line.drawStart);
            canvas.on('mouse:up', line.drawEnd);

        },

        _drawBrokenLine: function(e) {
            var _this = graph;
            var sObj = e.target;
            if (sObj === undefined || sObj.classify != 'obj') {
                return;
            }

            var line = new fabric.Path("M" + sObj.left + " " + sObj.top + " L " + (sObj.left + 1) + " " + (sObj.top + 1) + " L " + (sObj.left + 1) + " " + (sObj.top + 1) + " L " + (sObj.left + 1) + " " + (sObj.top + 1), {
                evented: false,
                fill: '',
                strokeWidth: defaults.brokenLine.style.strokeWidth,
                stroke: defaults.brokenLine.style.stroke,
                evented: false
            });

            canvas.add(line);
            line.drawStart = function(e) {
                line.path[1][1] = ((e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom + sObj.left) / 2;
                line.path[1][2] = sObj.top;
                line.path[2][1] = ((e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom + sObj.left) / 2;
                line.path[2][2] = (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom;
                line.path[3][1] = (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom;
                line.path[3][2] = (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom;

                canvas.renderAll();
            };
            line.drawEnd = function(e) {
                canvas.off('mouse:move', line.drawStart);
                line.remove();
                var eObj = e.target;
                if (eObj && eObj != sObj && eObj.classify == "obj") {
                    defaults.brokenLine.style.direction = 'horizontal';
                    _this.brokenLine(sObj, eObj, defaults.brokenLine);
                    graph.addrecords();

                }
                canvas.off('mouse:up', line.drawEnd);
            };

            canvas.on('mouse:move', line.drawStart);
            canvas.on('mouse:up', line.drawEnd);

        },
        //圆
        drawCircle: function(e) {
            var _this = graph;
            var sPoi = {
                x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
            };

            var circle = new fabric.Circle({
                radius: 0,
                left: sPoi.x,
                top: sPoi.y,
                fill: defaults.object.circle.fill,
                originX: 'center',
                originY: 'center',
                strokeWidth: 1,
                stroke: defaults.object.circle.stroke,
                strokeDashArray: defaults.object.circle.strokeDashArray,
                strokeLineCap: defaults.object.circle.strokeLineCap,
                strokeLineJoin: defaults.object.circle.strokeLineJoin,
                strokeMiterLimit: defaults.object.circle.strokeMiterLimit,
            });
            canvas.add(circle);

            circle.drawStart = function(e) {
                var ePoi = {
                    x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                    y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
                };
                circle.setRadius(_this.distance(sPoi, ePoi));

            };
            circle.drawEnd = function(e) {
                canvas.off('mouse:move', circle.drawStart);
                canvas.off('mouse:up', circle.drawEnd);
                if (circle.radius > 1) {
                    var circleJson = {
                        genre: 'circle',
                        id: _this.randId("obj"),
                        shape: {
                            radius: circle.radius,
                            left: circle.left,
                            top: circle.top,
                            strokeWidth: 1,
                        },
                        title: {}
                    };




                    circleJson.shape = _this.extend(true, {}, defaults.object.circle, circleJson.shape);
                    window[circleJson.id] = _this.creatShape(circleJson);
                }

                circle.remove();



            };

            canvas.on('mouse:move', circle.drawStart);
            canvas.on('mouse:up', circle.drawEnd);


        },
        //矩形
        drawRect: function(e) {
            var _this = graph;
            var sPoi = {
                x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
            };

            var rect = new fabric.Rect({
                width: 0,
                height: 0,
                left: sPoi.x,
                top: sPoi.y,
                fill: defaults.object.rect.fill,
                originX: 'center',
                originY: 'center',
                strokeWidth: 1,
                stroke: defaults.object.rect.stroke,
                strokeDashArray: defaults.object.rect.strokeDashArray,
                strokeLineCap: defaults.object.rect.strokeLineCap,
                strokeLineJoin: defaults.object.rect.strokeLineJoin,
                strokeMiterLimit: defaults.object.rect.strokeMiterLimit,
            });
            canvas.add(rect);

            rect.drawStart = function(e) {
                var ePoi = {
                    x: (e.e.layerX - (1 - _this.canvasZoom) * _this.zoomPoint.x) / _this.canvasZoom,
                    y: (e.e.layerY - (1 - _this.canvasZoom) * _this.zoomPoint.y) / _this.canvasZoom
                };
                rect.set({
                    left: sPoi.x + (ePoi.x - sPoi.x) / 2,
                    top: sPoi.y + (ePoi.y - sPoi.y) / 2,
                    width: ePoi.x - sPoi.x,
                    height: ePoi.y - sPoi.y
                });

            };
            rect.drawEnd = function(e) {
                canvas.off('mouse:move', rect.drawStart);
                canvas.off('mouse:up', rect.drawEnd);
                if (rect.width > 1) {
                    var rectJson = {
                        genre: 'rect',
                        id: _this.randId("obj"),
                        shape: {
                            width: rect.width,
                            height: rect.height,
                            left: rect.left,
                            top: rect.top,
                            strokeWidth: 1,

                        },
                        title: {}
                    };



                    rectJson.shape = _this.extend(true, {}, defaults.object.rect, rectJson.shape);

                    window[rectJson.id] = _this.creatShape(rectJson);

                }

                rect.remove();



            };

            canvas.on('mouse:move', rect.drawStart);
            canvas.on('mouse:up', rect.drawEnd);


        },





    }



    return graph;

}
