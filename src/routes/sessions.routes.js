import { Router} from "express";
import * as sessionsController from "../controllers/sessions.controller.js";
import passport from "passport";
import { passportCall, authorization} from "../utils.js";
import cookieParser from 'cookie-parser';

const router = Router();

router.use(cookieParser()); 

//RENDERIZADO DE VISTAS

router.get("/", sessionsController.renderLogin);

router.get("/register", sessionsController.renderRegistrer);

router.get("/logout", sessionsController.logoutUser);

router.get("/fail-register", sessionsController.failRegistrer);

router.get("/fail-login", sessionsController.failLogin);

router.get("/current", 
    passportCall('jwt'),
    authorization("user"),  
    sessionsController.sessionCurrent
)

//POSTS 
router.post("/login",sessionsController.loginUser);

router.post("/register", sessionsController.saveNewUser);
 


// PARA LOGINS CON GITHUB
router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async(request, response) => {})

router.get("/api/sessions/githubcallback", passport.authenticate("github", {failureRedirect: '/login'}),sessionsController.loginUser);


export default router;
