const controllerShippingCost = {};
const axios = require("axios");

// Config Defaults Axios Rajaongkir
axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = process.env.RAJAONGKIR_API_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

controllerShippingCost.getCost = (req, res) => {
  let data;
  const { origin, destination, weight, courier } = req.body;
  if (origin > 501 || destination > 501) {
    return res.status(401).json({
      success: false,
      message: "The origin or destination not found",
    });
  }
  axios
    .post("/cost", {
      origin,
      destination,
      weight,
      courier,
    })
    .then((response) => {
      let courier = response.data.rajaongkir.results[0].name;
      let cost = response.data.rajaongkir.results[0].costs;
      return res.status(200).json({
        success: true,
        message: "Success get shipping cost",
        data: {
          courier: courier,
          cost: cost,
        },
      });
    })
    .catch((err) => {
      return res.status(501).json({
        datas: {
          success: false,
          message: "501 internal server error",
        },
      });
    });
};

module.exports = controllerShippingCost;
