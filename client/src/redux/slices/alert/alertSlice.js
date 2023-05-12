import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  alertType: '',
  alertText: '',
  isLoading: false,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    displaySuccessAlert: (state, action) => {
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = action.payload.msg
      state.isLoading = false
    },
    displayErrorAlert: (state, action) => {
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload.msg
      state.isLoading = false
    },
    clearAlert: (state) => {
      state.showAlert = false
      state.alertType = ''
      state.alertText = ''
      state.isLoading = false
    },
    setFormAlert: (state) => {
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = 'Please provide all values!'
    },
    setLoading: (state) => {
      state.isLoading = true
    },
    clearLoading: (state) => {
      state.isLoading = false
    },
    clearShowAlert: (state) => {
      state.showAlert = false
    }
  }
})

export const { displaySuccessAlert, displayErrorAlert, clearAlert, setLoading, clearLoading, clearShowAlert, setFormAlert } = alertSlice.actions

export default alertSlice.reducer