define(["require", "exports", "dkmlib/generic/u", "dkmlib/generic/jerseyUtil", "dkmlib/generic/modelUtil"], function (require, exports, u, jerseyUtil, modelUtil) {
    var AjaxLoad = (function () {
        function AjaxLoad() {
        }
        AjaxLoad.createStdOpts = function () {
            return {
                //http://localhost:8084/tomcatCustFilter/webresources/gp/getBySuchbegriff/mi?user=michael
                websrvcbase: null,
                /**
                 * @type {function(arr,cbData)}
                 */
                fnAfterFetch: null,
                customCbData: null,
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
            };
        };
        AjaxLoad.createOptsWithCb = function (fnAfterfetch) {
            var ret = AjaxLoad.createStdOpts();
            ret.fnAfterFetch = fnAfterfetch;
            return ret;
        };
        AjaxLoad.execGet = function (url, opts) {
            opts.fnShowLoadIndicator(opts.loadIndicatorId);
            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                error: function (jqXHR, textStatus, errorThrown) {
                    AjaxLoad.throwSrvcErr(jqXHR, textStatus, errorThrown, url);
                }
            }).done(function (data) {
                opts.fnHideLoadIndicator(opts.loadIndicatorId);
                opts.fnAfterFetch(data, opts.customCbData);
            });
        };
        /**
         *
         * @param jqXHR
         * @param textStatus
         * @param errorThrown
         * @param {string} url
         * @param {string} jsonData
         */
        AjaxLoad.throwSrvcErr = function (jqXHR, textStatus, errorThrown, url, jsonData) {
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
        AjaxLoad.execJsonPost = function (url, jsonData, opts) {
            opts.fnShowLoadIndicator(opts.loadIndicatorId);
            $.ajax({
                type: "POST",
                cache: false,
                data: jsonData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: url,
                error: function (jqXHR, textStatus, errorThrown) {
                    AjaxLoad.throwSrvcErr(jqXHR, textStatus, errorThrown, url, jsonData);
                }
            }).done(function (data) {
                opts.fnHideLoadIndicator(opts.loadIndicatorId);
                opts.fnAfterFetch(data, opts.customCbData);
            });
        };
        return AjaxLoad;
    })();
    exports.AjaxLoad = AjaxLoad;
    ;
    function jerseyFixData(data, dateFields) {
        if (u.isArray(data)) {
            jerseyUtil.fixJsonDateTimeArr(dateFields, data);
        }
        else {
            jerseyUtil.fixJsonDateTime(dateFields, data);
        }
    }
    function execGet(url, getOpts, fnAfter) {
        var opts = AjaxLoad.createOptsWithCb(function (data, cbData) {
            if (getOpts) {
                var clientData = getOpts.prepareForClient(data);
            }
            else {
                clientData = data;
            }
            fnAfter(clientData);
        });
        AjaxLoad.execGet(url, opts);
    }
    exports.execGet = execGet;
    function isSaveResult(obj) {
        if ((u.propExistsInObj(obj, "error")) && (u.propExistsInObj(obj, "row"))) {
            return true;
        }
        return false;
    }
    function isSaveDataResultArr(data) {
        if (u.isArray(data) && (data.length > 0) && (isSaveResult(data[0]))) {
            return true;
        }
        return false;
    }
    function execPost(url, data, postOpts, fnAfter) {
        var opts = AjaxLoad.createOptsWithCb(function (data, cbData) {
            function handleSaveResult(dataRow) {
                if (dataRow.error) {
                    if (postOpts.fnOnError) {
                        if (!postOpts.fnOnError(dataRow.error)) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        throw new Error("<pre>" + JSON.stringify(dataRow, null, 4) + "</pre>");
                    }
                }
                else {
                    return true;
                }
            }
            function prepareDataForClient(dataRow) {
                if ((postOpts) && (postOpts.prepareForClient)) {
                    return postOpts.prepareForClient(dataRow);
                }
                return dataRow;
            }
            function dataRowhandler(dataRow) {
                if (isSaveResult(dataRow)) {
                    if (handleSaveResult(dataRow)) {
                        return prepareDataForClient(dataRow);
                    }
                }
                else {
                    return prepareDataForClient(dataRow);
                }
            }
            function throwErr() {
                throw new Error("DataHandler fehlgeschlagen bei data:" + JSON.stringify(data, null, 4));
            }
            if (dataRowhandler(data)) {
                fnAfter(data);
            }
            else {
                throwErr();
            }
        });
        //var url: string = natwebfilesConf.conf.buildWebSrvUrl("veranstalt/save");
        //jerseyUtil.jerseyDateConverter(data, postOpts.convOpts, jerseyUtil.ConverterDirection.clientToServer);      
        var serverData;
        if ((postOpts) && (postOpts.prepareForServer)) {
            serverData = postOpts.prepareForServer(data);
        }
        else {
            serverData = data;
        }
        var jsonData = JSON.stringify(serverData);
        AjaxLoad.execJsonPost(url, jsonData, opts);
    }
    exports.execPost = execPost;
    function prepareProcessDataArr(arr, fnProcessDataRow) {
        var ret = [];
        arr.forEach(function (dataRow) {
            ret.push(fnProcessDataRow(dataRow));
        });
        return ret;
    }
    function prepareProcessDataRow(dataRow, fieldNames, fnIsDateField, fnConvertDateVal) {
        var ret = {};
        var dateValue;
        Object.keys(dataRow).forEach(function (propName) {
            if (u.arrContains(fieldNames, propName)) {
                var val = dataRow[propName];
                if (fnIsDateField(propName)) {
                    ret[propName] = fnConvertDateVal(val);
                }
                else {
                    ret[propName] = val;
                }
            }
        });
        return ret;
    }
    function prepareServerDataForClientWithSchema(data, schema) {
        return prepareServerDataForClient(data, modelUtil.getFieldNamesArrFromSchema(schema, []), modelUtil.getDateFieldsFromSchema(schema, []));
    }
    exports.prepareServerDataForClientWithSchema = prepareServerDataForClientWithSchema;
    function prepareClientDataForServerWithSchema(data, schema) {
        return prepareClientDataForServer(data, modelUtil.getFieldNamesArrFromSchema(schema, []));
    }
    exports.prepareClientDataForServerWithSchema = prepareClientDataForServerWithSchema;
    function prepareServerDataForClient(data, fieldNames, dateFieldNames) {
        function processDataRow(dataRow) {
            return prepareProcessDataRow(dataRow, fieldNames, function (propName) {
                return u.arrContains(dateFieldNames, propName);
            }, jerseyUtil.srvDateValtoClientData);
        }
        if (u.isArray(data)) {
            return prepareProcessDataArr(data, processDataRow);
        }
        else {
            return processDataRow(data);
        }
    }
    exports.prepareServerDataForClient = prepareServerDataForClient;
    function prepareClientDataForServer(data, fieldNames) {
        function processDataRow(dataRow) {
            return prepareProcessDataRow(dataRow, fieldNames, function (propVal) {
                return u.isDate(propVal);
            }, jerseyUtil.cltDateValToSrvData);
        }
        if (u.isArray(data)) {
            return prepareProcessDataArr(data, processDataRow);
        }
        else {
            return processDataRow(data);
        }
    }
    exports.prepareClientDataForServer = prepareClientDataForServer;
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
    function buildFnPrepareData(schema) {
        return {
            prepareForServer: function (clientData) {
                return prepareClientDataForServerWithSchema(clientData, schema);
            },
            prepareForClient: function (serverData) {
                return prepareServerDataForClientWithSchema(serverData, schema);
            }
        };
    }
    exports.buildFnPrepareData = buildFnPrepareData;
    function buildPostOptsWithSchema(schema, fnOnError) {
        var fnOnErrorRet;
        if (fnOnError) {
            fnOnErrorRet = fnOnError;
        }
        else {
            fnOnErrorRet = function (error) {
                throw new Error(error);
                return false;
            };
        }
        return {
            prepareForClient: function (data) {
                if (isSaveResult(data)) {
                    if (data.row) {
                        data.row = prepareServerDataForClientWithSchema(data.row, schema);
                    }
                }
                else if (isSaveDataResultArr(data)) {
                    var arrData = data;
                    arrData.forEach(function (entry) {
                        if (entry.row) {
                            entry.row = prepareServerDataForClientWithSchema(entry.row, schema);
                        }
                    });
                    return data;
                }
                return prepareServerDataForClientWithSchema(data, schema);
            },
            prepareForServer: function (data) {
                if (!u.isArray(data)) {
                    return prepareClientDataForServerWithSchema(data, schema);
                }
                else {
                    var arrData = data;
                    var newData = [];
                    arrData.forEach(function (entry) {
                        newData.push(prepareClientDataForServerWithSchema(entry, schema));
                    });
                    return newData;
                }
            },
            fnOnError: fnOnErrorRet
        };
    }
    exports.buildPostOptsWithSchema = buildPostOptsWithSchema;
    function buildGetOptsWithSchema(schema) {
        return {
            prepareForClient: function (data) {
                return prepareServerDataForClientWithSchema(data, schema);
            }
        };
    }
    exports.buildGetOptsWithSchema = buildGetOptsWithSchema;
    function buildFnAfterFunc(fnAfter) {
        return function (data) {
            fnAfter(data);
        };
    }
    exports.buildFnAfterFunc = buildFnAfterFunc;
});
//# sourceMappingURL=websrvc.js.map