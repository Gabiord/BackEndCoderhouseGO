import productsModel from "../dao/db/models/products.js"
import { cargarNuevoProducto } from "../dao/db/services/products.service.js";

export async function saveNewProduct(request,response){
    try {
        const {body} = request;
        const newProduct = cargarNuevoProducto(body);
        response.status(200).json(confirm)

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function getProducts(request, response){
    try {
        let limit = Number(request.query.limit);
        let page = Number(request.query.page);
        let sort = request.query.sort;
        let query =  request.query.query;
        if (!limit) limit = 10;
        if (!page) page = 1;


        let products = {};
        if (query){
            products = await productsModel.paginate({product_category: query},{limit:limit, page:page, sort:{product_price:sort}, lean:true});
        } else{
            products = await productsModel.paginate(undefined,{limit:limit, page:page, sort:{product_price:sort}, lean:true});
        }

        const respuesta = {
            "status": response.status,
            "payload": products.docs,
            "totalPages":products.totalDocs,
            "prevPage": products.prevPage,
            "nextPage": products.nextPage,
            "page": products.page,
            "hasPrevPage": products.hasPrevPage,
            "hasNextPage": products.hasNextPage,
            "prevLink": products.prevPage,
            "nextLink": products.nextPage,
            "sj":response.limit,
        }


        const sessionUser = request.user
        const sessionAdmin = false

        respuesta.prevLink = respuesta.hasPrevPage?`http://localhost:8080/api/products?limit=${limit?limit:''}&page=${respuesta.prevPage}&query=${query?query:''}&sort=${sort?sort:''}`:'';
        respuesta.nextLink = respuesta.hasNextPage?`http://localhost:8080/api/products?limit=${limit?limit:''}&page=${respuesta.nextPage}&query=${query?query:''}&sort=${sort?sort:''}`:'';
        respuesta.isValid= !(page<=0||page>respuesta.totalPages)

        response.status(200).render('products',{respuesta, sessionUser, sessionAdmin})

    } catch (error) {
        response.status(400).json(error.message)
    }
}

