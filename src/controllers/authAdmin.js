const models = require("../configs/models/index"); //import model
const controllersAuthAdmin = {}; //assign users controllers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

controllersAuthAdmin.login = async (req, res) => {
  // assign reques body
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({
      message: "Some input are required",
    });
  }

  try {
    const admin = await models.admin.findAll({
      where: { email },
    });
    console.log(admin);
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
            },
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Password doesn't match",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "The User not registered!!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "500 internet server error",
    });
  }
};

module.exports = controllersAuthAdmin;
