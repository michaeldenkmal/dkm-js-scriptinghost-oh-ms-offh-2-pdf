/// <reference path="../../generic/hbuild.ts" />
define(["require", "exports", "dkmlib/generic/hbuild"], function (require, exports, hbuild) {
    function test_menu() {
        var j_content = $("#content");
        var sb = new hbuild.TStringBuilder();
        function a(sb, cbData) {
            //<a href="$menuItem.href$" id= "$menuItem.id$" > $menuItem.caption$ < /a>
            var hrefAttrs = hbuild.create_attrs(["href", cbData.href, "id", cbData.id]);
            hbuild.fill_sb_with_tag(sb, "a", {
                attrs: hrefAttrs,
                innerHtml: cbData.caption
            });
        }
        function lis(sb, cbData) {
            var i = 0;
            for (i = 0; i < 10; i++) {
                hbuild.fill_sb_with_tag(sb, "li", {
                    cbData: {
                        href: "#",
                        id: "li" + i,
                        caption: "Item " + (i + 1)
                    },
                    arr_fn_on_inner: [a]
                });
            }
        }
        hbuild.fill_sb_with_tag(sb, "ul", {
            arr_fn_on_inner: [lis]
        });
        var html = sb.toString();
        console.log(html);
        $("#zeige_html").val(html);
        window.document.getElementById("content").innerHTML = html;
    }
    function sanitizeHTML(s) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(s));
        return d.innerHTML;
    }
    function start() {
        $(document).ready(function () {
            test_menu();
        });
    }
    exports.start = start;
});
//# sourceMappingURL=hbuild_test.js.map