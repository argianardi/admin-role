const models = require("../configs/models/index");
const controllerPorter = {};
const jwt = require("jsonwebtoken");

// post porter
controllerPorter.post = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const admin_id = verifiedToken.id;

  const {
    name,
    email,
    password,
    no_telp,
    province_id,
    city_id,
    district,
    street,
  } = req.body;

  if (
    !(
      name &&
      email &&
      password &&
      no_telp &&
      province_id &&
      city_id &&
      district &&
      street
    )
  ) {
    return res.status(400).json({
      message: "bad request, some input are required",
    });
  }

  const porter = await models.porter.findAll({
    where: { email },
  });

  if (porter.length > 0) {
    return res.status(400).json({
      success: false,
      message: "bad request, the email has already been used",
    });
  } else {
    try {
      const porter = await models.porter.create({
        name,
        email,
        password,
        no_telp,
        province_id,
        city_id,
        district,
        street,
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
  }
};

// get All porters request
controllerPorter.getAll = async (req, res) => {
  try {
    const porters = await models.porter.findAll();
    if (porters.length > 0) {
      res.status(200).json({
        success: true,
        message: "all porters successfully obtained",
        data: porters,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "empty porters data",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
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
        message: "the porter successfully obtained",
        data: porter,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "the porter not found",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// put porter request
controllerPorter.put = async (req, res) => {
  const {
    name,
    email,
    password,
    no_telp,
    province_id,
    city_id,
    district,
    street,
  } = req.body;

  if (
    !(
      name &&
      email &&
      password &&
      no_telp &&
      province_id &&
      city_id &&
      district &&
      street
    )
  ) {
    return res.status(400).json({
      message: "bad request, some input are required",
    });
  }

  const porter = await models.porter.findAll({
    where: { email },
  });

  if (porter.length > 0) {
    return res.status(400).json({
      success: false,
      message: "bad request, the email has already been used",
    });
  } else {
    try {
      const porter = await models.porter.update(
        {
          name,
          email,
          password,
          no_telp,
          province_id,
          city_id,
          district,
          street,
        },
        { where: { id: req.params.id } }
      );

      if (porter[0] === 0) {
        return res.status(400).json({
          success: false,
          message: "bad request, the porter not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "the porter updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
};

// delete request
controllerPorter.delete = async (req, res) => {
  try {
    const porter = await models.porter.destroy({
      where: { id: req.params.id },
    });

    if (porter === 0) {
      return res.status(400).json({
        success: false,
        message: "bad request, the porter not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "The porter deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
  }
};

module.exports = controllerPorter;
