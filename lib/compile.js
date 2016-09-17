var path = require('path');
var File = require('vinyl');
var _ = require('lodash');
var Builder = require('systemjs-builder');

/*
 * Uses jspm api to bundle the specified input.
 * Returns a collection of vinyl files representing the bundled output.

 * options contains an array of bundle configs
 * Each bundle config takes the following form:
 * src
 * dst
 * options

 * Returns a promise which gets resolved or rejected upon completing
 * all specified bundles.
 */
function compile(options) {
    options = _.assign({
        baseUrl: '.',
        bundleSfx: false,
        bundles: [],
        config: {},
        bundleOptions: {}
    }, options);

    var files = [],
        bundlesConfig = {},
        builder = new Builder(options.baseUrl, options.config),
        build = _.bind(options.bundleSfx ? builder.buildStatic : builder.bundle, builder);

    var promises = _.map(options.bundles, function(bundle) {
        if(!bundle.src) {
            throw new Error('bundle src is not specified');
        }

        if(!bundle.dst) {
            throw new Error('bundle dst is not specified');
        }

        var opts = _.assign(_.clone(options.bundleOptions), bundle.options);

        return build(bundle.src, opts)
            .then(function(result) {
                var source = result.source;

                if(opts.sourceMaps) {
                    var mapFileName = bundle.dst + '.map';
                    source = source + '\n//# sourceMappingURL=' + mapFileName;

                    files.push(new File({
                        path: bundle.dst + '.map',
                        contents: new Buffer(result.sourceMap.toString())
                    }));
                }

                files.push(new File({
                    path: bundle.dst,
                    contents: new Buffer(source)
                }));

                bundlesConfig[bundle.dst] = result.modules;
            });
    });

    return Promise.all(promises).then(function() {
        return {
            files: files,
            config: _.extend(options.config, { bundles: bundlesConfig })
        };
    });
}

module.exports = compile;
