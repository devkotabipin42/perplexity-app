import { Router } from "express";
import { register ,verifyEmail,login,getMe} from "../controller/auth.controller.js";
import { loginValidator, registerValidator} from "../validator/auth.validator.js";
import {authUser} from "../middleware/auth.middleware.js"
const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register);

authRouter.post('/login',loginValidator,login)

authRouter.get('/get-me',authUser,getMe)

authRouter.get('/verify-email', verifyEmail)



export default authRouter;