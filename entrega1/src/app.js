const express = require("express");
const cartRouter = require("./routes/cartsRouter");
const productRouter = require("./routes/productsRouter");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});

app.get("*"),
  (req, res) => {
    return res.status(404).json({
      status: "error",
      msg: "the route is not implemented",
      data: {},
    });
  };
