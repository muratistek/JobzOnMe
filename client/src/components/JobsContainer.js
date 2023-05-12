import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobsThunk } from '../redux/slices/job/jobThunk'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'
import Alert from './Alert'


export default function JobsContainer() {
  const dispatch = useDispatch()

  const { jobs, page, totalJobs, search, searchStatus, sort, searchType, numOfPages } = useSelector(state => state.job)

  const { isLoading, showAlert } = useSelector(state => state.alert)

  useEffect(() => {
    getJobsThunk(dispatch, { search, page, searchStatus, searchType, sort })
    // You can also use the useCallback() hook
    // eslint-disable-next-line
  }, [search, searchStatus, searchType, sort, page])

  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return <Wrapper>
      <h2>No jobs to display</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>{totalJobs} job{jobs.length > 1 && "s"} found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return (
            <Job key={job._id} {...job} page={page} sort={sort} search={search} searchStatus={searchStatus} searchType={searchType} />
          )
        })}
      </div>

      {/* Pagination buttons */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}
