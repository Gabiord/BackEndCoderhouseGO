import cartsModel from "../models/carts.js";

export async function crearNuevoCarrito(prop){
    const cart = await cartsModel.create({cart_idUsuario: prop})
    return cart
}

