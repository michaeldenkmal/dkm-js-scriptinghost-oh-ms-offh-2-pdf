export function exportNsObj(libName: string, objName: string, obj: any) {
    var dkm_libName = libName;
    var dkm3100libs;
    if (typeof window["dkm3100"] != "object") {
        window["dkm3100"] = {}
    }
    dkm3100libs = window["dkm3100"];

    if (typeof dkm3100libs[dkm_libName] != "object") {
        dkm3100libs[dkm_libName] = {};
    }

    if (typeof dkm3100libs[dkm_libName][objName] != "object") {
        dkm3100libs[dkm_libName][objName] = obj;
    }
} 