import { Router } from "express";
import ProductManager from "../services/productManager.js"

const router = Router();
const productManager = new ProductManager();

router.get('/', async (request, response)=>{
    let limite = Number(request.query.limit);
    const totalProducts = await productManager.getProducts();
    if (limite > 0) {
      const productsLimit = totalProducts.slice(0, limite);
      response.send(productsLimit);
    } else {
      response.send(totalProducts);
    }
});

router.get('/:pid', async (request, response) => {
    const param = Number(request.params.pid);
    const product = await productManager.getProductById(param);
    if(product){response.send(product)}
    else{response.send("no se encontro ese ID :(")}
    
});

router.post('/', async(request, response)=>{

    let newProduct = request.body;
    let {title, description, price, category, thumbnail, code, stock} = newProduct;
    if (typeof (title && description && price && category && code && stock) !== "undefined"){
        const addProduct = await productManager.addProduct(newProduct)
        response.send(addProduct)
    }
    else{
        response.send("Todos los campos son obligatorios, a excepción de thumbnails");
    }
})

router.put('/:pid', async(request, response)=>{
    let id = Number(request.params.pid);
    let campoModificado = request.body;
    let {campo, modificacion}= campoModificado;

    const verifID = await productManager.getProductById(id)
    if (!verifID){
        response.send("El producto no existe :(")
    }
    console.log(verifID.ID)
    const pedido = await productManager.updateProduct(id,campo,modificacion)
    response.send(pedido)
})

router.delete('/:pid', async(request,response)=>{
    let id = Number(request.params.pid);
    let deletedProduct = await productManager.deleteProduct(id)
    response.send(deletedProduct)
})

export default router;
