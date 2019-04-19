'use strict'
const Comment = use('App/Models/Comment');
const Database = use('Database')

class CommentController {
  async index ({ request, response, view }) {
    try {
      const {page, limit} =  await request.get()
      const comments =  await Database.from('comments').paginate(1, 10)
      return response.status(200).send(comments)
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }


  async create ({ request, response, view }) {
    try {
        const data = request.only(['title', 'content'])
        const comment = await Comment.create(data)
        return response.status(201).send(comment)
    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }

  async show ({ params, request, response, view }) {
    try {
      const { id } = params

      const comment = await Comment.find(id)

      if(comment==null)
        return response.status(404).send({'message':'No record found!'})

      return response.status(200).send(comment)

    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }


  async update ({ params, request, response }) {
    try {
      const { id } = params
      const data = request.all()

      const comment = await Comment.find(id)

      if(comment==null)
        return response.status(404).send({'message':'No record found!'})

      comment.merge(data)
      await comment.save()
      console.log('===================== Update Success ===================');

      return response.status(200).send(comment)

    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const { id } = params

      const comment = await Comment.find(id)

      if(comment==null)
        return response.status(404).send({'message':'No record found!'})

      await comment.delete()

      return response.status(200).send({'message':'Data deleted'})

    } catch (e) {
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }
}

module.exports = CommentController
