const express = require('express');
const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobsControllers');
const jobsRouter = express.Router();

jobsRouter.route('/').get(getAllJobs).post(createJob);
jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);


module.exports = jobsRouter;