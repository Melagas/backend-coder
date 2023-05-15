const express = require("express");
const productRouter = require("./routes/productsRouter");
const cartRouter= require("./routes/cartsRouter");
const {Server} = require("socket.io")
const handlebars = require("express-handlebars")
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use('/static', express.static(__dirname + '/public'))
app.set("views", __dirname+"/views");
app.set("view engine","handlebars")


const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

//ROUTER
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//SOCKET
app.use("/realtimeproducts",productRouter)

let ceramicas = [
  {name:"Taza",price:1800},
  {name:"Bandeja",price:6543},
  {name:"Mate",price:2123},
  {name:"Saumerio",price:1234},
  {name:"Ensaladera",price:144}
]

app.get("/",(req,res)=>{
  let testUser = {
    name:"Gaston",
    lastName: "Mela",
    role: "admin"
    //role: "user"
  }
  res.render("index",{
    user: testUser,
    isAdmin: testUser.role==="admin",
    ceramicas
  });
})

app.get("*"),
  (req, res) => {
    return res.status(404).json({
      status: "error",
      msg: "the route is not implemented",
      data: {},
    });
  };
