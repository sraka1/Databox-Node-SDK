var EventEmitter = require('events').EventEmitter,
    API = require('./api').API,
    util = require('util')

exports.Client = Client


function Client(options) {
  this.api = new API(options.uniqueUrl, options.apiKey)
}
util.inherits(Client, EventEmitter)

Client.prototype.pushData = function(builder) {
  return this.api.pushData(builder.getPayload())
}

Client.prototype.getLog = function() {
  return this.api.getLog()
}