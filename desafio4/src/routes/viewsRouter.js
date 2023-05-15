const express = require("express");
const ProductManager = require("../manager/productManager");

const viewsRouter = express.Router();
const container = new ProductManager();

let products = [
    {
      pid: 1,
      title: "Bandeja Corazón",
      description: "con pajarito rojo",
      price: 3800,
      thumbnail: "https://melagas.github.io/avrceramica/img/bandeja-corazon-pajarito.JPG",
      code: "ban170",
      stock: 10
    },
    {
      pid: 2,
      title: "Mate",
      description: "Hojas verdes",
      price: 2000,
      thumbnail: "https://melagas.github.io/avrceramica/img/mate-flores.jpg",
      code: "mat130",
      stock: 5
    }
  ]

viewsRouter.get("/", async (req, res) => {
    //const products = await container.getProduct();
    res.render("index",{products});
});

module.exports = viewsRouter;