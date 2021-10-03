define(["require", "exports", "./kendoUtil"], function (require, exports, kendoUtil) {
    function genCheckBoxGridColTemplate(fieldName, readOnly) {
        // "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: fullyPaid' #= fullyPaid ? checked='checked' : '' #/>"
        // "#= foo ? 'yes' : 'no' #"
        return "#=" + fieldName + " ? 'ja':'nein'#";
    }
    exports.genCheckBoxGridColTemplate = genCheckBoxGridColTemplate;
    function buildBaseColDef(opts) {
        var ret = {
            field: opts.fieldName,
            title: opts.title || opts.fieldName
        };
        if (typeof opts.readOnly !== "undefined") {
            ret.attributes = {
                "class": opts.readOnly ? "readonly" : "editable"
            };
        }
        if (typeof opts.width !== "undefined") {
            ret.width = opts.width;
        }
        return ret;
    }
    function buildGridBooleanColDef(opts) {
        var ret = buildBaseColDef(opts);
        ret.template = genCheckBoxGridColTemplate(opts.fieldName, opts.readOnly || false);
        return ret;
    }
    exports.buildGridBooleanColDef = buildGridBooleanColDef;
    function buildGridStringColDef(opts) {
        var ret = buildBaseColDef(opts);
        return ret;
    }
    exports.buildGridStringColDef = buildGridStringColDef;
    function buildGridDateColDef(opts) {
        var ret = buildBaseColDef(opts);
        ret.format = '{0:' + kendoUtil.GERMAN_DATE_FORMAT + "}";
        return ret;
    }
    exports.buildGridDateColDef = buildGridDateColDef;
    function buildGridCurrencyColDef(opts) {
        var ret = buildBaseColDef(opts);
        return ret;
    }
    exports.buildGridCurrencyColDef = buildGridCurrencyColDef;
    function buildGridCustomCommand(title, szwidth, fnOnClick) {
        var opts = { command: { text: title, click: fnOnClick }, title: title, width: szwidth };
        return opts;
    }
    exports.buildGridCustomCommand = buildGridCustomCommand;
    function buildDataStringType() {
        return {
            type: "string"
        };
    }
    exports.buildDataStringType = buildDataStringType;
    function buildDataNumberType() {
        return {
            type: "number"
        };
    }
    exports.buildDataNumberType = buildDataNumberType;
    function buildDataDateType() {
        return {
            type: "Date"
        };
    }
    exports.buildDataDateType = buildDataDateType;
    function getDataItemFromCustGrdCmdEvt(thisContext, e) {
        var dataItem = thisContext.dataItem($(e.currentTarget).closest("tr"));
        return dataItem;
    }
    exports.getDataItemFromCustGrdCmdEvt = getDataItemFromCustGrdCmdEvt;
});
//# sourceMappingURL=kendoGridUtil.js.map