 ! function(e, t) {
    function i() {
        var t = n.getBoundingClientRect().width;
        t / d > 540 && (t = 540 * d);
        var i = t / o * 100;
        n.style.fontSize = i + "px",
            p.rem = e.rem = i
    }
    var a,
        r = e.document,
        n = r.documentElement,
        o = t.designWidth || 750,
        l = r.querySelector('meta[name="viewport"]'),
        m = r.querySelector('meta[name="flexible"]'),
        d = 0,
        s = 0,
        p = t.flexible || (t.flexible = {});
    if (l) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var c = l.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        c && (s = parseFloat(c[1]), d = parseInt(1 / s))
    } else if (m) {
        var u = m.getAttribute("content");
        if (u) {
            var f = u.match(/initial\-dpr=([\d\.]+)/),
                v = u.match(/maximum\-dpr=([\d\.]+)/);
            f && (d = parseFloat(f[1]), s = parseFloat((1 / d).toFixed(2))),
                v && (d = parseFloat(v[1]), s = parseFloat((1 / d).toFixed(2)))
        }
    }
    if (!d && !s) {
        var h = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi)),
            x = e.devicePixelRatio;
        d = h ?
            x >= 3 && (!d || d >= 3) ?
            3 :
            x >= 2 && (!d || d >= 2) ?
            2 :
            1 :
            1,
            s = 1 / d
    }
    if (n.setAttribute("data-dpr", d), !l)
        if (l = r.createElement("meta"), l.setAttribute("name", "viewport"), l.setAttribute("content", "initial-scale=" + s + ", maximum-scale=" + s + ", minimum-scale=" + s + ", user-scalable=no"), n.firstElementChild)
            n.firstElementChild.appendChild(l);
        else {
            var b = r.createElement("div");
            b.appendChild(l),
                r.write(b.innerHTML)
        }
    e.addEventListener("resize", function() {
            clearTimeout(a),
                a = setTimeout(i, 300)
        }, !1),
        e.addEventListener("pageshow", function(e) {
            e.persisted && (clearTimeout(a), a = setTimeout(i, 300))
        }, !1),
        "complete" === r.readyState ?
        r.body.style.fontSize = 12 * d + "px" :
        r.addEventListener("DOMContentLoaded", function(e) {
            r.body.style.fontSize = 12 * d + "px"
        }, !1),
        i(),
        p.dpr = e.dpr = d,
        p.refreshRem = i,
        p.rem2px = function(e) {
            var t = parseFloat(e) * this.rem;
            return "string" == typeof e && e.match(/rem$/) && (t += "px"),
                t
        },
        p.px2rem = function(e) {
            var t = parseFloat(e) / this.rem;
            return "string" == typeof e && e.match(/px$/) && (t += "rem"),
                t
        }    
}(window, window.lib || (window.lib = {}));
window.baseUrl = "http://epms.tw186.com";
