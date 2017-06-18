'use strict';

const merge = require('webpack-merge');
const mergeExtensions = require('./mergeExtensions');

const EXTENSIONS = ['.js', '.json', '.jsx'];

function js(config, {absSrc}) {
  const origExtensions = config.resolve && config.resolve.extensions;

  return merge.smart(config, {
    module: {
      rules: [
        {
          include: absSrc,
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {cacheDirectory: true},
            },
          ],
        },
      ],
    },
    resolve: {extensions: mergeExtensions(origExtensions, EXTENSIONS)},
  });
}

module.exports = js;
