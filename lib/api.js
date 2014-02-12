var EventEmitter = require('events').EventEmitter,
    rest         = require('restler'),
    util = require('util')

exports.API = API

var MAX_RETRIES = 4
var USER_AGENT  = 'Databox Node SDK v0.0.1'

function API(endpoint, apiKey, gateway) {
  this.gateway  = 'http://zep.com:8080/'
  this.endpoint = endpoint;
  this.apiKey   = apiKey;
  if (!typeof gateway === "undefined") {
    this.gateway = gateway;
  }
}
util.inherits(API, EventEmitter)

// Client-server request
API.prototype.pushData = function(json, retryno) {
  if (!typeof retryno === "undefined") {
    retryno = MAX_RETRIES;
  }
  rest.postJson(this.gateway + 'push/custom/' + this.endpoint, json, 
  {
    username: this.apiKey,
    password: '',
    headers: {'Accept': 'application/json', 'User-Agent': USER_AGENT }
  }).on('complete', function(data, response) {
    var retryCounter = 0;
    if (response instanceof Error) {
      if (response.statusCode == 429) {
        this.emit('dtbxTooManyRequests', data);
      }
      if(this.retryCounter < retryno) {
        retryCounter++;
        this.retry(5000);
      } else {
        this.emit('dtbxUnknownError', data);
      }
    } else {
      this.emit('dtbxSuccess', data);
    }
  });  
}

API.prototype.getLog = function(retryno) {
  if (!typeof retryno === "undefined") {
    retryno = MAX_RETRIES;
  }
  rest.get(this.gateway + 'push/custom/' + this.endpoint + '/logs',
  {
    username: this.apiKey,
    password: '',
    headers: {'Accept': 'application/json', 'User-Agent': USER_AGENT }
  }).on('complete', function(data, response) {
    var retryCounter = 0;
    if (response instanceof Error) {
      if (response.statusCode == 429) {
        this.emit('dtbxTooManyRequests', data);
      }
      console.log('Error:', data.message);
      if(this.retryCounter < retryno) {
        retryCounter++;
        this.retry(5000);
      } else {
        this.emit('dtbxUnknownError', data);
      }
    } else {
      this.emit('dtbxSuccess', data);
    }
  }); 
}
