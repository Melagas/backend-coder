class ProductManager {
    constructor(){
        this.products = [];
    }
    static id = 0;
    
    getProducts(){
        console.log(this.products);
        return this.products;
    }
    addProducts(title,description,price,thumbnail,code,stock,id = ProductManager.id + 1){
        const product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: id
        }
        const findCode = this.products.find(prod => prod.code === code);
        if (findCode === undefined){
        console.log(`${product.title} added successfully`);
        ProductManager.id++;
        return this.products.push(product);
        }else{
            console.log("The product is already in the list");
        }
    }
    getProductsById(id){
        const findProduct = this.products.find(prod => prod.id === id);
        if(findProduct !== undefined){
            return console.log(findProduct);
        }else{
            console.log("product not found");
        }
    }
}

const products = new ProductManager();

products.getProducts();
products.addProducts("Mouse","Logitech inalambrico: color rojo",1800,"image.test","log170",10);
products.getProducts();
products.addProducts("Teclado","HyperX 65: color negro",10000,"image1.test","hyp280",5);
products.getProducts();
products.getProductsById(1);

