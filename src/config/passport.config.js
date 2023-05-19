import passport from "passport";    
import userModel from "../dao/db/models/users.js"; 
import jwtStrategy from "passport-jwt";
import dotenv from "dotenv";
import GitHubStrategy from "passport-github2";


const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;



const initializePassport = () => {
    //Estrategia de obtener Token JWT por Cookie:
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.PRIVATE_KEY
        },
        async(jwt_payload, done)=>{
            try {
                return done(null, jwt_payload.user)
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));


    //Estrategia de login con Github:
    passport.use("github",new GitHubStrategy({
        clientID: "Iv1.d0a5569b4dd681fb",
        clientSecret: "764bd8d3e0f8d812b3959c35f7607d92ec83bf11",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        },async (accessToken, refreshToken, profile, done) => {
            let user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
              let newUser = {
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email,
                age: 29,
                password: "",
                loggedBy: "Github",
              };
  
              const result = await userModel.create(newUser);
              done(null, result);
            } else {
              done(null, user);
            }  
         }
            )
        );
    


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
       console.log(token);
    }
    console.log(token);
    return token;
}


export default initializePassport;

