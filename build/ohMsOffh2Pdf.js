(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by michael on 15.06.2015.
 */
function extractFileExt(szFilePath) {
    var i = szFilePath.lastIndexOf(".");
    if (i > -1) {
        return szFilePath.substr(i + 1);
    }
    else {
        return "";
    }
}
exports.extractFileExt = extractFileExt;
;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var officeUtil = require("./officeUtil");
exports.XlFixedFormatType = {
    xlTypePDF: 0,
    xlTypeXPS: 1
};
function exportDoc2Pdf(doc, pdfFileName) {
    doc.ExportAsFixedFormat(exports.XlFixedFormatType.xlTypePDF, pdfFileName);
}
exports.exportDoc2Pdf = exportDoc2Pdf;
function openDoc(app, docPath) {
    return app.WorkBooks.Open(docPath);
}
exports.openDoc = openDoc;
function getOrOpenDoc(app, docPath) {
    return officeUtil.getOrOpenDoc(app, docPath, {
        collDocs: app.WorkBooks,
        fnOpenDoc: openDoc
    });
}
exports.getOrOpenDoc = getOrOpenDoc;

},{"./officeUtil":5}],4:[function(require,module,exports){
/**
 * Created by michael on 15.06.2015.
 * Jscript Utility functions die nur mit jScript in Verbindung funktionieren
 */
///<reference path="JScript.d.ts" />
function iterOfficeEnum(enumVar, fnOnItemFound) {
    var enumerator = new Enumerator(enumVar);
    for (; !enumerator.atEnd(); enumerator.moveNext()) {
        if (!fnOnItemFound(enumerator.item())) {
            return;
        }
    }
}
exports.iterOfficeEnum = iterOfficeEnum;

},{}],5:[function(require,module,exports){
///<reference path="jscriptUtil.ts" />
///<reference path="JScript.d.ts" />
var jscriptUtil = require("./jscriptUtil");
function _exportDoc2Pdf(doc, pdfFileName, fmt) {
    doc.ExportAsFixedFormat(fmt, pdfFileName);
}
exports._exportDoc2Pdf = _exportDoc2Pdf;
function getOrOpenDoc(app, docPath, opts) {
    var doc = getDocByDocPath(docPath, opts.collDocs);
    if (doc == null) {
        return opts.fnOpenDoc(app, docPath);
    }
    return doc;
}
exports.getOrOpenDoc = getOrOpenDoc;
function getDocByDocPath(docPath, collDocs) {
    var foundDoc = null;
    jscriptUtil.iterOfficeEnum(collDocs, function (adoc) {
        if (adoc.FullName == docPath) {
            foundDoc = adoc;
            return false;
        }
        return true;
    });
    return foundDoc;
}
exports.getDocByDocPath = getDocByDocPath;
function getComAppServer(comSrvStr) {
    var app = null;
    try {
        app = GetObject(comSrvStr);
    }
    catch (e) {
        try {
            app = new ActiveXObject(comSrvStr);
        }
        catch (e) {
            throw new Error("comSrvStr=" + comSrvStr + ":" + e);
        }
    }
    return app;
}
exports.getComAppServer = getComAppServer;

},{"./jscriptUtil":4}],6:[function(require,module,exports){
var officeUtil = require("./officeUtil");
exports.PpFixedFormatType = {
    ppFixedFormatTypePDF: 2,
    ppFixedFormatTypeXPS: 1
};
exports.PpFixedFormatIntent = {
    ppFixedFormatIntentPrint: 2,
    ppFixedFormatIntentScreen: 1
};
exports.PpPrintHandoutOrder = {
    ppPrintHandoutHorizontalFirst: 2,
    ppPrintHandoutVerticalFirst: 1
};
exports.PpPrintOutputType = {
    ppPrintOutputBuildSlides: 7,
    ppPrintOutputFourSlideHandouts: 8,
    ppPrintOutputNineSlideHandouts: 9,
    ppPrintOutputNotesPages: 5,
    ppPrintOutputOneSlideHandouts: 10,
    ppPrintOutputOutline: 6,
    ppPrintOutputSixSlideHandouts: 4,
    ppPrintOutputSlides: 1,
    ppPrintOutputThreeSlideHandouts: 3,
    ppPrintOutputTwoSlideHandouts: 2
};
exports.PpPrintRangeType = {
    ppPrintAll: 1,
    ppPrintCurrent: 3,
    ppPrintNamedSlideShow: 5,
    ppPrintSelection: 2,
    ppPrintSlideRange: 4
};
function exportDoc2Pdf(doc, pdfFileName) {
    doc.SaveAs(pdfFileName, 32);
}
exports.exportDoc2Pdf = exportDoc2Pdf;
function openDoc(app, docPath) {
    return app.Presentations.Open(docPath);
}
exports.openDoc = openDoc;
function getOrOpenDoc(app, docPath) {
    return officeUtil.getOrOpenDoc(app, docPath, {
        collDocs: app.Presentations,
        fnOpenDoc: openDoc
    });
}
exports.getOrOpenDoc = getOrOpenDoc;

},{"./officeUtil":5}],7:[function(require,module,exports){
var officeUtil = require("./officeUtil");
exports.PbFixedFormatType = {
    pbFixedFormatTypePDF: 2,
    pbFixedFormatTypeXPS: 1 };
function exportDoc2Pdf(doc, pdfFileName) {
    doc.ExportAsFixedFormat(exports.PbFixedFormatType.pbFixedFormatTypePDF, pdfFileName);
}
exports.exportDoc2Pdf = exportDoc2Pdf;
function openDoc(app, docPath) {
    return app.Open(docPath, false, false);
}
exports.openDoc = openDoc;
function getOrOpenDoc(app, docPath) {
    return officeUtil.getOrOpenDoc(app, docPath, {
        collDocs: app.Documents,
        fnOpenDoc: openDoc
    });
}
exports.getOrOpenDoc = getOrOpenDoc;

},{"./officeUtil":5}],8:[function(require,module,exports){
var officeUtil = require("./officeUtil");
exports.WdExportFormat = {
    wdExportFormatPDF: 17,
    wdExportFormatXPS: 18
};
function exportDoc2Pdf(doc, pdfFileName) {
    doc.ExportAsFixedFormat(pdfFileName, exports.WdExportFormat.wdExportFormatPDF);
}
exports.exportDoc2Pdf = exportDoc2Pdf;
function openDoc(app, docPath) {
    return app.Documents.Open(docPath);
}
exports.openDoc = openDoc;
function getOrOpenDoc(app, docPath) {
    return officeUtil.getOrOpenDoc(app, docPath, {
        collDocs: app.Documents,
        fnOpenDoc: openDoc
    });
}
exports.getOrOpenDoc = getOrOpenDoc;

},{"./officeUtil":5}],9:[function(require,module,exports){
/**
 * Created by michael on 15.06.2015.
 */
/// <reference path="dkmlib/jscript/JScript.d.ts" />
/// <reference path="dkmlib/jscript/publisherUtil.ts" />
/// <reference path="dkmlib/generic/pathUtil.ts" />
/// <reference path="dkmlib/generic/u.ts" />
var publisherUtil = require("./dkmlib/jscript/publisherUtil");
var wordUtil = require("./dkmlib/jscript/wortUtil");
var pathUtil = require("./dkmlib/generic/pathUtil");
var excelUtil = require("./dkmlib/jscript/excelUtil");
var powerpointUtil = require("./dkmlib/jscript/powerpointUtil");
var officeUtil = require("./dkmlib/jscript/officeUtil");
var u = require("./dkmlib/generic/u");
var APP_STRS = {
    word: "Word.Application",
    excel: "Excel.Application",
    powerpoint: "Powerpoint.Application",
    publisher: "Publisher.Application"
};
var APP_CONV_FUNC = {};
function wordConverter(fileIn, pdfFilePath) {
    var app = officeUtil.getComAppServer(APP_STRS.word);
    var doc = wordUtil.getOrOpenDoc(app, fileIn);
    wordUtil.exportDoc2Pdf(doc, pdfFilePath);
    doc.close();
    app.quit();
    app = null;
}
APP_CONV_FUNC[APP_STRS.word] = { convert: wordConverter };
function excelConverter(fileIn, pdfFilePath) {
    var app = officeUtil.getComAppServer(APP_STRS.excel);
    var doc = excelUtil.getOrOpenDoc(app, fileIn);
    excelUtil.exportDoc2Pdf(doc, pdfFilePath);
    doc.close(false);
    app.quit();
    app = null;
}
APP_CONV_FUNC[APP_STRS.excel] = { convert: excelConverter };
function powerpointConverter(fileIn, pdfFilePath) {
    var app = new ActiveXObject(APP_STRS.powerpoint);
    var doc = powerpointUtil.getOrOpenDoc(app, fileIn);
    powerpointUtil.exportDoc2Pdf(doc, pdfFilePath);
    doc.close();
    app.quit();
    app = null;
}
APP_CONV_FUNC[APP_STRS.powerpoint] = { convert: powerpointConverter };
function publisherConverter(fileIn, pdfFilePath) {
    var pubApp = new ActiveXObject(APP_STRS.publisher);
    var doc = publisherUtil.getOrOpenDoc(pubApp, fileIn);
    publisherUtil.exportDoc2Pdf(doc, pdfFilePath);
    doc.close();
    pubApp.quit();
    pubApp = null;
}
APP_CONV_FUNC[APP_STRS.publisher] = { convert: publisherConverter };
var EXT_2_COMAPP = {
    "docx": APP_STRS.word,
    "doc": APP_STRS.word,
    "docm": APP_STRS.word,
    "dot": APP_STRS.word,
    "dotx": APP_STRS.word,
    "dotm": APP_STRS.word,
    "xls": APP_STRS.excel,
    "xlsx": APP_STRS.excel,
    "xlsm": APP_STRS.excel,
    "xlt": APP_STRS.excel,
    "xltx": APP_STRS.excel,
    "xltm": APP_STRS.excel,
    "ppt": APP_STRS.powerpoint,
    "pot": APP_STRS.powerpoint,
    "pptx": APP_STRS.powerpoint,
    "pptm": APP_STRS.powerpoint,
    "pub": APP_STRS.publisher
};
function getComAppStr4ext(ext) {
    return EXT_2_COMAPP[ext.toLowerCase()];
}
function doc2Pdf(doc, pdf) {
    var ext = pathUtil.extractFileExt(doc);
    if (u.isNullOrEmpty(ext)) {
        return "unknown-ext:keine Extension angegeben";
    }
    var appStr = getComAppStr4ext(ext);
    if (u.isNullOrEmpty(appStr)) {
        return "unknown-ext: Keine Office Application f�r ext:" + ext + " gefunden";
    }
    var convert = APP_CONV_FUNC[appStr];
    if (!convert) {
        return "Konnte keine Konverter f�r appStr:" + appStr + " finden";
    }
    convert.convert(doc, pdf);
    return "";
}
function syntax() {
    WScript.Echo("ohMsOffh2Pdf msOfficeFileName pdfFIleName");
}
function cmdLine2Opts() {
    if (WScript.Arguments.length < 2) {
        syntax();
        return;
    }
    var fileName = WScript.Arguments.Item(0);
    var pdfFileName = WScript.Arguments.Item(1);
    return {
        fileName: fileName,
        pdfFileName: pdfFileName
    };
}
function exec(opts) {
    var errstr = doc2Pdf(opts.fileName, opts.pdfFileName);
    if (!u.isNullOrEmpty(errstr)) {
        WScript.Echo("Error:" + errstr);
    }
}
exec(cmdLine2Opts());

},{"./dkmlib/generic/pathUtil":1,"./dkmlib/generic/u":2,"./dkmlib/jscript/excelUtil":3,"./dkmlib/jscript/officeUtil":5,"./dkmlib/jscript/powerpointUtil":6,"./dkmlib/jscript/publisherUtil":7,"./dkmlib/jscript/wortUtil":8}]},{},[9]);
