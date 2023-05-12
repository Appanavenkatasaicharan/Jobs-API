const Jobs = require('../models/job')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors/MyErrors')

const getAllJobs = async (req,res)=>{
    const jobs = await Jobs.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs,jobCount:jobs.length});
}

const getJob = async (req,res)=>{
    const {userId} = req.user;
    const jobId = req.params.id;
    const job = await Jobs.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`Job with id ${jobId} is not found`);
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res)=>{
    console.log(req.user);
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create({...req.body});
    res.status(StatusCodes.OK).json(job);
}

const updateJob = async (req,res)=>{
    const {userId} = req.user;
    const jobId = req.params.id;
    const job = await Jobs.findByIdAndUpdate({createdBy:userId,_id:jobId},{...req.body})
    if(!job){
        throw new NotFoundError(`Job with id ${jobId} is not found`);
    }
    res.status(StatusCodes.OK).json({job});
}

const deleteJob = async (req,res)=>{
    const {userId} = req.user;
    const jobId = req.params.id;
    const job = await Jobs.findByIdAndRemove({createdBy:userId,_id:jobId});
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}