import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import axios from 'axios'
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS
} from "./actions";

const initialState = {
  // "userLoading" is used only when we fetch a current user. 
  // This state will help to prevent from redirecting to the landing page because of the protected route.
  // It should also be set to "true" default value since there won't be time to change it from "false" and prevent the protected route to be executed and redirect us to the landing page
  // This allows to prevent using the local storage and thus, improve the security of application
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
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
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // "reducer" in the useReducer will handle the dispatch()
  const [state, dispatch] = useReducer(reducer, initialState)

  // Setting Axios custom instance
  const authFetch = axios.create({
    baseURL: "/api/v1"
  })


  // Attach an interceptor that will be executed once we get the response from the "authFetch" request. The first block is executed if the response codes are in 200 range. The last block is executed if the response code are in 400 range
  // This is very handy because we can logout user if we have 401 (Unauthorized) error in a response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })

    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      const { user, location } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location },
      })
    }
    catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)
      const { user, location } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      })
    }
    catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = async () => {
    await authFetch.get('/auth/logout')
    dispatch({ type: LOGOUT_USER })
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location } = data

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location } })
    } catch (error) {
      // Since we are logging a user out if we have the 401 error, we don't need to show an error message (since the delay we have a user may see the error in the login page)
      if (error.response.status !== 401) {
        dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
      }
    }

    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state

      await authFetch.post('/jobs', {
        position, company, jobLocation, jobType, status
      })

      dispatch({ type: CREATE_JOB_SUCCESS })
      // Clear form values after submit
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }

    clearAlert()
  }

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

    // Add search query param if a user typed at least one char
    if (search) {
      url = url + `&search=${search}`
    }

    dispatch({ type: GET_JOBS_BEGIN })

    try {
      const { data } = await authFetch.get(url)
      const { jobs, totalJobs, numOfPages } = data

      dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs, numOfPages } })

    } catch (error) {
      // Logout a user if we get any type of error because using this route, we shouldn't get any server errors at all. If there is an error, then there is something wrong with the app and we should logout

      logoutUser()
    }

    clearAlert()
  }

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company, position, jobLocation, jobType, status
      })

      dispatch({ type: EDIT_JOB_SUCCESS })
      // Clear all the form values and reset job edit state
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return

      dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg } })
    }

    clearAlert()
  }

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })

    try {
      await authFetch.delete(`/jobs/${jobId}`)
      // Fetch the updated list of jobs after deletion
      getJobs()
    } catch (error) {
      if (error.response.status === 401) return

      dispatch({ type: DELETE_JOB_ERROR, payload: { msg: error.response.data.msg } })
    }

    clearAlert()
  }

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })

    try {
      const { data } = await authFetch.get('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS, payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications
        }
      })
    } catch (error) {
      logoutUser()
    }

    clearAlert()
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN })

    try {
      const { data } = await authFetch('/auth/getCurrentUser')
      const { user, location } = data
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location } })
    } catch (error) {
      if (error.response.status === 401) return
      logoutUser()
    }
  }

  // The "effect" function below will be executed each time we refresh a page. 
  // This is done to get the "current user" using a cookie (instead of a local storage) and prevent from logging out with each page refresh
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage
      }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }