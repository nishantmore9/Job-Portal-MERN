import express from "express"
import { requireAuth } from "../middlewares/requireAuth.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"

const router = express.Router()

router.get("/apply/:id", requireAuth, applyJob)
router.get("/get", requireAuth, getAppliedJobs)
router.get("/applicant/:id", requireAuth, getApplicants),
router.post("/status/update/:id", requireAuth, updateStatus)

export default router