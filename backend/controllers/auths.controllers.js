import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/db.js";
import dotenv from 'dotenv';
//import flash from 'express-flash';

export const resgisterUser = async (req, res) => {
    const { name, email, password,password2 } = req.body;
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
    
        if (user.rows.length > 0) {
            console.log("User already exists");
            return res.status(401).json({ message: "User already exists" });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword],(err, result) => {
            if(err){
                throw err;
            }
            console.log('User added to database');
        //    req.flash('success_msg', 'You are now registered and can log in');
        }
        );

        res.status(201).json({ id: newUser.rows[0].id, name: newUser.rows[0].name, email: newUser.rows[0].email ,sucess: true});
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: "Server error" ,sucess: false});
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Email is not registered" ,sucess: false});
        }
    
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
    
        if (!validPassword) {
            return res.status(401).json({ message: "Passward is incorrect" , sucess: false});
        }

        const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        console.log("User logged in successfully");
        console.log(token);
        res.status(200).json({token, sucess: true});
    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: "Server error" ,sucess: false});
    }
}

export const deleteUser = async (req, res) => {
    const { email } =req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        user = user.rows[0];
        if(!user){
            return res.status(401).json({ message: "User not found" });
        }

        await pool.query("DELETE FROM users WHERE email = $1", [email]);
        
        res.status(200).json({message: "User deleted successfully" ,sucess: true});
    } catch (error) {
        console.log("Error detecting user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logoutUser = async (req, res) => {
    try {
        /*
        Consider adding a token to a blacklist to prevent it from being used again
        Connect to client-side storage to remove the token
        */
        console.log("User logged out successfully");
        res.status(200).json({message: "User logged out successfully" ,sucess: true});
    } catch (error) {
        console.log("Error logging out user:", error);
        res.status(500).json({ message: "Server error" ,sucess: false});
    }
}