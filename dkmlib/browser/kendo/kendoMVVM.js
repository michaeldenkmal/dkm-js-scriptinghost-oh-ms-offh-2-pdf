var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "dkmlib/browser/kendo/kendoUtil", "dkmlib/generic/u", "dkmlib/browser/generic/browserUtil"], function (require, exports, kendoUtil, u, browserUtil) {
    var VM_Base = (function (_super) {
        __extends(VM_Base, _super);
        function VM_Base(data) {
            var _this = this;
            _super.call(this, data);
            this.__status__ = "";
            this.__error__ = "";
            this.__logLines__ = new kendo.data.ObservableArray([]);
            this.__refresh___ = false;
            this.log = function (msg) {
                _this.LogLines.push(msg);
            };
            this.clearLog = function () {
                _this.LogLines = new kendo.data.ObservableArray([]);
            };
            this.funcExists = function (fn) {
                return "function" === typeof _this[fn];
            };
            this.setExists = function () {
                return _this.funcExists("set");
            };
            this.getExists = function () {
                return _this.funcExists("get");
            };
            this.setV = function (n, v) {
                if (!_this.setExists()) {
                    _this[n] = v;
                }
                else {
                    _this["set"](n, v);
                }
            };
            this.getV = function (n) {
                if (!_this.getExists()) {
                    return _this[n];
                }
                else {
                    return _this["get"](n);
                }
            };
            this.bind_ = function (e, h) {
                if (_this.funcExists("bind")) {
                    _this["bind"](e, h);
                }
            };
            this.setStatus = function (msg) {
                _this.setV("__status__", msg);
            };
            this.setError = function (errstr) {
                _this.setV("__error__", errstr);
            };
            this.EXCLUDED_DIRTY_FIELDS = ["btnSaveEnabled", "__status__", "__error__", "__refresh__"];
            this.setChangeHandler = function () {
                _this.bind_(kendoUtil.VIEW_MODEL_EVENTS.change, _this.onChange);
            };
            this.refreshData = function () {
                _this.setV("__refresh__", true);
            };
            this.setStatusWithTimeOut = function (msg, timeout) {
                _this.setStatus(msg);
                var that = _this;
                browserUtil.runlater(function () {
                    that.setStatus("");
                }, timeout | 2000);
            };
        }
        Object.defineProperty(VM_Base.prototype, "HtmlLog", {
            get: function () {
                var ret = [];
                this.LogLines.forEach(function (logLine) {
                    ret.push("<p>" + u.htmlEscape(logLine.toString()) + "</p>");
                });
                return ret.join("\n");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VM_Base.prototype, "LogLines", {
            get: function () {
                return this.get("__logLines__");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VM_Base.prototype, "Error", {
            get: function () {
                return this.get("__error__");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VM_Base.prototype, "Status", {
            get: function () {
                return this.get("__status__");
            },
            enumerable: true,
            configurable: true
        });
        VM_Base.prototype.onChange = function (e) {
            var fieldName = kendoUtil.getFieldFromModelChangeEvt(e);
            if (this.EXCLUDED_DIRTY_FIELDS.indexOf(fieldName) == -1) {
                kendoUtil.setModelProp(this, "btnSaveEnabled", true);
            }
        };
        return VM_Base;
    })(kendo.data.ObservableObject);
    exports.VM_Base = VM_Base;
});
//# sourceMappingURL=kendoMVVM.js.map