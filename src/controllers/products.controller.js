import * as ProductService from "../dao/db/products.service.js"

export async function saveProduct(request,response){
    try {
        const {body} = request;
        const confirm = await ProductService.saveNewProduct(body);
        response.status(200).json(confirm)

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function getProducts(request, response){
    try {
        const products = await ProductService.getAllProducts();
        response.status(200).json(products)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

