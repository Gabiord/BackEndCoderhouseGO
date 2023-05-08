import mongoose from "mongoose";    

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: { type: String, max: 50 },
    last_name: { type: String, max: 50 },
    age: { type: Number, max: 100 },
    email: { type: String, unique: true, max: 50 },
    password: { type: String, max: 50 },
    loggedBy: { type: String }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;

