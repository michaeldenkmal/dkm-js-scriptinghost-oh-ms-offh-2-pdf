/// <reference path="./jquery.d.ts" />
import u = require("dkmlib/generic/u");
import jerseyUtil = require("dkmlib/generic/jerseyUtil");
import dkmErrUtil = require("dkmlib/generic/dkmErrUtil");
import modelUtil = require("dkmlib/generic/modelUtil");

export interface IAjaxLoadOpts {
    websrvcbase?: string;
    fnAfterFetch: (arrOfData, cbData) => void;
    customCbData?: any;/*Daten , die mit fnAfterFache zurückgegeben werden, aber nur wenn nicht null*/
    loadIndicatorId?: string;
    loadingReadyText?: string;
    loadingReadyClass?: string;
    loadingText?: string;
    loadingClass?: string;
    fnShowLoadIndicator?: (loadIndicatorId: string) => void;
    fnHideLoadIndicator?: (loadIndicatorId: string) => void;
}


export class AjaxLoad {
    Opts: IAjaxLoadOpts;
    static createStdOpts(): IAjaxLoadOpts {
        return {
            //http://localhost:8084/tomcatCustFilter/webresources/gp/getBySuchbegriff/mi?user=michael
            websrvcbase: null,
            /**
             * @type {function(arr,cbData)}
             */
            fnAfterFetch: null, /*callback function after load signature function(arrOfData,cbData)*/
            customCbData: null, /*Daten , die mit fnAfterFache zurückgegeben werden, aber nur wenn nicht null*/
            loadIndicatorId: "loadIndicator",
            loadingReadyText: "ready",
            loadingReadyClass: "ready",
            loadingText: "loading...",
            loadingClass: "loading",
            setLoadingFlag: function (isLoading) {
                window["dkmIsLoading"] = isLoading;
            },
            fnShowLoadIndicator: function () {
                this.setLoadingFlag(true);
                var jIndicator = $("#" + this.loadIndicatorId);
                if (jIndicator.length == 0) {
                    return;
                }
                jIndicator.text(this.loadingText);
                jIndicator.removeClass(this.loadingReadyClass);
                jIndicator.addClass(this.loadingClass);
            },
            fnHideLoadIndicator: function () {
                this.setLoadingFlag(false);
                var jIndicator = $("#" + this.loadIndicatorId);
                if (jIndicator.length != 0) {
                    jIndicator.text(this.loadingReadyText);
                    jIndicator.removeClass(this.loadingClass);
                    jIndicator.addClass(this.loadingReadyClass);
                }
            }
        }

    }

    static createOptsWithCb(fnAfterfetch:(arrOfData, cbData) => void) {
        var ret: IAjaxLoadOpts = AjaxLoad.createStdOpts();
        ret.fnAfterFetch = fnAfterfetch;
        return ret;
    }


    static execGet(url:string, opts:IAjaxLoadOpts):void {
        opts.fnShowLoadIndicator(opts.loadIndicatorId);
        $.ajax(
            {
                type: "GET",
                cache: false,
                url: url,
                error: function (jqXHR, textStatus, errorThrown) {
                    AjaxLoad.throwSrvcErr(jqXHR, textStatus, errorThrown, url);
                }
            }
            ).done(function (data) {
            opts.fnHideLoadIndicator(opts.loadIndicatorId);
            opts.fnAfterFetch(data, opts.customCbData);
        });
    }
    /**
     *
     * @param jqXHR
     * @param textStatus
     * @param errorThrown
     * @param {string} url
     * @param {string} jsonData
     */
    static throwSrvcErr = function (jqXHR:JQueryXHR, textStatus:string, errorThrown:string, url:string, jsonData?:string) {
        var responseText = jqXHR.responseText;
        var msg = "url=" + url + " responseText=" + responseText + " status:" + textStatus + " errorThrown:" + errorThrown;
        if (jsonData) {
            msg = msg + " jsonData=" + jsonData;
        }
        alert(msg);
        throw msg;
    };


    /**
     *
     * @param {String } url
     * @param {String} jsonData muss schon in Json Codiert sein
     * @param {Object} opts
     */
    static execJsonPost = function (url:string, jsonData:string, opts:IAjaxLoadOpts) {
        opts.fnShowLoadIndicator(opts.loadIndicatorId);
        $.ajax(
            {
                type: "POST",
                cache: false,
                data: jsonData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: url,
                error: function (jqXHR, textStatus, errorThrown) {
                    AjaxLoad.throwSrvcErr(jqXHR, textStatus, errorThrown, url, jsonData);
                }
            }
            ).done(function (data) {
            opts.fnHideLoadIndicator(opts.loadIndicatorId);
            opts.fnAfterFetch(data, opts.customCbData);
        });

    };


};


function jerseyFixData(data: any, dateFields:string[]) {
    if (u.isArray(data)) {
        jerseyUtil.fixJsonDateTimeArr(dateFields, data);
    } else {
        jerseyUtil.fixJsonDateTime(dateFields, data);
    }
}


export interface IExecGetOpts {
    prepareForClient: (serverData: any) => any;
}


export function execGet(url: string, getOpts: IExecGetOpts, fnAfter: (data: any) => void) {
    var opts: IAjaxLoadOpts = AjaxLoad.createOptsWithCb(
        (data, cbData) => {
            if (getOpts) {
                var clientData = getOpts.prepareForClient(data);
            } else {
                clientData = data;
            }
            fnAfter(clientData);
        }
        );
    AjaxLoad.execGet(url, opts);
}


export interface IExecPostOpts {
    prepareForServer: (clientData: any) => any;
    prepareForClient: (serverData: any) => any;
    fnOnError?: (error: any) => boolean;
}

function isSaveResult(obj: any) {
    if ((u.propExistsInObj(obj, "error")) && (u.propExistsInObj(obj, "row"))) {
        return true;
    }
    return false;
}

function isSaveDataResultArr(data: any): boolean {
    if (u.isArray(data) && (data.length > 0) && (isSaveResult(data[0]))) {
        return true;
    }
    return false;
}


export function execPost(url: string, data: any, postOpts: IExecPostOpts, fnAfter: (data: any) => void) {

    var opts: IAjaxLoadOpts = AjaxLoad.createOptsWithCb((data, cbData) => {

        function handleSaveResult(dataRow):boolean {
            if (dataRow.error) {
                if (postOpts.fnOnError) {
                    if (!postOpts.fnOnError(dataRow.error)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    throw new Error("<pre>" + JSON.stringify(dataRow, null, 4) + "</pre>");
                }
            } else {
                return true;
            }
        }

        function prepareDataForClient(dataRow: any): any {
            if ((postOpts) && (postOpts.prepareForClient)) {
                return postOpts.prepareForClient(dataRow);
            }
            return dataRow;
        }


        function dataRowhandler(dataRow):any {
            if (isSaveResult(dataRow)) {
                if (handleSaveResult(dataRow)) {
                    return prepareDataForClient(dataRow);
                }
            } else {
                return prepareDataForClient(dataRow);
            }
        }

        function throwErr() {
            throw new Error("DataHandler fehlgeschlagen bei data:" + JSON.stringify(data, null, 4));
        }

        
        if (dataRowhandler(data)) {
            fnAfter(data);
        } else {
            throwErr();
        }
        
    });
    //var url: string = natwebfilesConf.conf.buildWebSrvUrl("veranstalt/save");
    //jerseyUtil.jerseyDateConverter(data, postOpts.convOpts, jerseyUtil.ConverterDirection.clientToServer);      
    var serverData;
    if ((postOpts) && (postOpts.prepareForServer)) {
        serverData = postOpts.prepareForServer(data);
    } else {
        serverData = data;
    }
    var jsonData = JSON.stringify(serverData);
    AjaxLoad.execJsonPost(url, jsonData, opts);
}

export interface IJspRestSaveResult<T> {
    error: dkmErrUtil.EdkmDbError;
    row: T;
}

function prepareProcessDataArr(arr: Object[], fnProcessDataRow:(data:Object)=>Object): Object[] {
    var ret: Object[] = [];
    arr.forEach((dataRow) => {
        ret.push(fnProcessDataRow(dataRow));
    });
    return ret;
}

function prepareProcessDataRow(dataRow: Object, fieldNames: string[],
    fnIsDateField: (propOrVal: any) => boolean, fnConvertDateVal:(val:any)=> any): Object {
    var ret = {};
    var dateValue: Date;
    Object.keys(dataRow).forEach((propName) => {
        if (u.arrContains(fieldNames, propName)) {
            var val: any = dataRow[propName];
            if (fnIsDateField(propName)) {
                ret[propName] = fnConvertDateVal(val);
            } else {
                ret[propName] = val;
            }
        }
    });
    return ret;
}

export function prepareServerDataForClientWithSchema(data: any, schema: any): any {
    return prepareServerDataForClient(data, modelUtil.getFieldNamesArrFromSchema(schema,[]), modelUtil.getDateFieldsFromSchema(schema,[]));
}

export function prepareClientDataForServerWithSchema(data: any, schema: any): any {
    return prepareClientDataForServer(data, modelUtil.getFieldNamesArrFromSchema(schema, []));
}

export function prepareServerDataForClient(data: any, fieldNames: string[], dateFieldNames: string[]): any {
    function processDataRow(dataRow: Object): Object {
        return prepareProcessDataRow(dataRow, fieldNames,(propName)=>{
            return u.arrContains(dateFieldNames, propName);
        }, jerseyUtil.srvDateValtoClientData);
    }

    if (u.isArray(data)) {
        return prepareProcessDataArr(data, processDataRow);
    } else {
        return processDataRow(data);
    }

}

export function prepareClientDataForServer(data: any, fieldNames: string[]): any {
    function processDataRow(dataRow: Object): Object {
        return prepareProcessDataRow(dataRow, fieldNames,(propVal) => {
            return u.isDate(propVal);
        }, jerseyUtil.cltDateValToSrvData);
    }

    if (u.isArray(data)) {
        return prepareProcessDataArr(data, processDataRow);
    } else {
        return processDataRow(data);
    }
}

/*
export interface IBuildJsonReplaceFuncOpts {
    replaceValue?: (key: string, value: any) => any;
    excludedFields?: string[];
}

export function buildJsonReplaceFunc(schema: modelUtil.ISchemaDef, opts: IBuildJsonReplaceFuncOpts): (key: string, val: any) => any {
    var fieldNames = modelUtil.getFieldNamesArrFromSchema(schema, opts.excludedFields || []);
    var dateFields = modelUtil.getDateFieldsFromSchema(schema, opts.excludedFields || []);

    function isValidKey(key: string): boolean {
        if (fieldNames.indexOf(key) == -1) {
            return false;
        }
        if ((opts.excludedFields) && (opts.excludedFields.indexOf(key) == -1)) {
            return false;
        }
        return true;
    }

    function date2Jersey(vDate: Date): number {
        return vDate.valueOf();
    }

    return function (key: string, val: any): any {
        if (opts.replaceValue) {
            var ret = opts.replaceValue(key, val);
            if (ret != undefined) {
                return ret;
            }
        }
        if (isValidKey(key)) {
            if (dateFields.indexOf(key)) {
                return date2Jersey(val);
            } else {
                return val;
            }
        }
    }
}
*/
// http://stackoverflow.com/questions/5834901/jquery-automatic-type-conversion-during-parse-json direkt beim erzeugen converitern


export function buildFnPrepareData(schema:any) {
    return   {
        prepareForServer: (clientData: any) => {
            return prepareClientDataForServerWithSchema(clientData, schema);
        },
        prepareForClient: (serverData: any) => {
            return prepareServerDataForClientWithSchema(serverData, schema);
        }
    }
}

export function buildPostOptsWithSchema(schema: any, fnOnError?: (error: any) => boolean): IExecPostOpts {

    var fnOnErrorRet: (error: any) => boolean;
    if (fnOnError) {
        fnOnErrorRet = fnOnError;
    } else {
        fnOnErrorRet = (error) => {
            throw new Error(error);
            return false;
        }
    }

    return {



        prepareForClient: (data) => {

            if (isSaveResult(data)) {
                if (data.row) {
                    data.row = prepareServerDataForClientWithSchema(data.row, schema);
                }                
            } else if (isSaveDataResultArr(data)) {
                var arrData: any[] = data;
                arrData.forEach((entry) => {
                    if (entry.row) {
                        entry.row = prepareServerDataForClientWithSchema(entry.row, schema);
                    }
                });
                return data;
            }
            return prepareServerDataForClientWithSchema(data, schema);
        },
        prepareForServer: (data) => {

            if (!u.isArray(data)) {
                return prepareClientDataForServerWithSchema(data, schema);
            } else {
                var arrData: any[] = data;
                var newData: any[] = [];
                arrData.forEach((entry) => {
                    newData.push(  prepareClientDataForServerWithSchema(entry, schema));
                });
                return newData;
            }
        },
        fnOnError : fnOnErrorRet
    }
}

export function buildGetOptsWithSchema(schema: any): IExecGetOpts {
    return {
        prepareForClient: (data) => {
            return prepareServerDataForClientWithSchema(data, schema);
        }
    }
}


export function buildFnAfterFunc(fnAfter:(data:any)=> void): (data: any)=> any {
    return (data) => {
        fnAfter(data);
    };
}

