import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Conectado con exito a MongoDB usando Moongose.")
    }catch(error){
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}

export default conectMongoDB();