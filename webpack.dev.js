/* eslint sort-keys: 'error' */
/* eslint-disable prefer-object-spread */

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const config = require('./webpack.config.js');
const manifest = require('./manifest.js');

module.exports = Object.assign({}, config, {
    mode: 'development',
    plugins: config.plugins.map((plugin) => {
        if (plugin instanceof GenerateJsonPlugin) {
            return new GenerateJsonPlugin('../manifest.json', Object.assign({}, manifest, {
                /* eslint-disable camelcase */
                content_security_policy: `${manifest.content_security_policy}; script-src 'self' 'unsafe-eval'`,
                /* eslint-enable camelcase */
            }), null, 2);
        } else {
            return plugin;
        }
    }),
});
