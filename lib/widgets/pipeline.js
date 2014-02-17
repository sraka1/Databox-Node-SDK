var util = require('util')
    Pie = require('./pie').Pie

exports.Pipeline = Pipeline

/**
 * Extends Pie
 */
util.inherits(Pipeline, Pie)

/**
 * Creates a Pipeline instance
 * @constructor
 * @this {Pipeline}
 */
function Pipeline() {
  this.internalPayload = new Array()
  this.labels = new Array()
  this.values = new Array()
  this.changes = new Array()
  this.key = new String()
  this.date = new String()
}