// backend/job-service/controllers/jobController.js

const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  const filters = req.query;
  const jobs = await Job.find(filters).sort({ postedAt: -1 });
  res.json(jobs);
};

exports.addJob = async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json(newJob);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
};

exports.applyToJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  job.applications += 1;
  await job.save();
  res.json({ message: "Application submitted." });
};
