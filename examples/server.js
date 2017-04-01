/* eslint-disable import/no-commonjs, import/no-nodejs-modules, import/no-extraneous-dependencies, no-console */
const fs = require('fs');
const path = require('path');

const Express = require('express');
const webpack = require('webpack');

const config = require('./webpack.config');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');

const app = new Express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true
}));

app.get('*', (req, res) => {
    res.status(200).send(html);
});

const HOST = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 9000;

app.listen(PORT, HOST, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log(`App started ${HOST}:${PORT}`);
});
