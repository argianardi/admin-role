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
    mitra_name: { type: Sequelize.STRING, unique: "mitra_name" },
    mitra_owner: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING, defaultValue: "mitra" },
    image: { type: Sequelize.STRING },
    no_telp: { type: Sequelize.STRING },
    provinsi: { type: Sequelize.STRING },
    kota: { type: Sequelize.STRING },
    kecamatan: { type: Sequelize.STRING },
    jalan: { type: Sequelize.STRING },
    status_kemitraan: { type: Sequelize.STRING, defaultValue: "unverified" },
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

// export table
module.exports = mitra;
