const express = require("express");
const ProductManager = require("../manager/productManager");

const realtimeprodsRouter = express.Router();
const container = new ProductManager('products.json');

realtimeprodsRouter.get("/", async (req, res) => {
  try{
    products = await container.getProducts();
    return res.render("real-time-products",{products: products});
  } catch (error) {
    res.status(500).json({ succes: "false", msg: "Error", payload: {} });
  }
});

module.exports = realtimeprodsRouter;