import { model, Schema } from "mongoose";

// ! creating UserSchema
const userSchema = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    confirmEmail: {
        type: String,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
})

// ! creating Usermodel
const User = model("User", userSchema)

// ! exporting Usermodel
export default User