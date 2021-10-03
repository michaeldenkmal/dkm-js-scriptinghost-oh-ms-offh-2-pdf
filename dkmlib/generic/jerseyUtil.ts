import u = require("dkmlib/generic/u");
import modelUtil = require("dkmlib/generic/modelUtil");
/**
 * Equivalent zu TJerseyUtils auf der Java Seite
 * 
 */

export function srvDateValtoClientData(value: number): Date {
    return new Date(value);
}

export function cltDateValToSrvData(value: Date): number {
    return value.valueOf();
}

export function fixJsonDateTime(dateFields: string[], obj: Object): Object {
    if (obj == null) {
        return null;
    }
    Object.keys(obj).forEach((propName) => {
        if (dateFields.indexOf(propName) > -1) {
            if (obj[propName] != null) {
                obj[propName] = srvDateValtoClientData(obj[propName]);
            }
        }
    });
    return obj;
}

export function fixJsonDateTimeArr(dataFields: string[],arr:any[]): any[]{
    var ret = [];
    if (arr == null) {
        return null;
    }

    arr.forEach((row) => {
        ret.push(fixJsonDateTime(dataFields, row));
    });
    return ret;    
}

export function clientToJerseyDate(dateFields: string[], obj: Object): Object {
    if (obj == null) {
        return null;
    }
    Object.keys(obj).forEach((propName) => {
        if (dateFields.indexOf(propName) > -1) {
            if (obj[propName] != null) {
                var d:Date = obj[propName];
                obj[propName] = cltDateValToSrvData(d);
            }
        }
    });
    return obj;

}

export function clientToJerseyDateArr(dataFields: string[], arr: any[]): any[]{

    if (arr == null) {
        return null;
    }

    var ret = [];

    arr.forEach((row) => {
        ret.push(clientToJerseyDate(dataFields, row));
    });
    return ret;    

}

