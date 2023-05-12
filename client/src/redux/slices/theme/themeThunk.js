import { toggleTheme } from "./themeSlice"

export const toggleThemeThunk = async (dispatch) => {
  dispatch(toggleTheme());
}