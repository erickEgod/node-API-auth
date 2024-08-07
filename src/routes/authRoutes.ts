import express from "express";
import {register, login} from "../controllers/authController"

const router = express.Router();

//ruta para el registro
router.post("/register", register);

//ruta para logearnos
router.post("/login", login);

export default router;
