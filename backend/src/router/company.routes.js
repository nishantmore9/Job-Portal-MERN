import express from "express"
import { requireAuth } from "../middlewares/requireAuth.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"

const router = express.Router()

router.post("/register",requireAuth, registerCompany)
router.get("/get",requireAuth, getCompany)
router.get("/get/:id",requireAuth, getCompanyById)
router.patch("/update/:id", requireAuth, updateCompany)

export default router