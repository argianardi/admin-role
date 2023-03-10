const models = require("../configs/models/index");
const controllersAdminAuth = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

controllersAdminAuth.login = async (req, res) => {
  // assign reques body
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({
      success: false,
      message: "Bad request: some input are required",
    });
  }

  try {
    const admin = await models.admin.findAll({
      where: { email },
    });
    if (admin.length > 0) {
      const comparePassword = bcrypt.compareSync(password, admin[0].password);
      if (comparePassword) {
        const secret = process.env.JWT_SECRET_KEY || "secret";
        const token = jwt.sign(
          { id: admin[0].id, role: admin[0].role },
          secret,
          {
            expiresIn: "2h",
          }
        );

        if (token) {
          res.status(200).json({
            success: true,
            message: "Login success",
            data: {
              token: token,
              name: admin[0].name,
              email: admin[0].email,
              role: admin[0].role,
              id: admin[0].id,
            },
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request: password doesn't match",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Bad request: the User not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

controllersAdminAuth.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(400).json({
      false: false,
      message: "Bad Request: some input are required",
    });
  }

  const admin = await models.admin.findAll({
    where: { email },
  });

  if (admin.length > 0) {
    return res
      .status(400)
      .json({ success: false, message: "The email is already registered!!" });
  } else {
    // bcrypt
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = await bcrypt.hashSync(password, salt);

    // post request use sequelizes
    try {
      const admin = await models.admin.create({
        name,
        password: passwordHashed,
        email,
      });
      res.status(201).json({
        success: false,
        message: "Registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

module.exports = controllersAdminAuth;
