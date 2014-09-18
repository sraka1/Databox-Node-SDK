var assert = require('assert')
var databox = require('../lib/databox')
var builder
var client

builder = databox.createBuilder()
client  = databox.createClient("32lkojmk5sw08o44", "17kibd5ds7a8k48s4wc0csoc88gckgw4os8400c04kc4w0kkcw")

//Simple KPI's
builder.addKpi("mirko", 1234)
builder.addKpi("birko", 1234)
builder.addKpi("cirko", 1234)
builder.addKpi("sirko", 1234)

//Add a pipeline
pipeline = builder.createPipeline()
pipeline.setKey("testpipeline")
pipeline.setDate(); //Mandatory for now
pipeline.addSlice("China", 123)
pipeline.addSlice("EU", 3321)
pipeline.addSlice("USA", 9876)
builder.addWidget(pipeline)

//Add a funnel
funnel = builder.createFunnel()
funnel.setKey("testfunnel")
funnel.setDate(); //Mandatory for now
funnel.addSlice("Pizza", 123)
funnel.addSlice("Kebab", 3321)
funnel.addSlice("Burger", 9876)
builder.addWidget(funnel)

//Add "messages" widget
messages = builder.createMessages()
messages.setKey("testmessages")
messages.setDate(); //Mandatory for now
messages.addMessage('Woohoo!', 'USD')
messages.addMessage('Boom!', 'Number')
messages.addMessage('Yaay!', 'Ticket')
builder.addWidget(messages)

//Add a pie
pie = builder.createPie()
pie.setKey("testpie")
pie.setDate(); //Mandatory for now
pie.addSlice("Meat", 123)
pie.addSlice("Veggies", 3321)
pie.addSlice("Cheese", 9876)
builder.addWidget(pie)

//Add a progress indicator
progress = builder.createProgress()
progress.setKey("testpie")
progress.setDate() //Mandatory for now
progress.setData("Data downloaded", 20, 100)
builder.addWidget(progress)

//Add a table
table = builder.createTable()
table.setKey("testtable")
table.setDate() //Mandatory for now
table.addColumn("Username")
table.addColumn("Downloads")
table.addRow(["Jacob", "20"], ["", 12]) //values (array with same number of elements as there are columns), changes (array with same number of elements as there are columns)
builder.addWidget(table)

client.pushData(builder);

client.getLog();

//Returned on succesful push
client.on('dtbxPushSuccess', function(data) {
	console.log(data)
})

//Returned when getLog() returns data
client.on('dtbxLogSuccess', function(data) {
	console.log(data)
})

//Returned when an unknown error occurs
client.on('dtbxUnknownError', function(data) {
	console.log(data)
})

//Returned when you make too many requests
client.on('dtbxTooManyRequests', function(data) {
	console.log(data)
	setTimeout(function() {
		console.log("Try again now!")
	}, 10000)
})
