import productsModel from "./models/products.js"


class ProductServiceMongo {
    constructor() {
    }
  
    addProduct = async(prop) => {
    const newProduct = await productsModel.create(prop)
    return newProduct;
    }

    getProductsByI = async(prop) => {
    const product = await productsModel.findById(prop)
    return product
    }
}

export default ProductServiceMongo;




