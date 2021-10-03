/**
 * Created by michael on 15.06.2015.
 * Jscript Utility functions die nur mit jScript in Verbindung funktionieren
 */
///<reference path="JScript.d.ts" />
function iterOfficeEnum(enumVar, fnOnItemFound) {
    var enumerator = new Enumerator(enumVar);
    for (; !enumerator.atEnd(); enumerator.moveNext()) {
        if (!fnOnItemFound(enumerator.item())) {
            return;
        }
    }
}
exports.iterOfficeEnum = iterOfficeEnum;
//# sourceMappingURL=jscriptUtil.js.map