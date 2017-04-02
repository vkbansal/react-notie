/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "dist/react-notie.js",
        libraryTarget: 'umd',
        library: 'ReactNotie'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets:  [
                            'react',
                            [
                                "env",
                                {
                                    "modules": false,
                                    "targets": {
                                        "browsers": "Edge >= 12, FireFox >= 38, Chrome >= 47, Opera >= 34, Safari >= 9"
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread'
                        ]
                    },
                }],
                include: [
                    path.resolve(__dirname, './src')
                ]
            }
        ]
    },
    externals: [{
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    }],
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
};
