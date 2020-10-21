const path = require('path')

module.exports = {
  entry: './src/main.ssr', //ssr入口文件
  target: 'node', //导出为Node.js环境
  output: {
    libraryTarget: 'commonjs2', //打包为commonjs2模块，可以被node.js加载
    path: path.resolve(__dirname, 'build'),
    filename: 'ssr.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'] //添加jsx后缀，导入组件时不用添加.jsx
  }
}
