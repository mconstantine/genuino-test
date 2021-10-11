'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const { name, version } = require('../package.json')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { name, version }
})

Route.post('/api/v1/users', 'UserController.store').validator('StoreUser')
Route.post('/api/v1/login', 'UserController.login').middleware('guest')
Route.get('/api/v1/users/:userId', 'UserController.show')
