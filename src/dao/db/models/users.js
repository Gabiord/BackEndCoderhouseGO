import mongoose from "mongoose";    

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 50 },
    last_name: { type: String, required: true, max: 50 },
    age: { type: Number, required: true, max: 100 },
    email: { type: String, unique: true, required: true, max: 50 },
    password: { type: String, required: true, max: 50 }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;

