var _ = require('lodash');
var proc = require('process');
var path = require('path');
var through = require('through2');
var parseConfig = require('./parseConfig');
var compile = require('./compile');
var buildConfig = require('./buildConfig');

function build(options) {
    options = options || {};
    var configFilePath = path.join(proc.cwd(), options.config || 'config.js'),
        stream = through.obj();

    options.config = parseConfig(configFilePath);

    compile(options)
        .then(function(result) {
            _.each(result.files, function(file) {
                stream.write(file);
            });
            stream.write(buildConfig(result.config));
            stream.end();
        })
        .catch(function(e){
            stream.destroy(e);
        });

    return stream;
}

module.exports = build;
