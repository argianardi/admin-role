const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const controller = require("./controllers/index");
// const fileReq = require("./routes/fileReq");

// const categoryRoutes = require("./routes/category");
// const porterRouters = require("./routes/porter");
// const mitraRouters = require("./routes/mitra");
const productRouters = require("./routes/product");
// const adminRouters = require("./routes/admin");

// initialize express
const app = express();

// use package
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
// app.use("/", categoryRoutes);
// app.use("/", porterRouters);
// app.use("/", mitraRouters);
app.use("/", productRouters);
app.use("/", controller.product.post);
app.use("/", controller.product.put);

// app.use("/", adminRouters);

// server listening
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
