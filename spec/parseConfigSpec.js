var parseConfig = require('../lib/parseConfig');

describe('parseConfig', function() {
    var testConfig = './spec/support/config.js';
    it('should parse configuration', function() {
        var c = parseConfig(testConfig);
        expect(c.transpiler).toBe('babel');
    });
});
