const Sequelize = require("sequelize");
const db = require("../database/database");

const mitra = db.define(
  "mitra",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNul: false,
      primaryKey: true,
    },
    mitra_name: { type: Sequelize.STRING },
    mitra_owner: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: "mitra_name" },
    password: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING, defaultValue: "mitra" },
    image: { type: Sequelize.STRING },
    no_telp: { type: Sequelize.STRING },
    province_id: { type: Sequelize.STRING },
    city_id: { type: Sequelize.STRING },
    district: { type: Sequelize.STRING },
    street: { type: Sequelize.STRING },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },
  },
  { freezeTableName: true }
);

// to execute alter table
db.sync({ alter: true })
  .then(() => {
    console.log("Mitra table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Mitra table:", error.message);
  });

module.exports = mitra;
