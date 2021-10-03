import hbuild = require("./hbuild");
import nsexp = require("dkmlib/browser/generic/nsexp");

export interface ISelectOpt {
    value: string;
    caption: string;
}


export interface ISelectOptAttrs {
    disabled?: boolean;//disabled 	disabled 	Specifies that an option should be disabled
    label?: string;//label 	text 	Specifies a shorter label for an option
    selected?: boolean;//selected 	selected 	Specifies that an option should be pre- selected when the page loads
    value: string;//value
}

function buildSelectOptsAttrs(opts: ISelectOptAttrs): hbuild.IAttribute[]{
    var attrs: hbuild.IAttribute[] = [];
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

export interface ICreateSelectOptsOptions {
    displayField: string;
    attrs: ISelectOptAttrs;
    sb: hbuild.TStringBuilder;
}



export function createSelectOpts(opts: ICreateSelectOptsOptions): void {
    hbuild.fill_sb_with_tag(opts.sb, "option", {
        attrs: buildSelectOptsAttrs(opts.attrs),
        innerHtml : opts.displayField
    });

}

export interface ICreateSelectOptions {
    data: any[];
    valueField: string;
    displayField: string;
    firstRows?: ISelectOpt;
    attrs?: hbuild.IAttribute[];
    selectedVal: string;
    sb: hbuild.TStringBuilder;
}


export function createSelect(opts: ICreateSelectOptions): void {

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
            sb:sb
        });
    }

    hbuild.fill_sb_with_tag(opts.sb, "select", {
        attrs:opts.attrs,
        arr_fn_on_inner: [buildFirstRow,buildSelopts],
        cbData:opts.data
    });

}


nsexp.exportNsObj("dkmlib", "selectBuild", {
    createSelect: createSelect
});


 