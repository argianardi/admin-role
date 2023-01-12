const models = {};
const category = require("./category");
const porter = require("./porter");
const mitra = require("./mitra");
const product = require("./product");
const admin = require("./admin");

models.category = category;
models.porter = porter;
models.mitra = mitra;
models.product = product;
models.admin = admin;

module.exports = models;
