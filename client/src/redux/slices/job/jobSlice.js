import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userLocation: '',
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  showSidebar: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    getJobsSuccess: (state, action) => {
      state.isLoading = false
      state.jobs = action.payload.jobs
      state.totalJobs = action.payload.totalJobs
      state.numOfPages = action.payload.numOfPages
    },
    setEditJob: (state, action) => {
      const job = state.jobs.find((job) => job._id === action.payload.id)
      const { _id, position, company, jobLocation, jobType, status } = job

      state.isEditing = true
      state.editJobId = _id
      state.position = position
      state.company = company
      state.jobLocation = jobLocation
      state.jobType = jobType
      state.status = status
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar
    },
    clearValues: (state) => {
      state.isEditing = false
      state.editJobId = ''
      state.position = ''
      state.company = ''
      state.jobLocation = state.userLocation
      state.jobType = 'full-time'
      state.status = 'pending'
    },
    handleChange(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        // Set a page to 1 every time we make a change in the search form
        page: 1
      }
    },
    clearFilters: (state) => {
      state.search = ''
      state.searchStatus = 'all'
      state.searchType = 'all'
      state.sort = 'latest'
    },
    changePage: (state, action) => {
      state.page = action.payload.page
    }
  }
})

export const { getJobsSuccess, setEditJob, toggleSidebar, clearValues, handleChange, clearFilters, changePage } = jobSlice.actions

export default jobSlice.reducer