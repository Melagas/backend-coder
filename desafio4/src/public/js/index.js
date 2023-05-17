const socket = io();

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputThumbnail = document.getElementById("form-thumbnail");

socket.on('products',(products)=>{
    console.log(products);
})

formProducts.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title: inputTitle.value,
      description: inputDescript.value,
      price: +inputPrice.value,
      thumbnail: inputThumbnail.value,
      code: inputCode.value,
      stock: +inputStock.value
    };
    socket.emit("new-product", newProduct);
    formProducts.reset();
  };

deleteProduct = (productId) => {
    socket.emit("delete-product", productId);
  };