import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import checkPermissions from "../utils/checkPermissions.js"
import mongoose from "mongoose"
import moment from 'moment'

const createJob = async (req, res) => {
  const { position, company } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  // Get query string values
  const { status, jobType, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add conditions based on the query strings values and limit the number of output
  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    // Allow search positions based on a search query string value. Allow case insensitive
    queryObject.position = { $regex: search, $options: 'i' }
  }

  // Remove "await" to be able to chain the returned query 
  let result = Job.find(queryObject)

  // Sort conditions on the filtered result. Sort by a property name, if "minus" in front, then sort in descending order
  if (sort === 'latest') result = result.sort('-createdAt')
  if (sort === 'oldest') result = result.sort('createdAt')
  if (sort === 'a-z') result = result.sort('position')
  if (sort === 'z-a') result = result.sort('-position')

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  // It will take every 10 results for each page
  const skip = (page - 1) * limit

  // This chaining with skip() and limit() is essential for the pagination functionality to work
  result = result.skip(skip).limit(limit)

  // Chain sort conditions
  const jobs = await result

  // Get a number of documents in DB based on the passed query object
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { company, position } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  // check permissions
  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  // check permissions
  checkPermissions(req.user, job.createdBy)

  // Remove the found job from the DB
  await job.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const showStats = async (req, res) => {
  // Use aggregation pipeline to filter and group objects by certain properties
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 }
  ])

  // Refactor the "monthlyApplications" array for the better data output. We reverse the latest 6 month because we will display from oldest to newest. 
  monthlyApplications = monthlyApplications.map((item) => {
    const { _id: { year, month }, count } = item
    // moment package counts month from 0 to 11 (unlike mongoDB that does that from 1 to 12). That's why we have to subtract one 
    const date = moment().month(month - 1).year(year).format('MMM Y')

    return { date, count }
  }).reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }