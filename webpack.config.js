const webpackMerge = require('webpack-merge')
const commonConfig = require("./webpack.common.js")
const path = require("path")

module.exports = () => {
    return webpackMerge(commonConfig(), {

        devServer: {
            inline: true,
            port: 8080,
            contentBase: path.join(__dirname, "src"),
            hot: true
        }

    })
}