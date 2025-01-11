import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema<User>({
    nickname: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        trim: true,
        default: ''
    }
});

const User = mongoose.model<User>('User', userSchema);
export default User;

