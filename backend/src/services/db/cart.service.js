import cartsModel from "./models/carts.js";


class cartService{
    constructor(){}

    createNewCart = async(prop) => {
        const cart = await cartsModel.create(prop)
        return cart
    }

    getCartById = async(prop) => {
        const cart = await cartsModel.findById(prop)
        return cart
    }

}


export default cartService;

