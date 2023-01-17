const models = require("../configs/models/index");
const controllerPorter = {};
const jwt = require("jsonwebtoken");

// post porter
controllerPorter.post = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const admin_id = verifiedToken.id;

  const { name, email, password, no_telp, provinsi, kota, kecamatan, jalan } =
    req.body;

  if (
    !(
      name &&
      email &&
      password &&
      no_telp &&
      provinsi &&
      kota &&
      kecamatan &&
      jalan
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

// put porter request
controllerPorter.put = async (req, res) => {
  const { name, email, password, no_telp, provinsi, kota, kecamatan, jalan } =
    req.body;

  if (
    !(
      name &&
      email &&
      password &&
      no_telp &&
      provinsi &&
      kota &&
      kecamatan &&
      jalan
    )
  ) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const porter = await models.porter.update(
      {
        name: name,
        email: email,
        password: password,
        no_telp: no_telp,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        jalan: jalan,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      success: true,
      message: "The porter updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "500 internal server error",
    });
  }
};

// delete request
controllerPorter.delete = async (req, res) => {
  try {
    const porter = await models.porter.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "The porter deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "500 internal server error",
    });
  }
};

module.exports = controllerPorter;
