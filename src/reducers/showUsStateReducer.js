export const showUsStateReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_US_STATE_VIEW':
      console.log(action.showUsState)
      return action.showUsState;
    default:
      return state;
  }
}