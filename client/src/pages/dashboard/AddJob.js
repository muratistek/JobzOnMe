import React from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { displayAlertThunk } from '../../redux/slices/alert/alertThunk'
import { handleChangeThunk, createJobThunk, editJobThunk } from '../../redux/slices/job/jobThunk'
import { clearValues } from '../../redux/slices/job/jobSlice'
import Wrapper from '../../assets/wrappers/DashboardFormPage'



export default function AddJob() {
  const dispatch = useDispatch()

  const {
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    editJobId
  } = useSelector(state => state.job)

  const { isLoading, showAlert } = useSelector(state => state.alert)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlertThunk(dispatch)
      return
    }

    const job = { company, position, jobLocation, jobType, status, editJobId }

    if (isEditing) {
      editJobThunk(dispatch, job)
      return
    }

    createJobThunk(dispatch, job)
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChangeThunk(dispatch, { name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* button container */}
          <div className="btn-container">
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>

            <button type='submit' className='btn btn-block clear-btn' onClick={
              (e) => {
                e.preventDefault()
                dispatch(clearValues())
              }
            }>clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
