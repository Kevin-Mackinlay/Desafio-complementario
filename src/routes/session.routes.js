import { Router } from "express";
import UserModel from "../dao/models/user.model.js";


const router = Router();

router.get("/", (req, res) => {