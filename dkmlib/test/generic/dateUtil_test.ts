/// reference path="../../external/qunit/qunit.d.ts" />
import dateUtil = require("dkmlib/generic/dateUtil");

export function startTests() {
    window["module"]("dateUtil_test");
    test("buildDate", function (assert: QUnitAssert) {
        var expected:Date = new Date(1970, 3, 13);
        var actual: Date = dateUtil.buildDate(1970, 2, 13);
        assert.equal(actual.toString(), expect.toString(), "Sollte gleich sein");
    });
}