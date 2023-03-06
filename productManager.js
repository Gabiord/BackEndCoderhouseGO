class product{
    static countId=0;
    constructor(title, description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = product.countId+=1;
    }
}

class ProductManager{

    constructor(){
        this.products = new Array(),
        this.DirPath = "./files",
        this.FilePath = this.DirPath + "/products.json",
        this.fs = require("fs")
    }


    addProduct = async(title, description, price, thumbnail, code, stock) => {
        try{
            if(typeof stock != "undefined"){
                await this.fs.promises.mkdir(this.DirPath, { recursive: true });
                if (!this.fs.existsSync(this.FilePath)) {
                    await this.fs.promises.writeFile(this.FilePath,"[]")}

                const newproduct = new product(title, description, price, thumbnail, code, stock)
                let archivoString = await this.fs.promises.readFile(this.FilePath,"utf-8");
                this.products = JSON.parse(archivoString)
                
                let confirm = this.products.some( product => product.code === newproduct.code)
                if(!confirm){
                    this.products.push(newproduct);
                    archivoString = JSON.stringify(this.products)
                    await this.fs.promises.writeFile(this.FilePath,archivoString)
                }
                else{
                    console.log ("El codigo esta respetido")
                }
            }

            else{
                console.log ("Todos los campos son obligatorios")
            }
        }

        catch (error) {
            console.error(`Error creando producto, detalle del error: ${error}`);
            throw Error(`Error creando producto, detalle del error: ${error}`);
        }

    }

    getProducts = async() => {
        try{
            if (this.fs.existsSync(this.FilePath)){
                let archivoString = await this.fs.promises.readFile(this.FilePath,"utf-8");
                this.products = JSON.parse(archivoString)
                console.log(this.products)
            }
            else{
                console.log(this.products)
            }
        }

        catch (error) {
            console.error(`Error cargando productos, detalle del error: ${error}`);
            throw Error(`Error cargando productos, detalle del error: ${error}`);
        }
    }


    getProductById = async(prop) => {
        try{
            let archivoString = await this.fs.promises.readFile(this.FilePath,"utf-8");
            this.products = JSON.parse(archivoString)
            let productId = this.products.find(product => product.id === prop)

            if(productId){
                console.log (productId)
            }
            else{
                console.error ("no se encontro ese ID")
            }
        }
        catch (error) {
            console.error(`Error cargando productos, detalle del error: ${error}`);
            throw Error(`Error cargando productos, detalle del error: ${error}`);
        }
    }

    updateProduct = async(id,campo,modificacion) => {
        try{
            let archivoString = await this.fs.promises.readFile(this.FilePath,"utf-8");
            this.products = JSON.parse(archivoString)
            
            let index = this.products.findIndex(product => product.id === id);
            this.products[index][campo] = modificacion;

            archivoString = JSON.stringify(this.products)
            await this.fs.promises.writeFile(this.FilePath,archivoString)
        }
        catch (error) {
            console.error(`Error al actualizar el producto, detalle del error: ${error}`);
            throw Error(`Error al actualizar el producto, detalle del error: ${error}`);
        }

    }

    deleteProduct = async(id) => {
        try{
            let archivoString = await this.fs.promises.readFile(this.FilePath,"utf-8");
            let archivoJson = JSON.parse(archivoString)

            this.products = archivoJson.filter(producto => producto.id !== id)

            archivoString = JSON.stringify(this.products)
            await this.fs.promises.writeFile(this.FilePath,archivoString)
        }
        catch (error) {
            console.error(`No se pudo eliminar el producto, detalle del error: ${error}`);
            throw Error(`No se pudo eliminar el producto, detalle del error: ${error}`);
        }
    }    
}

// TESTING 

const Manager = new ProductManager();

Manager.deleteProduct(6);















