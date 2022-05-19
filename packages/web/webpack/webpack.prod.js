const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require("terser-webpack-plugin");

module.exports = ({analyzer}) => {
	const plugins = [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.name': JSON.stringify('prod-name'),
		}),
	];
	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin())
	}
	return {
		mode: 'production',
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, '..', '..', 'build/web'),
			filename: '[name].[contenthash].js',
			publicPath: '/',
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						parse: {
							ecma: 8,
						},
						compress: {
							ecma: 5,
							warnings: false,
							comparisons: false,
						},
						mangle: {
							safari10: true,
						},
						output: {
							ecma: 5,
							comments: false,
							ascii_only: true,
						},
					},
					parallel: true,
				}),
			],
			splitChunks: {
				chunks: "all",
			},
		},
		plugins,
	}
}
