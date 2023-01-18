const controllerShippingCost = {};
const axios = require("axios");

// Config Defaults Axios Rajaongkir
axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = process.env.RAJAONGKIR_API_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

controllerShippingCost.getCost = (req, res) => {
  const { origin, destination, weight, courier } = req.body;
  if (origin > 501 || destination > 501) {
    return res.status(401).json({
      success: false,
      message: "province id not found",
    });
  }
  axios
    .post("/cost", {
      origin,
      destination,
      weight,
      courier,
    })
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err));
};

module.exports = controllerShippingCost;
