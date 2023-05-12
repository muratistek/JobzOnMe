import { clearAlert, setFormAlert } from "./alertSlice";

export const clearAlertThunk = async (dispatch) => {
  setTimeout(() => {
    dispatch(clearAlert())
  }, 3000)
}

export const displayAlertThunk = async (dispatch) => {
  dispatch(setFormAlert());
  clearAlertThunk(dispatch);
}