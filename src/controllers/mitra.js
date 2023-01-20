const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const upload = require("../utils/multer");
const models = require("../configs/models/index");
const app = express();
const controllerMitra = {};
const jwt = require("jsonwebtoken");

// post mitra
controllerMitra.post = app.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin_id = verifiedToken.id;

    const {
      mitra_name,
      mitra_owner,
      email,
      password,
      no_telp,
      province_id,
      city_id,
      district,
      street,
    } = req.body;

    const uploadImage = await cloudinary.uploader.upload(req.file.path);

    if (
      !(
        mitra_name &&
        mitra_owner &&
        email &&
        password &&
        uploadImage &&
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

    const mitra = await models.mitra.findAll({
      where: { email },
    });

    if (mitra.length > 0) {
      return res.status(400).json({
        success: false,
        message: "bad request, the email has already been used",
      });
    } else {
      try {
        const mitra = await models.mitra.create({
          mitra_name,
          mitra_owner,
          email,
          password,
          image: uploadImage.url,
          no_telp,
          province_id,
          city_id,
          district,
          street,
          admin_id,
        });
        res.status(201).json({
          success: true,
          message: "the mitra added successfully",
        });
      } catch (error) {
        res.status(500).json({
          message: "internal server error",
        });
      }
    }
  }
);

// get All mitra request
controllerMitra.getAll = async (req, res) => {
  try {
    const mitras = await models.mitra.findAll();
    if (mitras.length > 0) {
      res.status(200).json({
        success: true,
        message: "all mitra successfully obtained",
        data: mitras,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "empty mitras data",
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

// get one mitra by id
controllerMitra.getOneMitra = async (req, res) => {
  try {
    const mitras = await models.mitra.findAll({
      where: { id: req.params.id },
    });
    if (mitras.length > 0) {
      res.status(200).json({
        success: true,
        message: "the mitra successfully obtained",
        data: mitras,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "empty the mitra data",
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

// put status mitra
controllerMitra.put = app.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    const {
      mitra_name,
      mitra_owner,
      email,
      password,
      no_telp,
      province_id,
      city_id,
      district,
      street,
    } = req.body;

    const uploadImage = await cloudinary.uploader.upload(req.file.path);

    if (
      !(
        mitra_name &&
        mitra_owner &&
        email &&
        password &&
        uploadImage &&
        no_telp &&
        province_id &&
        city_id &&
        district &&
        street
      )
    ) {
      return res.status(400).json({
        message: "Some input are required",
      });
    }

    const mitra = await models.mitra.findAll({
      where: { email },
    });

    if (mitra.length > 0) {
      return res.status(400).json({
        success: false,
        message: "bad request, the email has already been used",
      });
    } else {
      try {
        const mitra = await models.mitra.update(
          {
            mitra_name,
            mitra_owner,
            email,
            password,
            image: uploadImage.url,
            no_telp,
            province_id,
            city_id,
            district,
            street: street,
          },
          { where: { id: req.params.id } }
        );

        if (mitra[0] === 0) {
          return res.status(400).json({
            success: false,
            message: "bad request, the mitra not found",
          });
        }

        res.status(200).json({
          success: true,
          message: "updated successfully",
        });
      } catch (error) {
        res.status(500).json({
          message: "internal server error",
        });
      }
    }
  }
);

// delete mitra request
controllerMitra.delete = async (req, res) => {
  try {
    const mitra = await models.mitra.destroy({
      where: { id: req.params.id },
    });

    if (mitra === 0) {
      return res.status(400).json({
        success: false,
        message: "bad request, the mitra not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "the mitra deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
  }
};

module.exports = controllerMitra;
