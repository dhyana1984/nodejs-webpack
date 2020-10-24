const path = require('path')
const MyWebpackPlugin = require('./plugins/my-webpack-plugin')

module.exports = {
    entry: './src/main',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    plugins: [
        new MyWebpackPlugin()
    ]
}