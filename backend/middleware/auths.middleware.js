import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authToken  = (req, res, next) => {
    const token = req.cookies.token;

    if (!token){ 
        console.log("No Token provided");
        return res.status(401).json({ message: "Access Denied. No Token provided." });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log("Invalid Token");
        res.status(400).json({ message: "Invalid Token" });
    }
}