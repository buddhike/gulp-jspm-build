var buildConfig = require('../lib/buildConfig');

describe('buildConfig', function() {
    it('should wrap config object in a call to System.config', function() {
        var config = { a: 'b' };
        var f = buildConfig( config );
        expect(f.contents.toString()).toBe('System.config(' + JSON.stringify(config, null, 4) + ');');
    });
});
