/* eslint-disable @typescript-eslint/no-var-requires */
const CompressionPlugin = require("compression-webpack-plugin");
const { merge } = require("webpack-merge");

const config = require("./webpack.common");
const client = config[0];
const server = config[1];

module.exports = [
  merge(client, { mode: "production", plugins: [new CompressionPlugin()] }),
  // not minified intentionally for TypeORM bug.
  merge(server, { mode: "development" }),
];
