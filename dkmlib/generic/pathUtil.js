/**
 * Created by michael on 15.06.2015.
 */
function extractFileExt(szFilePath) {
    var i = szFilePath.lastIndexOf(".");
    if (i > -1) {
        return szFilePath.substr(i + 1);
    }
    else {
        return "";
    }
}
exports.extractFileExt = extractFileExt;
;
//# sourceMappingURL=pathUtil.js.map