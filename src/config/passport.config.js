import passport from "passport";    
import userModel from "../dao/db/models/users.js"; 
import jwtStrategy from "passport-jwt";
import dotenv from "dotenv";
import GitHubStrategy from "passport-github2";
import passportLocal from "passport-local";

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

// Declaramos nuestra estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {

     // Estrategia de Login con session
    passport.use("login", new localStrategy({ passReqToCallback: true, usernameField: "email" },
    async (request, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
    }));

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
            try {
                let user = await userModel.findOne({ email: profile._json.email });
                    if (!user) {
                      let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile._json.email,
                        age: 0,
                        password: "",
                        loggedBy: "Github",
                      };
                        const result = await userModel.create(newUser);
                        done(null, result);
                    } else {
                        done(null, user);
                    }      
            } catch (error) {
                return done(error)
            }
    }));
    
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
const cookieExtractor = request =>{
    let token = null;
    if(request && request.cookies){ 
       token = request.cookies['jwtCookieToken'];
    }
    return token;
}

export default initializePassport;

