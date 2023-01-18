const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const upload = require("../utils/multer");
const models = require("../configs/models/index");
const app = express();
const controllerMitra = {};

// get All mitra request
controllerMitra.getAll = async (req, res) => {
  try {
    const mitras = await models.mitra.findAll();
    if (mitras.length > 0) {
      res.status(200).json({
        success: true,
        message: "All mitra successfully obtained",
        data: mitras,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The Mitra not found",
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

// get one mitra by id
controllerMitra.getOneMitra = async (req, res) => {
  try {
    const mitras = await models.mitra.findAll({
      where: { id: req.params.id },
    });
    if (mitras.length > 0) {
      res.status(200).json({
        success: true,
        message: "All mitra successfully obtained",
        data: mitras,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The Mitra not found",
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

// post mitra
controllerMitra.post = app.post(
  "/",
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

    try {
      const mitra = await models.mitra.create({
        mitra_name: mitra_name,
        mitra_owner: mitra_owner,
        email: email,
        password: password,
        image: uploadImage.url,
        no_telp: no_telp,
        province_id: province_id,
        city_id: city_id,
        district: district,
        street: street,
      });
      res.status(201).json({
        success: true,
        message: "The mitra added successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "500 internal server error",
      });
    }
  }
);

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

    try {
      const mitra = await models.mitra.update(
        {
          mitra_name: mitra_name,
          mitra_owner: mitra_owner,
          email: email,
          password: password,
          image: uploadImage.url,
          no_telp: no_telp,
          province_id: province_id,
          city_id: city_id,
          district: district,
          street: street,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        success: true,
        message: "Updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        // "500 internal server error",
      });
    }
  }
);

// delete mitra request
controllerMitra.delete = async (req, res) => {
  try {
    const mitra = await models.mitra.destroy({
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

module.exports = controllerMitra;
