import userModel from "../dao/db/models/users.js";


export async function loginUser(request, response){
    try {
        const user = request.user;
        request.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`
        }
        response.status(200).redirect("/api/products")
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
    request.session.destroy(error=>{
        if (error){
            response.json(error)
        }
        response.clearCookie("connect.sid").redirect("/")
    })
}



