const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  plugins: [
    new CheckerPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        warnings: true,
      },
    }),
  ],
});
