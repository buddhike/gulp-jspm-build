var File = require('vinyl');

function buildConfig(config) {
    var configStr = JSON.stringify(config, null, 4);    
    return new File({
        path: 'config.js',
        contents: new Buffer('System.config(' + configStr + ');')
    });
}

module.exports = buildConfig;
