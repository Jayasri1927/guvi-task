const express = require ("express");
const { registerUser, loginUser, getuserInfo } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, getuserInfo);

router.get('/', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully' });
  });

module.exports = router;