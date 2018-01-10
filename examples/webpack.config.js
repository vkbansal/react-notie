/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

const config = {
    entry: ['./examples/index.tsx'],
    output: {
        filename: DEV ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: DEV ? '/' : '/react-notie/',
        sourceMapFilename: 'bundle.js.map'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                include: [path.resolve(__dirname, '../src'), __dirname]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'glamor-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'examples/index.html',
            inject: true,
            filename: 'index.html'
        })
    ]
};

!PROD && (config.devtool = 'source-map');

PROD &&
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new MinifyPlugin()
    );

module.exports = config;
