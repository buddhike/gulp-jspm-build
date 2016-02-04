var buildConfig = require('../lib/buildConfig');

describe('buildConfig', function() {
    it('should wrap config object in a call to System.config', function() {
        var config = { a: 'b' };
        var f = buildConfig( config );
        expect(f.contents.toString()).toBe('System.config(' + JSON.stringify(config, null, 4) + ');');
    });
    
    it('should create a stably-ordered config file', function() {
        var config1 = { a: 'b', bundles: { 'bundle.js': ['something.js', 'another.js']} };
        var config2 = { bundles: { 'bundle.js': ['another.js', 'something.js']}, a: 'b' };
        var f1 = buildConfig( config1 );
        var f2 = buildConfig( config2 );
        expect(f1.contents.toString()).toBe(f2.contents.toString());
    });
});
