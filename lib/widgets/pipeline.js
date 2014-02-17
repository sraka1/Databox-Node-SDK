var util = require('util')
    Pie = require('./pie').Pie

exports.Pipeline = Pipeline

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

util.inherits(Pipeline, Pie)