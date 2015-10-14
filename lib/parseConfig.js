var path = require('path');
var fs = require('fs');

function parseConfig(file) {
    var source = '',
        config = null;

    try {
        source = fs.readFileSync(file);
    } catch (e) {
    }

    /* jshint ignore:start */
    var System = {
        config: function(obj) {
            config = obj;
        }
    };
    /* jshint ignore:end */

    eval(source.toString());
    return config;
}

module.exports = parseConfig;
