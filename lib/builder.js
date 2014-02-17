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
Builder.prototype.addKpi = function(key, value, date) {
  if (typeof date === "undefined") {
    date = new Date().toISOString()
  }
  this.internalPayload.push({
    "date": date,
    "key": key,
    "value": value,
  })
}

/**
 * Instantiates a Table
 * @return {Table} Table object
 */
Builder.prototype.createTable = function() {
  return new Builder.Table()
}

/**
 * Instantiates a Table
 * @return {Table} Table object
 */
Builder.prototype.createFunnel = function() {
  return new Builder.Funnel()
}

/**
 * Instantiates a Table
 * @return {Table} Table object
 */
Builder.prototype.createPie = function() {
  return new Builder.Pie()
}

/**
 * Instantiates a Table
 * @return {Table} Table object
 */
Builder.prototype.createMessages = function() {
  return new Builder.Messages()
}

/**
 * Instantiates a Table
 * @return {Table} Table object
 */
Builder.prototype.createProgress = function() {
  return new Builder.Progress()
}

/**
 * Instantiates a Table
 * @return {Table} Table object
 */
Builder.prototype.createPipeline = function() {
  return new Builder.Pipeline()
}

/**
 * Add a widget object to the payload
 * @param widget A widget object to be added.
 */
Builder.prototype.addWidget = function(widget) {
  this.internalPayload = this.internalPayload.concat(widget.getPayload())
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