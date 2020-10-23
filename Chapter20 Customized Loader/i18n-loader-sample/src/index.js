
//{{}}是为了标记可以被转换的语言
//在i18n-loader中会用正则抓取{{Hello}}这样的例子然后解析中间的单词，然后匹配到zn.json中的key,获取value达到翻译的目的
console.log('{{Hello}}, {{Today}} is a {{good}} day')