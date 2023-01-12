const models = {};
const category = require("./category");
const porter = require("./porter");
const mitra = require("./mitra");

models.category = category;
models.porter = porter;
models.mitra = mitra;

module.exports = models;
