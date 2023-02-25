import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions"

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!'
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }
  // This will run if we dispatch some kind of action that's not handled in our reducer
  throw new Error(`no such action: ${action.type}`)
}

export default reducer