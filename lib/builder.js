var EventEmitter = require('events').EventEmitter,
    payload,
    util = require('util')

exports.Builder = Builder

/**
 * Creates a Builder instance
 * @constructor
 * @this {Builder}
 */
function Builder() {
  this.internalPayload = new Array()
}
util.inherits(Builder, EventEmitter)

/**
 * Add a simple KPI
 * @param      {String} key  Key
 * @param      {String} value  Value
 * @param      {String} [date]  Date
 */
Builder.prototype.addKpi = function(key, value, date, attributes) {
  if (typeof date === "undefined") {
    date = new Date().toISOString()
  }
  if (typeof date === "undefined") {
    attributes = []
  }
  this.internalPayload.push({
    "date": date,
    "key": key,
    "value": value,
    "attributes": attributes
  })
}

/**
 * Returns the full Builder payload
 * @return {Array} Raw payload
 */
Builder.prototype.getPayload = function() {
  var payload = {"data" : {}}
  payload.data = this.internalPayload

  return payload
}

Builder.Table = require('./widgets/table').Table
Builder.Funnel = require('./widgets/funnel').Funnel
Builder.Pie = require('./widgets/pie').Pie
Builder.Progress = require('./widgets/progress').Progress
Builder.Pipeline = require('./widgets/pipeline').Pipeline
Builder.Messages = require('./widgets/messages').Messages