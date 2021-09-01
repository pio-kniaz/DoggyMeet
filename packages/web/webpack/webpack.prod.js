const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build/web'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Januszek prod'),
    }),
    new BundleAnalyzerPlugin(),
  ],
}
