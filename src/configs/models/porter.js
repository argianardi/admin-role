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
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING, defaultValue: "porter" },
    no_telp: { type: Sequelize.STRING },
    provinsi: { type: Sequelize.STRING },
    kota: { type: Sequelize.STRING },
    kecamatan: { type: Sequelize.STRING },
    jalan: { type: Sequelize.STRING },
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
