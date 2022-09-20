const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      open: true,
      port: 8081,
      historyApiFallback: true,
    },
    plugins: [
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.__DEV__': true,
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        emitWarning: false,
        emitError: false,
      }),
    ],
  }
}
