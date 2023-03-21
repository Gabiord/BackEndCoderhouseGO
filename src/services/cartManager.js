import fs from "fs";

class cartManager{

    constructor(){
        (this.carts= new Array()),
        (this.DirPath = "./files"),
        (this.FilePath = this.DirPath + "/cart.json"),
        (this.fs = fs);
    }

    crearDir = async () => {
        await this.fs.promises.mkdir(this.DirPath, { recursive: true });
        if (!this.fs.existsSync(this.FilePath)) {
          await this.fs.promises.writeFile(this.FilePath, "[]");
        }
    };

    bajarCarts = async () => {
        let archivoString = await this.fs.promises.readFile(
          this.FilePath,
          "utf-8"
        );
        this.carts = JSON.parse(archivoString);
    }

    subirCarts = async(prop) => {

        let archivoString = JSON.stringify(prop);
        await this.fs.promises.writeFile(this.FilePath, archivoString)
    
      }

    addCart = async() =>{
        try{
            await this.crearDir();
            await this.bajarCarts();

            let newCart={};
            newCart.ID = Date.now();
            newCart.products=[];

            this.carts.push(newCart)
            this.subirCarts(this.carts)
            return this.carts
        }
        catch (error) {
            console.error(`Error creando Carrito, detalle del error: ${error}`);
            throw Error(`Error creando Carrito, detalle del error: ${error}`);
        }
    }

    
    getCartById = async (prop) => {
      try {
        await this.bajarCarts();
        let cartId = this.carts.find((cart) => cart.ID === prop);

        if (cartId) {
          return(cartId);
        } else {
          return(false);
        }
      } catch (error) {
        console.error(`Error cargando carrito, detalle del error: ${error}`);
        throw Error(`Error cargando carrito, detalle del error: ${error}`);
      }
    };

    addProductToCart = async(cid,pid) => {
        try{
            let totalCarts = this.bajarCarts();
                

        }
        catch(error){
            console.error(`Error cargando producto al carrito, detalle del error: ${error}`);
            throw Error(`Error cargando producto al carrito, detalle del error: ${error}`);
        }
    }



}

export default cartManager;