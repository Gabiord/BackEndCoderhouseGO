import cartsModel from "./models/carts.js";


class cartService{
    constructor(){

    }

    createNewCart = async(prop) => {
        const cart = await cartsModel.create({cart_idUsuario: prop})
        return cart
    }

    addProductToCart = async(cid, pid) => {

    }

}


export default cartService;

