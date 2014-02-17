exports.Pie = Pie


/**
 * Creates a Pie instance
 * @constructor
 * @this {Pie}
 */
function Pie() {
  this.internalPayload = new Array()
  this.labels = new Array()
  this.values = new Array()
  this.changes = new Array()
  this.key = new String()
  this.date = new String()
}

/**
 * Set the base key of the widget
 * @param {String} key The key to be set
 */
Pie.prototype.setKey = function(key) {
  this.key = key
}

/**
 * Set the date of the widget
 * @param {String} date The date to be set
 */
Pie.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}

/**
 * Adds a slice
 * @param {String} label The label
 * @param {String} value Value of the slice
 * @param {String} [change] Change
 */
Pie.prototype.addSlice = function(label, value, change) {
  this.labels.push(label)
  this.values.push(value)
  if (typeof change === "undefined") {
    this.changes.push("")
  } else {
    this.changes.push(change)
  }
  
}

/**
 * Returns the payload
 * @return {Array} Raw payload
 */
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