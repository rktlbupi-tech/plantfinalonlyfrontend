
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/modals/authModal.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const adminEmail = "admin@plant.com";
        const adminPassword = "adminpassword";
        const adminName = "Super Admin";

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const newAdmin = new User({
            fullname: adminName,
            email: adminEmail,
            password: adminPassword, // In a real app, hash this! But authController seems to store plain text based on previous reads (which is bad but I follow existing pattern)
            role: "admin",
            isVerified: true
        });

        await newAdmin.save();
        console.log("Admin created successfully");
        console.log("Email:", adminEmail);
        console.log("Password:", adminPassword);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

export default seedAdmin;
