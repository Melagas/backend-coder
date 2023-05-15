const express = require("express");
const ProductManager = require("../manager/productManager");

const productRouter = express.Router();
const container = new ProductManager();

productRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await container.getProduct();
    if (limit) {
      res.status(200).json(products.slice(0, limit));
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await container.getProductById(parseInt(pid));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await container.addProduct(product);
    res.send({satatus: "succes", payload: newProduct});
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

productRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const obj = req.body;
    const newProduct = await container.updateProduct(parseInt(pid),obj);
    res.send({status: "succes", payload: newProduct});
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

productRouter.delete("/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const product = container.deleteProduct(parseInt(pid));
    res.send({status: "succes", payload: product});
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

module.exports = productRouter;
