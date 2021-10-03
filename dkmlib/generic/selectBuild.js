var hbuild = require("./hbuild");
var nsexp = require("dkmlib/browser/generic/nsexp");
function buildSelectOptsAttrs(opts) {
    var attrs = [];
    var keys = Object.keys(opts);
    keys.forEach(function (key) {
        if (typeof opts[key] !== "undefined") {
            attrs.push({
                name: key,
                value: opts[key]
            });
        }
    });
    return attrs;
}
function createSelectOpts(opts) {
    hbuild.fill_sb_with_tag(opts.sb, "option", {
        attrs: buildSelectOptsAttrs(opts.attrs),
        innerHtml: opts.displayField
    });
}
exports.createSelectOpts = createSelectOpts;
function createSelect(opts) {
    function buildSelopts(sb, cbData) {
        cbData.forEach(function (row) {
            createSelectOpts({
                attrs: {
                    value: row[opts.valueField],
                    selected: opts.selectedVal === row[opts.valueField]
                },
                displayField: row[opts.displayField],
                sb: sb
            });
        });
    }
    function buildFirstRow(sb, dbData) {
        createSelectOpts({
            attrs: {
                value: opts.firstRows.value,
                selected: opts.displayField == opts.selectedVal
            },
            displayField: opts.firstRows.caption,
            sb: sb
        });
    }
    hbuild.fill_sb_with_tag(opts.sb, "select", {
        attrs: opts.attrs,
        arr_fn_on_inner: [buildFirstRow, buildSelopts],
        cbData: opts.data
    });
}
exports.createSelect = createSelect;
nsexp.exportNsObj("dkmlib", "selectBuild", {
    createSelect: createSelect
});
//# sourceMappingURL=selectBuild.js.map