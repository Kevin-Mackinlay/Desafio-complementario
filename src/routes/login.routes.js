import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("login",{
        title: "Login",
    });
});
    
export default router;