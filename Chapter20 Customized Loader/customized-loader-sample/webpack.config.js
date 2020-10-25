const path = require('path')

module.exports = {
    entry: './src/index',
    target: 'node', //编译为Node.js环境下的JS,之后直接使用Node.JS执行编译完成的文件
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'replace-loader',
                    options: {
                        text: 'webpack4' //这个option会传入replace-loader
                    }
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['./node_modules', './loader'] //配置loader的查找目录，在node_modules里面找，在./loader里面找
    }
}