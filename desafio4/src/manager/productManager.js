const fs = require("fs");

class ProductManager {
  constructor(fileName) {
    this.path = `./${fileName}.json`;
    this.products = [...productList];
  }

  async getData() {
    fs.existsSync(this.path)
      ? (this.products = JSON.parse(
          await fs.promises.readFile(this.path, "utf-8")
        ))
      : await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    return this.products;
  }

  async verifyCode(product) {
    try {
      await this.getData();
      if (this.products.some((item) => item.code === product.code)) {
        console.log("the code already exists");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(product) {
    try {
      await this.getData();

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnails ||
        !product.code ||
        !product.stock
      ) {
        return "The content of the fields is wrong.";
      }

      if (this.products.some((item) => item.code === product.code)) {
        return "Product already exists.";
      }

      const maxId =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.id))
          : 0;
      this.id = maxId + 1;

      let newProduct = { id: this.id, ...product, status: true };
      this.products.push(newProduct);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );

      return "Product added successfully.";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts() {
    await this.getData();
    return this.products;
  }

  async getProductById(id) {
    await this.getData();
    let prodFound = this.products.find((p) => p.id === id);
    if (!prodFound) {
      return "Product not found.";
    }
    return prodFound;
  }

  async updateProduct(id, updatedProduct) {
    await this.getData();
    let prodIndex = this.products.findIndex((p) => p.id === id);

    if (prodIndex === -1) {
      return "Product not found.";
    }

    this.products[prodIndex] = {
      ...this.products[prodIndex],
      ...updatedProduct,
    };

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );

    return "Product updated successfully.";
  }

  async deleteProduct(id) {
    await this.getData();
    const prodIndex = this.products.findIndex((p) => p.id === id);

    if (prodIndex === -1) {
      return "Product not found.";
    }

    this.products.splice(prodIndex, 1);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );

    return "Product deleted successfully.";
  }
}

const productList = [
  {
    title: "Bandeja Corazón",
    description: "con pajarito rojo",
    price: 3800,
    thumbnails:
      "https://melagas.github.io/avrceramica/img/bandeja-corazon-pajarito.JPG",
    code: "ban170",
    stock: 10,
  },
  {
    title: "Mate",
    description: "Hojas verdes",
    price: 2000,
    thumbnails: "https://melagas.github.io/avrceramica/img/mate-flores.jpg",
    code: "mat130",
    stock: 5,
  },
  {
    title: "Azucarera",
    description: "con mariposas",
    price: 3400,
    thumbnails:
      "https://melagas.github.io/avrceramica/img/azucarera-mariposas.jpg",
    code: "azu620",
    stock: 2,
  },
  {
    title: "Provoletera",
    description: "marron y lisa",
    price: 2800,
    thumbnails: "https://melagas.github.io/avrceramica/img/provoletera.jpg",
    code: "pov620",
    stock: 2,
  },
  {
    title: "Juego de yerba y azucar",
    description: "con flores",
    price: 5400,
    thumbnails:
      "https://melagas.github.io/avrceramica/img/azucareras-flores.jpg",
    code: "jue940",
    stock: 8,
  },
  {
    title: "Bandeja ovalada",
    description: "con pajarito",
    price: 2900,
    thumbnails:
      "https://melagas.github.io/avrceramica/img/bandeja-pajarito.jpg",
    code: "ban230",
    stock: 2,
  },
  {
    title: "Porta saumerio",
    description: "flores azules",
    price: 3000,
    thumbnails: "https://melagas.github.io/avrceramica/img/saumerio.jpg",
    code: "sau510",
    stock: 6,
  },
  {
    title: "Juego de tazas",
    description: "Crema y café",
    price: 8000,
    thumbnails: "https://melagas.github.io/avrceramica/img/tazas-fores.jpg",
    code: "taz110",
    stock: 2,
  },
  {
    title: "Ensaladera",
    description: "picaflor",
    price: 6000,
    thumbnails:
      "https://melagas.github.io/avrceramica/img/foto-pagina-principal.jpg",
    code: "ens123",
    stock: 4,
  },
  {
    title: "Taza",
    description: "Gris",
    price: 3100,
    thumbnails: "https://melagas.github.io/avrceramica/img/taza-naranja.jpg",
    code: "taz901",
    stock: 12,
  },
];

module.exports = ProductManager;
