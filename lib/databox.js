/**
 * Creates a Databox object
 * @constructor
 */
function databox() {
  return new databox
}

module.exports = databox

/**
 * Creates a client instance
 * @param      {String} customUrl  Unique URL of custom connection
 * @param      {String} apiKey  API key
 */
databox.createClient = function(customUrl, apiKey) {
  return new databox.Client({"uniqueUrl": customUrl, "apiKey": apiKey})
}

/**
 * Creates a builder instance
 */
databox.createBuilder = function() {
  return new databox.Builder()
}

databox.Builder = require('./builder').Builder
databox.Client = require('./client').Client

module.exports = databox