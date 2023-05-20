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

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await container.getProductById(parseInt(id));
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

productRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const newProduct = await container.updateProduct(parseInt(id),obj);
    res.send({status: "succes", payload: newProduct});
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

productRouter.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const product = container.deleteProduct(parseInt(id));
    res.send({status: "succes", payload: product});
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

module.exports = productRouter;
