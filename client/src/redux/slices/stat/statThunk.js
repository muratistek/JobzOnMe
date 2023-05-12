import authFetch from "../../../utils/authFetch";
import { setLoading, clearLoading } from "../alert/alertSlice";
// import {logoutUser}
import { showStats, changePage } from './statSlice';
import { clearAlertThunk } from "../alert/alertThunk";

export const showStatsThunk = async (dispatch) => {
  dispatch(setLoading());

  try {
    const { data } = await authFetch.get('/jobs/stats')

    dispatch(showStats({
      stats: data.defaultStats,
      monthlyApplications: data.monthlyApplications
    }))

    dispatch(clearLoading());
  } catch (error) {
    // logoutUser()
  }

  clearAlertThunk(dispatch);
}

export const changePageThunk = async (dispatch, page) => {
  dispatch(changePage({ page }))
}