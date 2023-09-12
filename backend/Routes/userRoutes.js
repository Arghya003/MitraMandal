import  express  from "express";
import { signupUser,loginUser,logoutUser,followUser } from "../Controllers/userController.js";
import protectRoute from "../Middlewares/protectRoute.js";
const router= express.Router();

router.post('/signup',signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)


router.post("/follow/:id",protectRoute,followUser);

export default router;