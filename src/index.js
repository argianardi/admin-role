const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const controller = require("./controllers/index");
const categoryRoutes = require("./routes/category");
const porterRouters = require("./routes/porter");
const mitraRouters = require("./routes/mitra");
const productRouters = require("./routes/product");
const adminRouters = require("./routes/admin");
const authAdminRouters = require("./routes/authAdmin");

// initialize express
const app = express();

// use package
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/", adminRouters);
app.use("/", categoryRoutes);
app.use("/", porterRouters);
app.use("/", mitraRouters);
app.use("/", controller.mitra.post);
app.use("/", productRouters);
app.use("/", controller.product.post);
app.use("/", controller.product.put);
app.use("/", authAdminRouters);

// server listening
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
