const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env) => {
  let apiUrl =
    "https://dxmwof9qec.execute-api.ap-northeast-1.amazonaws.com/dev";

  return {
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    entry: __dirname + "/src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "swc-loader",
        },
      ],
    },
    output: {
      publicPath: "/",
      filename: "[name].bundle.js",
      path: __dirname + "/public",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        base: false,
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new CopyPlugin({
        patterns: [{ from: "src/assets", to: "assets" }],
      }),
      new webpack.DefinePlugin({
        API: JSON.stringify(apiUrl),
      }),
      new CompressionPlugin({
        filename: "[path][base]",
        deleteOriginalAssets: true,
      }),
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  };
};
