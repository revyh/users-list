'use strict';

const {resolve} = require('path');
const base = require('./toolsUtils/build/base');
const js = require('./toolsUtils/build/js');
const misc = require('./toolsUtils/build/misc');
const devServer = require('./toolsUtils/build/devServer');

const configTransforms = [
  base,
  js,
  misc,
  devServer,
];

const data = {
  rootDir: __dirname,
  src: 'src',
  dist: 'dist',
  absSrc: resolve(__dirname, 'src'),
  absDist: resolve(__dirname, 'dist'),
};

function build() {
  return configTransforms.reduce(
    (result, transform) => transform(result, data),
    {}
  );
}

module.exports = build;
