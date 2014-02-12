exports.Progress = Progress

function Progress() {
  this.internalPayload = new Array()
}

Progress.prototype.setData = function(key, label, current, max, date) {
  if (typeof date === "undefined") {
    date = new Date().toISOString();
  }
  this.internalPayload.push({
    "date": date,
    "key": key + "@label",
    "value": label,
  });
  this.internalPayload.push({
    "date": date,
    "key": key + "@max_value",
    "value": max,
  });
  this.internalPayload.push({
    "date": date,
    "key": key,
    "value": current,
  });
}

Progress.prototype.getPayload = function() {
  return this.internalPayload
}