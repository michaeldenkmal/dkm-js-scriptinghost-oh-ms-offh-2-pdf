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
        return "unknown-ext: Keine Office Application f???r ext:" + ext + " gefunden";
    }
    var convert = APP_CONV_FUNC[appStr];
    if (!convert) {
        return "Konnte keine Konverter f???r appStr:" + appStr + " finden";
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
//# sourceMappingURL=ohMsOffh2Pdf.js.map