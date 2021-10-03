export interface IBuildJadeTemplateName {
    (name: string, postFix?: string): string
}

export function renderTemplate(templateFullName: string, data?: any): string {
    if (typeof window['JST'] !== "object") {
        throw new Error("keine Jade Templates vorhanden");
    }
    if (typeof window['JST'][templateFullName] == "undefined") {
        throw new Error(`konnte kein jadeTemplate "${templateFullName}" finden`);
    }
    var html = window['JST'][templateFullName](data);
    //console.log("templateFullName=" + templateFullName + ", html=" + html);
    return html;
}


export function getTemplateName(projName: string, middleName:string , templateName: string): string {
    //kstbtrg/jade/ga/gaGastInfo
    return projName + "/" + middleName + "/" + templateName;
}