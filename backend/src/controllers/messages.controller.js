import  messageModel  from "../services/db/models/messages.js";

export async function saveNewMessage(request, response){
    try {
        const {body} = request;
        const confirm = await messageModel.create(body);
        response.status(200).json(confirm)
    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function getAllMessages(request,response){
    try {
        const messages = await messageModel.find();
        response.render('chat',{messages})
    } catch (error) {
        response.status(400).json(error.message)
    }
}
