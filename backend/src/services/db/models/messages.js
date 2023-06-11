import mongoose from "mongoose";

const collectionName = "messages";

const messagesSchema = new mongoose.Schema({
    user_email: {
        type: String,
        require: [true, 'El email es requerido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresar un email Valido'],
        lowercase: true,
        trim: true,
        validate: [
            {   validator: (value) => {
                if(value.lenhgt > 10) return false;
                return (true);
                },
                message: "El email es muy corto"
            }
        ]
    },
    user_message: {
        type: String, 
        require: [true, 'El mensaje es requerido'],
    }   
},{timestamps: true}
)

const messageModel =  mongoose.model(collectionName, messagesSchema);

export default messageModel;

