/* eslint sort-keys: 'error' */

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    entry: {
        'options-page': './src/options-page.js',
        'popup': './src/popup.js',
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
    },
    plugins: [
        new CopyPlugin([{ from: 'assets', to: 'assets' }]),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
};
