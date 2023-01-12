const models = require("../configs/models/index");
const controllerPorter = {};

// post porter
controllerPorter.post = async (req, res) => {
  const {
    name,
    email,
    password,
    no_telp,
    provinsi,
    kota,
    kecamatan,
    jalan,
    admin_id,
  } = req.body;

  if (
    !(
      name &&
      email &&
      password &&
      no_telp &&
      provinsi &&
      kota &&
      kecamatan &&
      jalan &&
      admin_id
    )
  ) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const porter = await models.porter.create({
      name: name,
      email: email,
      password: password,
      no_telp: no_telp,
      provinsi: provinsi,
      kota: kota,
      kecamatan: kecamatan,
      jalan: jalan,
      admin_id: admin_id,
    });
    res.status(201).json({
      success: true,
      message: "The porter added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "500 internal server error",
    });
  }
};

// put get All porters request
controllerPorter.getAll = async (req, res) => {
  try {
    const porters = await models.porter.findAll();
    if (porters.length > 0) {
      res.status(200).json({
        success: true,
        message: "All porters successfully obtained",
        data: porters,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Porters not found",
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

// get one porter by id request
controllerPorter.getOnePorter = async (req, res) => {
  try {
    const porter = await models.porter.findAll({
      where: { id: req.params.id },
    });

    if (porter.length > 0) {
      res.status(200).json({
        success: true,
        message: "The porter successfully obtained",
        data: porter,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The porter not found",
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

module.exports = controllerPorter;
