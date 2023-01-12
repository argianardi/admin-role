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
      success: true,
      message: "The product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "500 internal server error",
    });
  }
};

// get all products request
controllerProduct.getAll = async (req, res) => {
  try {
    const products = await models.product.findAll();
    if (products.length > 0) {
      res.status(200).json({
        succes: true,
        message: "All products successfully obtained",
        data: products,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "The products not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "500 internal server error",
    });
  }
};

// get one product by id request
controllerProduct.getOneProduct = async (req, res) => {
  try {
    const product = await models.product.findAll({
      where: { id: req.params.id },
    });

    if (product.length > 0) {
      res.status(200).json({
        success: true,
        message: "The product successfully obtained",
        data: product,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The product not found",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "500 internal server error",
    });
  }
};

module.exports = controllerProduct;
