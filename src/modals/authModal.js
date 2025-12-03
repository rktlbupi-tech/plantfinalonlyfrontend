
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    landMark: String,
    pincode: Number
})

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: Number,
    address: AddressSchema,

    password: {
        type: String,
        // require: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "vendor"]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false // Vendors need approval
    },
    addresses: [{
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        isDefault: { type: Boolean, default: false }
    }]
}, { timestamps: true });

const User = mongoose.model("users", UserSchema)
export default User;


// import mongoose from "mongoose";
// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// });

// const User =  mongoose.model("users",UserSchema);
// export default User;







