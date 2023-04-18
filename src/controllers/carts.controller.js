import * as CartsService from "../dao/db/carts.service.js";


export async function saveCart(request,response){
    try{
        const {body} = request;
        const confirm = await CartsService.save(body);
        response.status(200).json(confirm)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function getCartById(request, response){
    try{
        const cid = (request.params.cid);
        const cart = await CartsService.getCart(cid);
        response.status(200).json(cart)
    } catch (error){
        response.status(400).json(error.message)
    }
}
