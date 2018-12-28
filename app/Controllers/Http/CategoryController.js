'use strict'
const Category = use('App/Models/Category');

class CategoryController {
  async getCategories(){
    return await Category.all()
  }

  async createCategories({ request, response }){
    try {
      const {name, description} = await request.all()
      const category = await Category.create({
        'name':name,
        'description':description
      })
      return response.status(201).json(category)
    } catch (e) {
      return {
        'message':'error',
        'detail': e.sqlMessage
      }
    }
  }
  async updateCategories({request, response, params}){
    const {id} = params
    
  }

  async deleteCategories({request, response, params}){
    const {id} = params
    try{
      const category = await Category.findOrFail(id)
      await category.delete()
      return response.status(200).json({
        'message':'deleted',
        'data':category
      })
    } catch (e) {
      return response.status(204).json({
        'message':'user not found'
      })
    }
  }

}

module.exports = CategoryController


// getCategories
// detailCategories
// addCategories
// updateCategories
// deleteCategories
