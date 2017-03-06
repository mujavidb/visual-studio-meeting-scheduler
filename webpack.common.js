const path = require("path")

module.exports = () => {
	return {

		entry: './src/index.js',

		output: {
			path: path.join(__dirname, "build"),
			filename: 'index.js'
		},

		module: {
			loaders: [
				{
					test: /\.(svg|jpg|png)$/,
					loader: 'url-loader'
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react']
					}
				}
			]
		}
	}
}