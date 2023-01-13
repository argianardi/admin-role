const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const upload = require("../utils/multer");
const models = require("../configs/models/index");
const app = express();
const controllerProduct = {};

// get all products request
controllerProduct.getAll = async (req, res) => {
  try {
    const products = await models.product.findAll();
    if (products.length > 0) {
      res.status(200).json({
        succes: true,
        message: "All products successfully obtained",
        data: products,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "The products not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "500 internal server error",
    });
  }
};

// get one product by id request
controllerProduct.getOneProduct = async (req, res) => {
  try {
    const product = await models.product.findAll({
      where: { id: req.params.id },
    });

    if (product.length > 0) {
      res.status(200).json({
        success: true,
        message: "The product successfully obtained",
        data: product,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The product not found",
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

// post request
controllerProduct.post = app.post(
  "/product",
  upload.single("image"),
  async (req, res) => {
    const { product_name, stock, price, description, admin_id } = req.body;
    const uploadImage = await cloudinary.uploader.upload(req.file.path);

    if (
      !(
        product_name &&
        uploadImage &&
        stock &&
        price &&
        description &&
        admin_id
      )
    ) {
      return res.status(400).json({
        message: "Some input are required",
      });
    }

    try {
      const product = await models.product.create({
        product_name: product_name,
        image: uploadImage.url,
        stock: stock,
        price: price,
        description: description,
        admin_id: admin_id,
      });
      res.status(201).json({
        success: true,
        message: "The product created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "500 internal server error",
      });
    }
  }
);

// put one product by id request
controllerProduct.put = app.put(
  "/product/:id",
  upload.single("image"),
  async (req, res) => {
    const { product_name, stock, price, description } = req.body;

    const uploadImage = await cloudinary.uploader.upload(req.file.path);

    if (!(product_name && uploadImage && stock && price && description)) {
      return res.status(400).json({
        message: "Some input are required",
      });
    }

    try {
      const product = await models.product.update(
        {
          product_name: product_name,
          image: uploadImage.url,
          stock: stock,
          price: price,
          description: description,
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
        message: "500 internal server error",
      });
    }
  }
);

// delete request
controllerProduct.delete = async (req, res) => {
  try {
    const product = await models.product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      message: "data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "500 internal server error",
    });
  }
};

module.exports = controllerProduct;
