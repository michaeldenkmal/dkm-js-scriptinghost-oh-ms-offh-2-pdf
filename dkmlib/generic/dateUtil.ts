import u = require("./u");
import nsexp = require("dkmlib/browser/generic/nsexp");
/* sollte eine Nachbildung der funktion aus java TDateUtil sein
 * 
 **/
// public static Date buildDate(int Year, int Month, int Day) {
export function buildDate(year: number, month: number, day: number): Date {
    return new Date(year, month -1, day);
}

export function dateToUnixDate(date: Date): string {
    // Unix Date aus 13.02.1970 wird 19700213
    var y: number = date.getFullYear();
    // Idioten Sprache!!!
    var mo: number = date.getMonth() + 1;
    var d: number = date.getDate();
    return y + u.fmt2DigitNum(mo) + u.fmt2DigitNum(d);
}

export function isDateInstance(date: any): boolean {
    return date instanceof Date;
}

export function fmtGermanDate(vDate: Date) {
    if (vDate == null) {
        return "";
    }
    var ijahr:number, imon:number, iday:number;

    ijahr = vDate.getUTCFullYear();
    imon = vDate.getUTCMonth();
    iday = vDate.getUTCDate();

    var szjahr, szmon, szday;

    szjahr = ijahr + "";
    szmon = u.format2DigitNum(imon + 1);
    szday = u.format2DigitNum(iday);

    return szday + "." + szmon + "." + szjahr;
}

export function fmtGermanDateTime(vDate: Date):string {

    var ijahr: number, imon: number, iday: number, ihour: number, imin: number, isec: number;
    var szDatePart = fmtGermanDate(vDate);
    ihour = vDate.getUTCHours();
    imin = vDate.getUTCMinutes();
    isec = vDate.getUTCSeconds();

    var szhour, szmin, szsec;

     szhour = u.format2DigitNum(ihour);
     szmin = u.format2DigitNum(imin);
     szsec = u.format2DigitNum(isec);

     return szDatePart +  " " + szhour + ":" + szmin + ":" + szsec;
}

nsexp.exportNsObj("dkmlib", "dateUtil", {
    fmtGermanDate: fmtGermanDate,
    fmtGermanDateTime: fmtGermanDateTime
});


export function germanDateStrToDate(dateStr: string): Date {
    var reg = /(\d\d)\.(\d\d)\.(\d\d\d\d|\d\d)/;
    var matches = reg.exec(dateStr);
    

    if (matches.length > 0) {
        var y:number = parseInt(matches[3]);    
        var mo: number = parseInt(matches[2]) -1;
        var d: number = parseInt(matches[1]);
        return new Date(y, mo, d);
    } else {
        throw new Error(`germanDateStrToDate: datStr ${dateStr} ist kein Deutsches Datumsformat`);
    }
}
