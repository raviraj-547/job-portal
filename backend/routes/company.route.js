import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
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

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated, handleUpload, updateCompany);

export default router;

