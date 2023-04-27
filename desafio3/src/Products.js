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
  
    getProductById(id) {
      const numberFound = this.products.find((product) => product.id === id);
      if (numberFound) {
        const productString = JSON.stringify(this.products, null, 2);
        fs.writeFileSync("products.json", productString);
        return numberFound;
      } else {
        return null;
      }
    }
  
    updateProduct(id, newStock) {
      const productId = this.products.findIndex(
        (product) => product.id === id
      );
      if (productId !== -1) {
        this.products[productId].stock = newStock;
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
    "id": 1,
    "title": "Bandeja Corazón",
    "description": "con pajarito",
    "price": 3800,
    "thumbnail": "https://melagas.github.io/avrceramica/img/bandeja-corazon-pajarito.JPG",
    "code": "ban170",
    "stock": 10
  }
  const product2 = {
    "id": 2,
    "title": "Mate",
    "description": "Hojas verdes",
    "price": 2000,
    "thumbnail": "https://melagas.github.io/avrceramica/img/mate-flores.jpg",
    "code": "mat130",
    "stock": 5
  }
  const product3 = {
    "id": 3,
    "title": "Azucarera",
    "description": "con mariposas",
    "price": 3400,
    "thumbnail": "https://melagas.github.io/avrceramica/img/azucarera-mariposas.jpg",
    "code": "azu620",
    "stock": 2
  }
  const product4 = {
    "id": 4,
    "title": "Provoletera",
    "description": "marron y lisa",
    "price": 2800,
    "thumbnail": "https://melagas.github.io/avrceramica/img/provoletera.jpg",
    "code": "pov620",
    "stock": 2
  }
  const product5 = {
    "id": 5,
    "title": "Juego de yerba y azucar",
    "description": "con flores",
    "price": 5400,
    "thumbnail": "https://melagas.github.io/avrceramica/img/azucareras-flores.jpg",
    "code": "jue940",
    "stock": 8
  }
  const product6 = {
    "id": 6,
    "title": "Bandeja ovalada",
    "description": "con pajarito",
    "price": 2900,
    "thumbnail": "https://melagas.github.io/avrceramica/img/bandeja-pajarito.jpg",
    "code": "ban230",
    "stock": 2
  }
  const product7 = {
    "id": 7,
    "title": "Porta saumerio",
    "description": "flores azules",
    "price": 3000,
    "thumbnail": "https://melagas.github.io/avrceramica/img/saumerio.jpg",
    "code": "sau510",
    "stock": 6
  }
  const product8 = {
    "id": 8,
    "title": "Juego de tazas",
    "description": "Crema y café",
    "price": 8000,
    "thumbnail": "https://melagas.github.io/avrceramica/img/tazas-fores.jpg",
    "code": "taz110",
    "stock": 2
  }
  const product9 = {
    "id": 9,
    "title": "Ensaladera",
    "description": "picaflor",
    "price": 6000,
    "thumbnail": "https://melagas.github.io/avrceramica/img/foto-pagina-principal.jpg",
    "code": "ens123",
    "stock": 4
  }
  const product10 = {
    "id": 10,
    "title": "Taza",
    "description": "Gris",
    "price": 3100,
    "thumbnail": "https://melagas.github.io/avrceramica/img/taza-naranja.jpg",
    "code": "taz901",
    "stock": 12
  }

productsManager.addProduct(product1);
productsManager.addProduct(product2);
productsManager.addProduct(product3);
productsManager.addProduct(product4);
productsManager.addProduct(product5);
productsManager.addProduct(product6);
productsManager.addProduct(product7);
productsManager.addProduct(product8);
productsManager.addProduct(product9);
productsManager.addProduct(product10);

  module.exports = ProductManager;
  