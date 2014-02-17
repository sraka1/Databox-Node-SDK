var EventEmitter = require('events').EventEmitter,
    API = require('./api').API,
    util = require('util')

exports.Client = Client

/**
 * Creates an API instance
 * @constructor
 * @this {API}
 * @param      {Array}  options Array of options (uniqueUrl and apiKey are required)
 */
function Client(options) {
  this.api = new API(options.uniqueUrl, options.apiKey)
  //Forward events
  this.on('newListener', function (event, listener) {
    this.api.on(event, listener)
  })
}
util.inherits(Client, EventEmitter)

/**
 * Push data to server
 * @param      {Builder} builder  Builder object with initialized KPI data
 */
Client.prototype.pushData = function(builder) {
  this.api.pushData(builder.getPayload())
}

/**
 * Fetch log from server
 */
Client.prototype.getLog = function() {
  this.api.getLog()  
}