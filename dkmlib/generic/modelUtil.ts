import u = require("dkmlib/generic/u");
import jerseyUtil = require("dkmlib/generic/jerseyUtil");

export function addFieldNameMapping(mappingObj: u.IStringMap, fromField: string, toField: string): u.IStringMap {
    mappingObj[fromField] = toField;
    mappingObj[toField] = fromField;
    return mappingObj;
}

export enum DataType {
    STRING, INT, DATE, FLOAT, BIGDECIMAL, BOOLEAN
}

export interface IFieldInfo {
    fieldName: string;
    dataType: DataType;
    len: number;
    required:boolean
}

//export interface ISchemaDef { [s: string]: IFieldInfo };
//export interface ISchemaDef {
//}

//    public static IFieldInfo createFieldInfo(final String fieldName, final DataType dt, final boolean required, final Integer len) {
export function createFieldInfo(fieldName: string, dt: DataType, required: boolean, len: number):IFieldInfo {
    return {
        fieldName: fieldName,
        dataType: dt,
        len: len|| 0,
        required:required || false
    };
}


//    public static IFieldInfo createStringFieldInfo(final String fieldName, boolean required, final int len) {
export function createStringFieldInfo(fieldName:string,required:boolean, len:number):IFieldInfo {
    return createFieldInfo(fieldName, DataType.STRING, required, len);
}

//    public static IFieldInfo createDateFieldInfo(final String fieldName, boolean required) {
export function createDateFieldInfo(fieldName:string, required:boolean):IFieldInfo {
    return createFieldInfo(fieldName, DataType.DATE, required, null);
}

//    public static IFieldInfo createFloatFieldInfo(final String fieldName, boolean required) {
export function createFloatFieldInfo(fieldName:string, required:boolean):IFieldInfo {
    return createFieldInfo(fieldName, DataType.FLOAT, required, null);
}

//    public static IFieldInfo createIntFieldInfo(final String fieldName, boolean required) {
export function createIntFieldInfo(fieldName:string, required:boolean):IFieldInfo {
    return createFieldInfo(fieldName, DataType.INT, required, null);
}

//    public static IFieldInfo createDecimalFieldInfo(final String fieldName, boolean required) {
export function createDecimalFieldInfo(fieldName:string, required:boolean):IFieldInfo {
    return createFieldInfo(fieldName, DataType.BIGDECIMAL, required, null);
}

//    public static IFieldInfo createBooleanFieldInfo(final String fieldName, boolean required) {
export function createBooleanFieldInfo(fieldName:string,required:boolean) {
    return createFieldInfo(fieldName, DataType.BOOLEAN, required, null);
}

export function getDateFieldsFromSchema(schema: any, excludeFields: string[]): string[]{
    var ret: string[] = [];
    iterSchema(schema,(fi) => {
        if ((fi.fieldName) && (fi.dataType == DataType.DATE) && (excludeFields.indexOf(fi.fieldName) == -1)) {
            ret.push(fi.fieldName);
        }
    });

    return ret;
}


export function iterSchema(schema: any, fnOnFieldInfoFound: (fi: IFieldInfo) => void):void {
    Object.keys(schema).forEach((prop) => {
        var fi: IFieldInfo = <IFieldInfo> schema[prop];
        fnOnFieldInfoFound(fi);
    });

}

export function getFieldNamesArrFromSchema(schema: any, excludeFields: string[]): string[] {
    var ret: string[] = [];
    iterSchema(schema, (fi)=> {
        if ((fi.fieldName) && (excludeFields.indexOf(fi.fieldName) == -1)) {
            ret.push(fi.fieldName);
        }
    });
    return ret;
}

export enum JsonDateConvertType {
    serverToClient, clientToServer, none
}

export function copyRawJsonRowToMVVModel <T> (rawObj: any, schema: any, mvvmModel: T , dateConverType:JsonDateConvertType):T {

    iterSchema(schema,(fi) => {
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
        } else {
            mvvmModel[fi.fieldName] = rawObj[fi.fieldName];
        }
    });

    return mvvmModel;

}


