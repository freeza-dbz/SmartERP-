import { Router } from "express"
import verifyJWT from "../middleware/auth.middleware.js"
import { register, login } from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile").get(verifyJWT,
    async (req, res) => {
        res.json({
            user: req.user,
        });
    })


export default router;