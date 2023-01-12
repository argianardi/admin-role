const models = require("../configs/models/index");
const controllerProduct = {};

// post product
controllerProduct.post = async (req, res) => {
  const { product_name, image, stock, price, description, admin_id } = req.body;
  if (!(product_name && image && stock && price && description && admin_id)) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const product = await models.product.create({
      product_name: product_name,
      image: image,
      stock: stock,
      price: price,
      description: description,
      admin_id: admin_id,
    });
    res.status(201).json({
      message: "The product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "500 internal server error",
    });
  }
};

module.exports = controllerProduct;
