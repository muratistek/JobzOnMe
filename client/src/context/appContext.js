import React, { useContext, useReducer } from "react";
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
  CREATE_JOB_ERROR
} from "./actions";

// Fetch data from the local storage on initial load
const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const userLocation = localStorage.getItem("location")

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  showSidebar: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // "reducer" in the useReducer will handle the dispatch()
  const [state, dispatch] = useReducer(reducer, initialState)

  // Setting Axios custom instance
  const authFetch = axios.create({
    baseURL: "/api/v1"
  })

  // Setup an axios interceptor that will serve as a middleware when we use the "authFetch" instance in a request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

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

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      const { user, token, location } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      })
      // local storage placeholder
      addUserToLocalStorage({ user, token, location })
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
      const { user, token, location } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      })
      addUserToLocalStorage({ user, token, location })
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

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } })
      addUserToLocalStorage({ user, location, token })
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
        createJob
      }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }