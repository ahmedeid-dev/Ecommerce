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
    },
    otp: {
        type: String,
        length: 6
    },
    otpExpireAt: {
        type: Date
    }
}, {
    timestamps: true
})


// ! hashing password before saving to database
userSchema.pre("save", function () {
    this.password = bcryptjs.hashSync(this.password, 8)
})

// ! hashing password before updating to database
userSchema.pre("findOneAndUpdate", function () {
    if (this._update) this._update.password = bcryptjs.hashSync(this._update.password, process.env.SALT_ROUNDS)
})

// ! creating Usermodel
const User = model("User", userSchema)

// ! exporting Usermodel
export default User