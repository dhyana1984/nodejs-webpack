const loaderUtils = require('loader-utils')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)    //从webpack.config.js的loader配置的option而来   
    //如果loader没有异步调用，直接return
    return source.replace(/World/g, options.text)

    //如果loader有异步调，需要利用wbepack提供的回调函数来进行回调，直接return无法获得结果
    // const callback = this.async()
    // setTimeout(() => {
    //     const output = source.replace(/World/g, options.text)
    //     callback(null, output)
    // }, 1000)
}