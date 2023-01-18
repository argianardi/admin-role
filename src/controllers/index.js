const controllers = {};
const category = require("./category");
const porter = require("./porter");
const mitra = require("./mitra");
const product = require("./product");
const admin = require("./admin");
const auth = require("./auth");
const shippingCost = require("./shippingcost");

controllers.category = category;
controllers.porter = porter;
controllers.mitra = mitra;
controllers.product = product;
controllers.admin = admin;
controllers.auth = auth;
controllers.shippingCost = shippingCost;

module.exports = controllers;
