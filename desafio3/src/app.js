const express = require("express");
const ProductManager = require("./Products");
const container = new ProductManager('./products.json');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});

app.get("/products", (req,res)=>{
  const products = container.getProduct();
  res.json(products)
});

app.get("/products?limit=5", (req,res)=>{
  const products = container.getProduct();
  const firstFive = products.slice(0,5);
  res.json(firstFive);
});


app.get("/:id", (req,res)=>{
  const id = res.params.id;
  const products = container.find(p=>p.id===id)
  //const products = container.getProductById(id);
  res.send(products); 
});










