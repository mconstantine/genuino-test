'use strict'

const { test, trait } = use('Test/Suite')('Root')

trait('Test/ApiClient')

test('root route', async ({ client }) => {
  const response = await client.get('/').end()
  response.assertStatus(200)
})
