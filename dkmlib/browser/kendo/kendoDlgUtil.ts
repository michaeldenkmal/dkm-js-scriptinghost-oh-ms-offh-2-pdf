import kendoUtil = require("dkmlib/browser/kendo/kendoUtil");
///http://stackoverflow.com/questions/16367978/how-to-force-a-kendo-ui-modal-window-to-center-in-a-page-and-how-to-disable-all
export interface IShowDlgCache {
    kendoDlg:kendo.ui.Window
}

export interface IShowDlg {
    cache: IShowDlgCache;
    cssDlgSel: string;
    dialogTitle: string;
    dialogWidth?: string;
    dialogHeight?: string;
    rebuild?: boolean;
}

export function showDlg(opts: IShowDlg): void {
    var rebuild = opts.rebuild || false;

    if ($(opts.cssDlgSel).length != 1) {
        throw new Error(`showDlg : cssDlgSel "${opts.cssDlgSel}" liefert kein Dom-Object`);
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

export function createDlg(cssSel:string, opts: kendo.ui.WindowOptions): kendo.ui.Window {
    $(cssSel).kendoWindow(opts);
    return kendoUtil.findKendoWindow(cssSel);
}

export function openDlgCentered(dlg: kendo.ui.Window): void {
    dlg.center().open();
}

export function getModalDialogKendoOpts(): kendo.ui.WindowOptions {
    return {
        //actions: {}, /*from Vlad's answer*/
        draggable: true,
        modal: true,
        resizable: false,
        visible: false /*don't show it yet*/
    };
}