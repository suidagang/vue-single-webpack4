const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



const webpackConfig = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
  ]
});
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerHost: '127.0.0.1',
    analyzerPort: 8889,
  }));
}

module.exports = webpackConfig;