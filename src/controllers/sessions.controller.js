import Router from 'express';
import userModel from "../dao/db/models/users.js";
import { generateJWToken, isValidPassword } from "../utils.js";


export function renderLogin(request, response){response.render("login")}

export function renderRegistrer(request, response){response.render("register")}

export function failRegistrer(request, response){response.render("fail-register")}

export function failLogin(request, response){response.render("fail-login")}

export async function loginUser(request, response){
    const {email, password} = request.body;
    try {
        const user = await userModel.findOne({email: email})

        if (!user){return response.send({error:"Not Found", message:"Usuario no encontrado en la BD"})}
        console.log(user)

        if (!isValidPassword){return response.status(204).send({error:"Not Found", message:"Contraseña invalida"})}
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
            httpOnly: false  // para que no exponga la cookie 
        })
        response.status(200).send({message: "Login successful!"});
    
    } catch (error) {
       response.status(400).json(error.message)
    }
}

export async function saveNewUser(request,response){
    try {
        response.status(200).redirect("/")

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function logoutUser(request, response){
    response.clearCookie("jwtCookieToken").redirect("/")
}



