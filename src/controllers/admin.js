const models = require("../configs/models/index");
const controllerAdmin = {};

// post admin request
controllerAdmin.post = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const admin = await models.admin.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({
      success: true,
      message: "The admin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "500 internal server error",
    });
  }
};

// put one admin by id request
controllerAdmin.put = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const admin = await models.admin.update(
      {
        name: name,
        email: email,
        password: password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Succes updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "500 internal server error",
    });
  }
};

module.exports = controllerAdmin;
