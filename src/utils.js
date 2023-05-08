import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";
import { request } from 'http';
import { response } from 'express';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// GENERAMOS EL HASH
const salt = bcrypt.genSaltSync(10);
export const createHash = password => bcrypt.hashSync(password,salt)

//Validamos la contraseña con la que esta en la BD
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password) // esto devuelve un true o falso
}


//Implementacion de JsonWebToken

// const PRIVATE_KEY = "THESECRET7"

// export const generateJWToken = (user) => {
//     return jwt.sing({user}, PRIVATE_KEY, {expiresIn: "24h"});
// }

// export const authToken = (request, response, next) => {

//     const authHeader = request.headers.autorization;
//     console.log("Token present in header auth: "+ authHeader);
    
//     if (!authHeader){
//         return response.status(401).send({error: "usuario no autenticado o token perdido"})
//     }

//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
//         if(error) return response.status(403).send({error: "Token invalido, no autorizado!"});

//         request.user = credentials.user;
//         console.log(request.user)
//         next();
//     })

// }

