import * as MessageService from "../dao/db/message.service.js";

export async function saveMessage(request, response){
    try {
        const {body} = request;
        const confirm = await MessageService.saveNewMessage(body);
        response.status(200).json(confirm)
    } catch (error) {
        response.status(400).json(error.message)
    }
}


export async function getAllMessages(request,response){
    try {
        const messages = await MessageService.getMessages();
        response.status(200).json(messages)
    } catch (error) {
        response.status(400).json(error.message)
    }
}
