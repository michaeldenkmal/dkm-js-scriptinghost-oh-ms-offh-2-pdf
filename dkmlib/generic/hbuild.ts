export interface IStringBuilder {
    append: (line: string) => IStringBuilder;
    cr: () => IStringBuilder;
    toString:()=> string;
}

export class TStringBuilder implements IStringBuilder {
    _buffer: string[] = [];


    append: ((line: string)=> IStringBuilder) = (line)=>  {
        console.log(line);
        this._buffer.push(line);
        return this;
    }

    cr:()=> IStringBuilder = () =>  {
        this.append("\n");
        return this;
    }

    toString:()=>string = ()=>  {
        return this._buffer.join("");
    }

}

function html_encode(val: string): string {
    // TODO
    return val
}


function quote_af(val: string): string {
    return '"' + val + '"'
}

export interface IAttribute {
    name: string;
    value: string;
}


function fmt_attr(attr: IAttribute) {
    return attr.name + "=" + quote_af(html_encode(attr.value));
}

function fmt_attrs(sb: IStringBuilder, attrs: IAttribute[]): void {
    var first = true;
    attrs.forEach((attr: IAttribute) => {
        if (!first) {
            sb.append(" ");
        } else {
            first = false;
        }
// <a href="$menuItem.href$" id="$menuItem.id$">$menuItem.caption$</a>
        sb.append(fmt_attr(attr));
    });
}


export interface IfnOnInner { (sb: IStringBuilder, cbData: any):void}

export interface IFill_sb_with_tag_opts {
    attrs?: IAttribute[];
    arr_fn_on_inner?: IfnOnInner[];
    cbData?: any;
    with_end_tag?: boolean;
    innerHtml?: string;
}

// def fill_sb_with_tag (sb, tag, attrs, arr_fn_on_inner, cbData, with_end_tag=True):
export function fill_sb_with_tag(sb:IStringBuilder, tag:string, o:IFill_sb_with_tag_opts): void {

    o.with_end_tag = o.with_end_tag || true;
    sb.append("<" + tag);
//    if attrs is None:
    if (!o.attrs) {
        sb.append(">").cr();
    } else {
        sb.append(" ");
        fmt_attrs(sb, o.attrs);
        sb.append(">").cr();
    }
//    for fn_on_inner in arr_fn_on_inner:
    if ((o.arr_fn_on_inner) ) {
        o.arr_fn_on_inner.forEach((fn) => {
            if (fn) {
                fn(sb, o.cbData);
            }
        });
    }
//    if with_end_tag:
//        sb.append("<%s/>" % tag)
    if (o.innerHtml) {
        sb.append(o.innerHtml).cr();
    }
    if (o.with_end_tag) {
        sb.append("</" + tag + ">").cr();
    }
}



export function create_attr_class(class_name: string): IAttribute {
    return { name:"class", value:class_name };
}

export function create_attr_id(html_id: string): IAttribute {
    return { name: "id", value: html_id};
}

export function create_attr(name:string, value:string): IAttribute {
    return { name: name, value: value };
}

export function create_attrs(arr: string[]):IAttribute[] {
    var i = 0, l = arr.length;
    var ret: IAttribute[] = [];
    for (i = 0; i < l; i += 2) {
        ret.push(create_attr(arr[i], arr[i + 1]));
    }
    return ret;
}


//def create_css_include (sb, attrs,href):
function create_css_include(sb: IStringBuilder, attrs: IAttribute[], href: string): void {
    // <link type="text/css" rel="stylesheet" href="du_export.css">
    var attrs = (create_attrs([
        "type", "text/css",
        "rel", "stylesheet",
        "href", href]));
    //    print attrs
    fill_sb_with_tag(sb, "link", {
        attr: attrs,
        with_end_tag:false
    });


}



