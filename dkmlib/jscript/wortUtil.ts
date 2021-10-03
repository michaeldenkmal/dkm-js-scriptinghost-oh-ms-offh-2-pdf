/**
 * Created by michael on 15.06.2015.
 */
///<reference path="JScript.d.ts" />
///<reference path="jscriptUtil.ts" />
///<reference path="officeUtil.ts" />
import jscriptUtil = require("./jscriptUtil");
import officeUtil = require("./officeUtil");

export var WdExportFormat = {
    wdExportFormatPDF:	17, //	Export document into PDF format.
    wdExportFormatXPS:	18 //	Export document into XML Paper Specification (XPS) format.
}

export function exportDoc2Pdf (doc, pdfFileName:string) {
//    doc.ExportAsFixedFormat (mspub.PbFixedFormatType.pbFixedFormatTypePDF , pdfFileName   );
    doc.ExportAsFixedFormat (pdfFileName, WdExportFormat.wdExportFormatPDF  );

}

//public static mspub.Document openDoc(mspub.Application app, string docPath)
export function openDoc(app, docPath:string):any{
//    return app.Open(docPath, false, false);
    return app.Documents.Open(docPath);
}


export function getOrOpenDoc(app:any,  docPath:string ):any
{
    return officeUtil.getOrOpenDoc(app, docPath,  {
        collDocs:app.Documents,
        fnOpenDoc:openDoc
    });
}



