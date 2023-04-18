import cartsModel  from "./models/carts.js";

export async function save (cart) {
        let result = await cartsModel.create(cart)
        return result;
}

export async function getCart (cid) {
        let result = await cartsModel.findById(cid)
        return result;
}