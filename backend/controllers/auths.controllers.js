import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";
import dotenv from 'dotenv';
//import flash from 'express-flash';

export const resgisterUser = async (req, res) => {
    const { name, email, password,password2 } = req.body;
    console.log(req.body);
    try {
        if(!name || !email || !password || !password2){
            console.log("Please enter all fields");
            return res.status(401).json({ message: "Please enter all fields" });
        }

        if(password !== password2){
            console.log("Password do not match");
            return res.status(401).json({ message: "Password do not match" });
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email,]);
    
        if (user && user.rows && user.rows.length > 0) {
            console.log("User already exists");
            return res.status(401).json({ message: "User already exists" });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        let newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword],(err, result) => {
            if(err){
                throw err;
            }
            console.log('User added to database');
        //    req.flash('success_msg', 'You are now registered and can log in');
        }
        );
        newUser= await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        res.status(201).json({ name: name, email: email ,success: true});
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: "Server error" ,success: false});
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Email is not registered" ,success: false});
        }
    
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
    
        if (!validPassword) {
            return res.status(401).json({ message: "Passward is incorrect" , success: false});
        }

        const token = jwt.sign({ email: user.rows[0].email },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        });

        // const testToken = req.cookies.token;
        // console.log("Token:", testToken);
         console.log("User logged in successfully");
//        console.log(token);
        res.status(200).json({token, success: true});
    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: "Server error" ,success: false});
    }
}

export const deleteUser = async (req, res) => {
    const { email } =req.body;
    try {
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(!user.rows[0]){
            return res.status(401).json({ message: "User not found" });
        }

        user = user.rows[0];
        await pool.query("DELETE FROM users WHERE email = $1", [email]);
        
        res.status(200).json({message: "User deleted successfully" ,success: true});
    } catch (error) {
        console.log("Error detecting user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logoutUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token){
        console.log("No Token provided");
        return res.status(401).json({ message: "Access Denied. No Token provided." });
    }

    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });
        console.log("User logged out successfully");
        res.status(200).json({message: "User logged out successfully" ,success: true});
    } catch (error) {
        console.log("Error logging out user:", error);
        res.status(500).json({ message: "Server error" ,success: false});
    }
}

export const checkLoggedIn = async (req, res) => {
    const token = req.cookies.token;

    if (!token){
        console.log("No Token provided");
        return res.status(401).json({ message: "Access Denied. No Token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("User is logged in");
        res.status(200).json({message: "User is logged in" ,success: true});
    } catch (error) {
        console.log("Invalid Token");
        res.status(400).json({ message: "Invalid Token" ,success: false});
    }
}
