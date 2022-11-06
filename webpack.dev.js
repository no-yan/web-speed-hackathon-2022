/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");

const config = require("./webpack.common");
const client = config[0];
const server = config[1];

module.exports = [
  merge(client, {
    mode: "development",
    plugins: [new BundleAnalyzerPlugin()],
  }),
  server,
];
