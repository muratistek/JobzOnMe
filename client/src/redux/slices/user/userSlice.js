import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLocation: "",
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

export const { getCurrentUser, setUserLoading, updateUser, logout } = userSlice.actions

export default userSlice.reducer