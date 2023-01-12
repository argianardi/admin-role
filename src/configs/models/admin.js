const Sequelize = require("sequelize"); // import sequelize
const db = require("../database/database"); // import database

const admin = db.define(
  "admin",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "email",
    },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.STRING, defaultValue: "admin" },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

// to execute alter table
db.sync({ alter: true })
  .then(() => {
    console.log("Admin table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Admin table:", error.message);
  });

// export table
module.exports = admin;
