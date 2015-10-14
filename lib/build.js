var _ = require('lodash');
var path = require('path');
var through = require('through2');
var parseConfig = require('./parseConfig');
var compile = require('./compile');
var applyConfigOverride = require('./applyConfigOverride');
var buildConfig = require('./buildConfig');

function inferBaseUrl() {
    var pjson = require(path.join(process.cwd(), 'package.json'));

    if(pjson && pjson.jspm && pjson.jspm.directories) {
        return pjson.jspm.directories.baseURL;
    }
    return '.';
};

function build(options) {
    options = options || {};
    options.baseUrl = options.baseUrl || inferBaseUrl();

    var configFilePath = path.join(process.cwd(), options.baseUrl, 'config.js'),
        stream = through.obj();

    options.config = parseConfig(configFilePath);

    compile(options)
        .then(function(result) {
            _.each(result.files, function(file) {
                stream.write(file);
            });
            var configFile = buildConfig(applyConfigOverride(result.config, options));
            stream.write(configFile);
            stream.end();
        })
        .catch(function(e){
            stream.destroy(e);
        });

    return stream;
}

module.exports = build;
