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
//# sourceMappingURL=publisherUtil.js.map