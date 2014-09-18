var EventEmitter = require('events').EventEmitter,
    rest         = require('restler'),
    util = require('util')

exports.API = API

var MAX_RETRIES = 4
var USER_AGENT  = 'Databox Node SDK v0.0.1'

/**
 * Creates an API instance
 * @constructor
 * @this {API}
 * @param      {String}  endpoint API unique URL
 * @param      {String}  apiKey API key
 * @param      {String}  gateway API gateway (base URL)
 */
function API(endpoint, apiKey, gateway) {
  this.gateway  = 'https://api.databox.com/'
  this.endpoint = endpoint
  this.apiKey   = apiKey
  if (!typeof gateway === "undefined") {
    this.gateway = gateway
  }
}
util.inherits(API, EventEmitter)

/**
 * Push data to server
 * @param      {String} json  JSON payload
 * @param      {String} [retryno=4]  No. of retries before giving up
 */
API.prototype.pushData = function(json, retryno) {
  var self = this
  if (!typeof retryno === "undefined") {
    retryno = MAX_RETRIES
  }
  rest.postJson(this.gateway + 'source/' + this.endpoint + '/data', json, 
  {
    username: this.apiKey,
    password: '',
    headers: {'Accept': 'application/json', 'User-Agent': USER_AGENT }
  }).on('complete', function(data, response) {
    var retryCounter = 0
    if (response instanceof Error) {
      if (response.statusCode == 429) {
        self.emit('dtbxTooManyRequests', data)
      }
      if(this.retryCounter < retryno) {
        retryCounter++
        this.retry(5000)
      } else {
        self.emit('dtbxUnknownError', data)
      }
    } else {
      self.emit('dtbxPushSuccess', data)
    }
  })
}

/**
 * Get log from server
 * @param      {String} [retryno=4]  No. of retries before giving up
 */
API.prototype.getLog = function(retryno) {
  var self = this
  if (!typeof retryno === "undefined") {
    retryno = MAX_RETRIES
  }
  rest.get(this.gateway + 'source/' + this.endpoint + '/logs',
  {
    username: this.apiKey,
    password: '',
    headers: {'Accept': 'application/json', 'User-Agent': USER_AGENT }
  }).on('complete', function(data, response) {
    var retryCounter = 0
    if (response instanceof Error) {
      if (response.statusCode == 429) {
        self.emit('dtbxTooManyRequests', data)
      }
      console.log('Error:', data.message)
      if(this.retryCounter < retryno) {
        retryCounter++
        this.retry(5000)
      } else {
        self.emit('dtbxUnknownError', data)
      }
    } else {
      self.emit('dtbxLogSuccess', data)
    }
  })
}
