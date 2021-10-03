define(["require", "exports", "dkmlib/generic/selectBuild", "dkmlib/generic/hbuild"], function (require, exports, selectBuild, hbuild) {
    function cbxTest() {
        var data = [
            { nr: "1", mname: "Michael" },
            { nr: "2", mname: "Monika" },
            { nr: "3", mname: "Anna" },
        ];
        var sb = new hbuild.TStringBuilder();
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
    function start() {
        $(document).ready(function () {
            cbxTest();
        });
    }
    exports.start = start;
});
//# sourceMappingURL=selectBuild_test.js.map