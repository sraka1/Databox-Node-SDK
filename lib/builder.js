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

Builder.prototype.createTable = function() {
  return new Builder.Table()
}

Builder.prototype.createFunnel = function() {
  return new Builder.Funnel()
}

Builder.prototype.createPie = function() {
  return new Builder.Pie()
}

Builder.prototype.createMessages = function() {
  return new Builder.Messages()
}

Builder.prototype.createProgress = function() {
  return new Builder.Progress()
}

Builder.prototype.createPipeline = function() {
  return new Builder.Pipeline()
}

Builder.prototype.addWidget = function(widget) {
  this.internalPayload = this.internalPayload.concat(widget.getPayload());
}

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