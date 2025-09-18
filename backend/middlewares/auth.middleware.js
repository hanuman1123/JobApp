import jwt from 'jsonwebtoken';
import User from '../models/auth.model.js';


export const protect = async (req, res, next) => {
    let token;

    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRETE_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized or no token" });
    }
}
