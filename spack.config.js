const path = require("path");
const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    build: path.join(__dirname + '/src/index.ts')
  },
  output: {
    path: path.join(__dirname + '/lib')
  },
  module: {},
})