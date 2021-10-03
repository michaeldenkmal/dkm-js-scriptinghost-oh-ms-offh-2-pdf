import u = require("dkmlib/generic/u");

export var DkmErrClasses: u.IStringMap = {
    "OtherError": "OtherError",
    "EdkmDbError": "EdkmDbError",
    "EdkmDbUsrError": "EdkmDbUsrError",
    "EdkmFieldIsNull": "EdkmFieldIsNull",
    "EdkmFieldValTooLong": "EdkmFieldValTooLong",
    "EdkmUqKeyError": "EdkmUqKeyError",
    "EdkmFkKeyError": "EdkmFkKeyError",
    "EdkmPkKeyError": "EdkmPkKeyError"
}

export interface EdkmDbError {
    dkmErrClass?: string;
    isDkmCustomError: boolean;
    message: string;
}

export interface EdkmDbUsrError extends EdkmDbError {
    errType: string;
}


export interface EdkmFieldIsNull extends EdkmDbError {
    tableName: string;
    fieldName: string;
}

export interface EdkmFieldValTooLong extends EdkmDbError {
    tableName: string;
    fieldName: string;
    maxLen: number;
    actualLen: number;
}

export interface TFkFieldZuord {
    tableName: string;
    fieldName: string;
    fieldVal: string;
    fkTableName: string;
    fkFieldName: string;
}

export interface EdkmFkKeyError extends EdkmDbError {
    fieldZuord: TFkFieldZuord[];
}

export interface EdkmPkKeyError extends EdkmDbError {
    mapFieldVals: u.IStringMap;
    pkKeyName: string;
    tableName: string;
}

export interface EdkmUqKeyError extends EdkmDbError {
    mapFieldVals: u.IStringMap;
    uqKeyName: string;
    tableName: string;
}

export interface IFieldValue {
    fieldName: string;
    fieldValue: string;
}







