const express = require ("express");
const { registerUser, loginUser, getuserInfo } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getuserInfo);

module.exports = router;