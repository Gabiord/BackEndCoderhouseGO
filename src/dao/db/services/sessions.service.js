import userModel from "../models/users.js";


export async function buscarenBD(prop){
    const user = await userModel.findOne({email: prop})
    return user;
}

export async function crearNuevoUsuario(newUser){
    const user = await userModel.create(newUser)
    return user
}

