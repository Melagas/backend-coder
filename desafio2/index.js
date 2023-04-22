const fs = require("fs");

class ProductManager{
  id = 1;
  constructor(path){
    this.path = path;
    this.products = [];
    const productString = fs.readFileSync(this.path,"utf-8");
    const products = JSON.parse(productString);
    this.products = products;
  }

  async addProduct(product){
     const searchCode = this.products.find((p) => p.code === product.code);
    if (searchCode) {
      return "This code already exists";
    }
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      return "Fields missing";
    }
    const newProduct = { ...product, id: this.id };
    this.products.push(newProduct);
    this.id++;
    const productString = JSON.stringify(this.products,null, 2);
    await fs.promises.writeFile(this.path, productString);
    return "Product added";
  }

  async getProductById(id){
    const searchProduct = this.products.find((p) => p.id === id);
    if (!searchProduct) {
      return "Not found";
    }
    await fs.promises.readFile(this.path,productString)
    return searchProduct;
  }

  async updateProduct(id,product){
    const foundProduct = this.products.find((product) => product.id === id);
        if (foundProduct){
          const filteredProducts = this.products.filter((product) => product.stock !== stock);
          const newProduct = { stock, ...product };
          this.products = [...filteredProducts, newProduct];
          await fs.promises.writeFile(this.path, productString, JSON.stringify(this.products));
          return newProduct;
        } else {
          return ERROR;
        }
      }

  async deleteProduct(id){
    this.products = this.products.filter(product => product.id !== id);
    await fs.promises.writeFile(this.path, productString, JSON.stringify(this.products));
  }

  async getProduct(){
    return this.products
  }
}

const product1 = {
  title: "Mouse",
  description: "Logitech inalambrico",
  price: 1800,
  thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3zj-jX_nugf0rmRyjifKu8_Df-eQIS5MHw&usqp=CAU",
  code: "log170",
  stock: 10, 
};

const product2 = {
  title: "Teclado",
  description: "Hyperx 65",
  price: 6000,
  thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNo0SaVKm6MmWMhFNTadswND_CVoWadZi73g&usqp=CAU",
  code: "hyp130",
  stock: 5,
};

const productsManager = new ProductManager("products.json");

console.log(productsManager.getProduct());
console.log(productsManager.addProduct(product1,product2));
console.log(productsManager.getProduct());
console.log(products.getProductById(1));
console.log(products.updateProduct(6));
console.log(products.deleteProduct(2));

