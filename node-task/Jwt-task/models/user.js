const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        name: String,
    },
    email: {
        type: String,
       
    },
    password: {
        type: String,
    
    },
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
    }
    next();
});


const User = mongoose.model("User", userSchema);

module.exports = User;