const express = require("express");
const ProductManager = require("./Products");
const container = new ProductManager("./products.json");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});

app.get("/products", (req,res)=>{
  const limit = req.query.limit;
  const products = container.getProduct();
  if (limit) { 
    res.json(products.slice(0,limit));
  }else{
    res.json(products);
  }
});

app.get("/products/:id", (req,res)=>{
  const id = req.params.id;
  const product = container.getProductById(parseInt(id));
  if(product){
    res.json(product);
  }else{
    res.json({error:"Product not found"});
  }
});










