const fs = require("fs");

class ProductManager {
  constructor(id = 0) {
    this.products = [];
    const productString = fs.readFileSync("products.json", "utf-8");
    const products = JSON.parse(productString);
    this.products = products;
    this.id = id;
  }

  addProduct(product) {
    const searchCode = this.products.find((p) => p.code === product.code);
    if (searchCode) {
      return "This code already exists";
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return "Fields missing";
    }
    const arrayId = this.products.map((product) => product.id);
    const maxId = arrayId.length === 0 ? 0 : Math.max(...arrayId);
    const id = maxId + 1;
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    const productString = JSON.stringify(this.products, null, 2);
    fs.writeFileSync("products.json", productString);
    return newProduct;
  }

  getProductById(number) {
    const numberFound = this.products.find((product) => product.id === number);
    if (numberFound) {
      const productString = JSON.stringify(this.products, null, 2);
      fs.writeFileSync("products.json", productString);
      return numberFound;
    } else {
      return null;
    }
  }

  updateProduct(id, newStock) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex].stock = newStock;
      const productString = JSON.stringify(this.products, null, 2);
      fs.writeFileSync("products.json", productString);
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    fs.writeFileSync("products.json", JSON.stringify(this.products, null, 2));
  }

  getProduct() {
    return this.products;
  }
}

const productsManager = new ProductManager();

const product1 = {
  title: "Mouse",
  description: "Logitech inalambrico",
  price: 1800,
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3zj-jX_nugf0rmRyjifKu8_Df-eQIS5MHw&usqp=CAU",
  code: "log170",
  stock: 10,
};

const product2 = {
  title: "Teclado",
  description: "Hyperx 65",
  price: 6000,
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNo0SaVKm6MmWMhFNTadswND_CVoWadZi73g&usqp=CAU",
  code: "hyp130",
  stock: 5,
};

const product3 = {
  title: "Celular",
  description: "Motorola g6",
  price: 3000,
  thumbnail:
    "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/07/19093602/Moto-G6-Plus-1920-1.jpg",
  code: "mot620",
  stock: 2,
};

productsManager.addProduct(product1);
productsManager.addProduct(product2);
productsManager.addProduct(product3);
//console.log(productsManager.getProduct());
//console.log(productsManager.getProductById(1));
//productsManager.updateProduct(3, 50);
//productsManager.deleteProduct(2);
//console.log(productsManager.getProduct());
