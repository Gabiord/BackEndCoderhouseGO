import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import passport from 'passport';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// Generamos password
const salt = bcrypt.genSaltSync(10);
export const createHash = password => bcrypt.hashSync(password,salt)

//Validamos la contraseña con la que esta en la BD
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password) // esto devuelve un true o falso
}


// Implementacion de JsonWebToken

export const PRIVATE_KEY = "THESECRET7"

export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"});
}

// para manejo de errores
export const passportCall = (strategy) => {
    return async (request, response, next) => {
        console.log("Entrando a llamar strategy: ");
        console.log(strategy);
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error);
            if (!user) {
                return response.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            console.log("Usuario obtenido del strategy: ");
            console.log(user);
            request.user = user;
            next();
        })(request, response, next);
    }
};

// para manejo de Auth
export const authorization = (role) => {
    return async (request, response, next) => {
        if (!request.user) return response.status(401).send("Unauthorized: User not found in JWT"); 
        if (request.user.role !== role) {
            return response.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
        }
        next();
    }
};



