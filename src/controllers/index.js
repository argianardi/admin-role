const controllers = {};
const category = require("./category");
const porter = require("./porter");
const mitra = require("./mitra");

controllers.category = category;
controllers.porter = porter;
controllers.mitra = mitra;

module.exports = controllers;
