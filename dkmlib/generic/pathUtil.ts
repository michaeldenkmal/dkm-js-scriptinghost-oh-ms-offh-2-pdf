/**
 * Created by michael on 15.06.2015.
 */

/**
 * liefert die Erweiterung OHNE punkt
 * @param szFilePath
 * @returns {string}
 */
export function extractFileExt (szFilePath:string):string {
    var i = szFilePath.lastIndexOf(".");
    if ( i> -1) {
        return szFilePath.substr(i+1);
    }   else {
        return "";
    }
};
