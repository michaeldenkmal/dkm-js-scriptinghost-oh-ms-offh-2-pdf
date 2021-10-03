/// reference path="D:\projekte\ts\dkmlib\dkmlib\browser\jquery\jquery.d.ts" />

import bootstrapUtil = require("../bootstrapUtil");
import jsUtil = require("../../generic/browserUtil");

function test_menu() {

    document.getElementById("top").innerHTML = 
    bootstrapUtil.genBootStrapNavBar({
        menueCaption:"Test Menue",
        menueItems: [
            {
                id:"men1",
                caption: "Menu1"
            },
            {
                id: "men2",
                caption: "Menu2"
            },
            {
                id: "me3",
                caption:"provoziert fehler"
            }               
        ]
    });
}

function setUpMenu() {
    var actionMap: bootstrapUtil.IActionMap = {
        "men1": () => { alert("Menu1");},
        "men2": () => { alert("Menu2");}
    }
    bootstrapUtil.setupMenu(actionMap);
}

export function start() {
    test_menu();
    setUpMenu();
}
 