import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLocation: "",
  // "userLoading" is used only when we fetch a current user. 
  // This state will help to prevent from redirecting to the landing page because of the protected route.
  // It should also be set to "true" default value since there won't be time to change it from "false" and prevent the protected route to be executed and redirect us to the landing page
  // This allows to prevent using the local storage and thus, improve the security of application
  userLoading: true,
  jobLocation: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentUser: (state, action) => {
      state.user = action.payload.user
      state.userLocation = action.payload.location
      state.jobLocation = action.payload.location
      state.userLoading = false
    },
    setUserLoading: (state) => {
      state.userLoading = true
    },
    removeUserLoading: (state) => {
      state.userLoading = false
    },
    updateUser: (state, action) => {
      state.user = action.payload.user
      state.userLocation = action.payload.location
      state.jobLocation = action.payload.location
    },
    logout: (state) => {
      return { ...initialState, userLoading: false }
    }
  }
})

export const { getCurrentUser, setUserLoading, updateUser, logout, removeUserLoading } = userSlice.actions

export default userSlice.reducer