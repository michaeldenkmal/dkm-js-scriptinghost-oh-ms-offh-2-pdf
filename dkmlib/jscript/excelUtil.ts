/**
 * Created by michael on 15.06.2015.
 */
///<reference path="JScript.d.ts" />
///<reference path="jscriptUtil.ts" />
///<reference path="officeUtil.ts" />
import jscriptUtil = require("./jscriptUtil");
import officeUtil = require("./officeUtil");

export var XlFixedFormatType = {
    xlTypePDF:0,//	"PDF" — Portable Document Format file (.pdf).
    xlTypeXPS:1 //	"XPS" — XPS Document (.xps).
};

export function exportDoc2Pdf (doc, pdfFileName:string) {
//    doc.ExportAsFixedFormat (mspub.PbFixedFormatType.pbFixedFormatTypePDF , pdfFileName   );
    // expression.ExportAsFixedFormat(Type, Filename, Quality, IncludeDocProperties, IgnorePrintAreas, From, To, OpenAfterPublish, FixedFormatExtClassPtr)
    doc.ExportAsFixedFormat ( XlFixedFormatType.xlTypePDF, pdfFileName  );
}

//public static mspub.Document openDoc(mspub.Application app, string docPath)
export function openDoc(app, docPath:string):any{
//    return app.Open(docPath, false, false);
    return app.WorkBooks.Open(docPath);
}


export function getOrOpenDoc(app:any,  docPath:string ):any
{
    return officeUtil.getOrOpenDoc(app, docPath,  {
        collDocs:app.WorkBooks,
        fnOpenDoc:openDoc
    });
}



