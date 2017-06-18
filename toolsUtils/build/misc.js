'use strict';

const {resolve} = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function misc(config, {absSrc}) {
  const miscDir = resolve(absSrc, 'misc');
  const htmlEntry = resolve(absSrc, 'index.html');

  return merge.smart(config, {
    module: {
      rules: [
        {
          include: absSrc,
          exclude: miscDir,
          test: /\.(jpg|jpeg|png|gif|webp|eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
              name: '[name]_[hash:4].[ext]',
            },
          },
        }, {
          include: miscDir,
          use: {
            loader: 'file-loader',
            options: {name: '[name].[ext]'},
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: htmlEntry,
      }),
    ],
  });
}

module.exports = misc;
