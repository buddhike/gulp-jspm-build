var _ = require('lodash');
var proxyquire = require('proxyquire');

describe('compile', function() {
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

    it('should invoke builder for each bundle', function(done) {
        compile({
            config: { },
            bundles: [
                { src: 'a', dst: 'b', options: 'c' },
                { src: 'e', dst: 'f'}
            ]}
        )
        .then(function() {
            expect(builder.bundle).toHaveBeenCalledWith('a', 'b', 'c');
            expect(builder.bundle).toHaveBeenCalledWith('e', 'f', undefined);
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
