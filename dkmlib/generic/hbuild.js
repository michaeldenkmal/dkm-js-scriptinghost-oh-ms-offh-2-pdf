var TStringBuilder = (function () {
    function TStringBuilder() {
        var _this = this;
        this._buffer = [];
        this.append = function (line) {
            console.log(line);
            _this._buffer.push(line);
            return _this;
        };
        this.cr = function () {
            _this.append("\n");
            return _this;
        };
        this.toString = function () {
            return _this._buffer.join("");
        };
    }
    return TStringBuilder;
})();
exports.TStringBuilder = TStringBuilder;
function html_encode(val) {
    return val;
}
function quote_af(val) {
    return '"' + val + '"';
}
function fmt_attr(attr) {
    return attr.name + "=" + quote_af(html_encode(attr.value));
}
function fmt_attrs(sb, attrs) {
    var first = true;
    attrs.forEach(function (attr) {
        if (!first) {
            sb.append(" ");
        }
        else {
            first = false;
        }
        sb.append(fmt_attr(attr));
    });
}
function fill_sb_with_tag(sb, tag, o) {
    o.with_end_tag = o.with_end_tag || true;
    sb.append("<" + tag);
    if (!o.attrs) {
        sb.append(">").cr();
    }
    else {
        sb.append(" ");
        fmt_attrs(sb, o.attrs);
        sb.append(">").cr();
    }
    if ((o.arr_fn_on_inner)) {
        o.arr_fn_on_inner.forEach(function (fn) {
            if (fn) {
                fn(sb, o.cbData);
            }
        });
    }
    if (o.innerHtml) {
        sb.append(o.innerHtml).cr();
    }
    if (o.with_end_tag) {
        sb.append("</" + tag + ">").cr();
    }
}
exports.fill_sb_with_tag = fill_sb_with_tag;
function create_attr_class(class_name) {
    return { name: "class", value: class_name };
}
exports.create_attr_class = create_attr_class;
function create_attr_id(html_id) {
    return { name: "id", value: html_id };
}
exports.create_attr_id = create_attr_id;
function create_attr(name, value) {
    return { name: name, value: value };
}
exports.create_attr = create_attr;
function create_attrs(arr) {
    var i = 0, l = arr.length;
    var ret = [];
    for (i = 0; i < l; i += 2) {
        ret.push(create_attr(arr[i], arr[i + 1]));
    }
    return ret;
}
exports.create_attrs = create_attrs;
function create_css_include(sb, attrs, href) {
    var attrs = (create_attrs([
        "type", "text/css",
        "rel", "stylesheet",
        "href", href]));
    fill_sb_with_tag(sb, "link", {
        attr: attrs,
        with_end_tag: false
    });
}
//# sourceMappingURL=hbuild.js.map