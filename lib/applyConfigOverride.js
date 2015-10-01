var _ = require('lodash');

function applyConfigOverride(config, options) {
    return _.merge(config, options.configOverride);
}

module.exports = applyConfigOverride;
