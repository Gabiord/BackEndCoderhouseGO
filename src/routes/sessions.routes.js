import { Router, request, response } from "express";
import * as sessionsController from "../controllers/sessions.controller.js";
import passport from "passport";

const router = Router();

router.get("/", (request, response) => {response.render("login");});

router.get("/register", (request, response) => {response.render("register");});

router.get("/logout", sessionsController.logoutUser);

router.post("/login", passport.authenticate("login", {failureRedirect: "/fail-login"}),sessionsController.loginUser);

router.post("/register",passport.authenticate("register", { failureRedirect: "/fail-register" }), sessionsController.saveNewUser);

router.get("/fail-register", (request, response) => {response.status(401).send({ error: "Error al procesar el registro" });});

router.get("/fail-login", (request, response) => {response.status(401).send({ error: "Error al procesar el login" });});


// PARA LOGINS CON GITHUB
router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async(request, response) => {})

router.get("/api/sessions/githubcallback", passport.authenticate("github", {failureRedirect: '/login'}),sessionsController.loginUser);


export default router;
