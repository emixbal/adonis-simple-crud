'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator')

class UserController {
  constructor () {
    return true
  }

  async checkValidForm(data, rules, response){
    const validation = await validate(data, rules)
    console.log(null);
    
    if (validation.fails()) {
      return response.status(400).json({
        'message':'required form empty or wrong format'
      })
    }
  }

  async register({request, response}){
    const rules = {
      email : 'required|email|unique:users,email',
      password: 'required'
    }
    await this.checkValidForm(request.all(), rules, response)

    const {email, username, password} = await request.all()
    try {
      const user = await User.create({
        email:email,
        username:((typeof username=='undefined') ? email : username),
        password:password,
      })
      return response.status(201).json({
        'message':'success',
        'data':{
          'username':user.username,
          'email':user.email,
        }
      })
    } catch (e) {
      return response.status(500).json({
        'message':'error',
        'detail':e.sqlMessage
      })
    }
  }
}

module.exports = UserController
