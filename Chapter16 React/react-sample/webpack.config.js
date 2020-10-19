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
        test: /\.jsx?$/, //配置以jsx以及js为后缀的文件由Babel处理
        use: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['main'], //该html文件引用的chunks数组
      template: 'index.html', //源文件名
      filename: 'index.html' //构建后的文件名
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'] //添加jsx后缀，导入组件时不用添加.jsx
  }
}
