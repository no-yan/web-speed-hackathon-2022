/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    module: {
      rules: [
        {
          resourceQuery: (value) => {
            const query = new URLSearchParams(value);
            return query.has("raw");
          },
          type: "asset/source",
        },
        {
          exclude: /[\\/]esm[\\/]/,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              exclude: [
                /node_modules\/react/,
                /node_modules\/moment/,
                /node_modules\/lodash/,
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    bugfixes: true,
                    corejs: { version: "3.26" },
                    modules: "cjs",
                    useBuiltIns: "usage",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "client",
    optimization: {
      chunkIds: "named",
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    output: {
      path: DIST_PUBLIC,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      // new BundleAnalyzerPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    devtool: "inline-source-map",
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              exclude: [
                /node_modules\/react/,
                /node_modules\/urijs/,
                /node_modules\/axios/,
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    bugfixes: true,
                    corejs: { version: "3.26" },
                    modules: "cjs",
                    useBuiltIns: "usage",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
  },
];
