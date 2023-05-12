import axios from "axios";
import { displaySuccessAlert, displayErrorAlert, setLoading, clearShowAlert } from "../alert/alertSlice";
import { clearAlertThunk } from "../alert/alertThunk";
import { getCurrentUser, setUserLoading, updateUser, logout } from "./userSlice";
import authFetch from "../../../utils/authFetch";

export const registerUserThunk = async (dispatch, currentUser) => {
  dispatch(setLoading());

  try {
    const response = await axios.post('/api/v1/auth/register', currentUser)
    const { user, location } = response.data
    dispatch(updateUser({ user, location }))
    dispatch(displaySuccessAlert('User Created! Redirecting...'))
  } catch (error) {
    dispatch(displayErrorAlert({ msg: error.response.data.msg }))
  }

  clearAlertThunk(dispatch);
}

export const loginUserThunk = async (dispatch, currentUser) => {
  dispatch(setLoading());

  try {
    const { data } = await axios.post('/api/v1/auth/login', currentUser)
    const { user, location } = data
    dispatch(updateUser({ user, location }))
    dispatch(displaySuccessAlert('Login Successful! Redirecting...'))
  } catch (error) {
    dispatch(displayErrorAlert({ msg: error.response.data.msg }))
  }

  clearAlertThunk(dispatch);
}

export const logoutUserThunk = async (dispatch) => {
  await authFetch.get('/auth/logout')
  dispatch(logout())
}

export const updateUserThunk = async (dispatch, currentUser) => {
  dispatch(setLoading());

  try {
    const { data } = await authFetch.patch('/auth/updateUser', currentUser)
    const { user, location } = data

    dispatch(updateUser({ user, location }))
    dispatch(displaySuccessAlert('User Profile has been updated!'))
  } catch (error) {
    if (error.response.status !== 401) {
      dispatch(displayErrorAlert({ msg: error.response.data.msg }))
    }
  }

  clearAlertThunk(dispatch);
}

export const getCurrentUserThunk = async (dispatch) => {
  dispatch(setUserLoading());
  dispatch(clearShowAlert())

  try {
    const { data } = await authFetch('/auth/getCurrentUser')
    const { user, location } = data

    dispatch(getCurrentUser({ user, location }));
  } catch (error) {
    if (error.response.status === 401) return;
    logoutUserThunk(dispatch)
  }
}