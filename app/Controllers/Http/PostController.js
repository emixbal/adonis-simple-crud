'use strict'
const Post = use('App/Models/Post');
const Database = use('Database')

class PostController {
  async index ({ request, response, view }) {
    try {
      const {page, limit} =  await request.get()
      const posts =  await Database.from('posts').paginate(1, 10)
      return response.status(200).send(posts)
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }


  async create ({ request, response, view }) {
    try {
        const data = request.only(['name', 'description'])
        const post = await Post.create(data)
        return response.status(201).send(post)
    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }



  async show ({ params, request, response, view }) {
    try {
      const { id } = params

      const post = await Post.find(id)

      if(post==null)
        return response.status(404).send({'message':'No record found!'})

      return response.status(200).send(post)

    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }


  async update ({ params, request, response }) {
    try {
      const { id } = params
      const data = request.all()

      const post = await Post.find(id)

      if(post==null)
        return response.status(404).send({'message':'No record found!'})

      post.merge(data)
      await post.save()
      await console.log('================= update success ==============');

      return response.status(200).send(post)

    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const { id } = params

      const post = await Post.find(id)

      if(post==null)
        return response.status(404).send({'message':'No record found!'})

      await post.delete()

      return response.status(200).send({'message':'Data deleted'})

    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }
  async withView({params, request, response, view}){
    return view.render('post', {
      package:params.id
    })
  }
}

module.exports = PostController
