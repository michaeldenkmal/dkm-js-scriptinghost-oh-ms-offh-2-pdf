/**
 * Created by michael on 15.06.2015.
 */

export function isNullOrEmpty(s:string):boolean {
    if (!s) {
        return true;
    }
    if (s == "") {
        return true;
    }
    return false;
}

export function propExistsInObj(obj,propName, propValue?) {
    var keys = Object.keys(obj);
    if (keys.indexOf(propName)<0){
        return false;
    }

    if (!propValue) {
        return true;
    }
    if (obj[propName] == propValue) {
        return true;
    }
    return false;
}

export function findObjInArrByPropValue (arr:any[], propName) {

    var i,l=arr.length;
    for (i=0;i<l;i++) {
        var elem = arr[i];
        if (propExistsInObj(elem, propName)) {
            return elem;
        }
    };
    return null;
}

export interface IStringMap { [s: string]: string; }

export function fmt2DigitNum(n: number): string {
    if (n < 10) {
        return "0" + n;
    } else {
        return "" + n;
    }
}

export function copyPropsByPropNames(src:Object, target:Object, arrFieldNames:string[]):Object {
    arrFieldNames.forEach(function (fieldName) {
        target[fieldName] = src[fieldName];
    });
    return target;
}



export function removeElemFromArr(arr: any[], elem: string):any[] {
    var i = arr.indexOf(elem);
    if (i > -1) {
        arr.splice(i, 1);
    }
    return arr;
}


export function format2DigitNum (inum:number):string {
    if (inum < 10) {
        return "0" + inum;
    } else {
        return "" + inum;
    }
};

export function areObjsEqual(obj1: Object, obj2: Object): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2) 
}

export function isArray(data: any): boolean {
    return (data instanceof Array);
}


export function arrContains(arr: any[], val:any): boolean {
    return arr.indexOf(val) > -1;
}

export function isDate(val: any): boolean {
    return (val instanceof Date);
}

export function unQuote(s: string, quote: string): string {
    var ret = s;
    if (strStartsWith(ret, quote)) {
        ret = ret.substr(quote.length);
    }
    if (strEndsWith(ret, quote)) {
        ret = ret.substring(0, ret.length - quote.length );
    }
    return ret;
}

export function strStartsWith(s: string, prefix: string): boolean {
    if ( (isNullOrEmpty(s)) || (isNullOrEmpty(prefix))) {
        return false;
    }
    return s.indexOf(prefix) == 0;
}

export function strEndsWith(s: string, postFix: string): boolean {
    if (isNullOrEmpty(s) || (isNullOrEmpty(postFix))) {
        return false;
    }
    if (s.length < postFix.length) {
        return false;
    }
    var istart, ilen;
    istart = s.length - postFix.length;
    ilen = s.length - istart;
    return s.substr(istart, ilen) == postFix;

}

export function debugFmtObj(obj: any): string {
    return JSON.stringify(obj, null, 4);
}

export function isOnlyNumeric(s: string): boolean {
    var s2: string = s.replace(/\.|\,|\+|\-|e|E/g, '');
    var reg = /^\d+$/;
    return reg.test(s2);
}

export function htmlEscape(str:string):string {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// I needed the opposite function today, so adding here too:
export function htmlUnescape(value:string):string {
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}