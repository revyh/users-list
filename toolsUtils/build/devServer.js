'use strict';

const merge = require('webpack-merge');

function devServer(config, {dist}) {
  return merge.smart(config, {
    devServer: {
      contentBase: dist,
      port: 1337,
      compress: true,
      publicPath: '/',
    },
  });
}

module.exports = devServer;
