const User = require("../models/user");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");

require ("dotenv").config();

const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const existingUser = await User.findOne ({ email });
        if(existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error : "Internal server error"});
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign (
            {userId : user._id, role: "Admin"},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
    }
};

const getuserInfo = async (req, res) => {
    try {
        const { user } = req;
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }
};

router.get('/', async (req,res) => {
    try {
     const user = await User.find({});
     res.send(user);
    } catch (error) {
     console.error(error);
     res.status(500).send(error);
    }
 });

 
module.exports = {
    registerUser,
    loginUser,
    getuserInfo,
} 