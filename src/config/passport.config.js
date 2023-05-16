import passport from "passport";    
import userModel from "../dao/db/models/users.js"; 
import jwtStrategy from "passport-jwt";
import PRIVATE_KEY from "../utils.js"


const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;



const initializePassport = () => {
    //Estrategia de obtener Token JWT por Cookie:
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: "THESECRET7"
        },
        async(jwt_payload, done)=>{
            console.log("Entrando a passport Strategy con JWT.");
            try {
                console.log("JWT obtenido del payload");
                console.log(jwt_payload);
                return done(null, jwt_payload.user)
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));

    //funcion de serializacion
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    //funcion de desearlizacion
    passport.deserializeUser(async(id, done)=>{
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            return done(error)
        }
    })
}

// funcion para extraer la cookie
const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){ 
       token = req.cookies['jwtCookieToken'];
    }
    console.log(token);
    return token;
}


export default initializePassport;

