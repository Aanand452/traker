const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./public/src/index.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel"],
        include: [
          path.join(__dirname, "public/src"),
          path.join(__dirname, "node_modules/@salesforce/design-system-react"),
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader?url=false&outputStyle=expanded&sourceMap=true&sourceMapContents=true"
        ),
      },
      {
        test: /\.(svg|gif|jpe?g|png)$/,
        loader: "url-loader?limit=10000",
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: "url-loader?limit=30&name=assets/fonts/webfonts/[name].[ext]",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") },
    }),
    new ExtractTextPlugin("[name].css"),
  ],
};
