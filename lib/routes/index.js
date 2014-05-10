var Router = require('unpm-router')

var results = require('./results')

routes = Router()

routes.add('post', '/api/results/:name', results.post)
routes.add('get', '/api/results/:name', results.get)

module.exports = routes
