import userModel from "../dao/db/models/users.js";
import { createHash, isValidPassword } from "../utils.js";


export async function loginUser(request, response){
    try {
        let {email, password} = request.body;
        const user = await userModel.findOne({email})
        if(!user) {return response.status(401).render("user", {sessionRender: true})}
        if(!isValidPassword(user, password)){return response.status(401).render("user", {sessionRender: true})}

        request.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`
        }

        if(user.email === "adminCoder@coder.com"){ 
            request.session.admin = true;
        }else{
            request.session.admin = false;
        }

        response.status(200).redirect("/api/products")
    } catch (error) {
       response.status(400).json(error.message)
    }
}

export async function saveNewUser(request,response){
    try {
        const {body} = request;
        body.password = createHash(body.password);
        const confirm = await userModel.create(body);
        response.status(200).redirect("/")

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function logoutUser(request, response){
    request.session.destroy(error=>{
        if (error){
            response.json(error)
        }
        response.clearCookie("connect.sid").redirect("/")
    })
}



