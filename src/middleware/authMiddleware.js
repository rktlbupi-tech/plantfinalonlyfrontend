import jwt from 'jsonwebtoken';
import User from '../modals/authModal.js'

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token is required!!" });
        }

        const maintoken = token.split(" ")[1];
        if (!maintoken) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const data = jwt.verify(maintoken, process.env.SECRET_KEY || "plant123");
        const email = data.email;
        let userdata = await User.findOne({ email });

        if (!userdata) return res.status(404).json({ "success": false, message: "User not found" });

        if (userdata.isBlocked) {
            return res.status(403).json({ "success": false, message: "User is blocked" });
        }

        req.user = userdata; // Changed from req.this to req.user
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authMiddleware;