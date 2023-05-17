const express = require("express");
const handlebars = require("express-handlebars")
const productRouter = require("./routes/productsRouter");
const cartRouter= require("./routes/cartsRouter");
const realtimeprodsRouter = require("./routes/realtimeprodsRouter");
const ProductManager = require("./manager/productManager");
const container = new ProductManager("products")

const {Server} = require("socket.io");

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine","handlebars")
app.use(express.static(__dirname + '/public'))
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/realtimeproducts", realtimeprodsRouter);

socketServer.on("connection", (socket) => {
  console.log(`New Client Connection with ID: ${socket.id}`);

  socket.on("new-product", async (newProd) => {
    try {
      await container.addProduct({ ...newProd });
      // Actualizando lista despues de agregar producto nuevo
      const productsList = await container.getProducts();

      socketServer.emit("products", productsList);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("new-product", async (prod) => {
    try {
      await container.addProduct({ ...prod });
      // Actualizando lista despues de agregar producto nuevo
      const productsList = await container.getProducts();
      console.log(productsList);
      socketServer.emit("products", productsList);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("delete-product", async (delProd) => {
    try {
      let pid = parseInt(delProd)
      // console.log(id)
      // console.log(typeof id)
      await container.deleteProduct(pid);
      // Actualizando lista despues de agregar producto nuevo
      const productsList = await container.getProducts();

      socketServer.emit("products", productsList);
    } catch (error) {
      console.log(error);
    }
  });
});

app.get("*"),
  (req, res) => {
    return res.status(404).json({
      status: "error",
      msg: "the route is not implemented",
      data: {},
    });
  };
