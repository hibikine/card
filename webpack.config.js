const { CheckerPlugin } = require('awesome-typescript-loader');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  module: {
    /* ファイルローダーなどの設定 */
    rules: [
      /* SASS */
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externals: [{ 'pixi.js': 'PIXI' }],
  plugins: [new CheckerPlugin()],
});
