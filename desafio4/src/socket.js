const ProductManager = require("./manager/productManager");
const container = new ProductManager("products");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`New Client Connection with ID: ${socket.id}`);
      
        socket.on("new-product", async (newProd) => {
          try {
            await container.addProduct({ ...newProd });
            // Actualizando lista despues de agregar producto nuevo
            const productsList = await container.getProducts();
      
            io.emit("products", productsList);
          } catch (error) {
            console.log(error);
          }
        });

        socket.on("verify-code", async (verCode) => {
          try{
            let code = (verCode)
            await container.verifyCode(code);
            const productList = await container.getProducts();
            io.emit("products", productList)
          }catch (error) {
            console.log(error);
          }
        })
      
        socket.on("delete-product", async (delProd) => {
          try {
            let id = parseInt(delProd)
            // console.log(id)
            // console.log(typeof id)
            await container.deleteProduct(id);
            // Actualizando lista despues de agregar producto nuevo
            const productsList = await container.getProducts();
      
            io.emit("products", productsList);
          } catch (error) {
            console.log(error);
          }
        });
      });
}

