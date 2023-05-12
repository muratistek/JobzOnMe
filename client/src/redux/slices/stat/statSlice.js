import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {},
  monthlyApplications: [],
  page: 1
}

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    showStats: (state, action) => {
      state.stats = action.payload.stats
      state.monthlyApplications = action.payload.monthlyApplications
    },
    changePage: (state, action) => {
      state.page = action.payload.page
    }
  }
})

export const { showStats, changePage } = statSlice.actions

export default statSlice.reducer