const models = require("../configs/models/index");
const controllerCategory = {};
const jwt = require("jsonwebtoken");

// post category request
controllerCategory.post = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const admin_id = verifiedToken.id;

  const { category_name, mitra_price, client_price, description } = req.body;
  if (!(category_name && mitra_price && client_price && description)) {
    return res.status(400).json({
      success: false,
      message: "bad request, some input are required",
    });
  }

  const category = await models.category.findAll({
    where: { category_name },
  });

  if (category.length > 0) {
    return res.status(400).json({
      success: false,
      message: "bad request, the category name has already been used",
    });
  } else {
    try {
      const category = await models.category.create({
        category_name,
        mitra_price,
        client_price,
        description,
        admin_id,
      });
      res.status(201).json({
        success: true,
        message: "the category added successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
};

// get all categories request
controllerCategory.getAll = async (req, res) => {
  try {
    const categories = await models.category.findAll();
    if (categories.length > 0) {
      res.status(200).json({
        succes: true,
        message: "all categories successfully obtained",
        data: categories,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "empty categories data",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "internal server error",
    });
  }
};

// get one category by id
controllerCategory.getOneCategory = async (req, res) => {
  try {
    const categories = await models.category.findAll({
      where: { id: req.params.id },
    });
    if (categories.length > 0) {
      res.status(200).json({
        succes: true,
        message: "all categories successfully obtained",
        data: categories,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "the category not found",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      succes: false,
      message: error.message,
    });
  }
};

// put one category by id request
controllerCategory.put = async (req, res) => {
  const { category_name, mitra_price, client_price, description } = req.body;
  if (!(category_name && mitra_price && client_price && description)) {
    return res.status(400).json({
      success: false,
      message: "Bad request, some input are required",
    });
  }

  const category = await models.category.findAll({
    where: { category_name },
  });

  if (category.length > 0) {
    return res.status(400).json({
      success: false,
      message: "bad request, the category name has already been used",
    });
  } else {
    try {
      const category = await models.category.update(
        {
          category_name: category_name,
          mitra_price: mitra_price,
          client_price: client_price,
          description: description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (category[0] === 0) {
        return res.status(400).json({
          success: false,
          message: "bad request, the category not found",
        });
      }

      res.status(201).json({
        success: true,
        message: "success updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
};

// delete request
controllerCategory.delete = async (req, res) => {
  try {
    const category = await models.category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (category === 0) {
      return res.status(400).json({
        success: false,
        message: "bad request, the category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = controllerCategory;
