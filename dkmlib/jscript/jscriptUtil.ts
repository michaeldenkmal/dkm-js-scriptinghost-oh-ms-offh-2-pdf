/**
 * Created by michael on 15.06.2015.
 * Jscript Utility functions die nur mit jScript in Verbindung funktionieren
 */
///<reference path="JScript.d.ts" />

export function iterOfficeEnum(enumVar:any, fnOnItemFound:(item_any)=>boolean) {
    var enumerator = new Enumerator(enumVar);
    for (;!enumerator.atEnd();enumerator.moveNext()) {
        if (!fnOnItemFound(enumerator.item())) {
            return;
        }
    }
}

