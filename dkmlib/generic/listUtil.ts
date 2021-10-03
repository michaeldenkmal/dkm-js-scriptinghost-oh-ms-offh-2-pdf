/**
 * Created by michael on 24.06.2015.
 */


export function strArrayToUpperCase(arr:string[]):string[] {
    var ret:string[] = [];
    arr.forEach((e)=> {
        ret.push(e.toUpperCase());
    })
    return ret;
}

export function getNotExistingElems(arrToCheck:string[], arrToFind:string[],
    fnNotExistingFound:(searchelem:string, idx:number)=>boolean )
    :void {

    var i:number, l=arrToFind.length;
    for (i=0; i<l; i++) {
        var search:string = arrToFind[i];
        if (arrToCheck.indexOf(search) <0) {
            if (!fnNotExistingFound(search, i)) {
                return;
            }
        }
    }
}