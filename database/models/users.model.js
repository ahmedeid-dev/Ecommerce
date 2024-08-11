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
    passwordChangedAt: Date,
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
    // virtuals: true,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true
})

// ! virtual populate reviews
userSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'userId'
})

// ! virtual populate orders
userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'userId'
})

// ! populating reviews
userSchema.pre(/^find/, function () {
    this.populate("reviews")
        .populate("orders")
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