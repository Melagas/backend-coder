const socket = io();

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputThumbnails = document.getElementById("form-thumbnails");

socket.on("products", (products) => {
  const productList = document.querySelector(".productListUpdated");
  productList.innerHTML = `
    ${products
      .map(
        (product) => 
        `<tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td><img src="${product.thumbnails}" alt="${product.id}" title="Foto de ${product.title}" style="width: 50px; min-height: 100%; max-height: 50px;"></td>
        <td><button type="button" class="btn btn-danger " onclick="deleteProduct(${product.id})">X</button></td>
      </tr>`).join("")}`;
});

formProducts.onsubmit = (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescript.value,
    price: +inputPrice.value,
    thumbnails: inputThumbnails.value,
    code: inputCode.value,
    stock: +inputStock.value
  };
  socket.emit("new-product", newProduct);
  formProducts.reset();
};

deleteProduct = (productId) => {
  socket.emit("delete-product", productId);
};