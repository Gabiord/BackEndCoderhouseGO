import productsModel from "../models/products.js"

export async function cargarNuevoProducto(prop){
    const newProduct = await productsModel.create(prop)
    return newProduct;
}

