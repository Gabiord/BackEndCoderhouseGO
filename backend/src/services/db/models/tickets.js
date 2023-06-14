import mongoose from "mongoose";

const collectionName = "tickets";

const ticketsSchema = new mongoose.Schema(
{
    ticket_code: { type: String, required: true, unique: true },
    ticket_purchase_datetime: {type: Date, required: true},
    ticket_amount: {type: Number, required: true},
    ticket_purchaser: {type: String, max: 50}
});


const ticketModel = mongoose.model(collectionName, ticketsSchema);

export default ticketModel;