import { request, response, Router } from "express";
import CartManager from "../services/cartManager.js";
import ProductManager from "../services/productManager.js"



const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async(request, response)=>{
    let pedido = await cartManager.addCart();
    response.send(pedido);
});

router.get('/:cid', async(request,response)=>{
    const cid = Number(request.params.cid);
    const cart = await cartManager.getCartById(cid);
    response.send(cart) 
})

router.post('/:cid/product/:pid', async(request,response)=>{

    const cid = Number(request.params.cid)
    const pid = Number(request.params.pid)

    await productManager.bajarProductos();
    const product = productManager.products.some(product => product.ID === pid)

    await cartManager.bajarCarts();
    const cart = cartManager.carts.some(cart => cart.ID === cid)

    if(!product || !cart){
        response.send({status: "Reject", message: "El ID del producto o carrito no existen"});
    }

    else{
    const pedido = await cartManager.addProductToCart(cid,pid);
    response.send(pedido);
    }
})

export default router;






