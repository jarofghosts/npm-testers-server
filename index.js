var http = require('http')

var routes = require('./lib/routes')
  , errors = require('./lib/errors')

module.exports = tester

function tester() {
  return http.createServer(handler)
}

function handler(req, res) {
  var route = routes.match(req)

  if(!route) return errors.not_found(req, res)

  route.fn(req, res, route)
}
