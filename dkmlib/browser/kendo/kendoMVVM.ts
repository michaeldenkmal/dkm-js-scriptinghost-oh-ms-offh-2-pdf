import modelUtil = require("dkmlib/generic/modelUtil");
import kendoUtil = require("dkmlib/browser/kendo/kendoUtil");
import u = require("dkmlib/generic/u");
import browserUtil = require("dkmlib/browser/generic/browserUtil");


export class VM_Base extends kendo.data.ObservableObject{

    protected __status__ = "";
    protected __error__ = "";
    protected __logLines__ : kendo.data.ObservableArray = new kendo.data.ObservableArray([]);

    protected __refresh___ = false;


    log: (msg: string) => void = (msg) => {
        this.LogLines.push(msg);
    }
    

    get HtmlLog(): string {
        var ret: string[] = [];
        this.LogLines.forEach((logLine) => {
            ret.push("<p>" + u.htmlEscape(logLine.toString()) + "</p>");
        });
        return ret.join("\n");
    }

    get LogLines(): kendo.data.ObservableArray {
        return this.get("__logLines__");
    }

    clearLog: () => void = () => {
        this.LogLines = new kendo.data.ObservableArray([]);
    }

    get Error(): string {
        return this.get("__error__");
    }

    get Status(): string {
        return this.get("__status__");
    }

    funcExists: (fn:string) => boolean = (fn) => {
        return "function" === typeof this[fn];
    }

    setExists: () => boolean = () => {
        return this.funcExists("set");
    }

    getExists: () => boolean = () => {
        return this.funcExists("get");
    }



    setV: (varName: any, value: any) => void = (n,v)=> {
        if (!this.setExists()) {
            this[n] = v;
        } else {
            this["set"](n, v);
        }
    }

    getV: (name: any) => any = (n) => {
        if (!this.getExists()) {
            return this[n];
        } else {
            return this["get"](n);
        }
    }

    bind_: (evtName: string, handler:(e)=>void) => void = (e, h) => {
        if (this.funcExists("bind")) {
            this["bind"](e, h);
        }
    }

    setStatus: (msg: string) => void = (msg) => {
        this.setV("__status__", msg);
    }

    setError: (errstr: string) => void = (errstr) => {
        this.setV("__error__", errstr);
    }

    private EXCLUDED_DIRTY_FIELDS = ["btnSaveEnabled", "__status__", "__error__","__refresh__"]
    
    setChangeHandler:() => void = () => {
        this.bind_(kendoUtil.VIEW_MODEL_EVENTS.change, this.onChange);
    }

    onChange(e) {
        var fieldName = kendoUtil.getFieldFromModelChangeEvt(e);
        if (this.EXCLUDED_DIRTY_FIELDS.indexOf(fieldName) == -1) {
            kendoUtil.setModelProp(this, "btnSaveEnabled", true);
        }
    }

    refreshData: () => void = () => {
        this.setV("__refresh__", true);
    }

    constructor(data: any) {
        super(data);
    }

    setStatusWithTimeOut: (msg: string, timeout?: number) => void = (msg, timeout) => {
        this.setStatus(msg);
        var that = this;
        browserUtil.runlater(() => { that.setStatus("")}, timeout|2000);
    }
}