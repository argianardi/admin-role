const models = require("../configs/models/index");
const controllerCategory = {};

// post request
controllerCategory.post = async (req, res) => {
  const { category_name, mitra_price, client_price, description, admin_id } =
    req.body;
  if (
    !(category_name && mitra_price && client_price && description && admin_id)
  ) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const category = await models.category.create({
      category_name: category_name,
      mitra_price: mitra_price,
      client_price: client_price,
      description: description,
      admin_id: admin_id,
    });
    res.status(201).json({
      message: "The category added successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = controllerCategory;
