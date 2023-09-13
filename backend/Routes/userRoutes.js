import  express  from "express";
import { signupUser,loginUser,logoutUser,followUser,updateUser,getUserProfile } from "../Controllers/userController.js";
import protectRoute from "../Middlewares/protectRoute.js";
const router= express.Router();





router.get("/profile/:username",getUserProfile)

router.post('/signup',signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)



router.post("/follow/:id",protectRoute,followUser);
router.post("/update/:id", protectRoute, updateUser);

export default router;