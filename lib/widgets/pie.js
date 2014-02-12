exports.Pie = Pie

function Pie() {
  this.internalPayload = new Array()
  this.labels = new Array()
  this.values = new Array()
  this.changes = new Array()
  this.key = new String()
  this.date = new String()
}

Pie.prototype.setKey = function(key) {
  this.key = key
}

Pie.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}

Pie.prototype.addSlice = function(label, value, change) {
  this.labels.push(label)
  this.values.push(value)
  if (typeof change === "undefined") {
    this.changes.push("")
  } else {
    this.changes.push(change)
  }
  
}

Pie.prototype.getPayload = function() {
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@labels",
    "value": this.labels,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@values",
    "value": this.values,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@changes",
    "value": this.changes,
  })
  return this.internalPayload
}