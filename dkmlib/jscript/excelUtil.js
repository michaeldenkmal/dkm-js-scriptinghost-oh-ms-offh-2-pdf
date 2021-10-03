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
//# sourceMappingURL=excelUtil.js.map