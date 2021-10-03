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
//# sourceMappingURL=powerpointUtil.js.map