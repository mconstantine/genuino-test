'use strict'

const User = use('App/Models/User')
const suite = use('Test/Suite')('User')

const { test, trait } = suite

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

const exampleUserFirstName = 'John'
const exampleUserLastName = 'Doe'
const exampleUserEmail = 'john.doe@example.com'
const exampleUserPassword = 'anonymous'

suite.before(async () => {
  await User.create({
    firstName: exampleUserFirstName,
    lastName: exampleUserLastName,
    email: exampleUserEmail,
    password: exampleUserPassword
  })
})

test('log a user in', async ({ client, assert }) => {
  const response = await client
    .post('/api/v1/login')
    .send({
      email: exampleUserEmail,
      password: exampleUserPassword
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    code: 'success',
    user_id: 1,
    access_token: {
      type: 'bearer',
      refreshToken: null
    }
  })

  assert.isString(response.body.access_token.token)
})

test('get user data', async ({ client }) => {
  const user = await User.findBy('email', exampleUserEmail)
  const response = await client.get('/api/v1/users/1').loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    email: exampleUserEmail,
    firstName: exampleUserFirstName,
    lastName: exampleUserLastName
  })
})
