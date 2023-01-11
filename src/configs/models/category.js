const Sequelize = require("sequelize"); // import sequelize
const db = require("../database/database"); // import database

const category = db.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    category_name: {
      type: Sequelize.STRING(225),
      allowNull: false,
      unique: "category_name",
    },
    mitra_price: { type: Sequelize.INTEGER, allowNull: false },
    client_price: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.STRING },
    admin_id: { type: Sequelize.STRING },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

// to execute alter table
db.sync({ alter: true })
  .then(() => {
    console.log("Category table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Category table:", error.message);
  });

// export table
module.exports = category;
