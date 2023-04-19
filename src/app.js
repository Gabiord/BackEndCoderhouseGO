import Express from "express";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import realTimeProductsRoutes from "./routes/realTimeProducts.routes.js";
import messagesRoutes from "./routes/message.routes.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./dao/filesystem/services/product.service.js";
import "./db.js";
import * as MessagesService from "./dao/db/message.service.js"


const app = Express();
const productManager = new ProductManager();

//Configuracion Servidor
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async(socket) => {
  console.log("Nuevo cliente conectado");

  //para renderizar los productos
    const totalProducts = await productManager.getProducts();
    socket.emit("totalProducts",totalProducts)

  //para cargar un nuevo producto
  socket.on("newProduct", async (data) => {
    let newProduct = data;
    await productManager.addProduct(newProduct);
    const totalProducts = await productManager.getProducts();
    socket.emit("totalProducts",totalProducts)
  });

  //Para eliminar un producto
  socket.on("deleteProductID", async (data) => {
    await productManager.deleteProduct(data);
    const totalProducts = await productManager.getProducts();
    socket.emit("totalProducts",totalProducts)
  });

  socket.on('newMessage', async (data) => {
    await MessagesService.saveNewMessage(data);
    const totalMessages = await MessagesService.getMessages();
    socket.emit("totalMessages", totalMessages)
  })

});


//Configuracion Postman
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//configuracion de HBS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views/");
app.set("view engine", "handlebars");

//Configuracion para utilizar carpeta public
app.use(Express.static(__dirname + "/public"));

//Declaraciones Router
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/realTimeProducts", realTimeProductsRoutes);
app.use("/api/messages", messagesRoutes);
