const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const packageConfig = require("../package.json");
const webpack = require("webpack");
const portfinder = require("portfinder");
const devWebpackConfig  = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    hot: true,
    overlay: false,
    quiet: true, // necessary for FriendlyErrorsPlugin
    clientLogLevel: "silent",
    port: '7777',
    host: 'localhost',//主机地址
    compress: true,//开发服务器是否启动gzip等压缩
  }
});

let createNotifierCallback = () => {
  const notifier = require("node-notifier");

  return (severity, errors) => {
    if (severity !== "error") return;

    const error = errors[0];
    const filename = error.file && error.file.split("!").pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      icon: path.join(__dirname, "logo.png")
    });
  };
};
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:${devWebpackConfig.devServer.port}`
            ]
          },
          onErrors:  createNotifierCallback()
        })
      );
      resolve(devWebpackConfig);
    }
  });
});