
const reducer = (state, action) => {
  // This will run if we dispatch some kind of action that's not handled in our reducer
  throw new Error(`no such action: ${action.type}`)
}

export default reducer