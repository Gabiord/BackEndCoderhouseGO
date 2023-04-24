import productsModel from "../dao/db/models/products.js"

export async function saveNewProduct(request,response){
    try {
        const {body} = request;
        const confirm = await productsModel.create(newProduct);
        response.status(200).json(confirm)

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function getProducts(request, response){
    try {
        const products = await productsModel.find();
        response.status(200).json(products)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

