define(["require", "exports", "dkmlib/generic/u", "dkmlib/browser/generic/nsexp"], function (require, exports, u, nsexp) {
    function getSourceIdFromEvent(evt) {
        var elem = getCallingElem(evt);
        if (elem == null) {
            return null;
        }
        return getAttrId(elem);
    }
    exports.getSourceIdFromEvent = getSourceIdFromEvent;
    function getCallingElem(evt) {
        if ((evt.originalEvent == null) || ((evt.originalEvent.target == null) && (evt.originalEvent.srcElement == null))) {
            return null;
        }
        if (evt.originalEvent.target != null) {
            return evt.originalEvent.target;
        }
        else if (evt.originalEvent.srcElement != null) {
            return evt.originalEvent.srcElement;
        }
        return null;
    }
    exports.getCallingElem = getCallingElem;
    function getButtonFromEvent(evt, classNameOfButton) {
        var evttarg = getCallingElem(evt);
        var btn = null;
        if (evttarg == null) {
            throw new Error("Konnte evttarg nicht bestimmen");
        }
        if (evttarg.toString() == "[object HTMLButtonElement]") {
            btn = evttarg;
        }
        if ((btn != null) && (!isHtmlElemDisabled(btn))) {
            if (btn.className == classNameOfButton) {
                return btn;
            }
        }
        return null;
    }
    exports.getButtonFromEvent = getButtonFromEvent;
    function getAttr(elem, attrName) {
        return elem.getAttribute(attrName);
    }
    exports.getAttr = getAttr;
    function getAttrId(elem) {
        return getAttr(elem, "id");
    }
    exports.getAttrId = getAttrId;
    function isHtmlElemDisabled(elem) {
        if (elem.getAttribute("disabled") == "disabled") {
            return true;
        }
        return false;
    }
    exports.isHtmlElemDisabled = isHtmlElemDisabled;
    function disableSpellCheck(idOfEditor) {
        var editor = document.getElementById(idOfEditor);
        editor.spellcheck = false;
        editor.focus();
        editor.blur();
    }
    exports.disableSpellCheck = disableSpellCheck;
    var TSaveJsonConvertResult = (function () {
        function TSaveJsonConvertResult() {
            var _this = this;
            this.getFirst80CharsOfJson = function () {
                return _this.json.substr(0, 80);
            };
            this.throwErr = function () {
                console.log("err_msg=" + _this.error_msg + ", json=" + _this.json);
                throw new Error("err_msg=" + _this.error_msg + ", json=" + _this.getFirst80CharsOfJson());
            };
            this.throwIfError = function () {
                if (_this.error_found) {
                    _this.throwErr();
                }
            };
        }
        return TSaveJsonConvertResult;
    })();
    exports.TSaveJsonConvertResult = TSaveJsonConvertResult;
    function saveConvertJson(json, throwOnError) {
        var ret = new TSaveJsonConvertResult();
        throwOnError = throwOnError || true;
        ret.error_found = false;
        try {
            ret.dataObj = JSON.parse(json);
        }
        catch (e) {
            ret.error_found = true;
            ret.json = json;
            ret.error_msg = e.message;
            ret.dataObj = null;
            if (throwOnError) {
                ret.throwErr();
            }
        }
        return ret;
    }
    exports.saveConvertJson = saveConvertJson;
    function buildUrlParam(pName, pValue) {
        return pName + "=" + encodeURIComponent(pValue);
    }
    exports.buildUrlParam = buildUrlParam;
    function buildUrlParams(urlParams) {
        var keys = Object.keys(urlParams);
        var arrParams = [];
        keys.forEach(function (key) {
            arrParams.push(buildUrlParam(key, urlParams[key]));
        });
        return arrParams.join("&");
    }
    exports.buildUrlParams = buildUrlParams;
    function buildUrl(urlWithOutParams, urlParams) {
        return urlWithOutParams + "?" + buildUrlParams(urlParams);
    }
    exports.buildUrl = buildUrl;
    function evalFullContextPath(contextName) {
        var href = window.document.location.href;
        //http://localhost:8084/dkmMVC/gawebfiles/vertrauswert/vertrauswert/vertrauswert.html
        //-> 
        //http://localhost:8084/dkmMVC
        // Zuerst nach gawebfiles in den Teilen suchen und die Restlichen zusammensetzen
        var parts = href.split("/");
        var partLen = parts.length;
        var part;
        var partsHostPrefix = [];
        var i = 0;
        for (i = 0; i < partLen; i++) {
            part = parts[i];
            if (part == contextName) {
                break;
            }
            partsHostPrefix.push(part);
        }
        var hostPreFix = partsHostPrefix.join("/");
        var fullContextPath = hostPreFix + "/" + contextName;
        return {
            hostPreFix: hostPreFix,
            fullContextPath: fullContextPath
        };
    }
    exports.evalFullContextPath = evalFullContextPath;
    function sanitizeHTML(s) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(s));
        return d.innerHTML;
    }
    exports.sanitizeHTML = sanitizeHTML;
    function getParamsFromUrl(url) {
        var ret = {};
        // zuerst die Parameter suchen
        var parts = url.split("?");
        if (parts.length < 2) {
            return ret;
        }
        var paramsPart = parts[1];
        var paramsParts = paramsPart.split("&");
        paramsParts.forEach(function (part) {
            var pps = part.split("=");
            if (pps.length < 2) {
                ret[pps[0]] = "";
            }
            else {
                ret[pps[0]] = pps[1];
            }
        });
        return ret;
    }
    exports.getParamsFromUrl = getParamsFromUrl;
    // pfad ohne abschließenden /
    function joinUrlByParts(parts) {
        var myparts = [];
        parts.forEach(function (part) {
            myparts.push(u.unQuote(part, "/"));
        });
        return myparts.join("/");
    }
    exports.joinUrlByParts = joinUrlByParts;
    var IFRAME_OPEN_ID = "iframe_opturl";
    function loadUrlWithOutWindow(url) {
        // Iframe Suchen
        var iframe = window.document.getElementById(IFRAME_OPEN_ID);
        if (iframe == null) {
            iframe = window.document.createElement("iframe");
            iframe.setAttribute("id", IFRAME_OPEN_ID);
            document.body.appendChild(iframe);
            iframe.setAttribute("style", "display:none");
        }
        iframe.setAttribute("src", url);
    }
    exports.loadUrlWithOutWindow = loadUrlWithOutWindow;
    function runlater(fn, timeoutMs, args) {
        window.setTimeout(fn, timeoutMs, args);
    }
    exports.runlater = runlater;
    function dummyImport() {
        return false;
    }
    exports.dummyImport = dummyImport;
    var exportObj = {
        loadUrlWithOutWindow: loadUrlWithOutWindow
    };
    nsexp.exportNsObj("dkmlib", "browserUtil", exportObj);
});
//# sourceMappingURL=browserUtil.js.map