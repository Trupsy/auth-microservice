import express from "express";
import { Login } from "../controllers/LoginController.js";

const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/login", Login);

export default router;
