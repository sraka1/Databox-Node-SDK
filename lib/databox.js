function databox() {
  return new databox
}

module.exports = databox

databox.createClient = function(customUrl, apiKey) {
  return new databox.Client({"uniqueUrl": customUrl, "apiKey": apiKey})
}

databox.createBuilder = function() {
  return new databox.Builder()
}

databox.Builder = require('./builder').Builder
databox.Client = require('./client').Client

module.exports = databox