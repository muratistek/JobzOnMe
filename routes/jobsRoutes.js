import express from 'express'
const router = express.Router()

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from "../controllers/jobsController.js";

// Routes
router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
// The ":id" routes should be the last, otherwise it will treat previous route endpoint as a id "stats"
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router 