import cartService from "../services/db/cart.service.js";

const CartService = new cartService()

export async function finalizarCompra(request, response){
    let cid = request.params.cid;
    const carrito = await CartService.getCartById(cid)

    

}



