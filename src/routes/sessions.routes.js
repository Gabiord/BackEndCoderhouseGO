import { Router } from "express";
import * as sessionsController from "../controllers/sessions.controller.js";


const router = Router();

router.get("/", (request, response) => {
    response.render("login")
})

router.get("/register", (request, response) => {
    response.render("register")
})

router.get("/logout", sessionsController.logoutUser)

router.post("/login", sessionsController.loginUser)

router.post("/register", sessionsController.saveNewUser)

export default router;


