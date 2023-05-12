import { getJobsSuccess, setEditJob, toggleSidebar, clearValues, handleChange, clearFilters } from './jobSlice'

import { displaySuccessAlert, displayErrorAlert, setLoading, clearLoading, clearShowAlert } from "../alert/alertSlice";
import { clearAlertThunk } from '../alert/alertThunk';

import authFetch from '../../../utils/authFetch';
// import {logoutUser}


export const createJobThunk = async (dispatch, job) => {
  dispatch(setLoading())

  try {
    const { position, company, jobLocation, jobType, status } = job

    await authFetch.post('/jobs', {
      position, company, jobLocation, jobType, status
    })

    dispatch(displaySuccessAlert({ msg: "New Job Added!" }))

    // Clear form values after submit
    dispatch(clearValues())
  }
  catch (error) {
    if (error.response.status === 401) return

    dispatch(displayErrorAlert({ msg: error.response.data.msg }))
  }

  clearAlertThunk(dispatch)
}


export const getJobsThunk = async (dispatch, { search, searchStatus, searchType, sort, page }) => {
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

  // Add search query param if a user typed at least one char
  if (search) {
    url = url + `&search=${search}`
  }

  dispatch(setLoading())
  dispatch(clearShowAlert())

  try {
    const { data } = await authFetch.get(url)
    const { jobs, totalJobs, numOfPages } = data

    dispatch(getJobsSuccess({ jobs, totalJobs, numOfPages }))
    dispatch(clearLoading())
  }
  catch (error) {
    // Logout a user if we get any type of error because using this route, we shouldn't get any server errors at all. If there is an error, then there is something wrong with the app and we should logout

    // TODO: ADD LATER
    // logoutUser()
  }

  clearAlertThunk(dispatch)
}

export const setEditJobThunk = (dispatch, id) => {
  dispatch(setEditJob({ id }))
}

export const editJobThunk = async (dispatch, job) => {
  dispatch(setLoading())

  try {
    const { position, company, jobLocation, jobType, status } = job

    await authFetch.patch(`/jobs/${job.editJobId}`, {
      position, company, jobLocation, jobType, status
    })

    dispatch(displaySuccessAlert({ msg: "Job Updated!" }))
    dispatch(clearValues())
  } catch (error) {
    if (error.response.status === 401) return

    dispatch(displayErrorAlert({ msg: error.response.data.msg }))
  }

  clearAlertThunk(dispatch)
}

export const deleteJobThunk = async (dispatch, jobId, { search, searchStatus, searchType, sort, page }) => {
  dispatch(setLoading())

  try {
    await authFetch.delete(`/jobs/${jobId}`)

    // Fetch the updated list of jobs after deletion
    getJobsThunk(dispatch, { search, searchStatus, searchType, sort, page })
  } catch (error) {
    if (error.response.status === 401) return

    dispatch(displayErrorAlert({ msg: error.response.data.msg }))
  }

  clearAlertThunk(dispatch)
}

export const handleChangeThunk = (dispatch, { name, value }) => {
  dispatch(handleChange({ name, value }));
}

export const toggleSidebarThunk = (dispatch) => {
  dispatch(toggleSidebar());
}

export const clearFiltersThunk = (dispatch) => {
  dispatch(clearFilters());
}