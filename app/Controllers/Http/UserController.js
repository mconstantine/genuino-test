'use strict'

const User = use('App/Models/User')

class UserController {
  async login({ auth, request }) {
    const { email, password } = request.all()
    const response = await auth.attempt(email, password)
    const user = await User.findBy('email', email)

    return {
      code: 'success',
      user_id: user.id,
      access_token: response
    }
  }

  async store({ request }) {
    return User.create(request.all())
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.userId)) {
      return 'You can only see your own profile'
    }

    return auth.user
  }
}

module.exports = UserController
