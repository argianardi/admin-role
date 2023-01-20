const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const upload = require("../utils/multer");
const models = require("../configs/models/index");
const app = express();
const controllerProduct = {};
const jwt = require("jsonwebtoken");

// post request
controllerProduct.post = app.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin_id = verifiedToken.id;
    const { product_name, stock, price, description } = req.body;
    const uploadImage = await cloudinary.uploader.upload(req.file.path);

    if (!(product_name && uploadImage && stock && price && description)) {
      return res.status(400).json({
        message: "bad request, some input are required",
      });
    }

    try {
      const product = await models.product.create({
        product_name,
        image: uploadImage.url,
        stock,
        price,
        description,
        admin_id,
      });
      res.status(201).json({
        success: true,
        message: "the product created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
);

// get all products request
controllerProduct.getAll = async (req, res) => {
  try {
    const products = await models.product.findAll();
    if (products.length > 0) {
      res.status(200).json({
        succes: true,
        message: "all products successfully obtained",
        data: products,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: "empty products data",
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

// get one product by id request
controllerProduct.getOneProduct = async (req, res) => {
  try {
    const product = await models.product.findAll({
      where: { id: req.params.id },
    });

    if (product.length > 0) {
      res.status(200).json({
        success: true,
        message: "the product successfully obtained",
        data: product,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "empty the product data",
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

// put one product by id request
controllerProduct.put = app.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    const { product_name, stock, price, description } = req.body;
    const uploadImage = await cloudinary.uploader.upload(req.file.path);

    if (!(product_name && uploadImage && stock && price && description)) {
      return res.status(400).json({
        message: "bad request, some input are required",
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

      if (product[0] === 0) {
        return res.status(400).json({
          success: false,
          message: "bad request, the product not found",
        });
      }

      res.status(201).json({
        success: true,
        message: "success updated",
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
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

    if (product === 0) {
      return res.status(400).json({
        success: false,
        message: "bad request, the product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = controllerProduct;
