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
//# sourceMappingURL=officeUtil.js.map