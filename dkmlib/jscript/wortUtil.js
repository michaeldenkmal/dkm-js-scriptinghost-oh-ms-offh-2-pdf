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
//# sourceMappingURL=wortUtil.js.map