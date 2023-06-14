import cartService from "../services/db/cart.service.js";
import { productService } from "../services/factory.js";

const CartService = new cartService()

export async function finalizarCompra(request, response){
    try {
        let cid = request.params.cid;
        let cart = request.body.cart; 

        let cartDefinitivo = []
        let cartPendiente = []

        await cart.map(producto => {
            let item = producto.id
            let quantity = producto.quantity;
        
            let check = productService.checkStockById(item, quantity)// me da error al colocar el await. Ver porque?

            if(check){
                cartDefinitivo.push({item, quantity})
            }
            else{
                cartPendiente.push({item, quantity})
            }
        })

        const newCart = {
            cart_idUsuario: "6461147dd320e5712d24fdc7",
            cart_products: cartDefinitivo
        }

        const guardarCartenBD= await CartService.createNewCart(newCart)
        const ticket = {
            


        }
    
        
    
    } catch (error) {
        response.status(400).json(error.message)
        
    }
    

}





