const express = require("express");
const {Server: HttpServer} = require("http");
const {Server: SocketServer} = require("socket.io");

const productRouter = require("./routes/productsRouter");
const cartRouter= require("./routes/cartsRouter");
const homeRouter = require("./routes/homeRouter")
const realtimeprodsRouter = require("./routes/realtimeprodsRouter");

const handlebars = require("express-handlebars")
const path = require("path");
const socket = require("./socket");

const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const serverConnected = httpServer.listen(PORT, () =>
  console.log(`📢 Server listening on port: ${PORT}`)
);

serverConnected.on("error", (error) => console.log(`Server error: ${error}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public",express.static(__dirname + '/public'));


app.engine("handlebars", handlebars.engine());
app.set("view engine","handlebars")
app.set("views", path.join(__dirname,"views"));


app.use("/api/", productRouter);
app.use("/api/", cartRouter);
app.use("/", homeRouter);
app.use("/realtimeproducts", realtimeprodsRouter);

socket(io);

app.get("*", (req, res) =>
  res.status(404).send("<h3> ⛔ We cannot access the requested route</h3>")
);
