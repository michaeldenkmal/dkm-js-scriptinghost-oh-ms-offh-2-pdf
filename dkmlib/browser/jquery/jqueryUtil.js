///  reference path="D:\projekte\ts\dkmlib\dkmlib\browser\jquery\jquery.d.ts" />
define(["require", "exports"], function (require, exports) {
    function cssSelExists(cssSel) {
        return $(cssSel).length > 0;
    }
    exports.cssSelExists = cssSelExists;
    function disableJElem(jelem) {
        jelem.attr("disabled", "disabled");
    }
    exports.disableJElem = disableJElem;
    function enableJElem(jelem) {
        jelem.removeAttr("disabled");
    }
    exports.enableJElem = enableJElem;
    function disableKeyboardReadOnlyInput() {
        $("input[readonly]").keydown(function (e) {
            e.preventDefault();
        });
    }
    exports.disableKeyboardReadOnlyInput = disableKeyboardReadOnlyInput;
    function checkCssSel(cssSel, purpose) {
        if (!cssSelExists(cssSel)) {
            throw new Error("checkCssSel \"" + cssSel + "\" existiert nicht, purpose:" + purpose + "\"");
        }
    }
    exports.checkCssSel = checkCssSel;
});
//# sourceMappingURL=jqueryUtil.js.map