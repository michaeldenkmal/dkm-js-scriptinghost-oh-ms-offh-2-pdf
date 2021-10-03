/// reference path="D:\projekte\ts\dkmlib\dkmlib\browser\jquery\jquery.d.ts" />
define(["require", "exports", "../bootstrapUtil"], function (require, exports, bootstrapUtil) {
    function test_menu() {
        document.getElementById("top").innerHTML = bootstrapUtil.genBootStrapNavBar({
            menueCaption: "Test Menue",
            menueItems: [
                {
                    id: "men1",
                    caption: "Menu1"
                },
                {
                    id: "men2",
                    caption: "Menu2"
                },
                {
                    id: "me3",
                    caption: "provoziert fehler"
                }
            ]
        });
    }
    function setUpMenu() {
        var actionMap = {
            "men1": function () {
                alert("Menu1");
            },
            "men2": function () {
                alert("Menu2");
            }
        };
        bootstrapUtil.setupMenu(actionMap);
    }
    function start() {
        test_menu();
        setUpMenu();
    }
    exports.start = start;
});
//# sourceMappingURL=bootstrapUtil_test.js.map