/* eslint sort-keys: 'error' */
/* eslint-disable prefer-object-spread */

const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const manifest = require('./manifest.js');
const common = require('./webpack.common.js');

module.exports = Object.assign({}, common, {
    mode: 'production',
    output: Object.assign({}, common.output, {
        path: path.resolve(__dirname, 'build', 'release'),
    }),
    plugins: common.plugins.concat([
        new GenerateJsonPlugin('manifest.json', manifest, null, 2),
    ]),
});
