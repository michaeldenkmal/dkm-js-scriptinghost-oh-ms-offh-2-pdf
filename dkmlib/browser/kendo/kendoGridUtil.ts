/// reference path="D:\Officeh\ts\ohlib\dkmlib\browser\kendo\kendo-ui.d.ts">
import kendoUtil = require("./kendoUtil");

export function genCheckBoxGridColTemplate(fieldName: string, readOnly: boolean) {
    // "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: fullyPaid' #= fullyPaid ? checked='checked' : '' #/>"
    // "#= foo ? 'yes' : 'no' #"
    return "#=" + fieldName + " ? 'ja':'nein'#";

}

export interface IGridColDefOpts {
    fieldName: string;
    title?: string;
    readOnly?: boolean;
    width?: string
}


function buildBaseColDef(opts: IGridColDefOpts): kendo.ui.GridColumn {
    var ret: kendo.ui.GridColumn = {
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

export function buildGridBooleanColDef(opts:IGridColDefOpts ): kendo.ui.GridColumn {
    var ret: kendo.ui.GridColumn = buildBaseColDef(opts);
    ret.template = genCheckBoxGridColTemplate(opts.fieldName, opts.readOnly || false);
    return ret;
}

export function buildGridStringColDef(opts:IGridColDefOpts): kendo.ui.GridColumn {
    var ret: kendo.ui.GridColumn = buildBaseColDef(opts);
    return ret;
}


export function buildGridDateColDef(opts: IGridColDefOpts): kendo.ui.GridColumn {
    var ret: kendo.ui.GridColumn = buildBaseColDef(opts);
    ret.format = '{0:' + kendoUtil.GERMAN_DATE_FORMAT + "}";
    return ret;
}

export function buildGridCurrencyColDef(opts: IGridColDefOpts): kendo.ui.GridColumn {
    var ret: kendo.ui.GridColumn = buildBaseColDef(opts);
    return ret;
}



export function buildGridCustomCommand(title: string, szwidth: string, fnOnClick: (e) => void): kendo.ui.GridColumn {
    var opts: any = { command: { text: title, click: fnOnClick }, title: title, width: szwidth };
    return <kendo.ui.GridColumn> opts;
}

export function buildDataStringType() {
    return {
        type: "string"
    }
}
export function buildDataNumberType() {
    return {
        type: "number"
    }
}
export function buildDataDateType() {
    return {
        type: "Date"
    }
}

export function getDataItemFromCustGrdCmdEvt(thisContext:any,e: any) {
    var dataItem = thisContext.dataItem($(e.currentTarget).closest("tr"));
    return dataItem;
}

