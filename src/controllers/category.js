const models = require("../configs/models/index");
const controllerCategory = {};

// post category request
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

// get all category request
controllerCategory.getAll = async (req, res) => {
  try {
    const categories = await models.category.findAll();
    if (categories.length > 0) {
      res.status(200).json({
        succes: true,
        message: "All categories successfully obtained",
        data: categories,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "The Categories not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      succes: false,
      message: error.message,
    });
  }
};

module.exports = controllerCategory;
