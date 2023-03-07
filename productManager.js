class product {
  constructor(title, description, price, thumbnail, code, stock, countID) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    (this.products = new Array()),
      (this.DirPath = "./files"),
      (this.FilePath = this.DirPath + "/products.json"),
      (this.fs = require("fs"));
  }

  crearDir = async () => {
    await this.fs.promises.mkdir(this.DirPath, { recursive: true });
    if (!this.fs.existsSync(this.FilePath)) {
      await this.fs.promises.writeFile(this.FilePath, "[]");
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      if (typeof stock !== "undefined") {
        await this.crearDir();
        let archivoString = await this.fs.promises.readFile(
          this.FilePath,
          "utf-8"
        );
        this.products = JSON.parse(archivoString);
        let confirm = this.products.some((product) => product.code === code);
        if (!confirm) {
          let countID = (this.products.length += 1);
          const newProduct = new product(
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            countID
          );
          this.products.push(newProduct);

          let copiaArray = this.products.filter(elem => {return elem !== null})
            
          archivoString = JSON.stringify(copiaArray);
          await this.fs.promises.writeFile(this.FilePath, archivoString);
          console.log("Producto agregado exitosamente")
        } else {
          console.log("El codigo esta respetido");
        }
      } else {
        console.log("Todos los campos son obligatorios");
      }
    } catch (error) {
      console.error(`Error creando producto, detalle del error: ${error}`);
      throw Error(`Error creando producto, detalle del error: ${error}`);
    }
  };

  getProducts = async () => {
    try {
      if (this.fs.existsSync(this.FilePath)) {
        let archivoString = await this.fs.promises.readFile(
          this.FilePath,
          "utf-8"
        );
        this.products = JSON.parse(archivoString);
        console.log(this.products);
      } else {
        console.log(this.products);
      }
    } catch (error) {
      console.error(`Error cargando productos, detalle del error: ${error}`);
      throw Error(`Error cargando productos, detalle del error: ${error}`);
    }
  };

  getProductById = async (prop) => {
    try {
      let archivoString = await this.fs.promises.readFile(
        this.FilePath,
        "utf-8"
      );
      this.products = JSON.parse(archivoString);
      let productId = this.products.find((product) => product.id === prop);

      if (productId) {
        console.log(productId);
      } else {
        console.error("no se encontro ese ID");
      }
    } catch (error) {
      console.error(`Error cargando productos, detalle del error: ${error}`);
      throw Error(`Error cargando productos, detalle del error: ${error}`);
    }
  };

  updateProduct = async (id, campo, modificacion) => {
    try {
      let archivoString = await this.fs.promises.readFile(
        this.FilePath,
        "utf-8"
      );
      this.products = JSON.parse(archivoString);

      let index = this.products.findIndex((product) => product.id === id);
      this.products[index][campo] = modificacion;

      archivoString = JSON.stringify(this.products);
      await this.fs.promises.writeFile(this.FilePath, archivoString);
    } catch (error) {
      console.error(
        `Error al actualizar el producto, detalle del error: ${error}`
      );
      throw Error(
        `Error al actualizar el producto, detalle del error: ${error}`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      let archivoString = await this.fs.promises.readFile(
        this.FilePath,
        "utf-8"
      );
      let archivoJson = JSON.parse(archivoString);
      let confirm = archivoJson.some((product) => product.id === id);

      if (confirm) {
        this.products = archivoJson.filter((producto) => producto.id !== id);
        archivoString = JSON.stringify(this.products);
        await this.fs.promises.writeFile(this.FilePath, archivoString);
        console.log("Producto eliminado exitosamente");
      } else {
        console.error("El ID no existe");
      }
    } catch (error) {
      console.error(
        `No se pudo eliminar el producto, detalle del error: ${error}`
      );
      throw Error(
        `No se pudo eliminar el producto, detalle del error: ${error}`
      );
    }
  };
}

// TESTING

const Manager = new ProductManager();

Manager.updateProduct(3,"price",799)


