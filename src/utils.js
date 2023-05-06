import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";

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



