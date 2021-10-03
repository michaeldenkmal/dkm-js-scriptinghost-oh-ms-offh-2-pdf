define(["require", "exports", "../../generic/hbuild", "../generic/browserUtil"], function (require, exports, hbuild, jsUtil) {
    exports.JQUERY_MENUE_ITEMS_EXPRS = "ul.navbar-nav";
    function genBootStrapNavBar(o) {
        //<nav class="navbar navbar-inverse navbar-static-top" role= "navigation" >
        //<div class="container" >
        //<!--Brand and toggle get grouped for better mobile display -- >
        //    <div class="navbar-header" >
        //<button type="button" class="navbar-toggle" data- toggle="collapse" data- target="#menu-links" >
        //<span class="sr-only" > Toggle navigation< /span>
        //< span class="icon-bar" > </span>
        //< span class="icon-bar" > </span>
        //< span class="icon-bar" > </span>
        //< /button>
        //< a class="navbar-brand" href= "#" > $menueCaption$ < /a>
        //< /div>
        //< !--Collect the nav links, forms, and other content for toggling -- >
        //    <div class="collapse navbar-collapse" id= "menu-links" >
        //<ul class="nav navbar-nav" >
        //$menuItems:menuItem()$
        //< /ul>
        //< /div>
        //< !-- /.navbar-collapse -->
        //< /div>
        //< !-- /.container -->
        //< /nav>
        function buildSpanIconBar(sb, d) {
            // <span class="icon-bar"></span>
            hbuild.fill_sb_with_tag(sb, "span", {
                attrs: [hbuild.create_attr_class("icon-bar")]
            });
        }
        function buildSpanSrOnly(sb, d) {
            // <span class="sr-only">Toggle navigation</span>
            hbuild.fill_sb_with_tag(sb, "span", {
                attrs: [hbuild.create_attr_class("sr-only")],
                innerHtml: "Toggle navigation"
            });
        }
        function buildNavBarHeaderToggleButton(sb, cbData) {
            // <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu-links">
            var attrs = hbuild.create_attrs([
                "type",
                "button",
                "class",
                "navbar-toggle",
                "data-toggle",
                "collapse",
                "data-target",
                "#menu-links"
            ]);
            var arr_spans = [buildSpanSrOnly];
            var i;
            for (i = 0; i < 3; i++) {
                arr_spans.push(buildSpanIconBar);
            }
            hbuild.fill_sb_with_tag(sb, "button", {
                attrs: attrs,
                arr_fn_on_inner: arr_spans
            });
        }
        function buildNavBarHeaderABrand(sb, cbData) {
            // <a class="navbar-brand" href="#">$menueCaption$</a>
            hbuild.fill_sb_with_tag(sb, "a", {
                attrs: [hbuild.create_attr_class("brand")],
                innerHtml: o.menueCaption
            });
        }
        // nav bar Header
        function buildNavBarHeader(sb, cbData) {
            hbuild.fill_sb_with_tag(sb, "div", {
                attrs: [hbuild.create_attr_class("navbar-header")],
                arr_fn_on_inner: [buildNavBarHeaderToggleButton, buildNavBarHeaderABrand]
            });
        }
        //li menu items
        function buildMenuItem(sb, cbData) {
            // <a href="$menuItem.href$" id="$menuItem.id$">$menuItem.caption$</a>
            var mi = cbData.mi;
            var href = mi.href || '#';
            var arr_str_attr = ["href", href, "id", mi.id];
            hbuild.fill_sb_with_tag(sb, "a", {
                attrs: hbuild.create_attrs(arr_str_attr),
                innerHtml: mi.caption
            });
        }
        // ul
        function buildMenuItems(sb, cbData) {
            // <ul class="nav navbar-nav" >
            o.menueItems.forEach(function (mi) {
                hbuild.fill_sb_with_tag(sb, "li", {
                    arr_fn_on_inner: [buildMenuItem],
                    cbData: {
                        mi: mi
                    }
                });
            });
        }
        function buildUlMenuItems(sb, cbData) {
            hbuild.fill_sb_with_tag(sb, "ul", {
                attrs: [hbuild.create_attr_class("nav navbar-nav")],
                arr_fn_on_inner: [buildMenuItems]
            });
        }
        // nav bar collaps
        function buildNavBarCollaps(sb, cbData) {
            // <div class="collapse navbar-collapse" id="menu-links">
            hbuild.fill_sb_with_tag(sb, "div", {
                attrs: hbuild.create_attrs(["class", "collapse navbar-collapse", "id", "menu-links"]),
                arr_fn_on_inner: [buildUlMenuItems]
            });
        }
        // container Class erzeugen
        function buildDivContainer(sb, cbData) {
            hbuild.fill_sb_with_tag(sb, "div", {
                attrs: [hbuild.create_attr_class("container")],
                arr_fn_on_inner: [buildNavBarHeader, buildNavBarCollaps]
            });
        }
        // navbar als aüßertes erzeugen
        var sb = new hbuild.TStringBuilder();
        hbuild.fill_sb_with_tag(sb, "nav", {
            attrs: hbuild.create_attrs([
                "class",
                "navbar navbar-inverse navbar-static-top",
                "role",
                "navigation"
            ]),
            arr_fn_on_inner: [buildDivContainer]
        });
        return sb.toString();
    }
    exports.genBootStrapNavBar = genBootStrapNavBar;
    function setupMenu(actionmap) {
        var j_menuItems = $(exports.JQUERY_MENUE_ITEMS_EXPRS);
        if (j_menuItems.length == 0) {
            throw new Error("konnte Menuitems expr nicht finden");
        }
        j_menuItems.bind("click", function (e) {
            var id = jsUtil.getSourceIdFromEvent(e);
            if (id == null) {
                //throw new Error("Konnte id nicht ermitteln");
                return;
            }
            if (actionmap[id]) {
                actionmap[id]();
            }
            else {
                throw new Error("Actionmap enthält keine Action für id=" + id);
            }
        });
    }
    exports.setupMenu = setupMenu;
});
//# sourceMappingURL=bootstrapUtil.js.map