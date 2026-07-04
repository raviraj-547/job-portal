import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

// Wrapper to handle multer errors gracefully (e.g. multer v2 rejects text fields)
const handleUpload = (req, res, next) => {
    singleUpload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "File upload error.", success: false });
        }
        next();
    });
};

router.route("/register").post(handleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, handleUpload, updateProfile);

export default router;

