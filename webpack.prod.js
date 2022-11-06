/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");

const config = require("./webpack.common");
const client = config[0];
const server = config[1];

module.exports = [
  merge(client, { mode: "production" }),
  // not minified intentionally for TypeORM bug.
  merge(server, { mode: "development" }),
];
