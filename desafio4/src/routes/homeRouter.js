const express = require("express");
const ProductManager = require("../manager/productManager");
const container = new ProductManager("products");

const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  try {
    const version = parseInt(req.query.v)
    const products = await container.getProducts();
    return res.render(
        version === 2
         ? "home2"
         : "home"

        , { products: products });
  } catch (error) {
    res.status(500).json({ succes: "false", msg: "Error", payload: {} });
  }
});

module.exports = homeRouter;