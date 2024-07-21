import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs"

// ! creating UserSchema
const userSchema = new Schema({
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

userSchema.pre("save", function (doc) {
    doc.password = bcryptjs.hashSync(doc.password, 8)
})
userSchema.pre("updateOne", function (doc) {
    if (doc.password) doc.password = bcryptjs.hashSync(doc.password, 8)
})

// ! creating Usermodel
const User = model("User", userSchema)

// ! exporting Usermodel
export default User