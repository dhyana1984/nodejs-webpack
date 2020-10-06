const fs = require('fs')
const bluebird = require('bluebird')

//Promise化fs的API
bluebird.promisifyAll(fs)

//文章数
const posts = []

//文章ID
let postId = 1

//发表文章
exports.publish = (title, content) => {
  const item = {
    id: postId++,
    title,
    content,
    time: new Date().toLocaleString()
  }
  posts.push(item)
  return item
}

//查看文章
exports.show = (id) => {
  //在koa-router的ctx.params.xxx中获取的参数是字符串，所以需要转成number
  id = Number(id)
  const post = posts.find((post) => post.id === id)
  return post
}

//编辑文章
exports.update = (id, title, content) => {
  id = Number(id)
  const post = posts.find((post) => post.id === id)
  post.title = title
  post.content = content
}

//删除文章
exports.delete = (id) => {
  id = Number(id)
  const index = posts.findIndex((post) => post.id === id)
  if (~index) {
    posts.splice(index, 1)
  }
}

//文章列表
exports.list = function () {
  return posts
}
