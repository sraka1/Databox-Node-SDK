exports.Progress = Progress

/**
 * Creates a Pipeline instance
 * @constructor
 * @this {Pipeline}
 */
function Progress() {
  this.internalPayload = new Array()
  this.key = new String()
  this.date = new String()
  this.label = new String()
  this.current = new String()
  this.max = new String()
}

/**
 * Set the base key of the widget
 * @param {String} key The key to be set
 */
Progress.prototype.setKey = function(key) {
  this.key = key
}

/**
 * Set the date of the widget
 * @param {String} date The date to be set
 */
Progress.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}


/**
 * Sets the data for the widget
 * @param {String} label The label associated with the widget
 * @param {String} current The current value
 * @param {String} max The maximum value
 */
Progress.prototype.setData = function(label, current, max) {
  this.label = label
  this.current = current
  this.max = max
}

/**
 * Returns the Table payload
 * @return {Array} Raw payload
 */
Progress.prototype.getPayload = function() {
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@label",
    "value": this.label,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@max_value",
    "value": this.max,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key,
    "value": this.current,
  })
  return this.internalPayload
}