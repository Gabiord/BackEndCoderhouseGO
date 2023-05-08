import { Router, request, response } from "express";

const router = Router();

router.get("/", (request, response) => {
    response.render("login-github")
})

router.get("/", (request, response) => {
    response.redirect("/users")
})

router.get("/error", (request,response) => {
    response.render("error", {error: "No se pudo autenticar usando Github"})
})







export default router;