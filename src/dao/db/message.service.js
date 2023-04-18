import  messageModel  from "./models/messages.js";

export async function saveNewMessage(newMessage) {
    let result = await messageModel.create(newMessage);
    return result;
}

export async function getMessages() {
    let result = await messageModel.find()
    return result;
}