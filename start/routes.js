'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(function(){
  Route.get('/', 'PostController.index')
  Route.get('/view/:id', 'PostController.withView')
  Route.post('/', 'PostController.create')
  Route.get('/:id', 'PostController.show')
  Route.patch('/:id', 'PostController.update')
  Route.delete('/:id', 'PostController.destroy')
  // Route.get('/:id', 'PostController.index')
}).prefix('posts')
