var util = require('util')
    Pie = require('./pie').Pie

exports.Funnel = Funnel

/**
 * Creates a Funnel instance
 * @constructor
 * @this {Funnel}
 */
function Funnel() {
  this.internalPayload = new Array()
  this.labels = new Array()
  this.values = new Array()
  this.changes = new Array()
  this.key = new String()
  this.date = new String()
}

util.inherits(Funnel, Pie)