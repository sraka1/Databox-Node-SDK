var EventEmitter = require('events').EventEmitter,
    payload,
    util = require('util')

exports.Builder = Builder

function Builder(opt, storage) {
  this.internalPayload = new Array()
}
util.inherits(Builder, EventEmitter)

Builder.prototype.addKpi = function(key, value, date) {
  if (typeof date === "undefined") {
    date = new Date().toISOString();
  }
  this.internalPayload.push({
    "date": date,
    "key": key,
    "value": value,
  });
}

Builder.prototype.addWidget = function(widget) {
  this.internalPayload = this.internalPayload.concat(widget.getPayload());
}

Builder.prototype.getPayload = function() {
  var payload = {"data" : {}}
  payload.data = this.internalPayload

  return payload
}
