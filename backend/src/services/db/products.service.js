import productsModel from "./models/products.js"


class ProductServiceMongo {
    constructor() {
    }
  
    addProduct = async(prop) => {
    const newProduct = await productsModel.create(prop)
    return newProduct;
    }
}

export default ProductServiceMongo;




