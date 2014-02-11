exports.Table = Pie

function Table() {
  this.internalPayload = new Array()
  this.columns = new Array()
  this.rows = new Array()
  this.changes = new Array()
  this.formats = new Array()
  this.order_by = new Array()
  this.key = new String()
  this.date = new String()
}

Table.prototype.setKey = function(key) {
  this.key = key
}

Table.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}

Table.prototype.addColumn = function(name, order_by) {
  this.columns.push(name)
  if (typeof order_by === "undefined") {
    this.order_by.push("")
  } else {
    this.order_by.push(order_by)
  }
}

//TODO: check row count matches column count
Table.prototype.addRow = function(values, changes, formats) {
  this.rows.push(values);
  if (typeof changes === "undefined") {
    tempArray = new Array()
    for (i < this.columns.length; i = 0; i++) {
      tempArray.push("")
    }
    this.order_by.push(tempArray)
  } else {
    this.order_by.push(changes)
  }
  if (typeof formats === "undefined") {
    tempArray = new Array()
    for (i < this.columns.length; i = 0; i++) {
      tempArray.push("")
    }
    this.formats.push(tempArray)
  } else {
    this.formats.push(changes)
  }
}

Table.prototype.getPayload = function() {
  this.internalPayload.push({
    "date": date,
    "key": key + "@columns",
    "value": this.columns,
  })
  this.internalPayload.push({
    "date": date,
    "key": key + "@rows",
    "value": this.rows,
  })
  this.internalPayload.push({
    "date": date,
    "key": key + "@changes",
    "value": this.changes,
  })
  this.internalPayload.push({
    "date": date,
    "key": key + "@formats",
    "value": this.formats,
  })
  this.internalPayload.push({
    "date": date,
    "key": key + "@order_by",
    "value": this.order_by,
  })
  return this.internalPayload
}