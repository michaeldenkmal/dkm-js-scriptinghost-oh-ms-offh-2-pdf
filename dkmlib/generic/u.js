/**
 * Created by michael on 15.06.2015.
 */
function isNullOrEmpty(s) {
    if (!s) {
        return true;
    }
    if (s == "") {
        return true;
    }
    return false;
}
exports.isNullOrEmpty = isNullOrEmpty;
function propExistsInObj(obj, propName, propValue) {
    var keys = Object.keys(obj);
    if (keys.indexOf(propName) < 0) {
        return false;
    }
    if (!propValue) {
        return true;
    }
    if (obj[propName] == propValue) {
        return true;
    }
    return false;
}
exports.propExistsInObj = propExistsInObj;
function findObjInArrByPropValue(arr, propName) {
    var i, l = arr.length;
    for (i = 0; i < l; i++) {
        var elem = arr[i];
        if (propExistsInObj(elem, propName)) {
            return elem;
        }
    }
    ;
    return null;
}
exports.findObjInArrByPropValue = findObjInArrByPropValue;
function fmt2DigitNum(n) {
    if (n < 10) {
        return "0" + n;
    }
    else {
        return "" + n;
    }
}
exports.fmt2DigitNum = fmt2DigitNum;
function copyPropsByPropNames(src, target, arrFieldNames) {
    arrFieldNames.forEach(function (fieldName) {
        target[fieldName] = src[fieldName];
    });
    return target;
}
exports.copyPropsByPropNames = copyPropsByPropNames;
function removeElemFromArr(arr, elem) {
    var i = arr.indexOf(elem);
    if (i > -1) {
        arr.splice(i, 1);
    }
    return arr;
}
exports.removeElemFromArr = removeElemFromArr;
function format2DigitNum(inum) {
    if (inum < 10) {
        return "0" + inum;
    }
    else {
        return "" + inum;
    }
}
exports.format2DigitNum = format2DigitNum;
;
function areObjsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
exports.areObjsEqual = areObjsEqual;
function isArray(data) {
    return (data instanceof Array);
}
exports.isArray = isArray;
function arrContains(arr, val) {
    return arr.indexOf(val) > -1;
}
exports.arrContains = arrContains;
function isDate(val) {
    return (val instanceof Date);
}
exports.isDate = isDate;
function unQuote(s, quote) {
    var ret = s;
    if (strStartsWith(ret, quote)) {
        ret = ret.substr(quote.length);
    }
    if (strEndsWith(ret, quote)) {
        ret = ret.substring(0, ret.length - quote.length);
    }
    return ret;
}
exports.unQuote = unQuote;
function strStartsWith(s, prefix) {
    if ((isNullOrEmpty(s)) || (isNullOrEmpty(prefix))) {
        return false;
    }
    return s.indexOf(prefix) == 0;
}
exports.strStartsWith = strStartsWith;
function strEndsWith(s, postFix) {
    if (isNullOrEmpty(s) || (isNullOrEmpty(postFix))) {
        return false;
    }
    if (s.length < postFix.length) {
        return false;
    }
    var istart, ilen;
    istart = s.length - postFix.length;
    ilen = s.length - istart;
    return s.substr(istart, ilen) == postFix;
}
exports.strEndsWith = strEndsWith;
function debugFmtObj(obj) {
    return JSON.stringify(obj, null, 4);
}
exports.debugFmtObj = debugFmtObj;
function isOnlyNumeric(s) {
    var s2 = s.replace(/\.|\,|\+|\-|e|E/g, '');
    var reg = /^\d+$/;
    return reg.test(s2);
}
exports.isOnlyNumeric = isOnlyNumeric;
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
exports.htmlEscape = htmlEscape;
function htmlUnescape(value) {
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}
exports.htmlUnescape = htmlUnescape;
//# sourceMappingURL=u.js.map