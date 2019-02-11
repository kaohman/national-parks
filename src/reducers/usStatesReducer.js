export const usStatesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_US_STATES':
      return action.usStates;
    default:
      return state;
  }
}