import fs from 'fs';

class ProductManager {
  constructor() {
    this.path = "./src/products.json";
  }

  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data); //para poder recuperar la data y recupera sus propiedades
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(product) {
    try {
      let data = await this.getProduct();
      const searchCode = data.find((p) => p.code === product.code);
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
      const arrayId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newProduct = { id: arrayId, ...product };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      let data = await this.getProduct();
      const productFound = data.find((product) => product.id === id);
      if (!productFound) {
        return null;
      }
      return productFound;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, newData) {
    try {
      let data = await this.getProduct();
      const position = data.findIndex((product) => product.id === id);
      if (position !== -1) {
        data[position] = { ...data[position], ...newData };
        const productString = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return 'Product update';
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      let data = await this.getProduct();
      data = data.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path,JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

// const product1 = {
//   title: "Bandeja Corazón",
//   description: "con pajarito rojo",
//   price: 3800,
//   thumbnail:
//     "https://melagas.github.io/avrceramica/img/bandeja-corazon-pajarito.JPG",
//   code: "ban170",
//   stock: 10,
// };
// const product2 = {
//   title: "Mate",
//   description: "Hojas verdes",
//   price: 2000,
//   thumbnail: "https://melagas.github.io/avrceramica/img/mate-flores.jpg",
//   code: "mat130",
//   stock: 5,
// };
// const product3 = {
//   title: "Azucarera",
//   description: "con mariposas",
//   price: 3400,
//   thumbnail:
//     "https://melagas.github.io/avrceramica/img/azucarera-mariposas.jpg",
//   code: "azu620",
//   stock: 2,
// };
// const product4 = {
//   title: "Provoletera",
//   description: "marron y lisa",
//   price: 2800,
//   thumbnail: "https://melagas.github.io/avrceramica/img/provoletera.jpg",
//   code: "pov620",
//   stock: 2,
// };
// const product5 = {
//   title: "Juego de yerba y azucar",
//   description: "con flores",
//   price: 5400,
//   thumbnail: "https://melagas.github.io/avrceramica/img/azucareras-flores.jpg",
//   code: "jue940",
//   stock: 8,
// };
// const product6 = {
//   title: "Bandeja ovalada",
//   description: "con pajarito",
//   price: 2900,
//   thumbnail: "https://melagas.github.io/avrceramica/img/bandeja-pajarito.jpg",
//   code: "ban230",
//   stock: 2,
// };
// const product7 = {
//   title: "Porta saumerio",
//   description: "flores azules",
//   price: 3000,
//   thumbnail: "https://melagas.github.io/avrceramica/img/saumerio.jpg",
//   code: "sau510",
//   stock: 6,
// };
// const product8 = {
//   title: "Juego de tazas",
//   description: "Crema y café",
//   price: 8000,
//   thumbnail: "https://melagas.github.io/avrceramica/img/tazas-fores.jpg",
//   code: "taz110",
//   stock: 2,
// };
// const product9 = {
//   title: "Ensaladera",
//   description: "picaflor",
//   price: 6000,
//   thumbnail:
//     "https://melagas.github.io/avrceramica/img/foto-pagina-principal.jpg",
//   code: "ens123",
//   stock: 4,
// };
// const product10 = {
//   title: "Taza",
//   description: "Gris",
//   price: 3100,
//   thumbnail: "https://melagas.github.io/avrceramica/img/taza-naranja.jpg",
//   code: "taz901",
//   stock: 12,
// };

const productsManager = new ProductManager();
//const asyncFn = async () => {
  // await productsManager.addProduct(product1);
  // await productsManager.addProduct(product2);
  // await productsManager.addProduct(product3);
  // await productsManager.addProduct(product4);
  // await productsManager.addProduct(product5);
  // await productsManager.addProduct(product6);
  // await productsManager.addProduct(product7);
  // await productsManager.addProduct(product8);
  // await productsManager.addProduct(product9);
  // await productsManager.addProduct(product10);
  //await productsManager.deleteProduct(5);
  //await productsManager.updateProduct(1,product1);
  //console.log(await productsManager.getProductById(45)); 
//};

//asyncFn();

//module.exports = ProductManager;
export default ProductManager;
