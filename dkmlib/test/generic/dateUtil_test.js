define(["require", "exports", "dkmlib/generic/dateUtil"], function (require, exports, dateUtil) {
    function startTests() {
        window["module"]("dateUtil_test");
        test("buildDate", function (assert) {
            var expected = new Date(1970, 3, 13);
            var actual = dateUtil.buildDate(1970, 2, 13);
            assert.equal(actual.toString(), expect.toString(), "Sollte gleich sein");
        });
    }
    exports.startTests = startTests;
});
//# sourceMappingURL=dateUtil_test.js.map