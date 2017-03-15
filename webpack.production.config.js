const webpackMerge = require('webpack-merge')
const commonConfig = require("./webpack.common.js")
const webpack = require('webpack')
const path = require("path")

module.exports = () => {
	return webpackMerge(commonConfig(), {
		plugins: [
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					screw_ie8: true
				},
				comments: false
			})
		]
	})
}