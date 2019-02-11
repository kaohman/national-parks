export const showUsStateReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_US_STATE_VIEW':
      return action.showUsState;
    default:
      return state;
  }
}