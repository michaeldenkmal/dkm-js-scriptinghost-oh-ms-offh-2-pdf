/**
 * Created by michael on 24.06.2015.
 */
function strArrayToUpperCase(arr) {
    var ret = [];
    arr.forEach(function (e) {
        ret.push(e.toUpperCase());
    });
    return ret;
}
exports.strArrayToUpperCase = strArrayToUpperCase;
function getNotExistingElems(arrToCheck, arrToFind, fnNotExistingFound) {
    var i, l = arrToFind.length;
    for (i = 0; i < l; i++) {
        var search = arrToFind[i];
        if (arrToCheck.indexOf(search) < 0) {
            if (!fnNotExistingFound(search, i)) {
                return;
            }
        }
    }
}
exports.getNotExistingElems = getNotExistingElems;
//# sourceMappingURL=listUtil.js.map