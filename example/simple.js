var assert = require('assert')
var databox = require('../lib/databox')
var builder
var client

builder = databox.createBuilder();
client  = databox.createClient("5x8m7rwomz8c0wo8", "61usps63aug48k8ow8kkkw0gckwkck0o");

builder.addKpi("mirko", 1234);
builder.addKpi("birko", 1234);
builder.addKpi("cirko", 1234);
builder.addKpi("sirko", 1234);

pipeline = builder.createPipeline();
pipeline.setKey("testpipeline");
pipeline.setDate();
pipeline.addSlice("China", 123);
pipeline.addSlice("EU", 3321);
pipeline.addSlice("USA", 9876);
builder.addWidget(pipeline);

client.pushData(builder);

client.getLog();
