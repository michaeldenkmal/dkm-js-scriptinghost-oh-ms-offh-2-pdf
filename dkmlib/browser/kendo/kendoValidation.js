define(["require", "exports", "dkmlib/browser/jquery/jqueryUtil", "dkmlib/browser/kendo/kendoUtil"], function (require, exports, jqueryUtil, kendoUtil) {
    function getValidator(cssSel, valiOpts) {
        jqueryUtil.checkCssSel(cssSel, "getValidator");
        return $(cssSel).kendoValidator(valiOpts).data(kendoUtil.WIDGET_TYPES.validator);
    }
    exports.getValidator = getValidator;
    function validate(cssSel, valiOpts) {
        return getValidator(cssSel, valiOpts).validate();
    }
    exports.validate = validate;
    function hideValidatorMessages(cssSel) {
        getValidator(cssSel).hideMessages();
    }
    exports.hideValidatorMessages = hideValidatorMessages;
});
//# sourceMappingURL=kendoValidation.js.map