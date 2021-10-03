function srvDateValtoClientData(value) {
    return new Date(value);
}
exports.srvDateValtoClientData = srvDateValtoClientData;
function cltDateValToSrvData(value) {
    return value.valueOf();
}
exports.cltDateValToSrvData = cltDateValToSrvData;
function fixJsonDateTime(dateFields, obj) {
    if (obj == null) {
        return null;
    }
    Object.keys(obj).forEach(function (propName) {
        if (dateFields.indexOf(propName) > -1) {
            if (obj[propName] != null) {
                obj[propName] = srvDateValtoClientData(obj[propName]);
            }
        }
    });
    return obj;
}
exports.fixJsonDateTime = fixJsonDateTime;
function fixJsonDateTimeArr(dataFields, arr) {
    var ret = [];
    if (arr == null) {
        return null;
    }
    arr.forEach(function (row) {
        ret.push(fixJsonDateTime(dataFields, row));
    });
    return ret;
}
exports.fixJsonDateTimeArr = fixJsonDateTimeArr;
function clientToJerseyDate(dateFields, obj) {
    if (obj == null) {
        return null;
    }
    Object.keys(obj).forEach(function (propName) {
        if (dateFields.indexOf(propName) > -1) {
            if (obj[propName] != null) {
                var d = obj[propName];
                obj[propName] = cltDateValToSrvData(d);
            }
        }
    });
    return obj;
}
exports.clientToJerseyDate = clientToJerseyDate;
function clientToJerseyDateArr(dataFields, arr) {
    if (arr == null) {
        return null;
    }
    var ret = [];
    arr.forEach(function (row) {
        ret.push(clientToJerseyDate(dataFields, row));
    });
    return ret;
}
exports.clientToJerseyDateArr = clientToJerseyDateArr;
//# sourceMappingURL=jerseyUtil.js.map