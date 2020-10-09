const mongoose = require('mongoose')
const Schema = mongoose.Schema

//配置mongodb的连接
const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/blog', {
      useNewUrlParser: true
    })
    console.log('Successfully connect to mongodb')
  } catch (e) {
    console.log('Failed to connect to mongodb. Error: ', e)
  }
}
//连接到mongodb
connect()

//定义Post Schema
const Post = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  created_at: {
    type: Date,
    default: new Date(),
    index: { background: false, unique: false }
  },
  tag: [String],
  published: Boolean,
  meta: {
    praise: Number,
    comment: Number
  }
})

//定义Model的实例方法
//不能用箭头表达式定义原型方法
Post.methods.getPraise = function () {
  //返回Schema的实例对象的点赞数
  return this.meta.praise
}

// //通过Schema生成Model
const PostModel = mongoose.model('Post', Post)
//通过Model生成文档实例
const news = new PostModel()
news.meta = { praise: 5, comment: 0 }
console.log(news.getPraise()) //输出5

//定义Schema的静态方法
Post.statics.new = function () {
  return new newModel()
}
const newModel = mongoose.model('AAA', Post)
const data = newModel.new()
console.log(data)

//创建数据
const news1 = new PostModel({
  title: 'node.js',
  content: 'node.js content'
})
//保存数据
//不用await?
news1.save()

//通过create直接保存
PostModel.create({
  title: 'using create to save',
  content: 'create content'
})

//通过insertMany插入多条
PostModel.insertMany([
  {
    title: 'node.js3',
    content: 'node.js content3'
  },
  {
    title: 'node.js4',
    content: 'node.js content4'
  }
])

//通过create插入多条
PostModel.create([
  {
    title: 'node.js5',
    content: 'node.js content5'
  },
  {
    title: 'node.js6',
    content: 'node.js content6'
  }
])
