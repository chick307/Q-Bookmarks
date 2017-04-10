/* eslint sort-keys: 'error' */

const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const manifest = require('./manifest.js');

module.exports = {
    context: __dirname,
    entry: {
        popup: './src/popup.js',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: { chrome: 73 } }],
                                ['@babel/preset-react'],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            camelCase: true,
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib'),
    },
    plugins: [
        new GenerateJsonPlugin('../manifest.json', manifest, null, 2),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
};
