'use strict';

const {NamedModulesPlugin, DefinePlugin} = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

function base(config, {rootDir, absSrc, absDist, dist}) {
  return merge.smart(config, {
    context: absSrc,
    entry: [
      'react-hot-loader/patch',
      'app.js',
    ],
    output: {
      filename: '[name].js',
      path: absDist,
      publicPath: '/',
    },
    resolve: {
      modules: [
        absSrc,
        'node_modules',
      ],
    },
    devtool: 'eval',
    plugins: [
      new CleanWebpackPlugin([dist], {root: rootDir}),
      new NamedModulesPlugin(),
      new WebpackNotifierPlugin(),
      new DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify('development')},
      }),
    ],
  });
}

module.exports = base;
