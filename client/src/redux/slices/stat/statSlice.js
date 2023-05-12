import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {},
  monthlyApplications: [],
}

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    showStats: (state, action) => {
      state.stats = action.payload.stats
      state.monthlyApplications = action.payload.monthlyApplications
    },
  }
})

export const { showStats } = statSlice.actions

export default statSlice.reducer