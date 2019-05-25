/* eslint sort-keys: 'error' */
/* eslint-disable prefer-object-spread */

const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const manifest = require('./manifest.js');
const common = require('./webpack.common.js');

module.exports = Object.assign({}, common, {
    devtool: 'inline-source-map',
    mode: 'development',
    output: Object.assign({}, common.output, {
        path: path.resolve(__dirname, 'build', 'debug'),
    }),
    plugins: common.plugins.concat([
        new GenerateJsonPlugin('manifest.json', Object.assign({}, manifest, {
            /* eslint-disable camelcase */
            content_security_policy: `${manifest.content_security_policy}; script-src 'self' 'unsafe-eval'`,
            /* eslint-enable camelcase */
        }), null, 2),
    ]),
});
