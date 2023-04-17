class ProductManager {
  id = 1;

  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }
  addProduct(product) {
    const searchCode = this.products.find((p) => p.code === product.code);
    if (searchCode) {
      return "This code already exists";
    }
    //if (product.title || product.description || product.thumbnail || product.code == " " || product.price || product.stock == 0){
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      return "Fields missing";
    }
    const newProduct = { ...product, id: this.id };
    this.products.push(newProduct);
    this.id++;
    return "Product added";
  }

  getProductById(id) {
    const searchProduct = this.products.find((p) => p.id === id);
    if (!searchProduct) {
      return "Not found";
    }
    return searchProduct;
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

const products = new ProductManager();

console.log(products.getProducts());
console.log(products.addProduct(product1));
console.log(products.addProduct(product2));
console.log(products.getProducts());
console.log(products.getProductById(1));
