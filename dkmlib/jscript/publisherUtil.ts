/**
 * Created by michael on 15.06.2015.
 */
///<reference path="JScript.d.ts" />
///<reference path="jscriptUtil.ts" />
///<reference path="officeUtil.ts" />
import jscriptUtil = require("./jscriptUtil");
import officeUtil = require("./officeUtil");

export var PbFixedFormatType = {
    pbFixedFormatTypePDF :2,
    pbFixedFormatTypeXPS :1};

export function exportDoc2Pdf (doc, pdfFileName:string) {
//    doc.ExportAsFixedFormat (mspub.PbFixedFormatType.pbFixedFormatTypePDF , pdfFileName   );
    doc.ExportAsFixedFormat(PbFixedFormatType.pbFixedFormatTypePDF, pdfFileName);
}



//public static mspub.Document openDoc(mspub.Application app, string docPath)
export function openDoc(app, docPath:string):any{
//    return app.Open(docPath, false, false);
    return app.Open(docPath, false, false);
}


export function getOrOpenDoc(app:any,  docPath:string ):any
{
    return officeUtil.getOrOpenDoc(app, docPath,  {
        collDocs:app.Documents,
        fnOpenDoc:openDoc
    });
}



