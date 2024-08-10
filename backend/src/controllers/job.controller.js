import { Job } from "../models/jobs.model.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, company } = req.body;
    const userId = req.user
    
    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !company) {
      return res.status(400).json({
          message: "All fields are require",
          success: false
      })
    };

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      location,
      jobType,
      experience,
      position,
      company,
      created_by: userId
    })
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true
    })
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.filter || " "
    const query = {
      $or : [
        {title : {$regex : keyword, $options : "i"}},
        {description : {$regex : keyword, $options : "i"}}
      ]
    }
    const jobs = await Job.find(query).populate({path : "company"}).sort({createdAt : -1});
    if(!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}

export const getJobById = async(req, res) => {
  try {
    const {id} = req.params
    const job = await Job.findById(id).populate({
      path : "application"
    })
    if(!job) {
      return res.status(404).json({
        message : "Job not found"
      })
    }
    return res.status(200).json({
      job,
      success : true
    })
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}
 
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user
    const jobs = await Job.find({created_by : adminId})
    if(!jobs) {
      return res.status(404).json({
        message : "Jobs not found",
        success : false
      })
    }
    return res.status(200).json({
      jobs,
      success : true
    })
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}