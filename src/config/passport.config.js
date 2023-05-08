import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/db/models/users.js";
import { createHash, isValidPassword } from "../utils.js";

// Declaramos nuestra estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  //Estrategia de registrar
  passport.use("register", new localStrategy({ passReqToCallback: true, usernameField: "email" },
      async (request, username, password, done) => {
        const { first_name, last_name, email, age } = request.body;
        try {
          const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const confirm = await userModel.create(user);
          return done(null, confirm);
        } catch (error) {
          return done("Error registrando el usuario" + error);
        }
      }
    )
  );

  // Estrategia de Login
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
      }
    )
  );

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
              age: 29,
              password: "",
              loggedBy: "Github",
            };

            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //estrategias de serializacion y deserializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario" + user);
    }
  });
};

export default initializePassport;
