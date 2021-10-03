/**
 * Created by michael on 04.08.2015.
 */
import selectBuild = require("dkmlib/generic/selectBuild");
import hbuild = require("dkmlib/generic/hbuild");


function cbxTest() {
    var data = [
        {nr:"1", mname:"Michael"},
        {nr:"2", mname:"Monika"},
        {nr:"3", mname:"Anna"},
    ];

    var sb:hbuild.TStringBuilder = new hbuild.TStringBuilder();

    selectBuild.createSelect({
        data: data,
        valueField: "nr",
        displayField: "mname",
       /* firstRows?: ISelectOpt;
    attrs?: hbuild.IAttribute[];*/
        selectedVal: "1",
        sb: sb
    });
    var html = sb.toString();
    window.document.getElementById("selectResult").innerHTML = html;
}

export function start() {
    $(document).ready(function() {
       cbxTest();
    });
}