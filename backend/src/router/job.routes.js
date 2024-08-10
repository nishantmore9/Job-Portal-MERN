import express from "express"
import { requireAuth } from "../middlewares/requireAuth.js"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js"

const router = express.Router()

router.post("/post", requireAuth, postJob)
router.get("/get", requireAuth, getAllJobs)
router.get("/getadminjobs", requireAuth, getAdminJobs)
router.get("/get/:id", requireAuth, getJobById)

export default router