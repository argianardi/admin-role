const Sequelize = require("sequelize"); // import sequelize
const db = require("../database/database"); // import database

const product = db.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: Sequelize.STRING(225),
      allowNull: false,
    },
    image: { type: Sequelize.INTEGER, allowNull: false },
    stock: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    admin_id: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  { freezeTableName: true }
);

// to execute alter table
db.sync({ alter: true })
  .then(() => {
    console.log("Product table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Product table:", error.message);
  });

// export table
module.exports = product;
