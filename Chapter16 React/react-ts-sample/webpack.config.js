const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['main'],
      template: 'index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'] //添加jsx后缀，导入组件时不用添加.jsx
  }
}
