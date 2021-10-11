'use strict'

class StoreUser {
  get rules() {
    return {
      firstName: 'required',
      lastName: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  async fails(errorMessages) {
    console.log(errorMessages)
  }
}

module.exports = StoreUser
