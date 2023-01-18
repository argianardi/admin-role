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
    // .then((response) => res.json(response.data))
    .then((response) => {
      console.log(response.data);
      console.log("---------------------------------------------------");
      let courier = response.data.rajaongkir.results[0].name;
      let cost = response.data.rajaongkir.results[0].costs;
      return res.status(200).json({
        datas: {
          success: true,
          message: "Success get shipping cost",
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
  console.log(data);
};

module.exports = controllerShippingCost;

// export const ordersDistance = async (req, res) => {
//   const destination = req.body.destination;
//   const key = process.env.API_KEY;
//   const id = req.body.id;

//   const address = await getOrdersDistance(id);

//   const origin = address.district;

//   var distance;

//   var config = {
//     method: "get",
//     url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${key}`,
//     headers: {},
//   };

//   await axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       distance = response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   let text = "";
//   if (distance.rows[0].elements[0].distance.value > 15000) {
//     text = "distance too far( > 15 km )";
//   } else {
//     text = "sucess get distance";
//   }
//   return res.status(200).json({
//     meta: {
//       code: 200,
//       message: text,
//     },
//     data: {
//       origin: origin,
//       destination: destination,
//       distance: distance.rows[0].elements[0].distance.text,
//     },
//   });
// };
