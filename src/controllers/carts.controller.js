import { json } from "express";
import cartsModel  from "../dao/db/models/carts.js";

export async function getCartById(request, response){
    try{
        const cid = (request.params.cid);
        const cart = await cartsModel.findOne({_id:cid})
        console.log(JSON.stringify(cart))
        response.status(200).render('cart',cart)
    } catch (error){
        response.status(400).json(error.message)
    }
}

export async function saveNewCart(request,response){
    try{
        const {body} = request;
        const confirm = await cartsModel.create(body);
        response.status(200).json(confirm)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function deleteProductofCart(request,response){
    try {
        const cid = (request.params.cid)
        const pid = (request.params.pid)

        const cart = await cartsModel.findById(cid).populate('cart_products')
        const index = await cart.cart_products.findIndex((id)=> id.products == pid);

        if (index>=0) {
            cart.cart_products.splice(index,1)
        }
        let result = await cartsModel.updateOne({_id:cid},cart)
        response.status(200).json(result)  
    
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function updateCart(request,response){

    try {
        const cid = request.params.cid;
        const {body} = request;

        const cart = await cartsModel.findById(cid).populate('cart_products')
        cart.cart_products = body;

        let result = await cartsModel.updateOne({_id:cid},cart)
        response.status(200).json(result)

    } catch (error) {
        response.status(400).json(error.message)
    }

}

export async function addProductToCart(request, response){
    try {
        const cid = (request.params.cid)
        const pid = (request.params.pid)
        const qty = Number(request.body.qty);

        const cart = await cartsModel.findById(cid)
        const index = await cart.cart_products.findIndex((id)=> id.products._id == pid);

        if (index<0) {
            cart.cart_products.push({products:pid, quantity:qty})
        } else {
            cart.cart_products[index].quantity+=1;
        }
        let result = await cartsModel.updateOne({_id:cid},cart)
        response.status(200).json(result)

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function deleteAllproductsofCart(request,response){
    try {
        const cid = (request.params.cid);
        const cart = await cartsModel.findById(cid).populate('cart_products');
        cart.cart_products = [];
        let result = await cartsModel.updateOne({_id:cid},cart)
        response.status(200).json(result)

    } catch (error) {
        response.status(400).json(error.message)
    }
}



