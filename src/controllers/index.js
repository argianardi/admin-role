const controllers = {};
const category = require("./category");
const porter = require("./porter");
const mitra = require("./mitra");
const product = require("./product");

controllers.category = category;
controllers.porter = porter;
controllers.mitra = mitra;
controllers.product = product;

module.exports = controllers;
