import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URL) // Ver porque esto me llega undefined???

const conectMongoDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.y2fnfpw.mongodb.net/ecommerce");
        console.log("Conectado con exito a MongoDB usando Moongose.")
    }catch(error){
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}

export default conectMongoDB();