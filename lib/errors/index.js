var send = require('http-json-response')

module.exports.not_found = not_found
module.exports.bad_request = bad_request

function not_found(req, res) {
  send(res, 404, {error: 'not found'})
}

function bad_request(req, res) {
  send(res, 400, {error: 'bad request'})
}
