import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { singleUpload } from "../middlewares/multer.js"


const router = express.Router()

router.post("/register",singleUpload, register)
router.post("/login", login)
router.get("/logout", logout)
router.patch("/profile/update", requireAuth, singleUpload, updateProfile)

export default router