const express = require("express");
//const __dirname = require("./utils");
const handlebars = require("express-handlebars")
const productRouter = require("./routes/productsRouter");
const cartRouter= require("./routes/cartsRouter");
const viewsRouter = require("./routes/viewsRouter");
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
app.use("/api/realtimeproducts", viewsRouter);

socketServer.on("connection",socket=>{
  console.log("cliente conectado");
  socket.on("message",data=>{
    console.log(data);
  })
})

app.get("*"),
  (req, res) => {
    return res.status(404).json({
      status: "error",
      msg: "the route is not implemented",
      data: {},
    });
  };
