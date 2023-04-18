import mongoose from "mongoose";

const collectionName = "messages";

const messagesSchema = new mongoose.Schema({
    user_name: { 
        type: String,
        require: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre es muy corto'],
        maxlength: [10, 'El nombre es muy largo']
                },
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
    user_phone:{
        type: Number,
        require: [true, 'El telefono es requerido'],
        min: [1000000000, 'El telefono es muy corto'],
        max: [9999999999, 'El telefono es muy largo']
    },
    user_message: {
        type: String, 
        require: [true, 'El mensaje es requerido'],
        minlength: [10, 'El mensaje es muy corto'],
        maxlength: [100, 'El mensaje es muy largo']
    }   
},{timestamps: true}
)

const messageModel =  mongoose.model(collectionName, messagesSchema);

export default messageModel;

