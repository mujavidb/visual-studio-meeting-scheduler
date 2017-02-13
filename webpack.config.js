const path = require("path")
const Router = require('react-router').Router
const Route = require('react-router').Route
const Link = require('react-router').Link

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, "build"),
        filename: 'index.js'
    },
	
    devServer: {
        inline: true,
        port: 8080,
        contentBase: path.join(__dirname, "src"),
        hot: true
    },

    module: {
        loaders: [
        	{
        		test: /\.(svg|jpg|png)$/,
        		loader: 'url-loader'
        	},
        	{
        		test: /\.css$/,
        		loaders: [
        			'style-loader',
        			'css-loader'
        		]
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