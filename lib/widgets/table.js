exports.Table = Table

/**
 * Creates a Table instance
 * @constructor
 * @this {Table}
 */
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

/**
 * Set the base key of the widget
 * @param {String} key The key to be set
 */
Table.prototype.setKey = function(key) {
  this.key = key
}

/**
 * Set the base key of the Table
 * @param {String} key The key to be set
 */
Table.prototype.setDate = function(date) {
  if (typeof date === "undefined") {
    this.date = new Date().toISOString()
  }
}

/**
 * Add a column to the Table
 * @param {String} name Name of column
 * @param {String} [order_by] Ordering of the column
 */
Table.prototype.addColumn = function(name, order_by) {
  this.columns.push(name)
  if (typeof order_by === "undefined") {
    this.order_by.push("")
  } else {
    this.order_by.push(order_by)
  }
}

//TODO: check row count matches column count
/**
 * Add a row to the Table
 * @param {Array} values Row values for each column
 * @param {Array} [changes] Row changes for each column
 * @param {Array} [formats] Row formats for each column
 */
Table.prototype.addRow = function(values, changes, formats) {
  this.rows.push(values);
  if (typeof changes === "undefined") {
    tempArray = new Array()
    for (i = 0; i < this.columns.length; i++) {
      tempArray.push("")
    }
    this.changes.push(tempArray)
  } else {
    this.changes.push(changes)
  }
  if (typeof formats === "undefined") {
    tempArray = new Array()
    for (i = 0; i < this.columns.length; i++) {
      tempArray.push("")
    }
    this.formats.push(tempArray)
  } else {
    this.formats.push(changes)
  }
}

/**
 * Returns the Table payload
 * @return {Array} Raw payload
 */
Table.prototype.getPayload = function() {
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@columns",
    "value": this.columns,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@rows",
    "value": this.rows,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@changes",
    "value": this.changes,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@formats",
    "value": this.formats,
  })
  this.internalPayload.push({
    "date": this.date,
    "key": this.key + "@order_by",
    "value": this.order_by,
  })
  return this.internalPayload
}