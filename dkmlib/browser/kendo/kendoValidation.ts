import jqueryUtil = require("dkmlib/browser/jquery/jqueryUtil");
import kendoUtil = require("dkmlib/browser/kendo/kendoUtil");


export function getValidator(cssSel: string, valiOpts?:kendo.ui.ValidatorOptions): kendo.ui.Validator {
    jqueryUtil.checkCssSel(cssSel,"getValidator");
    return $(cssSel).kendoValidator(valiOpts).data(kendoUtil.WIDGET_TYPES.validator);        
} 

export function validate(cssSel: string, valiOpts?: kendo.ui.ValidatorOptions): boolean {
    return getValidator(cssSel, valiOpts).validate();
}

export function hideValidatorMessages(cssSel: string): void {
    getValidator(cssSel).hideMessages();
}