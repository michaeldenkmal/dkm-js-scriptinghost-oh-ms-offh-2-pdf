var jerseyUtil = require("dkmlib/generic/jerseyUtil");
function addFieldNameMapping(mappingObj, fromField, toField) {
    mappingObj[fromField] = toField;
    mappingObj[toField] = fromField;
    return mappingObj;
}
exports.addFieldNameMapping = addFieldNameMapping;
(function (DataType) {
    DataType[DataType["STRING"] = 0] = "STRING";
    DataType[DataType["INT"] = 1] = "INT";
    DataType[DataType["DATE"] = 2] = "DATE";
    DataType[DataType["FLOAT"] = 3] = "FLOAT";
    DataType[DataType["BIGDECIMAL"] = 4] = "BIGDECIMAL";
    DataType[DataType["BOOLEAN"] = 5] = "BOOLEAN";
})(exports.DataType || (exports.DataType = {}));
var DataType = exports.DataType;
function createFieldInfo(fieldName, dt, required, len) {
    return {
        fieldName: fieldName,
        dataType: dt,
        len: len || 0,
        required: required || false
    };
}
exports.createFieldInfo = createFieldInfo;
function createStringFieldInfo(fieldName, required, len) {
    return createFieldInfo(fieldName, DataType.STRING, required, len);
}
exports.createStringFieldInfo = createStringFieldInfo;
function createDateFieldInfo(fieldName, required) {
    return createFieldInfo(fieldName, DataType.DATE, required, null);
}
exports.createDateFieldInfo = createDateFieldInfo;
function createFloatFieldInfo(fieldName, required) {
    return createFieldInfo(fieldName, DataType.FLOAT, required, null);
}
exports.createFloatFieldInfo = createFloatFieldInfo;
function createIntFieldInfo(fieldName, required) {
    return createFieldInfo(fieldName, DataType.INT, required, null);
}
exports.createIntFieldInfo = createIntFieldInfo;
function createDecimalFieldInfo(fieldName, required) {
    return createFieldInfo(fieldName, DataType.BIGDECIMAL, required, null);
}
exports.createDecimalFieldInfo = createDecimalFieldInfo;
function createBooleanFieldInfo(fieldName, required) {
    return createFieldInfo(fieldName, DataType.BOOLEAN, required, null);
}
exports.createBooleanFieldInfo = createBooleanFieldInfo;
function getDateFieldsFromSchema(schema, excludeFields) {
    var ret = [];
    iterSchema(schema, function (fi) {
        if ((fi.fieldName) && (fi.dataType == DataType.DATE) && (excludeFields.indexOf(fi.fieldName) == -1)) {
            ret.push(fi.fieldName);
        }
    });
    return ret;
}
exports.getDateFieldsFromSchema = getDateFieldsFromSchema;
function iterSchema(schema, fnOnFieldInfoFound) {
    Object.keys(schema).forEach(function (prop) {
        var fi = schema[prop];
        fnOnFieldInfoFound(fi);
    });
}
exports.iterSchema = iterSchema;
function getFieldNamesArrFromSchema(schema, excludeFields) {
    var ret = [];
    iterSchema(schema, function (fi) {
        if ((fi.fieldName) && (excludeFields.indexOf(fi.fieldName) == -1)) {
            ret.push(fi.fieldName);
        }
    });
    return ret;
}
exports.getFieldNamesArrFromSchema = getFieldNamesArrFromSchema;
(function (JsonDateConvertType) {
    JsonDateConvertType[JsonDateConvertType["serverToClient"] = 0] = "serverToClient";
    JsonDateConvertType[JsonDateConvertType["clientToServer"] = 1] = "clientToServer";
    JsonDateConvertType[JsonDateConvertType["none"] = 2] = "none";
})(exports.JsonDateConvertType || (exports.JsonDateConvertType = {}));
var JsonDateConvertType = exports.JsonDateConvertType;
function copyRawJsonRowToMVVModel(rawObj, schema, mvvmModel, dateConverType) {
    iterSchema(schema, function (fi) {
        if (fi.dataType == DataType.DATE) {
            switch (dateConverType) {
                case JsonDateConvertType.clientToServer:
                    mvvmModel[fi.fieldName] = jerseyUtil.cltDateValToSrvData(rawObj[fi.fieldName]);
                    break;
                case JsonDateConvertType.serverToClient:
                    mvvmModel[fi.fieldName] = jerseyUtil.srvDateValtoClientData(rawObj[fi.fieldName]);
                    break;
                case JsonDateConvertType.none:
                    mvvmModel[fi.fieldName] = rawObj[fi.fieldName];
                    break;
            }
        }
        else {
            mvvmModel[fi.fieldName] = rawObj[fi.fieldName];
        }
    });
    return mvvmModel;
}
exports.copyRawJsonRowToMVVModel = copyRawJsonRowToMVVModel;
//# sourceMappingURL=modelUtil.js.map