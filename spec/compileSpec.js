var _ = require('lodash');
var proxyquire = require('proxyquire');

var builder = jasmine.createSpyObj('bundle', ['config', 'bundle']);
builder.bundle.and.returnValue(Promise.resolve({
    source: 'source',
    sourceMap: 'source-map',
    modules: []
}));

var compile = proxyquire('../lib/compile', {
    'systemjs-builder': function () {
        _.assign(this, builder);
    }
});

describe('compile', function() {
    it('should invoke builder for each bundle', function(done) {
        compile({
            config: { },
            bundles: [
                { src: 'a', dst: 'b', options: { minify: true } },
                { src: 'e', dst: 'f'}
            ]}
        )
        .then(function() {
            expect(builder.bundle).toHaveBeenCalledWith('a', 'b', { minify: true });
            expect(builder.bundle).toHaveBeenCalledWith('e', 'f', {});
            done();
        });
    });

    it('should return config with bundles', function(done) {
        var config = {};
        compile({
            config: config,
            bundles: [ { src: 'a', dst: 'b' }]
        })
        .then(function(result) {
            expect(result.config.bundles).toEqual( { b: [] });
            done();
        });
    });

    it('should return a vinyl file for bundle', function(done) {
        compile({
            bundles: [ { src: 'a', dst: 'b' }]
        })
        .then(function(result){
            var sourceFile = _.find(result.files, function(f) {
                return f.path === 'b';
            });

            expect(sourceFile.contents.toString()).toBe('source');
            done();
        })
        .catch(function(e) {
            done.fail(e);
        });
    });

    it('should return a vinyl file for source maps', function(done) {
        compile({
            bundles: [ { src: 'a', dst: 'b', options: { sourceMaps: true } } ]
        })
        .then(function(result){
            var sourceMapFile = _.find(result.files, function(f) {
                return f.path === 'b.map';
            });

            expect(sourceMapFile.contents.toString()).toBe('source-map');
            done();
        })
        .catch(function(e) {
            done.fail(e);
        });
    });
});

describe('passing options to system builder', function() {
    it('should pass the global options specified', function(done) {
        var opts = {
            minify: true
        };

        compile({
            bundleOptions: opts,
            bundles: [ { src: 'a', dst: 'b' }]
        })
        .then(function() {
            expect(builder.bundle).toHaveBeenCalledWith('a', 'b', opts);
            done();
        });
    });

    it('should pass the overrides specified for each bundle', function(done) {
        var opts = {
            minify: true
        };

        compile({
            bundleOptions: {
                minify: false
            },
            bundles: [ { src: 'a', dst: 'b', options: opts }]
        })
        .then(function() {
            expect(builder.bundle).toHaveBeenCalledWith('a', 'b', opts);
            done();
        });
    });
});
