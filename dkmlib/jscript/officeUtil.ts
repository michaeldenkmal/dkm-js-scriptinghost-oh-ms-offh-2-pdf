/**
 * Created by michael on 15.06.2015.
 */
///<reference path="jscriptUtil.ts" />
///<reference path="JScript.d.ts" />
import jscriptUtil = require("./jscriptUtil");


// https://msdn.microsoft.com/en-us/library/office/ff939864%28v=office.15%29.aspx
//public static void exportDoc2Pdf (mspub.Document doc, string pdfFileName) {
export function _exportDoc2Pdf (doc, pdfFileName:string, fmt:number) {
//    doc.ExportAsFixedFormat (mspub.PbFixedFormatType.pbFixedFormatTypePDF , pdfFileName   );
    doc.ExportAsFixedFormat (fmt , pdfFileName   );
}

export interface IGetOrOpenDocOpts {
    collDocs:any;
    fnOpenDoc:(app:any, docPath:string)=>any;
}

//public static mspub.Document getOrOpenDoc(mspub.Application app, string docPath)
export function getOrOpenDoc(app:any,  docPath:string , opts:IGetOrOpenDocOpts):any
{
    var doc = getDocByDocPath(docPath, opts.collDocs);
    if (doc == null)
    {
        return opts.fnOpenDoc(app, docPath);
    }
    return doc;
}


/**
 *
 * @param docPath
 * @param collDocs zb app.Documents, app.Workbooks
 * @returns {null}
 */
export function getDocByDocPath(docPath:string , collDocs:any):any {
    var foundDoc=null;
    jscriptUtil.iterOfficeEnum(collDocs, (adoc) => {
        if (adoc.FullName == docPath) {
            foundDoc = adoc;
            return false;
        }
        return true;
    });
    return foundDoc;
}

export function getComAppServer (comSrvStr:string):any {
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