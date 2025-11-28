
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    street:String,
    city: String,
    state: String,
    country: String,
    landMark:String,
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
    phone:Number,
    address: AddressSchema,

    password: {
        type: String,
        // require: true
    }
});

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







