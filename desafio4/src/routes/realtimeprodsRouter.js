const express = require("express");
const ProductManager = require("../manager/productManager");
const container = new ProductManager("products");

const realTimeProdRouter = express.Router();

realTimeProdRouter.get("/", async (req, res) => {
  try {

    const products = await container.getProducts();
    return res.render("realTimeProducts", { products: products });

  } catch (error) {
    res.status(500).json({ succes: "false", msg: "Error", payload: {} });
  }
});

module.exports = realTimeProdRouter;