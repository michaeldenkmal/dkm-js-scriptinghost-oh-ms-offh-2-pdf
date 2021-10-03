define(["require", "exports", "dkmlib/generic/u"], function (require, exports, u) {
    function findKendoWidget(cssSel, widgetTypeName) {
        return $(cssSel).data(widgetTypeName);
    }
    exports.findKendoWidget = findKendoWidget;
    function kendoWidgetExists(cssSel, widgetTypeName) {
        return findKendoWidget(cssSel, widgetTypeName) != null;
    }
    exports.kendoWidgetExists = kendoWidgetExists;
    function findKendoComboBox(cssSel) {
        return findKendoWidget(cssSel, exports.WIDGET_TYPES.combo);
    }
    exports.findKendoComboBox = findKendoComboBox;
    exports.WIDGET_TYPES = {
        combo: "kendoComboBox",
        grid: "kendoGrid",
        window: "kendoWindow",
        validator: "kendoValidator",
        kendoDropDownList: "kendoDropDownList"
    };
    exports.VIEW_MODEL_EVENTS = {
        "change": "change",
        "get": "get",
        "set": "set"
    };
    function findKendoGrid(cssSel) {
        return findKendoWidget(cssSel, exports.WIDGET_TYPES.grid);
    }
    exports.findKendoGrid = findKendoGrid;
    function findKendoWindow(cssSel) {
        return findKendoWidget(cssSel, exports.WIDGET_TYPES.window);
    }
    exports.findKendoWindow = findKendoWindow;
    function findKendoDropDownList(cssSel) {
        return findKendoWidget(cssSel, exports.WIDGET_TYPES.kendoDropDownList);
    }
    exports.findKendoDropDownList = findKendoDropDownList;
    function fillVMbyPlainRow(viewModel, dataRow, mapOfFields, opts) {
        var opts = opts || {
            copyOnlyExistsProps: true
        };
        if ("undefined" == typeof opts.copyOnlyExistsProps) {
            opts.copyOnlyExistsProps = true;
        }
        Object.keys(mapOfFields).forEach(function (key) {
            var skip = false;
            var dstKey = key;
            if ((opts) && (opts.fieldNameMapping)) {
                dstKey = opts.fieldNameMapping[key] || key;
            }
            if (!skip) {
                viewModel.set(dstKey, dataRow[key]);
            }
        });
    }
    exports.fillVMbyPlainRow = fillVMbyPlainRow;
    function copyFromVMToPlainRow(viewModel, dataRow, mapOfFields, opts) {
        Object.keys(mapOfFields).forEach(function (key) {
            var srcKey = key;
            if ((opts) && (opts.fieldNameMapping)) {
                srcKey = opts.fieldNameMapping[key] || key;
            }
            dataRow[key] = viewModel.get(srcKey);
        });
        return dataRow;
    }
    exports.copyFromVMToPlainRow = copyFromVMToPlainRow;
    function copyObjPropsToViewModel(obj, viewModel) {
        var keys = Object.keys(obj);
        keys.forEach(function (key) {
            viewModel.set(key, obj[key]);
        });
    }
    exports.copyObjPropsToViewModel = copyObjPropsToViewModel;
    function setKendoWidgetDropDownWidth(kendoWidget, width) {
        kendoWidget.list.width(width);
    }
    exports.setKendoWidgetDropDownWidth = setKendoWidgetDropDownWidth;
    exports.GERMAN_DATE_FORMAT = "dd.MM.yyyy";
    exports.GERMAN_DATE_TIME_FORMAT = "dd.MM.yyyy HH:mm";
    function fmtDateWithKendo(vDate) {
        return kendo.toString(vDate, exports.GERMAN_DATE_FORMAT);
    }
    exports.fmtDateWithKendo = fmtDateWithKendo;
    function fmtDateTimeWithKendo(vDate) {
        return kendo.toString(vDate, exports.GERMAN_DATE_TIME_FORMAT);
    }
    exports.fmtDateTimeWithKendo = fmtDateTimeWithKendo;
    function getModelProp(model, prop) {
        if ("function" == typeof model["get"]) {
            return model.get(prop);
        }
        else {
            return model[prop];
        }
    }
    exports.getModelProp = getModelProp;
    function setModelProp(model, prop, val) {
        if ("function" == typeof model["set"]) {
            return model.set(prop, val);
        }
        else {
            return model.set(prop, val);
        }
    }
    exports.setModelProp = setModelProp;
    function setModelDirtyFlag(model, val) {
        model["dirty"] = val;
    }
    exports.setModelDirtyFlag = setModelDirtyFlag;
    function getModelDirtyFlag(model) {
        return model["dirty"];
    }
    exports.getModelDirtyFlag = getModelDirtyFlag;
    function getFieldFromModelChangeEvt(e) {
        return e.field;
    }
    exports.getFieldFromModelChangeEvt = getFieldFromModelChangeEvt;
    function setGermanCulture() {
        kendo.culture("de-DE");
    }
    exports.setGermanCulture = setGermanCulture;
    function deleteRowFromModelArray(modelArray, fnFilter) {
        var i = getRecIdxInViewModelArray(modelArray, fnFilter);
        if (i > -1) {
            modelArray.splice(i, 1);
            return;
        }
    }
    exports.deleteRowFromModelArray = deleteRowFromModelArray;
    function getRecIdxInViewModelArray(modelArray, fnFilter) {
        var i, l = modelArray.length;
        for (i = 0; i < l; i++) {
            var row = modelArray[i];
            if (fnFilter(row, i)) {
                return i;
            }
        }
        return -1;
    }
    exports.getRecIdxInViewModelArray = getRecIdxInViewModelArray;
    function upsertRowInViewModelArray(opts) {
        function copyValues(dst, fieldNames) {
            u.copyPropsByPropNames(opts.rowToUpdate, dst, fieldNames);
        }
        function evalFieldsToCopy() {
            if (opts.fieldNames) {
                return opts.fieldNames;
            }
            return Object.keys(opts.rowToUpdate);
        }
        function createNewRow() {
            var newRow = {};
            var fieldNames;
            copyValues(newRow, evalFieldsToCopy());
            return newRow;
        }
        function insertRow() {
            var newRow = createNewRow();
            return opts.modelArray.push(newRow);
        }
        function updateRow() {
            var fieldNames;
            copyValues(opts.modelArray[recIdx], evalFieldsToCopy());
        }
        var recIdx = getRecIdxInViewModelArray(opts.modelArray, opts.fnFilter);
        if (recIdx = -1) {
            recIdx = insertRow();
        }
        else {
            updateRow();
        }
        return recIdx;
    }
    exports.upsertRowInViewModelArray = upsertRowInViewModelArray;
});
//# sourceMappingURL=kendoUtil.js.map