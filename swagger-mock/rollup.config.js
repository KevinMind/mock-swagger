import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import run from 'rollup-plugin-run';

import pkg from './package.json';

import config from './tools/config';

const formatIndex = path => `${path}/index.js`;

export default {
  input: formatIndex(config.PROJECT_SRC),
  output: {
    name: pkg.name,
    file: formatIndex(config.PROJECT_BUILD),
    format: 'umd',
  },
  plugins: [
    resolve(), // so Rollup can find `ms`
    json(),
    commonjs(), // so Rollup can convert `ms` to an ES module
    run(),
  ],
};
