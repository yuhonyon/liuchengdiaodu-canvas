var defaults = {
    crashPath: {
        default: [0, 0, 50, 0, 50, 50, 0, 50, 0, 0],
        ellipse: [0, 60.167, 3.306, 45.988, 9.472, 35.519, 21.737, 23.328,
            36.853, 13.878, 57.062, 5.973, 76.207, 1.762, 96.167, 0, 114.712, 0.666, 136.054, 4.14, 156.853, 10.955, 172.93, 19.52, 188.132, 32.575,
            196.834, 46.313, 200, 59.5, 198.629, 72.035, 191.956, 86.124, 182.388, 96.836, 169.455, 106.259, 147.587, 116.167, 128.742, 121.007,
            104.167, 123.6, 81.641, 122.559, 55.094, 117.032, 32.939, 107.644, 17.531, 96.762, 7.764, 85.713, 0.506, 68.05, 0, 60.167
        ],
        circle: [11.254, 17.25, 15.69, 12.7,
            20.014, 9.059, 25.93, 5.305, 32.642, 2.12, 38.899, 0.527, 46.407, 0, 57.442, 0, 66.212, 2.687, 74.854, 6.605, 81.532, 11.195, 88.164, 17.701,
            93.801, 25.872, 97.223, 33.532, 99.413, 42.316, 99.99, 50.927, 98.698, 61.382, 95.416, 70.937, 89.22, 81.012, 81.146, 89.115, 71.25, 95.27,
            60.614, 98.869, 50, 100, 39.02, 98.789, 29.196, 95.478, 19.514, 89.63, 12.513, 83.086, 6.363, 74.423, 2.31, 65.06, 0.374, 56.14, 0, 48.422,
            0.786, 41.12, 3.031, 32.824, 5.207, 27.765, 11.254, 17.25
        ],
        rect: [0, 0, 100, 0, 100, 100, 0, 100, 0, 0],
        server: [0, 0, 50, 0, 50, 46.8, 0, 46.8, 0, 0],
        laptop: [2.3, 19.8, 2.3, 4, 2.6, 1.6, 4.9, 0, 44.4, 0, 46.7, 0.8, 47.6, 3.2, 47.7, 27.3, 50, 31, 49.8, 32.9, 48.4, 34, 1.5, 34, 0.1, 32.7, 0, 30.4, 1.5, 29.7, 2.3, 27.3, 2.3, 19.8],
        imgServer: [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39],
        administrator: [0, 53.643, 1.394, 42.77, 7.024, 32.592, 14.235, 32.438, 14.235, 23.265, 11.125, 15.265, 12.749, 13.739, 13.5, 3.39, 20.75, 0, 30.875, 0, 36.494, 6.97, 37.324, 15.208, 37.324, 21.015, 35.75, 30.39, 43, 30.265, 49.89, 45.515, 50, 54.39, 28.875, 57.722, 11.386, 57.05, 0, 53.643, ]
    },
    seting: {
        canvaszoom: 1,
        background: "#eeeeee",
    },
    object: {
        lockScalingX: false,
        lockScalingY: false,
        hasControls: false,
        shape: {
            left: 0,
            top: 0,
            scaleX: .5,
            scaleY: .5,
            angle: 0,
            fill: '',
            width: 50,
            crashPath: [],
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            strokeWidth: 0,
            stroke: '#000000',
            hoverCursor: 'move',
            lockScalingFlip: true,
            originX: 'center',
            originY: 'center',
            borderColor: 'rgba(0,0,0,0)',
            isEditing: true,
            fontStyle: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontSize: 28,
            lineHeight: 1,
            fontWeight: 'normal',
        },

        container: {
            show: true,
            shape: 'circle',
            crashPath: [],
            scaleX: 1,
            scaleY: 1,
            width: 50,
            height: 50,
            radius: 25,
            angle: 0,
            fill: '#a7acb8',
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            strokeWidth: 0,
            stroke: '#000000',
            lockScalingFlip: true,
            originX: 'center',
            originY: 'center',
            borderColor: 'rgba(0,0,0,0)',
            hoverCursor: 'move',
        },
        title: {
            text: "",
            location: 'bottom',
            left: 0,
            top: 0,
            fill: "#666666",
            originX: 'center',
            originY: 'center',
            editingBorderColor: '#000000',
            editable: true,
            hasControls: false,
            lockMovementY: true,
            lockMovementX: true,
            isEditing: true,
            fontStyle: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            fontWeight: 'normal',
            textAlign: 'center',
            textDecoration: "",
            shadow: null,
            textBackgroundColor: "rgba(0,0,0,0)",
            lineHeight: 1.3,
            stroke: 'rgba(0,0,0,0)',
            strokeWidth: 0,
            margin: 20
        }
    },
    text: {
        text: "",
        left: 0,
        top: 0,
        fill: "#666666",
        originX: 'center',
        originY: 'center',
        editingBorderColor: '#000000',
        editable: true,
        hasControls: false,

        isEditing: true,
        fontStyle: 'normal',
        fontFamily: 'Microsoft YaHei',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        textDecoration: "",
        shadow: null,
        textBackgroundColor: "rgba(0,0,0,0)",
        lineHeight: 1,
        stroke: 'rgba(0,0,0,0)',
        strokeWidth: 0,
    },
    straightLine: {

        arrowhead: true,
        style: {
            strokeDashArray: null,
            strokeWidth: 1,
            stroke: '#000000',
            hasControls: false,
            lockMovementY: true,
            lockMovementX: true,
            perPixelTargetFind: true,
            hoverCursor: 'pointer',
            fill: null
        },
        title: {
            text: "线名",
            textStyle: {
                fill: '#000000',
                fontStyle: 'normal',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14,
                fontWeight: 'normal',
                textAlign: 'center',
                textDecoration: "",
                shadow: null,
                textBackgroundColor: "rgba(0,0,0,0)",
                lineHeight: 1.3,
                stroke: '#000000',
                strokeWidth: 0,
                editable: true,
                hasControls: false,
                lockMovementY: true,
                lockMovementX: true,
                isEditing: true,
                hoverCursor: 'text'

            }
        }

    },
    brokenLine: {
        arrowhead: true,
        style: {
            direction: 'vertical',
            strokeDashArray: null,
            strokeWidth: 1,
            stroke: '#000000',
            hasControls: false,
            lockMovementY: true,
            lockMovementX: true,
            perPixelTargetFind: true,
            hoverCursor: 'pointer',
            fill: null
        },
        title: {
            text: "线名",
            textStyle: {
                fill: '#000000',
                fontStyle: 'normal',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14,
                fontWeight: 'normal',
                textAlign: 'center',
                textDecoration: "",
                shadow: null,
                textBackgroundColor: "rgba(0,0,0,0)",
                lineHeight: 1.3,
                stroke: '#000000',
                strokeWidth: 0,
                editable: true,
                hasControls: false,
                lockMovementY: true,
                lockMovementX: true,
                isEditing: true,
                hoverCursor: 'text'

            }
        }
    }

}





var template1 = { "object": [{ "genre": "svg", "id": "obj2461591389", "left": 327, "top": 384, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/laptop.svg", "crashPath": [2.3, 19.8, 2.3, 4, 2.6, 1.6, 4.9, 0, 44.4, 0, 46.7, 0.8, 47.6, 3.2, 47.7, 27.3, 50, 31, 49.8, 32.9, 48.4, 34, 1.5, 34, 0.1, 32.7, 0, 30.4, 1.5, 29.7, 2.3, 27.3, 2.3, 19.8], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": null, "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 34 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "笔记本", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj2771583857", "left": 623, "top": 384, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/laptop.svg", "crashPath": [2.3, 19.8, 2.3, 4, 2.6, 1.6, 4.9, 0, 44.4, 0, 46.7, 0.8, 47.6, 3.2, 47.7, 27.3, 50, 31, 49.8, 32.9, 48.4, 34, 1.5, 34, 0.1, 32.7, 0, 30.4, 1.5, 29.7, 2.3, 27.3, 2.3, 19.8], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": null, "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 34 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "笔记本", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj6941286310", "left": 620, "top": 130, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/laptop.svg", "crashPath": [2.3, 19.8, 2.3, 4, 2.6, 1.6, 4.9, 0, 44.4, 0, 46.7, 0.8, 47.6, 3.2, 47.7, 27.3, 50, 31, 49.8, 32.9, 48.4, 34, 1.5, 34, 0.1, 32.7, 0, 30.4, 1.5, 29.7, 2.3, 27.3, 2.3, 19.8], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": null, "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 34 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "笔记本", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj4032252729", "left": 323, "top": 131, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/laptop.svg", "crashPath": [2.3, 19.8, 2.3, 4, 2.6, 1.6, 4.9, 0, 44.4, 0, 46.7, 0.8, 47.6, 3.2, 47.7, 27.3, 50, 31, 49.8, 32.9, 48.4, 34, 1.5, 34, 0.1, 32.7, 0, 30.4, 1.5, 29.7, 2.3, 27.3, 2.3, 19.8], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": null, "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 34 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "笔记本", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj9458877845", "left": 160, "top": 246, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/server.svg", "crashPath": [0, 0, 50, 0, 50, 46.8, 0, 46.8, 0, 0], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 50 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj4621472943", "left": 833, "top": 255, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/server.svg", "crashPath": [0, 0, 50, 0, 50, 46.8, 0, 46.8, 0, 0], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 50 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }], "straightLine": [{ "arrowhead": true, "style": { "direction": "horizontal", "strokeDashArray": null, "strokeWidth": 1, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontFamily": "Microsoft YaHei", "fontSize": 14, "fontWeight": "normal", "textAlign": "center", "textDecoration": "", "shadow": null, "textBackgroundColor": "rgba(0,0,0,0)", "lineHeight": 1.3, "stroke": "#000000", "strokeWidth": 0 } }, "sObjId": "obj9458877845", "eObjId": "obj2461591389", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "", "fontSize": 14 } } } }, { "arrowhead": true, "style": { "direction": "horizontal", "strokeDashArray": null, "strokeWidth": 1, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontFamily": "Microsoft YaHei", "fontSize": 14, "fontWeight": "normal", "textAlign": "center", "textDecoration": "", "shadow": null, "textBackgroundColor": "rgba(0,0,0,0)", "lineHeight": 1.3, "stroke": "#000000", "strokeWidth": 0 } }, "sObjId": "obj9458877845", "eObjId": "obj4032252729", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "", "fontSize": 14 } } } }, { "id": "sl6296053964", "sObjId": "obj4032252729", "eObjId": "obj6941286310", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl587505735", "sObjId": "obj2461591389", "eObjId": "obj2771583857", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl5319111217", "sObjId": "obj4032252729", "eObjId": "obj2771583857", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl6787382262", "sObjId": "obj2461591389", "eObjId": "obj6941286310", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }], "brokenLine": [] }
var template2 = { "object": [{ "genre": "img", "id": "obj2391908333", "left": 322, "top": 252, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "img/1.png", "crashPath": [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 59.80861244019139 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "img", "id": "obj6365775322", "left": 521.2222222222223, "top": 163.11111111111114, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "img/1.png", "crashPath": [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 59.80861244019139 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "img", "id": "obj1679002966", "left": 726, "top": 258, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "img/1.png", "crashPath": [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 59.80861244019139 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "img", "id": "obj6315060224", "left": 315, "top": 469, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "img/1.png", "crashPath": [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 59.80861244019139 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "img", "id": "obj4182471577", "left": 525, "top": 475, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "img/1.png", "crashPath": [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 59.80861244019139 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "img", "id": "obj3989990500", "left": 727, "top": 472, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "img/1.png", "crashPath": [0, 53.39, 0, 8.515, 22.875, 0, 38.625, 3.515, 38.625, 20.39, 44.75, 24.39, 50, 32.14, 50, 40.39, 45.875, 48.515, 38.5, 53.39, 28, 53.39, 21.375, 59.809, 8.875, 58.515, 0, 53.39], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 59.80861244019139 }, "container": { "show": false, "fill": "rgb(0,0,0)", "height": 0, "width": 0, "strokeDashArray": null, "strokeWidth": 1, "crashPath": [], "stroke": null, "radius": 0 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj9319759366", "left": 147.2500000000001, "top": 345.7500000000001, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/server.svg", "crashPath": [0, 0, 50, 0, 50, 46.8, 0, 46.8, 0, 0], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "rgba(216,219,39,1)", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 50 }, "container": { "show": true, "shape": "circle", "fill": "rgba(209,19,53,0.24)", "height": 100, "width": 100, "strokeDashArray": null, "strokeWidth": 0, "crashPath": [108.5040000000001, 313.0000000000001, 112.94000000000011, 308.4500000000001, 117.26400000000012, 304.80900000000014, 123.18000000000012, 301.0550000000001, 129.8920000000001, 297.8700000000001, 136.14900000000011, 296.2770000000001, 143.6570000000001, 295.7500000000001, 154.69200000000012, 295.7500000000001, 163.4620000000001, 298.4370000000001, 172.1040000000001, 302.35500000000013, 178.7820000000001, 306.9450000000001, 185.4140000000001, 313.45100000000014, 191.0510000000001, 321.6220000000001, 194.47300000000013, 329.2820000000001, 196.66300000000012, 338.06600000000014, 197.24000000000012, 346.67700000000013, 195.9480000000001, 357.1320000000001, 192.6660000000001, 366.6870000000001, 186.4700000000001, 376.7620000000001, 178.39600000000013, 384.8650000000001, 168.5000000000001, 391.0200000000001, 157.86400000000012, 394.61900000000014, 147.2500000000001, 395.7500000000001, 136.27000000000012, 394.5390000000001, 126.44600000000011, 391.2280000000001, 116.76400000000012, 385.3800000000001, 109.76300000000012, 378.8360000000001, 103.61300000000011, 370.1730000000001, 99.56000000000012, 360.8100000000001, 97.62400000000011, 351.8900000000001, 97.25000000000011, 344.17200000000014, 98.03600000000012, 336.8700000000001, 100.28100000000012, 328.5740000000001, 102.45700000000011, 323.5150000000001, 108.5040000000001, 313.0000000000001], "stroke": "#000000", "radius": 50 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }, { "genre": "svg", "id": "obj6626401159", "left": 927.4722222222222, "top": 353.9166666666667, "angle": 0, "scaleX": 1, "scaleY": 1, "shape": { "top": 0, "left": 0, "source": "svg/server.svg", "crashPath": [0, 0, 50, 0, 50, 46.8, 0, 46.8, 0, 0], "scaleX": 1, "scaleY": 1, "angle": 0, "fill": "rgba(212,15,27,1)", "strokeDashArray": null, "strokeLineCap": "butt", "strokeLineJoin": "miter", "strokeMiterLimit": 10, "strokeWidth": 0, "width": 50, "height": 50 }, "container": { "show": true, "shape": "circle", "fill": "rgba(7,232,70,0.24)", "height": 100, "width": 100, "strokeDashArray": null, "strokeWidth": 0, "crashPath": [888.7262222222222, 321.1666666666667, 893.1622222222222, 316.6166666666667, 897.4862222222222, 312.9756666666667, 903.4022222222221, 309.2216666666667, 910.1142222222222, 306.0366666666667, 916.3712222222222, 304.4436666666667, 923.8792222222222, 303.9166666666667, 934.9142222222222, 303.9166666666667, 943.6842222222222, 306.6036666666667, 952.3262222222222, 310.5216666666667, 959.0042222222222, 315.1116666666667, 965.6362222222222, 321.6176666666667, 971.2732222222222, 329.7886666666667, 974.6952222222221, 337.44866666666667, 976.8852222222222, 346.23266666666666, 977.4622222222222, 354.8436666666667, 976.1702222222223, 365.2986666666667, 972.8882222222221, 374.8536666666667, 966.6922222222222, 384.9286666666667, 958.6182222222221, 393.0316666666667, 948.7222222222222, 399.18666666666667, 938.0862222222222, 402.78566666666666, 927.4722222222222, 403.9166666666667, 916.4922222222222, 402.7056666666667, 906.6682222222222, 399.3946666666667, 896.9862222222222, 393.5466666666667, 889.9852222222222, 387.0026666666667, 883.8352222222222, 378.3396666666667, 879.7822222222221, 368.9766666666667, 877.8462222222222, 360.0566666666667, 877.4722222222222, 352.33866666666665, 878.2582222222221, 345.0366666666667, 880.5032222222221, 336.7406666666667, 882.6792222222222, 331.6816666666667, 888.7262222222222, 321.1666666666667], "stroke": "#000000", "radius": 50 }, "title": { "text": "服务器", "top": "bottom", "left": "certent", "textStyle": { "color": "#666666", "fontStyle": "normal", "fontSize": 14 } } }], "straightLine": [{ "id": "sl8375824235", "sObjId": "obj6365775322", "eObjId": "obj6315060224", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl9638260620", "sObjId": "obj6626401159", "eObjId": "obj1679002966", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl1142150308", "sObjId": "obj6626401159", "eObjId": "obj3989990500", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl4916962642", "sObjId": "obj9319759366", "eObjId": "obj2391908333", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl1105234123", "sObjId": "obj9319759366", "eObjId": "obj6315060224", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl1119818401", "sObjId": "obj6365775322", "eObjId": "obj4182471577", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl7445914158", "sObjId": "obj6365775322", "eObjId": "obj1679002966", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl4884418002", "sObjId": "obj6365775322", "eObjId": "obj2391908333", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }, { "id": "sl3078516651", "sObjId": "obj6365775322", "eObjId": "obj3989990500", "option": { "style": { "strokeWidth": 1, "strokeDashArray": null, "stroke": "#000000" }, "title": { "text": "线名", "textStyle": { "color": "#000000", "fontStyle": "normal", "fontSize": 14 } } } }], "brokenLine": [] }
