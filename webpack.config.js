const PATH = require('path')
const HTMLWP = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    context: PATH.resolve(__dirname,'src'),
    mode: 'development',
    devServer: {
        port: 3000
    },
    entry: {
        index: "./index.js",
        card: "./card.js"
    },
    output: {
        filename: '[name].[contenthash].js',
        path: PATH.resolve(__dirname, 'Pack')
    },
    plugins: [
        new HTMLWP({
            template: "./public/index.html",
            filename: "index.html",
            chunks: ["index"]
        }),
        new HTMLWP({
            template: "./public/git card.html",
            filename: "card.html",
            chunks: ["card"]

        }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}