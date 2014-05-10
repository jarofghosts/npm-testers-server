var send = require('http-json-response')
  , concat = require('concat-stream')
  , level = require('level')

var errors = require('../errors')

var db = level('./results', {valueEncoding: 'json'})

module.exports.post = post
module.exports.get = get

function post(req, res, route) {
  req.pipe(concat(check))

  function check(_data) {
    console.log(_data.toString())
    try {
      var data = JSON.parse(_data.toString())
    } catch(e) {
      return errors.bad_request(req, res)
    }
    console.log('better')

    var doc = {
        os: data.os
      , node: data.node
      , elapsed: data.elapsed
      , results: data.results
      , passed: data.passed
      , submitted: Date.now()
    }

    db.put(route.params.name + ':' + Date.now(), doc, verify)

    function verify(err) {
      console.log('best')
      if(err) return errors.internal_error(req, res)

      send(res, 201, {success: true})
    }
  }
}

function get(req, res, route) {
  var db_options = {valueEncoding: 'json'}

  if(route.query.limit) db_options.limit = route.query.limit
  if(route.query.start) {
    db_options.start = route.params.name + ':' + route.query.start
  }

  if(route.query.end) {
    db_options.end = route.params.name + ':' + route.query.end
  }

  db.createValueStream(db_options).pipe(concat(respond))

  function respond(data) {
    send(res, 200, data)
  }
}
