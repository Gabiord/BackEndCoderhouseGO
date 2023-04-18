import productsModel from "./models/products.js"

export async function saveNewProduct(newProduct){
    let result = await productsModel.create(newProduct);
    return result;
}

export async function getAllProducts() {
    let result = await productsModel.find()
    return result;
}

