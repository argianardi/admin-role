const Sequelize = require("sequelize");
const db = require("../database/database");

const porter = db.define(
  "porter",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNul: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: "email" },
    password: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING, defaultValue: "porter" },
    no_telp: { type: Sequelize.STRING },
    province_id: { type: Sequelize.STRING },
    city_id: { type: Sequelize.STRING },
    district: { type: Sequelize.STRING },
    street: { type: Sequelize.STRING },
    admin_id: { type: Sequelize.STRING },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },
  },
  { freezeTableName: true }
);

// to execute alter table
db.sync({ alter: true })
  .then(() => {
    console.log("Porter table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Porter table:", error.message);
  });

// export table
module.exports = porter;
