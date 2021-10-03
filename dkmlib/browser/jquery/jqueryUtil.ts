///  reference path="D:\projekte\ts\dkmlib\dkmlib\browser\jquery\jquery.d.ts" />

export function cssSelExists(cssSel: string): boolean {
    return $(cssSel).length > 0;
}

export function disableJElem(jelem: JQuery): void {
    jelem.attr("disabled", "disabled");
}

export function enableJElem(jelem: JQuery): void {
    jelem.removeAttr("disabled");
}

export function disableKeyboardReadOnlyInput() {
    $("input[readonly]").keydown(function (e) {
        e.preventDefault();
    });
}

export function checkCssSel(cssSel: string, purpose:string): void {
    if (!cssSelExists(cssSel)) {
        throw new Error(`checkCssSel "${cssSel}" existiert nicht, purpose:${purpose}"`);
    }
}