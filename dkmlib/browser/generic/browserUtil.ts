import u = require ("dkmlib/generic/u");
import nsexp = require("dkmlib/browser/generic/nsexp");

export function getSourceIdFromEvent(evt) {
    var elem = getCallingElem(evt);
    if (elem == null) {
        return null;
    }
    return getAttrId(elem);
}
export function getCallingElem(evt) {
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
export function getButtonFromEvent(evt, classNameOfButton) {
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
export function getAttr(elem, attrName) {
    return elem.getAttribute(attrName);
}
export function getAttrId(elem) {
    return getAttr(elem, "id");
}
export function isHtmlElemDisabled(elem) {
    if (elem.getAttribute("disabled") == "disabled") {
        return true;
    }
    return false;
}

export function disableSpellCheck(idOfEditor: string) {
    var editor = document.getElementById(idOfEditor);
    editor.spellcheck = false;
    editor.focus();
    editor.blur();
}

export class TSaveJsonConvertResult {
    dataObj: any;
    error_msg: string;
    json: string;
    error_found: boolean;

    getFirst80CharsOfJson: () => string = () => {
        return this.json.substr(0, 80);
    }

    throwErr: () => void = () => {
        console.log(`err_msg=${this.error_msg}, json=${this.json}`);
        throw new Error(`err_msg=${this.error_msg}, json=${this.getFirst80CharsOfJson()}`);
    }

    throwIfError: () => void = ()=> {
        if (this.error_found) {
            this.throwErr();
        }
    }
}

export function saveConvertJson(json: string, throwOnError?:boolean): TSaveJsonConvertResult {
    var ret: TSaveJsonConvertResult = new TSaveJsonConvertResult();
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

export function buildUrlParam(pName: string, pValue: string): string {
    return pName + "=" + encodeURIComponent(pValue);
}


export function buildUrlParams(urlParams: u.IStringMap) {
    var keys = Object.keys(urlParams);
    var arrParams = [];

    keys.forEach((key) => {
        arrParams.push(buildUrlParam(key, urlParams[key]));
    });
    return arrParams.join("&");
}

export function buildUrl(urlWithOutParams: string, urlParams: u.IStringMap): string {
    return urlWithOutParams + "?" + buildUrlParams(urlParams);
}


/*
 * liefert immer den ersten pfad nach der Host angabe
 */

export interface IEvalFullContextResult {
    hostPreFix: string;
    fullContextPath: string;
}

export function evalFullContextPath(contextName:string): IEvalFullContextResult {

    var href = window.document.location.href;
    //http://localhost:8084/dkmMVC/gawebfiles/vertrauswert/vertrauswert/vertrauswert.html
    //-> 
    //http://localhost:8084/dkmMVC

    // Zuerst nach gawebfiles in den Teilen suchen und die Restlichen zusammensetzen
    var parts: string[] = href.split("/");
    var partLen = parts.length;
    var part: string;
    var partsHostPrefix:string[]=[];
    var i = 0;

    for (i = 0; i < partLen; i++) {
        part = parts[i];
        if (part == contextName) {
            break;
        }
        partsHostPrefix.push(part);
    }
    var hostPreFix: string = partsHostPrefix.join("/");
    var fullContextPath: string = hostPreFix + "/" + contextName;
    return {
        hostPreFix: hostPreFix,
        fullContextPath: fullContextPath
    };
}

export function sanitizeHTML(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
}



export function getParamsFromUrl(url: string): u.IStringMap {
    var ret: u.IStringMap = {};

    // zuerst die Parameter suchen
    var parts = url.split("?");
    if (parts.length < 2) {
        return ret;
    }
    var paramsPart = parts[1];
    var paramsParts = paramsPart.split("&");
    paramsParts.forEach((part) => {
        var pps = part.split("=");
        if (pps.length < 2) {
            ret[pps[0]] = "";
        } else {
            ret[pps[0]] = pps[1];
        }
    });

    return ret;
}

// pfad ohne abschließenden /
export function joinUrlByParts(parts: string[]): string {
    var myparts: string[] = [];
    parts.forEach((part) => {
        myparts.push(u.unQuote(part, "/"));
    });
    return myparts.join("/");
}

var IFRAME_OPEN_ID = "iframe_opturl";

export function loadUrlWithOutWindow(url: string) {
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

export function runlater(fn: () => void, timeoutMs: number, args?:any) {
    window.setTimeout(fn, timeoutMs,args);
}

export function dummyImport() {
    return false;
}

var exportObj = {
    loadUrlWithOutWindow: loadUrlWithOutWindow
}

nsexp.exportNsObj("dkmlib", "browserUtil", exportObj);