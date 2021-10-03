define(["require", "exports"], function (require, exports) {
    function renderTemplate(templateFullName, data) {
        if (typeof window['JST'] !== "object") {
            throw new Error("keine Jade Templates vorhanden");
        }
        if (typeof window['JST'][templateFullName] == "undefined") {
            throw new Error("konnte kein jadeTemplate \"" + templateFullName + "\" finden");
        }
        var html = window['JST'][templateFullName](data);
        //console.log("templateFullName=" + templateFullName + ", html=" + html);
        return html;
    }
    exports.renderTemplate = renderTemplate;
    function getTemplateName(projName, middleName, templateName) {
        //kstbtrg/jade/ga/gaGastInfo
        return projName + "/" + middleName + "/" + templateName;
    }
    exports.getTemplateName = getTemplateName;
});
//# sourceMappingURL=jadeUtil.js.map