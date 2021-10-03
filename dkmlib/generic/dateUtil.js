var u = require("./u");
var nsexp = require("dkmlib/browser/generic/nsexp");
function buildDate(year, month, day) {
    return new Date(year, month - 1, day);
}
exports.buildDate = buildDate;
function dateToUnixDate(date) {
    var y = date.getFullYear();
    var mo = date.getMonth() + 1;
    var d = date.getDate();
    return y + u.fmt2DigitNum(mo) + u.fmt2DigitNum(d);
}
exports.dateToUnixDate = dateToUnixDate;
function isDateInstance(date) {
    return date instanceof Date;
}
exports.isDateInstance = isDateInstance;
function fmtGermanDate(vDate) {
    if (vDate == null) {
        return "";
    }
    var ijahr, imon, iday;
    ijahr = vDate.getUTCFullYear();
    imon = vDate.getUTCMonth();
    iday = vDate.getUTCDate();
    var szjahr, szmon, szday;
    szjahr = ijahr + "";
    szmon = u.format2DigitNum(imon + 1);
    szday = u.format2DigitNum(iday);
    return szday + "." + szmon + "." + szjahr;
}
exports.fmtGermanDate = fmtGermanDate;
function fmtGermanDateTime(vDate) {
    var ijahr, imon, iday, ihour, imin, isec;
    var szDatePart = fmtGermanDate(vDate);
    ihour = vDate.getUTCHours();
    imin = vDate.getUTCMinutes();
    isec = vDate.getUTCSeconds();
    var szhour, szmin, szsec;
    szhour = u.format2DigitNum(ihour);
    szmin = u.format2DigitNum(imin);
    szsec = u.format2DigitNum(isec);
    return szDatePart + " " + szhour + ":" + szmin + ":" + szsec;
}
exports.fmtGermanDateTime = fmtGermanDateTime;
nsexp.exportNsObj("dkmlib", "dateUtil", {
    fmtGermanDate: fmtGermanDate,
    fmtGermanDateTime: fmtGermanDateTime
});
function germanDateStrToDate(dateStr) {
    var reg = /(\d\d)\.(\d\d)\.(\d\d\d\d|\d\d)/;
    var matches = reg.exec(dateStr);
    if (matches.length > 0) {
        var y = parseInt(matches[3]);
        var mo = parseInt(matches[2]) - 1;
        var d = parseInt(matches[1]);
        return new Date(y, mo, d);
    }
    else {
        throw new Error("germanDateStrToDate: datStr " + dateStr + " ist kein Deutsches Datumsformat");
    }
}
exports.germanDateStrToDate = germanDateStrToDate;
//# sourceMappingURL=dateUtil.js.map