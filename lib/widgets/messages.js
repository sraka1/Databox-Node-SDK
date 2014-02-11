exports.Messages = Messages

function Messages() {
  this.internalPayload = new Array()
  this.messages = new Array()
  this.icons = new Array()
  this.key = new String()
  this.date = new String()
}

Messages.prototype.setKey = function(key) {
  this.key = key
}

Messages.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}

Messages.prototype.addMessage = function(message, icon) {
  this.messages.push(message)
  if (typeof icon === "undefined") {
    this.icons.push("")
  } else {
    this.icon.push(icon)
  }
  
}

Messages.prototype.getPayload = function() {
  this.internalPayload.push({
    "date": this.date,
    "key": key,
    "value": this.messages,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": key + "@icons",
    "value": this.icons,
  })
  return this.internalPayload
}