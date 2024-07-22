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
}, {
    timestamps: true
})

userSchema.pre("save", function () {
    this.password = bcryptjs.hashSync(this.password, 8)
})
// userSchema.pre("updateOne", function () {
//     if (this.password) this.password = bcryptjs.hashSync(this.password, 8)
// })

// ! creating Usermodel
const User = model("User", userSchema)

// ! exporting Usermodel
export default User