exports.Messages = Messages

/**
 * Creates a Messages instance
 * @constructor
 * @this {Messages}
 */
function Messages() {
  this.internalPayload = new Array()
  this.messages = new Array()
  this.icons = new Array()
  this.key = new String()
  this.date = new String()
}

/**
 * Set the base key of the widget
 * @param {String} key The key to be set
 */
Messages.prototype.setKey = function(key) {
  this.key = key
}

/**
 * Set the date of the widget
 * @param {String} date The date to be set
 */
Messages.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}

/**
 * Adds a message to the payload
 * @param {String} message Message content
 * @param {String} [icon] An icon associated with the message
 */
Messages.prototype.addMessage = function(message, icon) {
  this.messages.push(message)
  if (typeof icon === "undefined") {
    this.icons.push("Number")
  } else {
    this.icons.push(icon)
  }
  
}

/**
 * Returns the payload
 * @return {Array} Raw payload
 */
Messages.prototype.getPayload = function() {
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@labels",
    "value": this.messages,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@icons",
    "value": this.icons,
  })
  return this.internalPayload
}