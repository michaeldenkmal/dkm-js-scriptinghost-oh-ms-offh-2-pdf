/// <reference path="./kendo-ui.d.ts"/>
import u = require("dkmlib/generic/u");
import modelUtil = require("dkmlib/generic/modelUtil");


export function findKendoWidget(cssSel: string, widgetTypeName: string) {
    return $(cssSel).data(widgetTypeName);
}

export function kendoWidgetExists(cssSel: string, widgetTypeName: string): boolean {
    return findKendoWidget(cssSel, widgetTypeName) != null;
}

export function findKendoComboBox(cssSel: string): kendo.ui.ComboBox {
    return <kendo.ui.ComboBox> findKendoWidget(cssSel, WIDGET_TYPES.combo);
}

export var WIDGET_TYPES = {
    combo: "kendoComboBox",
    grid: "kendoGrid",
    window: "kendoWindow",
    validator: "kendoValidator",
    kendoDropDownList: "kendoDropDownList"
}

export var VIEW_MODEL_EVENTS = {
    "change": "change",
    "get": "get",
    "set": "set"
}
export function findKendoGrid(cssSel: string): kendo.ui.Grid {
    return <kendo.ui.Grid> findKendoWidget(cssSel, WIDGET_TYPES.grid);
}

export function findKendoWindow(cssSel: string): kendo.ui.Window {
    return <kendo.ui.Window> findKendoWidget(cssSel, WIDGET_TYPES.window);
}

export function findKendoDropDownList(cssSel: string): kendo.ui.DropDownList {
    return <kendo.ui.DropDownList> findKendoWidget(cssSel, WIDGET_TYPES.kendoDropDownList);
}


export interface IFillVmbyPlainRowOpts {
    fieldNameMapping?: u.IStringMap;
    copyOnlyExistsProps?: boolean;
}

export function fillVMbyPlainRow(viewModel: kendo.data.ObservableObject, dataRow: Object, mapOfFields: Object, opts?:IFillVmbyPlainRowOpts): void {
    var opts = opts || {
        copyOnlyExistsProps:true
    };
    if ("undefined" == typeof opts.copyOnlyExistsProps) {
        opts.copyOnlyExistsProps = true;
    }

    Object.keys(mapOfFields).forEach((key) => {
        var skip: boolean = false;
        var dstKey = key;
        if ((opts) && (opts.fieldNameMapping)) {
            dstKey = opts.fieldNameMapping[key] || key;
        }

        if (!skip) {

            viewModel.set(dstKey, dataRow[key]);
        }
    });
}

export function copyFromVMToPlainRow(viewModel: kendo.data.ObservableObject, dataRow: Object,
    mapOfFields: Object, opts?: IFillVmbyPlainRowOpts): any {
    Object.keys(mapOfFields).forEach((key) => {
        var srcKey = key;
        if ((opts) && (opts.fieldNameMapping)) {
            srcKey = opts.fieldNameMapping[key] || key;
        }
        dataRow[key] = viewModel.get(srcKey);
    });
    return dataRow;
}


export function copyObjPropsToViewModel(obj: Object, viewModel: kendo.data.ObservableObject): void {
    var keys = Object.keys(obj);

    keys.forEach((key) => {
        viewModel.set(key, obj[key]);
    });
}

export function setKendoWidgetDropDownWidth( kendoWidget:any,width:number):void 
{
    kendoWidget.list.width(width);
}

export var GERMAN_DATE_FORMAT = "dd.MM.yyyy";
export var GERMAN_DATE_TIME_FORMAT = "dd.MM.yyyy HH:mm";
export function fmtDateWithKendo(vDate: Date): string {
    return kendo.toString(vDate, GERMAN_DATE_FORMAT);
}

export function fmtDateTimeWithKendo(vDate: Date): string {
    return kendo.toString(vDate, GERMAN_DATE_TIME_FORMAT);
}

export function getModelProp(model: any, prop: any): any {
    if ("function" == typeof model["get"]) {
        return model.get(prop);
    } else {
        return model[prop];
    }
}

export function setModelProp(model: any, prop: any, val:any): void {
    if ("function" == typeof model["set"]) {
        return model.set(prop,val);
    } else {
        return model.set(prop, val);
    }
}

export function setModelDirtyFlag(model: any, val: boolean) {
    model["dirty"] = val;
}

export function getModelDirtyFlag(model: any): boolean {
    return model["dirty"];
}

export function getFieldFromModelChangeEvt(e: any) {
    return e.field;
}

export function setGermanCulture() {
    kendo.culture("de-DE");
}

export function deleteRowFromModelArray<T>(modelArray: kendo.data.ObservableArray,
    fnFilter: (value: any, index: number) => boolean): void {
    var i = getRecIdxInViewModelArray(modelArray, fnFilter);
    if (i > -1) {
            modelArray.splice(i, 1);
            return;
    }
}


export function getRecIdxInViewModelArray(modelArray: kendo.data.ObservableArray,
    fnFilter: (value: any, index: number) => boolean): number {
    var i: number, l: number = modelArray.length;
    for (i = 0; i < l; i++) {
        var row = modelArray[i];
        if (fnFilter(row, i)) {
            return i;
        }
    }
    return -1;
}

export interface IUpsetRowInViewModelArrayOpts {
    modelArray: kendo.data.ObservableArray;
    rowToUpdate: Object;
    fieldNames?: string[];
    fnFilter: (value: any, index: number) => boolean;
}

export function upsertRowInViewModelArray(opts:IUpsetRowInViewModelArrayOpts): number {

    
    function copyValues(dst:any, fieldNames:string[]) {
        u.copyPropsByPropNames(opts.rowToUpdate, dst, fieldNames);
    }

    function evalFieldsToCopy(): string[]{
        if (opts.fieldNames) {
            return opts.fieldNames;
        }
        return Object.keys(opts.rowToUpdate);
    }

    function createNewRow() {
        var newRow = {};
        var fieldNames: string[];
        copyValues(newRow, evalFieldsToCopy());
        return newRow;
    }

    function insertRow():number {
        var newRow = createNewRow();
        return opts.modelArray.push(newRow);
    }

    function updateRow() {
        var fieldNames: string[];
        copyValues(opts.modelArray[recIdx], evalFieldsToCopy());
    }

    var recIdx = getRecIdxInViewModelArray(opts.modelArray, opts.fnFilter);
    if (recIdx = -1) {
        recIdx = insertRow();
    } else {
        updateRow();
    }
    return recIdx;
}
    