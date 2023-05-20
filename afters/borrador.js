const fs = require ('fs');

class ProductManager {
  constructor() {
    this.path = "./products.json";
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
        !product.stock ||
        !product.status
      ) {
        return "Fields missing";
      }
      const arrayId = data.length > 0 ? data[data.length - 1].pid + 1 : 1;
      const newProduct = { pid: arrayId, ...product };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(pid) {
    try {
      let data = await this.getProduct();
      const productFound = data.find((product) => product.pid === pid);
      if (!productFound) {
        return null;
      }
      return productFound;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(pid, newData) {
    try {
      let data = await this.getProduct();
      const position = data.findIndex((product) => product.pid === pid);
      if (position !== -1) {
        data[position] = { ...data[position], ...newData };
        const productString = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(this.path, productString);
      }
      return newData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(pid) {
    try {
      let data = await this.getProduct();
      data = data.filter((product) => product.pid !== pid);
      await fs.promises.writeFile(this.path,JSON.stringify(data, null, 2));
      return "deleted product"
    } catch (error) {
      throw new Error(error.message);
    }
  }
}