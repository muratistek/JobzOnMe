import { combineReducers } from "@reduxjs/toolkit";

import alertReducer from "./slices/alert/alertSlice";
import statReducer from "./slices/stat/statSlice";
import userReducer from "./slices/user/userSlice";
import jobReducer from "./slices/job/jobSlice";
import themeSlice from "./slices/theme/themeSlice";

export const appReducer = combineReducers({
  alert: alertReducer,
  stat: statReducer,
  user: userReducer,
  job: jobReducer,
  theme: themeSlice
})