import config from "../config/config.js";
import MongoSingleton from "../config/mongdb-singleton.js"

let productService;

switch (config.persistence) {
    case "mongodb":
        const mongoInstance = async() => {
            try {
                await MongoSingleton.getInstance();
            } catch (error) {
                console.error(error);
                process.exit(0);
            }
        }
        mongoInstance(); 
        const { default: ProductServiceMongo } = await import('./db/products.service.js')   
        productService = new ProductServiceMongo(); 
        break;
    
    case "files": 
        const { default: ProductServiceFilesSystem } = await import('./filesystem/product.service.js')
        productService = new ProductServiceFilesSystem();
        break;
    default:
        console.error("Debe seleccionar una persistencia")
        break;
}

export {productService}
