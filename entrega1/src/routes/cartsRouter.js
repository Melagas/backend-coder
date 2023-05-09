const express = require ("express");
const ProductManager = require ("../manager/productManager");
const CartManager = require ("../manager/cartManager");

const cartsRouter = express.Router();
const products = new ProductManager()
const carts = new CartManager("./carts.json")


cartsRouter.get("/", async (req, res) => {
    try {
        const data = await carts.getCarts();
        res.status(200).json(data)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }
}
)

cartsRouter.post("/", async (req, res) => {
    try {
        const data = await carts.getCarts();
        await carts.addCart({ products: [] })
        res.status(200).json(data)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }
}
)

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const dataCarts = await carts.getCarts()
        const cid = req.params.cid
        const dataId = await carts.getCartById(parseInt(cid));
        if (dataId) {
            res.status(200).json(dataId)
        } else {
            res.status(200).json(`No existe el carrito id: ${cid}`)
        }
    } catch {
        res.status(500).json({ status: "error", msg: "Error in server", data: {} })
    }
})

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const dataCarts = await carts.getCarts()
        const dataProducts = await products.getProduct()
        const cartId = req.params.cid
        const productId = req.params.pid
        const cartFound = dataCarts.find((ele) => ele.id == cartId)
        if (!cartFound) {
            res.status(200).json(`No existe el carrito id: ${cartId}`)
        }
        const productFound = dataProducts.find((ele) => ele.pid == parseInt(productId))
        if (!productFound) {
            res.status(200).json(`No existe el producto id: ${productId}`)
        }
        const product = await carts.updateCart(parseInt(cartId), parseInt(productId))
        res.status(200).json(product)
    } catch {
        res.status(500).json({ status: "error", msg: "Error in server", data: {} })
    }
})

module.exports = cartsRouter;
