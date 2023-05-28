import Router from 'express';
import userModel from "../dao/db/models/users.js";
import cartsModel from '../dao/db/models/carts.js';
import { createHash, generateJWToken, isValidPassword } from "../utils.js";


export function renderLogin(request, response){response.render("login")}

export function renderRegistrer(request, response){response.render("register")}

export function renderFailRegistrer(request, response){response.render("fail-register")}

export function renderFailLogin(request, response){response.render("fail-login")}

export function renderLoginGithub(request, response){response.render("github-login")}


export async function loginUser(request, response){
    const {email, password} = request.body;
    try {
        const user = await userModel.findOne({email: email})

        if(!user){return response.redirect("/api/sessions/fail-login")}
        if(!isValidPassword(user, password)){return response.redirect("/api/sessions/fail-login")}

        const userToken= {
            name:  `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
            role: `${user.role}`
        }
        const accessToken = generateJWToken(userToken)
        //Creamos la Cookie
        response.cookie("jwtCookieToken", accessToken, {
            maxAge: 60000,
            httpOnly: true
        })
        response.redirect("/api/sessions/current");
    
    } catch (error) {
       response.status(400).json(error.message)
    }
}

export async function saveNewUser(request,response){
    const {first_name, last_name, age, email, password} = request.body;

    try {
        const verif = await userModel.findOne({email})
        if(verif){return response.redirect("/api/sessions/fail-register")}

        
        const newUser={
            first_name,
            last_name,
            age,
            email,
            password: createHash(password)
        }

        const user = await userModel.create(newUser)
        const cart = await cartsModel.create({cart_idUsuario: user._id})

        response.status(200).redirect("/api/sessions/")

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function logoutUser(request, response){
    response.clearCookie("jwtCookieToken").redirect("/api/sessions/")
}

export function sessionCurrent(request, response){
    const sessionUser = request.user
    const sessionAdmin = false
    response.render("sessionCurrent", {sessionUser, sessionAdmin})
}

export async function githubLogin(request, response){
    const user = request.user;
    console.log(user)
    try {
        const userToken= {
            name:  `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
            role: `${user.role}`
        }
        const accessToken = generateJWToken(userToken)
        response.cookie("jwtCookieToken", accessToken, {
            maxAge: 60000,
            httpOnly: true
        })
    } catch (error) {
        
    }
    
    response.redirect("/api/sessions/current")
}