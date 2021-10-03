define(["require", "exports", "dkmlib/browser/kendo/kendoUtil"], function (require, exports, kendoUtil) {
    function showDlg(opts) {
        var rebuild = opts.rebuild || false;
        if ($(opts.cssDlgSel).length != 1) {
            throw new Error("showDlg : cssDlgSel \"" + opts.cssDlgSel + "\" liefert kein Dom-Object");
        }
        if ((opts.cache.kendoDlg != null) && (!rebuild)) {
            openDlgCentered(opts.cache.kendoDlg);
        }
        var dlgOpts = getModalDialogKendoOpts();
        dlgOpts.title = opts.dialogTitle;
        dlgOpts.width = opts.dialogWidth;
        dlgOpts.height = opts.dialogHeight;
        opts.cache.kendoDlg = createDlg(opts.cssDlgSel, dlgOpts);
        openDlgCentered(opts.cache.kendoDlg);
    }
    exports.showDlg = showDlg;
    function createDlg(cssSel, opts) {
        $(cssSel).kendoWindow(opts);
        return kendoUtil.findKendoWindow(cssSel);
    }
    exports.createDlg = createDlg;
    function openDlgCentered(dlg) {
        dlg.center().open();
    }
    exports.openDlgCentered = openDlgCentered;
    function getModalDialogKendoOpts() {
        return {
            //actions: {}, /*from Vlad's answer*/
            draggable: true,
            modal: true,
            resizable: false,
            visible: false /*don't show it yet*/
        };
    }
    exports.getModalDialogKendoOpts = getModalDialogKendoOpts;
});
//# sourceMappingURL=kendoDlgUtil.js.map